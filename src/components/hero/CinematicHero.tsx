import React, { useRef, useEffect, useState, useCallback } from 'react';
import { framePreloader, TOTAL_FRAMES } from './FramePreloader';
import { HeroOverlay } from './HeroOverlay';
import '../../styles/hero.css';

export const CinematicHero: React.FC = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const [initialLoaded, setInitialLoaded] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const lastDrawnFrameRef = useRef<number>(-1);

  // Draw image with cover aspect ratio
  const drawCover = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || 960;
    const ih = img.naturalHeight || 540;

    const scale = Math.max(cw / iw, ch / ih);
    const nw = iw * scale;
    const nh = ih * scale;
    const nx = (cw - nw) / 2;
    const ny = (ch - nh) / 2;

    ctx.drawImage(img, nx, ny, nw, nh);
  }, []);

  // Update canvas dimensions for device pixel ratio
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

    const currentFrame = Math.max(0, lastDrawnFrameRef.current);
    const img = framePreloader.getNearestFrame(currentFrame);
    if (img) {
      drawCover(img);
    }
  }, [drawCover]);

  // Reduced motion preference
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

    // 1. Immediately load and draw frame 0
    framePreloader.loadFrame(0).then((frame0) => {
      drawCover(frame0);
      lastDrawnFrameRef.current = 0;
      setInitialLoaded(true);

      // Start preloading upcoming window & background queue
      framePreloader.preloadWindow(0, 40, 0);
      framePreloader.startBackgroundPreload();
    });

    if (isReducedMotion) {
      return () => {
        window.removeEventListener('resize', resizeCanvas);
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

      // 2. Smooth lerp
      const diff = targetProgress - smoothProgress;
      if (Math.abs(diff) > 0.0001) {
        smoothProgress += diff * 0.28;
      } else {
        smoothProgress = targetProgress;
      }

      // 3. Determine target frame
      const targetFrame = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(smoothProgress * TOTAL_FRAMES))
      );

      // 4. Render to canvas if frame changed
      if (targetFrame !== lastDrawnFrameRef.current) {
        framePreloader.preloadWindow(targetFrame, 35, 15);

        const cached = framePreloader.getFrame(targetFrame);
        if (cached) {
          drawCover(cached);
          lastDrawnFrameRef.current = targetFrame;
        } else {
          // Nearest fallback so screen never flashes
          const nearest = framePreloader.getNearestFrame(targetFrame);
          if (nearest) {
            drawCover(nearest);
          }
          // Load and draw immediately when ready
          framePreloader.loadFrame(targetFrame).then((img) => {
            drawCover(img);
            lastDrawnFrameRef.current = targetFrame;
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
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animId);
    };
  }, [drawCover, resizeCanvas, isReducedMotion]);

  return (
    <section
      ref={trackRef}
      className="cinematic-hero-track"
      style={{ height: isReducedMotion ? '100vh' : '380vh' }}
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
