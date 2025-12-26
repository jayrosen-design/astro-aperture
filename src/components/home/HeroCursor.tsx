import { useRef, useEffect, useState, useCallback } from "react";
import { Post } from "@/lib/graphql";

interface HeroCursorProps {
  images: Post[];
}

interface TrailImage {
  id: number;
  x: number;
  y: number;
  imageUrl: string;
  rotation: number;
}

export function HeroCursor({ images }: HeroCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const lastDropPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>();
  const [isHovering, setIsHovering] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trail, setTrail] = useState<TrailImage[]>([]);
  const trailIdRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  const DROP_DISTANCE = 120; // Minimum distance before dropping a new image
  const MAX_TRAIL = 15; // Maximum number of trail images
  const FADE_DELAY = 4000; // Time before images start fading

  const updateCursorPosition = useCallback(() => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${mousePos.current.x}px`;
      cursorRef.current.style.top = `${mousePos.current.y}px`;
    }
    rafId.current = requestAnimationFrame(updateCursorPosition);
  }, []);

  const dropImage = useCallback(() => {
    if (!images.length) return;
    
    const currentImage = images[currentIndex]?.featuredImage?.node?.sourceUrl;
    if (!currentImage) return;

    const newTrailImage: TrailImage = {
      id: trailIdRef.current++,
      x: mousePos.current.x,
      y: mousePos.current.y,
      imageUrl: currentImage,
      rotation: Math.random() * 20 - 10, // Random rotation between -10 and 10 degrees
    };

    setTrail((prev) => {
      const newTrail = [...prev, newTrailImage];
      // Remove oldest if exceeding max
      if (newTrail.length > MAX_TRAIL) {
        return newTrail.slice(-MAX_TRAIL);
      }
      return newTrail;
    });

    lastDropPos.current = { ...mousePos.current };
    
    // Cycle to next image
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images, currentIndex]);

  useEffect(() => {
    containerRef.current = document.querySelector('[data-hero-section]');
    
    if (!containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // Check distance from last drop
      const dx = mousePos.current.x - lastDropPos.current.x;
      const dy = mousePos.current.y - lastDropPos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance >= DROP_DISTANCE && isHovering) {
        dropImage();
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      setIsHovering(true);
      mousePos.current = { x: e.clientX, y: e.clientY };
      lastDropPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

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
  }, [updateCursorPosition, isHovering, dropImage]);

  // Auto-fade trail images after delay
  useEffect(() => {
    if (trail.length === 0) return;
    
    const timeout = setTimeout(() => {
      setTrail((prev) => prev.slice(1));
    }, FADE_DELAY);

    return () => clearTimeout(timeout);
  }, [trail]);

  // Clear trail when leaving hero
  useEffect(() => {
    if (!isHovering) {
      const timeout = setTimeout(() => {
        setTrail([]);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [isHovering]);

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
          
          @keyframes dropIn {
            0% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.5) rotate(var(--rotation));
            }
            100% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1) rotate(var(--rotation));
            }
          }
          
          @keyframes fadeOut {
            0% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }
          
          .trail-image {
            animation: dropIn 0.3s ease-out forwards;
          }
          
          .trail-image.fading {
            animation: fadeOut 1s ease-out forwards;
          }
        `}
      </style>

      {/* Trail images */}
      {trail.map((item, index) => (
        <div
          key={item.id}
          className="fixed pointer-events-none z-30 trail-image"
          style={{
            left: item.x,
            top: item.y,
            transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
            '--rotation': `${item.rotation}deg`,
            opacity: 0.9 - (index * 0.02),
          } as React.CSSProperties}
        >
          <div className="w-20 h-20 rounded-lg border-2 border-primary overflow-hidden shadow-lg shadow-primary/20 bg-background">
            <img
              src={item.imageUrl}
              alt="Trail preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ))}
      
      {/* Active cursor thumbnail */}
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-40 transition-opacity duration-200 ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-24 h-24 rounded-lg border-2 border-primary overflow-hidden shadow-lg shadow-primary/30 bg-background">
          {currentImage && (
            <img
              src={currentImage}
              alt="Gallery preview"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
    </>
  );
}
