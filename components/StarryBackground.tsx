import React, { useEffect, useRef, useState } from 'react';

const StarryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Determine if we're on mobile
    const isMobile = window.innerWidth < 768;

    // Star properties
    const stars: {
      x: number;
      y: number;
      radius: number;
      color: string;
      velocity: number;
      alpha: number;
      alphaChange: number;
    }[] = [];

    // Shooting star properties
    const shootingStars: {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      decay: number;
      active: boolean;
    }[] = [];

    // Nebula properties
    const nebulae: {
      x: number;
      y: number;
      radius: number;
      color: string;
      alpha: number;
    }[] = [];

    // Create stars
    const createStars = () => {
      // Clear existing stars first
      stars.length = 0;
      
      // Reduce star count on mobile for better performance
      const density = isMobile ? 3500 : 2500;
      const starCount = Math.floor(canvas.width * canvas.height / density);
      
      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * (isMobile ? 1.2 : 1.5) + 0.5;
        const alpha = Math.random();
        const alphaChange = Math.random() * 0.01 - 0.005;
        
        // Different star colors
        const colors = ['#ffffff', '#eeeeee', '#92A8D1', '#B3C5E5', '#d8e1f3', '#ffcccb'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        const velocity = Math.random() * 0.05 + 0.01;
        
        stars.push({ x, y, radius, color, velocity, alpha, alphaChange });
      }
    };

    // Create nebulae (distant galaxy clouds)
    const createNebulae = () => {
      // Clear existing nebulae first
      nebulae.length = 0;
      
      // Fewer nebulae on mobile
      const nebulaCount = isMobile ? 3 : 5;
      
      for (let i = 0; i < nebulaCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * (isMobile ? 100 : 150) + 50;
        
        // Nebula colors - soft pastel colors
        const colors = ['rgba(146, 168, 209, 0.05)', 'rgba(179, 197, 229, 0.05)', 'rgba(216, 225, 243, 0.05)'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        const alpha = Math.random() * 0.1 + 0.05;
        
        nebulae.push({ x, y, radius, color, alpha });
      }
    };

    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Recreate stars and nebulae when resizing
      createStars();
      createNebulae();
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);

    // Create a shooting star
    const createShootingStar = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * (canvas.height / 2); // Start in upper half
      const length = Math.random() * 80 + 50;
      const speed = Math.random() * 10 + 5;
      const angle = Math.PI / 4 + Math.random() * Math.PI / 4; // Angle between PI/4 and PI/2
      const opacity = 1;
      const decay = 0.02;
      
      shootingStars.push({ x, y, length, speed, angle, opacity, decay, active: true });
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw nebulae (background galaxy clouds)
      nebulae.forEach(nebula => {
        const gradient = ctx.createRadialGradient(
          nebula.x, nebula.y, 0,
          nebula.x, nebula.y, nebula.radius
        );
        
        gradient.addColorStop(0, nebula.color.replace('0.05', '0.1'));
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.globalAlpha = nebula.alpha;
        ctx.fill();
      });
      
      // Draw and update stars
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.fill();
        
        // Update star alpha (twinkling effect)
        star.alpha += star.alphaChange;
        
        // Change direction of alpha change when limits are reached
        if (star.alpha <= 0.1 || star.alpha >= 1) {
          star.alphaChange = -star.alphaChange;
        }
        
        // Slow movement upward for some stars
        star.y -= star.velocity;
        
        // Reset star position if it goes off screen
        if (star.y < -10) {
          star.y = canvas.height + 10;
          star.x = Math.random() * canvas.width;
        }
      });
      
      // Draw and update shooting stars - limit on mobile for performance
      if (!isMobile || shootingStars.length < 2) {
        shootingStars.forEach(star => {
          if (!star.active) return;
          
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          
          const tailX = star.x - Math.cos(star.angle) * star.length;
          const tailY = star.y - Math.sin(star.angle) * star.length;
          
          ctx.lineTo(tailX, tailY);
          
          const gradient = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
          gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
          gradient.addColorStop(1, 'transparent');
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.globalAlpha = 1;
          ctx.stroke();
          
          // Update shooting star position
          star.x += Math.cos(star.angle) * star.speed;
          star.y += Math.sin(star.angle) * star.speed;
          
          // Fade out
          star.opacity -= star.decay;
          
          // Remove if faded out or off screen
          if (star.opacity <= 0 || star.x > canvas.width || star.y > canvas.height) {
            star.active = false;
          }
        });
      }
      
      // Clean up inactive shooting stars
      const activeShootingStars = shootingStars.filter(star => star.active);
      
      // Randomly create new shooting stars - less frequent on mobile
      const shootingStarChance = isMobile ? 0.002 : 0.005;
      const maxShootingStars = isMobile ? 1 : 3;
      
      if (Math.random() < shootingStarChance && activeShootingStars.length < maxShootingStars) {
        createShootingStar();
      }
      
      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    };

    createStars();
    createNebulae();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMounted]);

  // Only render the canvas on the client side
  if (!isMounted) {
    return null;
  }

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ backgroundColor: 'black' }}
    />
  );
};

export default StarryBackground; 