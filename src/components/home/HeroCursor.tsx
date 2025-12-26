import { useRef, useEffect, useState, useCallback } from "react";
import { Post } from "@/lib/graphql";

interface HeroCursorProps {
  images: Post[];
}

export function HeroCursor({ images }: HeroCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>();
  const [isHovering, setIsHovering] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  const updateCursorPosition = useCallback(() => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${mousePos.current.x}px`;
      cursorRef.current.style.top = `${mousePos.current.y}px`;
    }
    rafId.current = requestAnimationFrame(updateCursorPosition);
  }, []);

  useEffect(() => {
    // Find the hero section container
    containerRef.current = document.querySelector('[data-hero-section]');
    
    if (!containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);
    containerRef.current.addEventListener('mouseenter', handleMouseEnter);
    containerRef.current.addEventListener('mouseleave', handleMouseLeave);

    // Start the animation loop
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

  // Image cycling interval
  useEffect(() => {
    if (isHovering && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 1000);
    } else {
      setCurrentIndex(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovering, images.length]);

  if (!images.length) return null;

  const currentImage = images[currentIndex]?.featuredImage?.node?.sourceUrl;

  return (
    <>
      {/* Apply cursor-none to hero when hovering */}
      <style>
        {`
          [data-hero-section]:hover {
            cursor: none;
          }
        `}
      </style>
      
      {/* Custom cursor thumbnail */}
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-40 transition-opacity duration-200 ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-24 h-24 rounded-lg border-2 border-primary overflow-hidden shadow-lg shadow-primary/30">
          {currentImage && (
            <img
              src={currentImage}
              alt="Gallery preview"
              className="w-full h-full object-cover transition-opacity duration-300"
              key={currentIndex}
            />
          )}
        </div>
      </div>
    </>
  );
}
