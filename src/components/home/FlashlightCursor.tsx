import { useRef, useEffect, useState } from "react";

interface FlashlightCursorProps {
  color?: string;
  size?: number;
  intensity?: number;
}

export function FlashlightCursor({ 
  color = "rgba(239, 68, 68, 0.15)", 
  size = 300,
  intensity = 0.8 
}: FlashlightCursorProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    containerRef.current = document.querySelector('[data-flashlight-section]');
    
    if (!containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current!.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    containerRef.current.addEventListener('mousemove', handleMouseMove);
    containerRef.current.addEventListener('mouseenter', handleMouseEnter);
    containerRef.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
        containerRef.current.removeEventListener('mouseenter', handleMouseEnter);
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 ${
        isHovering ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        background: `radial-gradient(circle ${size}px at ${mousePos.x}px ${mousePos.y}px, ${color} 0%, transparent 70%)`,
      }}
    />
  );
}
