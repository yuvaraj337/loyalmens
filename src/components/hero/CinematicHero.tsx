import React, { useRef, useEffect, useState, useCallback } from 'react';
import { getActivePreloader, FrameSequenceManager } from './FramePreloader';
import { HeroOverlay } from './HeroOverlay';
import '../../styles/hero.css';

export const CinematicHero: React.FC = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  // Responsive device detection (breakpoint at 768px)
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 768;
  });

  const [initialLoaded, setInitialLoaded] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const lastDrawnFrameRef = useRef<number>(-1);
  const lastTargetFrameRef = useRef<number>(0);
  const activePreloaderRef = useRef<FrameSequenceManager | null>(null);

  // Draw image with cover aspect ratio onto canvas
  const drawCover = useCallback((img: HTMLImageElement, nativeWidth: number, nativeHeight: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || nativeWidth;
    const ih = img.naturalHeight || nativeHeight;

    const scale = Math.max(cw / iw, ch / ih);
    const nw = iw * scale;
    const nh = ih * scale;
    const nx = (cw - nw) / 2;
    const ny = (ch - nh) / 2;

    ctx.drawImage(img, nx, ny, nw, nh);
  }, []);

  // Responsive device media-query listener
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia('(max-width: 768px)');
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mql.addEventListener('change', handleMediaChange);
    return () => mql.removeEventListener('change', handleMediaChange);
  }, []);

  // Update canvas dimensions for device pixel ratio and redraw current frame
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    }

    const preloader = getActivePreloader(isMobile);
    const currentFrame = Math.max(0, lastDrawnFrameRef.current);
    const img = preloader.getNearestFrame(currentFrame);
    if (img) {
      drawCover(img, preloader.config.nativeWidth, preloader.config.nativeHeight);
    }
  }, [isMobile, drawCover]);

  // Reduced motion preference listener
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);

    const onChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Main high-performance render and scroll controller loop
  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener('orientationchange', resizeCanvas, { passive: true });

    const preloader = getActivePreloader(isMobile);
    activePreloaderRef.current = preloader;
    const config = preloader.config;

    setInitialLoaded(false);
    lastDrawnFrameRef.current = -1;
    lastTargetFrameRef.current = 0;

    // 1. Immediately load and draw frame 0 for the active device sequence ONLY
    let isCancelled = false;

    preloader.loadFrame(0).then((frame0) => {
      if (isCancelled) return;
      drawCover(frame0, config.nativeWidth, config.nativeHeight);
      lastDrawnFrameRef.current = 0;
      setInitialLoaded(true);

      // Start preloading upcoming window & background queue for active mode
      preloader.preloadWindow(0, true);
      preloader.startBackgroundPreload(1);
    }).catch(() => {});

    if (isReducedMotion) {
      return () => {
        isCancelled = true;
        window.removeEventListener('resize', resizeCanvas);
        window.removeEventListener('orientationchange', resizeCanvas);
        preloader.stopBackgroundPreload();
      };
    }

    let targetProgress = 0;
    let smoothProgress = 0;
    let animId: number;

    const loop = () => {
      // 1. Calculate scroll progress from track position
      if (trackRef.current) {
        const rect = trackRef.current.getBoundingClientRect();
        const maxScroll = rect.height - window.innerHeight;
        if (maxScroll > 0) {
          const currentScroll = -rect.top;
          targetProgress = Math.max(0, Math.min(1, currentScroll / maxScroll));
        }
      }

      // 2. Smooth lerp for buttery animation
      const diff = targetProgress - smoothProgress;
      if (Math.abs(diff) > 0.0001) {
        smoothProgress += diff * 0.28;
      } else {
        smoothProgress = targetProgress;
      }

      // 3. Determine target frame based on active sequence total frames
      const totalFrames = config.totalFrames;
      const targetFrame = Math.min(
        totalFrames - 1,
        Math.max(0, Math.floor(smoothProgress * totalFrames))
      );
      lastTargetFrameRef.current = targetFrame;

      // 4. Render to canvas if frame changed
      if (targetFrame !== lastDrawnFrameRef.current) {
        const isForward = targetFrame >= lastDrawnFrameRef.current;
        preloader.preloadWindow(targetFrame, isForward);

        const cached = preloader.getFrame(targetFrame);
        if (cached) {
          drawCover(cached, config.nativeWidth, config.nativeHeight);
          lastDrawnFrameRef.current = targetFrame;
        } else {
          // Nearest fallback so screen never flashes or flickers
          const nearest = preloader.getNearestFrame(targetFrame);
          if (nearest) {
            drawCover(nearest, config.nativeWidth, config.nativeHeight);
          }
          // Asynchronous loading safety: only paint if still the latest requested frame
          preloader.loadFrame(targetFrame).then((img) => {
            if (!isCancelled && lastTargetFrameRef.current === targetFrame) {
              drawCover(img, config.nativeWidth, config.nativeHeight);
              lastDrawnFrameRef.current = targetFrame;
            }
          }).catch(() => {});
        }
      }

      // 5. Update scrub bar (0 React re-renders)
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${smoothProgress * 100}%`;
      }

      // 6. Update overlay opacity and transform (0 React re-renders)
      if (overlayRef.current) {
        const opacity = Math.max(0, Math.min(1, 1 - (smoothProgress - 0.06) / 0.24));
        overlayRef.current.style.opacity = String(opacity);
        overlayRef.current.style.transform = `translateY(${smoothProgress * -45}px)`;
        overlayRef.current.style.pointerEvents = opacity < 0.1 ? 'none' : 'auto';
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      isCancelled = true;
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('orientationchange', resizeCanvas);
      cancelAnimationFrame(animId);
      preloader.stopBackgroundPreload();
    };
  }, [isMobile, drawCover, resizeCanvas, isReducedMotion]);

  return (
    <section
      ref={trackRef}
      className={`cinematic-hero-track ${isMobile ? 'hero-mobile' : 'hero-desktop'}`}
      style={{ height: isReducedMotion ? '100vh' : (isMobile ? '340vh' : '380vh') }}
      aria-label="Loyal Professional Men's Parlour Cinematic Hero"
    >
      <div className="cinematic-hero-sticky">
        {/* Fullscreen HTML5 Canvas */}
        <canvas ref={canvasRef} className="hero-canvas" />

        {/* Cinematic Vignette */}
        <div className="hero-vignette" />

        {/* Interactive Luxury HTML Overlay */}
        <HeroOverlay ref={overlayRef} />

        {/* Sequence Progress Bar */}
        <div className="hero-scrub-progress" aria-hidden="true">
          <div ref={progressBarRef} className="hero-scrub-bar" style={{ width: '0%' }} />
        </div>

        {/* Initial First Frame Loader */}
        {!initialLoaded && (
          <div className="hero-initial-loader">
            <svg className="loader-crown" viewBox="0 0 48 34" fill="none">
              <path
                d="M4 10L12 28H36L44 10L30 18L24 6L18 18L4 10Z"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
    </section>
  );
};
