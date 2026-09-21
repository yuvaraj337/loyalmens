/**
 * High-Performance Frame Preloader with In-Flight Promise Cache and Fallback
 */

export const TOTAL_FRAMES = 488;

export function getFrameUrl(index: number): string {
  const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, index));
  const numStr = clamped.toString().padStart(6, '0');
  return `/frames/frame_${numStr}.webp`;
}

class FramePreloaderManager {
  private cache = new Map<number, HTMLImageElement>();
  private inFlight = new Map<number, Promise<HTMLImageElement>>();
  private isPreloadingAll = false;

  constructor() {
    // Eagerly load first frame
    this.loadFrame(0);
  }

  public getFrame(index: number): HTMLImageElement | null {
    return this.cache.get(index) || null;
  }

  /**
   * Returns the exact frame or nearest loaded frame so the screen never flashes black.
   */
  public getNearestFrame(targetIndex: number): HTMLImageElement | null {
    if (this.cache.has(targetIndex)) {
      return this.cache.get(targetIndex)!;
    }

    for (let delta = 1; delta < TOTAL_FRAMES; delta++) {
      const lower = targetIndex - delta;
      if (lower >= 0 && this.cache.has(lower)) {
        return this.cache.get(lower)!;
      }
      const upper = targetIndex + delta;
      if (upper < TOTAL_FRAMES && this.cache.has(upper)) {
        return this.cache.get(upper)!;
      }
    }

    return null;
  }

  public loadFrame(index: number): Promise<HTMLImageElement> {
    if (this.cache.has(index)) {
      return Promise.resolve(this.cache.get(index)!);
    }

    if (this.inFlight.has(index)) {
      return this.inFlight.get(index)!;
    }

    const promise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.src = getFrameUrl(index);

      img.onload = () => {
        this.cache.set(index, img);
        this.inFlight.delete(index);
        resolve(img);
      };

      img.onerror = () => {
        this.inFlight.delete(index);
        reject(new Error(`Failed to load frame ${index}`));
      };
    });

    this.inFlight.set(index, promise);
    return promise;
  }

  public preloadWindow(currentIndex: number, ahead = 35, behind = 15): void {
    const start = Math.max(0, currentIndex - behind);
    const end = Math.min(TOTAL_FRAMES - 1, currentIndex + ahead);

    for (let i = currentIndex; i <= end; i++) {
      if (!this.cache.has(i)) {
        this.loadFrame(i).catch(() => {});
      }
    }

    for (let i = currentIndex - 1; i >= start; i--) {
      if (!this.cache.has(i)) {
        this.loadFrame(i).catch(() => {});
      }
    }
  }

  public startBackgroundPreload(): void {
    if (this.isPreloadingAll) return;
    this.isPreloadingAll = true;

    let index = 1;
    const batchSize = 6;

    const loadBatch = () => {
      if (index >= TOTAL_FRAMES) return;

      const batchPromises: Promise<any>[] = [];
      for (let i = 0; i < batchSize && index < TOTAL_FRAMES; i++, index++) {
        if (!this.cache.has(index)) {
          batchPromises.push(this.loadFrame(index).catch(() => null));
        }
      }

      Promise.all(batchPromises).then(() => {
        setTimeout(loadBatch, 16);
      });
    };

    loadBatch();
  }
}

export const framePreloader = new FramePreloaderManager();
