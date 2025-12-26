import { useRef, useEffect, useState, useCallback } from "react";

interface HeroCursorProps {
  backgroundImage: string;
  zoomLevel?: number;
}

export function HeroCursor({ backgroundImage, zoomLevel = 2.5 }: HeroCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>();
  const [isHovering, setIsHovering] = useState(false);

  const cursorWidth = 240;
  const cursorHeight = 120;

  const updateCursorPosition = useCallback(() => {
    if (cursorRef.current && containerRef.current) {
      cursorRef.current.style.left = `${mousePos.current.x}px`;
      cursorRef.current.style.top = `${mousePos.current.y}px`;
      
      // Calculate the background position to show zoomed area under cursor
      const rect = containerRef.current.getBoundingClientRect();
      
      // Mouse position relative to hero section
      const relX = mousePos.current.x - rect.left;
      const relY = mousePos.current.y - rect.top;
      
      // Background size is zoomLevel times the container size
      const bgWidth = rect.width * zoomLevel;
      const bgHeight = rect.height * zoomLevel;
      
      // Calculate offset to center the zoomed area in the cursor
      const offsetX = (relX * zoomLevel) - (cursorWidth / 2);
      const offsetY = (relY * zoomLevel) - (cursorHeight / 2);
      
      cursorRef.current.style.backgroundSize = `${bgWidth}px ${bgHeight}px`;
      cursorRef.current.style.backgroundPosition = `-${offsetX}px -${offsetY}px`;
    }
    rafId.current = requestAnimationFrame(updateCursorPosition);
  }, [zoomLevel]);

  useEffect(() => {
    containerRef.current = document.querySelector('[data-hero-section]');
    
    if (!containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
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
          width: `${cursorWidth}px`,
          height: `${cursorHeight}px`,
          borderRadius: '12px',
          border: '2px solid hsl(var(--primary))',
          boxShadow: '0 0 20px hsl(var(--primary) / 0.4)',
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: 'no-repeat',
        }}
      />
    </>
  );
}
