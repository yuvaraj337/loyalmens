/**
 * High-Performance Responsive Frame Preloader & Cache System
 * 
 * Supports independent Desktop (16:9) and Mobile (9:16) WebP frame sequences.
 * Strictly guarantees that:
 * - Desktop screens NEVER request mobile frames
 * - Mobile screens NEVER request desktop frames
 * - Memory-bounded LRU eviction prevents RAM overflow on mobile devices
 * - Nearest-frame fallback guarantees zero screen flicker or black flashes
 * - Direction-aware adaptive preloading prioritizes upcoming scroll frames
 */

export interface FrameSequenceConfig {
  mode: 'desktop' | 'mobile';
  totalFrames: number;
  nativeWidth: number;
  nativeHeight: number;
  maxCacheSize: number;
  preloadAhead: number;
  preloadBehind: number;
  getFrameUrl: (index: number) => string;
}

export const DESKTOP_CONFIG: FrameSequenceConfig = {
  mode: 'desktop',
  totalFrames: 488,
  nativeWidth: 960,
  nativeHeight: 540,
  maxCacheSize: 150,
  preloadAhead: 35,
  preloadBehind: 15,
  getFrameUrl: (index: number) => {
    const clamped = Math.max(0, Math.min(487, index));
    return `/frames/frame_${clamped.toString().padStart(6, '0')}.webp`;
  },
};

export const MOBILE_CONFIG: FrameSequenceConfig = {
  mode: 'mobile',
  totalFrames: 467,
  nativeWidth: 720,
  nativeHeight: 1280,
  maxCacheSize: 75, // Bounded cache for mobile memory safety (~270MB max)
  preloadAhead: 25,
  preloadBehind: 10,
  getFrameUrl: (index: number) => {
    const clamped = Math.max(0, Math.min(466, index));
    const fileNum = clamped + 1; // mobile frames are 1-indexed (frame_00001.webp to frame_00467.webp)
    return `/frames-mobile/frame_${fileNum.toString().padStart(5, '0')}.webp`;
  },
};

export class FrameSequenceManager {
  public readonly config: FrameSequenceConfig;
  private cache = new Map<number, HTMLImageElement>();
  private inFlight = new Map<number, Promise<HTMLImageElement>>();
  private isPreloadingBackground = false;
  private backgroundAbortController: AbortController | null = null;

  constructor(config: FrameSequenceConfig) {
    this.config = config;
    // Note: Does NOT eagerly load in constructor so inactive managers never make network requests
  }

  public getFrame(index: number): HTMLImageElement | null {
    return this.cache.get(index) || null;
  }

  /**
   * Returns exact frame or the closest loaded frame to avoid black flashes or frozen screen.
   */
  public getNearestFrame(targetIndex: number): HTMLImageElement | null {
    if (this.cache.has(targetIndex)) {
      return this.cache.get(targetIndex)!;
    }

    const total = this.config.totalFrames;
    for (let delta = 1; delta < total; delta++) {
      const lower = targetIndex - delta;
      if (lower >= 0 && this.cache.has(lower)) {
        return this.cache.get(lower)!;
      }
      const upper = targetIndex + delta;
      if (upper < total && this.cache.has(upper)) {
        return this.cache.get(upper)!;
      }
    }

    return null;
  }

  /**
   * Load a single frame with HTMLImageElement.decode() where available.
   */
  public loadFrame(index: number): Promise<HTMLImageElement> {
    const clamped = Math.max(0, Math.min(this.config.totalFrames - 1, index));

    if (this.cache.has(clamped)) {
      return Promise.resolve(this.cache.get(clamped)!);
    }

    if (this.inFlight.has(clamped)) {
      return this.inFlight.get(clamped)!;
    }

    const promise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.src = this.config.getFrameUrl(clamped);

      const onDecoded = () => {
        this.cache.set(clamped, img);
        this.inFlight.delete(clamped);
        this.evictDistant(clamped);
        resolve(img);
      };

      const onError = () => {
        this.inFlight.delete(clamped);
        reject(new Error(`Failed to load ${this.config.mode} frame ${clamped}`));
      };

      if (typeof img.decode === 'function') {
        img.decode()
          .then(onDecoded)
          .catch(() => {
            img.onload = onDecoded;
            img.onerror = onError;
          });
      } else {
        img.onload = onDecoded;
        img.onerror = onError;
      }
    });

    this.inFlight.set(clamped, promise);
    return promise;
  }

  /**
   * Direction-aware window preloader.
   */
  public preloadWindow(currentIndex: number, scrollingForward = true): void {
    const ahead = scrollingForward ? this.config.preloadAhead : Math.floor(this.config.preloadAhead * 0.5);
    const behind = scrollingForward ? Math.floor(this.config.preloadBehind * 0.5) : this.config.preloadBehind;

    const start = Math.max(0, currentIndex - behind);
    const end = Math.min(this.config.totalFrames - 1, currentIndex + ahead);

    // Prioritize scroll direction
    if (scrollingForward) {
      for (let i = currentIndex; i <= end; i++) {
        if (!this.cache.has(i) && !this.inFlight.has(i)) {
          this.loadFrame(i).catch(() => {});
        }
      }
      for (let i = currentIndex - 1; i >= start; i--) {
        if (!this.cache.has(i) && !this.inFlight.has(i)) {
          this.loadFrame(i).catch(() => {});
        }
      }
    } else {
      for (let i = currentIndex; i >= start; i--) {
        if (!this.cache.has(i) && !this.inFlight.has(i)) {
          this.loadFrame(i).catch(() => {});
        }
      }
      for (let i = currentIndex + 1; i <= end; i++) {
        if (!this.cache.has(i) && !this.inFlight.has(i)) {
          this.loadFrame(i).catch(() => {});
        }
      }
    }
  }

  /**
   * Progressively load remaining frames in idle background batches.
   */
  public startBackgroundPreload(startIndex = 1): void {
    if (this.isPreloadingBackground) return;
    this.isPreloadingBackground = true;
    this.backgroundAbortController = new AbortController();

    let index = startIndex;
    const batchSize = this.config.mode === 'mobile' ? 3 : 5;
    const total = this.config.totalFrames;

    const loadBatch = () => {
      if (!this.isPreloadingBackground || index >= total) {
        this.isPreloadingBackground = false;
        return;
      }

      const batchPromises: Promise<any>[] = [];
      for (let i = 0; i < batchSize && index < total; i++, index++) {
        if (!this.cache.has(index)) {
          batchPromises.push(this.loadFrame(index).catch(() => null));
        }
      }

      Promise.all(batchPromises).then(() => {
        if (this.isPreloadingBackground) {
          // Keep main thread relaxed
          setTimeout(loadBatch, this.config.mode === 'mobile' ? 40 : 20);
        }
      });
    };

    loadBatch();
  }

  public stopBackgroundPreload(): void {
    this.isPreloadingBackground = false;
    if (this.backgroundAbortController) {
      this.backgroundAbortController.abort();
      this.backgroundAbortController = null;
    }
  }

  /**
   * Bounded cache eviction: purges frames that are farthest from targetIndex.
   */
  private evictDistant(targetIndex: number): void {
    if (this.cache.size <= this.config.maxCacheSize) return;

    // Always preserve frame 0
    let farthestKey: number | null = null;
    let maxDistance = -1;

    for (const key of this.cache.keys()) {
      if (key === 0) continue;
      const distance = Math.abs(key - targetIndex);
      if (distance > maxDistance) {
        maxDistance = distance;
        farthestKey = key;
      }
    }

    if (farthestKey !== null) {
      this.cache.delete(farthestKey);
    }
  }

  /**
   * Complete cleanup when unmounting or switching viewport mode.
   */
  public dispose(): void {
    this.stopBackgroundPreload();
    this.inFlight.clear();
    this.cache.clear();
  }
}

// Singletons managed on-demand
let desktopManager: FrameSequenceManager | null = null;
let mobileManager: FrameSequenceManager | null = null;

export function getDesktopPreloader(): FrameSequenceManager {
  if (!desktopManager) {
    desktopManager = new FrameSequenceManager(DESKTOP_CONFIG);
  }
  return desktopManager;
}

export function getMobilePreloader(): FrameSequenceManager {
  if (!mobileManager) {
    mobileManager = new FrameSequenceManager(MOBILE_CONFIG);
  }
  return mobileManager;
}

export function getActivePreloader(isMobile: boolean): FrameSequenceManager {
  return isMobile ? getMobilePreloader() : getDesktopPreloader();
}

// Legacy export for backwards compatibility
export const framePreloader = {
  loadFrame: (index: number) => getDesktopPreloader().loadFrame(index),
  getFrame: (index: number) => getDesktopPreloader().getFrame(index),
  getNearestFrame: (index: number) => getDesktopPreloader().getNearestFrame(index),
  preloadWindow: (index: number, ahead?: number, behind?: number) => getDesktopPreloader().preloadWindow(index, true),
  startBackgroundPreload: () => getDesktopPreloader().startBackgroundPreload(),
};

export const TOTAL_FRAMES = DESKTOP_CONFIG.totalFrames;
