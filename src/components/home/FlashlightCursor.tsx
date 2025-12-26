import { useRef, useEffect, useCallback } from "react";

interface FlashlightCursorProps {
  color?: string;
  size?: number;
}

export function FlashlightCursor({ 
  color = "rgba(239, 68, 68, 0.15)", 
  size = 300,
}: FlashlightCursorProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const flashlightRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  const updatePosition = useCallback(() => {
    if (flashlightRef.current) {
      flashlightRef.current.style.background = `radial-gradient(circle ${size}px at ${mousePos.current.x}px ${mousePos.current.y}px, ${color} 0%, transparent 70%)`;
    }
    rafId.current = requestAnimationFrame(updatePosition);
  }, [color, size]);

  useEffect(() => {
    containerRef.current = document.querySelector('[data-flashlight-section]');
    
    if (!containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current!.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseEnter = () => {
      if (flashlightRef.current) {
        flashlightRef.current.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      if (flashlightRef.current) {
        flashlightRef.current.style.opacity = '0';
      }
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);
    containerRef.current.addEventListener('mouseenter', handleMouseEnter);
    containerRef.current.addEventListener('mouseleave', handleMouseLeave);

    rafId.current = requestAnimationFrame(updatePosition);

    return () => {
      cancelAnimationFrame(rafId.current);
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
        containerRef.current.removeEventListener('mouseenter', handleMouseEnter);
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [updatePosition]);

  return (
    <div
      ref={flashlightRef}
      className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-150 opacity-0"
    />
  );
}