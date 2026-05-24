import { cn } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'> & {
  isDark?: boolean;
};

export function DottedSurface({ className, isDark = true, ...props }: DottedSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const AMOUNTX = 40;
    const AMOUNTY = 60;
    const SEPARATION = 150;
    // Mirror the Three.js camera: position (0, 355, 1220), FOV 60°, looks toward -Z
    const CAM_Y = 355;
    const CAM_Z = 1220;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;';
    containerRef.current.appendChild(canvas);
    const ctx = canvas.getContext('2d')!;

    let w = 0, h = 0, dpr = 1, focalLen = 0;
    let animId = 0;
    let count = 0;

    function resize() {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      w = rect.width  || window.innerWidth;
      h = rect.height || window.innerHeight;
      dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width  = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      // focal length from FOV = 60°  →  fLen = (h/2) / tan(30°)
      focalLen = (h / 2) / Math.tan(Math.PI / 6);
    }

    const colorDark  = '200,200,200';
    const colorLight = '15,22,35';

    function draw() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const color = isDark ? colorDark : colorLight;
      const maxOpacity = isDark ? 0.7 : 0.55;

      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const wx = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
          const wy = Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50;
          const wz = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

          // Depth from camera (camera looks at -Z from Z = CAM_Z)
          const dz = CAM_Z - wz;
          if (dz <= 10) continue;

          const scale = focalLen / dz;
          const px = w / 2 + wx * scale;
          const py = h / 2 + (wy - CAM_Y) * scale;

          if (px < -8 || px > w + 8 || py < -8 || py > h + 8) continue;

          // Fade distant dots gently
          const depthFade = Math.min(1, dz / (CAM_Z * 1.8));
          const opacity = maxOpacity * (1 - depthFade * 0.65);

          const r = Math.max(0.4, 3.5 * scale);
          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color},${opacity.toFixed(3)})`;
          ctx.fill();
        }
      }

      count += 0.1;
    }

    function animate() {
      animId = requestAnimationFrame(animate);
      draw();
    }

    resize();
    animate();

    const ro = new ResizeObserver(resize);
    ro.observe(containerRef.current);
    window.addEventListener('resize', resize, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener('resize', resize);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      className={cn('pointer-events-none relative overflow-hidden', className)}
      {...props}
    />
  );
}

export default DottedSurface;
