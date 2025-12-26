import { useRef, useEffect, useState, useCallback } from "react";

interface HeroCursorProps {
  backgroundImage: string;
  zoomLevel?: number;
}

export function HeroCursor({ backgroundImage, zoomLevel = 2.5 }: HeroCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const bgPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>();
  const [isHovering, setIsHovering] = useState(false);

  const updateCursorPosition = useCallback(() => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${mousePos.current.x}px`;
      cursorRef.current.style.top = `${mousePos.current.y}px`;
      
      // Update background position for magnifying effect
      cursorRef.current.style.backgroundPosition = `${bgPos.current.x}% ${bgPos.current.y}%`;
    }
    rafId.current = requestAnimationFrame(updateCursorPosition);
  }, []);

  useEffect(() => {
    containerRef.current = document.querySelector('[data-hero-section]');
    
    if (!containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // Calculate position relative to the hero section for background positioning
      const rect = containerRef.current!.getBoundingClientRect();
      const relativeX = (e.clientX - rect.left) / rect.width;
      const relativeY = (e.clientY - rect.top) / rect.height;
      
      bgPos.current = {
        x: relativeX * 100,
        y: relativeY * 100
      };
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    containerRef.current.addEventListener('mousemove', handleMouseMove);
    containerRef.current.addEventListener('mouseenter', handleMouseEnter);
    containerRef.current.addEventListener('mouseleave', handleMouseLeave);

    rafId.current = requestAnimationFrame(updateCursorPosition);

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
        containerRef.current.removeEventListener('mouseenter', handleMouseEnter);
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [updateCursorPosition]);

  return (
    <>
      <style>
        {`
          [data-hero-section]:hover {
            cursor: none;
          }
        `}
      </style>
      
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-40 transition-opacity duration-200 ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: 'translate(-50%, -50%)',
          width: '120px',
          height: '120px',
          borderRadius: '12px',
          border: '2px solid hsl(var(--primary))',
          boxShadow: '0 0 20px hsl(var(--primary) / 0.4)',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: `${zoomLevel * 100}%`,
          backgroundRepeat: 'no-repeat',
        }}
      />
    </>
  );
}
