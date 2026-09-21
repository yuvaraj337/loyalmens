import React, { useRef, useEffect, useState, useCallback } from 'react';
import { framePreloader, TOTAL_FRAMES } from './FramePreloader';

interface FrameSequenceProps {
  currentFrame: number;
  onInitialReady?: () => void;
}

export const FrameSequence: React.FC<FrameSequenceProps> = ({
  currentFrame,
  onInitialReady,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastDrawnFrameRef = useRef<number>(-1);
  const [initialLoaded, setInitialLoaded] = useState(false);

  // Draw a frame image onto the canvas using cover aspect ratio
  const drawImageCover = useCallback((img: HTMLImageElement) => {
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

  // Handle canvas sizing for sharp retina/high-DPI screens
  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for memory efficiency
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    // Redraw current frame
    const img = framePreloader.getNearestFrame(currentFrame);
    if (img) {
      drawImageCover(img);
    }
  }, [currentFrame, drawImageCover]);

  // Initial setup: load frame 0 immediately & kick off background loader
  useEffect(() => {
    updateCanvasDimensions();
    window.addEventListener('resize', updateCanvasDimensions, { passive: true });

    framePreloader.loadFrame(0).then((frame0) => {
      drawImageCover(frame0);
      lastDrawnFrameRef.current = 0;
      setInitialLoaded(true);
      if (onInitialReady) onInitialReady();

      // Start preloading upcoming window immediately
      framePreloader.preloadWindow(0, 40, 0);

      // Start background preloading for remaining frames
      framePreloader.startBackgroundPreload();
    });

    return () => {
      window.removeEventListener('resize', updateCanvasDimensions);
    };
  }, [updateCanvasDimensions, drawImageCover, onInitialReady]);

  // Render on currentFrame change
  useEffect(() => {
    const target = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(currentFrame)));
    if (target === lastDrawnFrameRef.current && initialLoaded) return;

    // Anticipate upcoming frames
    framePreloader.preloadWindow(target, 35, 15);

    const exactImg = framePreloader.getFrame(target);
    if (exactImg) {
      drawImageCover(exactImg);
      lastDrawnFrameRef.current = target;
    } else {
      // Graceful fallback to nearest cached frame
      const nearestImg = framePreloader.getNearestFrame(target);
      if (nearestImg) {
        drawImageCover(nearestImg);
      }
      // Load target frame and draw immediately when ready
      framePreloader.loadFrame(target).then((loaded) => {
        drawImageCover(loaded);
        lastDrawnFrameRef.current = target;
      }).catch(() => {});
    }
  }, [currentFrame, drawImageCover, initialLoaded]);

  return (
    <>
      <canvas ref={canvasRef} className="hero-canvas" />
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
    </>
  );
};
