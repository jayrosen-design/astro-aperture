import { useRef, useEffect, useState, useCallback } from "react";
import viewfinderOverlay from "@/assets/viewfinder-white.png";

interface HeroCursorProps {
  backgroundImage: string;
  zoomLevel?: number;
}

export function HeroCursor({ backgroundImage, zoomLevel = 3 }: HeroCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>();
  const [isHovering, setIsHovering] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  const cursorWidth = 246;
  const cursorHeight = 153;

  const updateCursorPosition = useCallback(() => {
    if (cursorRef.current && containerRef.current) {
      cursorRef.current.style.left = `${mousePos.current.x}px`;
      cursorRef.current.style.top = `${mousePos.current.y}px`;
      
      const bgImg = containerRef.current.querySelector('img') as HTMLImageElement;
      if (!bgImg) return;
      
      const imgRect = bgImg.getBoundingClientRect();
      const naturalWidth = bgImg.naturalWidth;
      const naturalHeight = bgImg.naturalHeight;
      
      // Calculate how object-cover scales and positions the image
      const containerAspect = imgRect.width / imgRect.height;
      const imageAspect = naturalWidth / naturalHeight;
      
      let scale: number;
      let offsetX = 0;
      let offsetY = 0;
      
      if (containerAspect > imageAspect) {
        // Container is wider - image is scaled by width, cropped vertically
        scale = imgRect.width / naturalWidth;
        offsetY = (imgRect.height - naturalHeight * scale) / 2;
      } else {
        // Container is taller - image is scaled by height, cropped horizontally
        scale = imgRect.height / naturalHeight;
        offsetX = (imgRect.width - naturalWidth * scale) / 2;
      }
      
      // Mouse position relative to the container
      const relX = mousePos.current.x - imgRect.left;
      const relY = mousePos.current.y - imgRect.top;
      
      // Convert to position in the original image coordinates
      const imgX = (relX - offsetX) / scale;
      const imgY = (relY - offsetY) / scale;
      
      // For the cursor background, we show the image at zoomLevel scale
      const bgWidth = naturalWidth * zoomLevel;
      const bgHeight = naturalHeight * zoomLevel;
      
      // Position the background so the correct spot is centered in the cursor
      const bgPosX = (imgX * zoomLevel) - (cursorWidth / 2);
      const bgPosY = (imgY * zoomLevel) - (cursorHeight / 2);
      
      cursorRef.current.style.backgroundSize = `${bgWidth}px ${bgHeight}px`;
      cursorRef.current.style.backgroundPosition = `-${bgPosX}px -${bgPosY}px`;
    }
    rafId.current = requestAnimationFrame(updateCursorPosition);
  }, [zoomLevel]);

  useEffect(() => {
    containerRef.current = document.querySelector('[data-hero-section]');
    
    if (!containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isOverInteractive = target.closest('button, a, [role="button"]');
      setIsHovering(!isOverInteractive);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isOverInteractive = target.closest('button, a, [role="button"]');
      setIsHovering(!isOverInteractive);
    };
    
    const handleMouseLeave = () => setIsHovering(false);

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isOverInteractive = target.closest('button, a, [role="button"]');
      if (!isOverInteractive) {
        setIsCapturing(true);
        setTimeout(() => setIsCapturing(false), 200);
      }
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);
    containerRef.current.addEventListener('mouseenter', handleMouseEnter);
    containerRef.current.addEventListener('mouseleave', handleMouseLeave);
    containerRef.current.addEventListener('click', handleClick);

    rafId.current = requestAnimationFrame(updateCursorPosition);

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
        containerRef.current.removeEventListener('mouseenter', handleMouseEnter);
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
        containerRef.current.removeEventListener('click', handleClick);
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
          [data-hero-section] button:hover,
          [data-hero-section] a:hover,
          [data-hero-section] [role="button"]:hover {
            cursor: pointer;
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
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Viewfinder overlay */}
        <img 
          src={viewfinderOverlay} 
          alt="" 
          className={`absolute inset-0 w-full h-full object-contain pointer-events-none transition-all duration-100 ${
            isCapturing ? 'brightness-100 saturate-100' : ''
          }`}
          style={{
            filter: isCapturing ? 'brightness(1) saturate(1) sepia(1) hue-rotate(-50deg) saturate(6)' : undefined
          }}
        />
      </div>
    </>
  );
}
