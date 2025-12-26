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
      
      const rect = containerRef.current.getBoundingClientRect();
      
      // Get the background image element to match its actual rendering
      const bgImg = containerRef.current.querySelector('img');
      if (!bgImg) return;
      
      const imgRect = bgImg.getBoundingClientRect();
      
      // Mouse position relative to the image
      const relX = mousePos.current.x - imgRect.left;
      const relY = mousePos.current.y - imgRect.top;
      
      // Calculate percentage position within the image
      const percentX = relX / imgRect.width;
      const percentY = relY / imgRect.height;
      
      // Background size is zoomLevel times the image size
      const bgWidth = imgRect.width * zoomLevel;
      const bgHeight = imgRect.height * zoomLevel;
      
      // Calculate offset to center the zoomed area in the cursor
      const offsetX = (percentX * bgWidth) - (cursorWidth / 2);
      const offsetY = (percentY * bgHeight) - (cursorHeight / 2);
      
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
