import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  offset?: number;
}

export const Parallax = ({ 
  children, 
  speed = 0.5, 
  className = '', 
  direction = 'up',
  offset = 0 
}: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const getTransform = () => {
    switch (direction) {
      case 'up':
        return useTransform(scrollYProgress, [0, 1], [offset, -100 * speed]);
      case 'down':
        return useTransform(scrollYProgress, [0, 1], [offset, 100 * speed]);
      case 'left':
        return useTransform(scrollYProgress, [0, 1], [offset, -100 * speed]);
      case 'right':
        return useTransform(scrollYProgress, [0, 1], [offset, 100 * speed]);
      default:
        return useTransform(scrollYProgress, [0, 1], [offset, -100 * speed]);
    }
  };

  const transform = getTransform();

  const getMotionStyle = () => {
    if (direction === 'left' || direction === 'right') {
      return { x: transform };
    }
    return { y: transform };
  };

  return (
    <div ref={ref} className={className}>
      <motion.div style={getMotionStyle()}>
        {children}
      </motion.div>
    </div>
  );
};

interface ParallaxBackgroundProps {
  children: React.ReactNode;
  backgroundImage?: string;
  speed?: number;
  className?: string;
  overlay?: boolean;
  overlayOpacity?: number;
}

export const ParallaxBackground = ({
  children,
  backgroundImage,
  speed = 0.5,
  className = '',
  overlay = true,
  overlayOpacity = 0.6
}: ParallaxBackgroundProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {backgroundImage && (
        <motion.div
          style={{ y }}
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
        >
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          {overlay && (
            <div 
              className="absolute inset-0 bg-black"
              style={{ opacity: overlayOpacity }}
            />
          )}
        </motion.div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

interface ParallaxElementProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  rotate?: boolean;
  scale?: boolean;
}

export const ParallaxElement = ({
  children,
  speed = 0.3,
  className = '',
  rotate = false,
  scale = false
}: ParallaxElementProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);
  const rotateValue = rotate ? useTransform(scrollYProgress, [0, 1], [0, 360]) : 0;
  const scaleValue = scale ? useTransform(scrollYProgress, [0, 1], [1, 1.2]) : 1;

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{
          y,
          rotate: rotateValue,
          scale: scaleValue
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Hook for scroll-based animations
export const useParallaxScroll = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
};

// Parallax text reveal component
interface ParallaxTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const ParallaxText = ({ children, className = '', delay = 0 }: ParallaxTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start 0.2"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{ opacity, y }}
        transition={{ delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};