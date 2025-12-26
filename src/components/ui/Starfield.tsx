import { useEffect, useRef, useCallback } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  speed: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);
  const dimensionsRef = useRef({ width: 0, height: 0 });

  const initStars = useCallback((width: number, height: number) => {
    const starCount = Math.floor(400 + Math.random() * 400); // 400-800 stars
    const stars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      const baseOpacity = 0.2 + Math.random() * 0.8;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 0.5 + Math.random() * 2,
        opacity: baseOpacity,
        baseOpacity,
        speed: 0.1 + Math.random() * 0.3,
        twinkleSpeed: 0.5 + Math.random() * 2,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    starsRef.current = stars;
  }, []);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const { width, height } = parent.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    dimensionsRef.current = { width, height };

    // Reinitialize stars if dimensions changed significantly
    if (starsRef.current.length === 0) {
      initStars(width, height);
    } else {
      // Redistribute stars across new dimensions
      starsRef.current.forEach((star) => {
        star.x = (star.x / dimensionsRef.current.width) * width || Math.random() * width;
        star.y = (star.y / dimensionsRef.current.height) * height || Math.random() * height;
      });
    }
  }, [initStars]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Normalize mouse position relative to center (-1 to 1)
    mouseRef.current = {
      x: (e.clientX - rect.left - centerX) / centerX,
      y: (e.clientY - rect.top - centerY) / centerY,
    };
  }, []);

  const animate = useCallback((time: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    const { width, height } = dimensionsRef.current;
    const mouse = mouseRef.current;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Parallax offset based on mouse position
    const parallaxStrength = 20;
    const offsetX = -mouse.x * parallaxStrength;
    const offsetY = -mouse.y * parallaxStrength;

    // Update and draw stars
    starsRef.current.forEach((star) => {
      // Drift upward
      star.y -= star.speed;

      // Wrap around when star goes off top
      if (star.y < -10) {
        star.y = height + 10;
        star.x = Math.random() * width;
      }

      // Twinkle effect
      star.twinklePhase += star.twinkleSpeed * 0.01;
      star.opacity = star.baseOpacity * (0.7 + 0.3 * Math.sin(star.twinklePhase));

      // Calculate parallax position (stars at different "depths" based on size)
      const depthFactor = star.size / 2.5;
      const drawX = star.x + offsetX * depthFactor;
      const drawY = star.y + offsetY * depthFactor;

      // Draw star
      ctx.beginPath();
      ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.fill();
    });

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    handleResize();
    
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [handleResize, handleMouseMove, animate]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ background: "transparent" }}
    />
  );
}
