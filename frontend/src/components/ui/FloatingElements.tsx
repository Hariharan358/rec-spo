import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FloatingElementProps {
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
  children?: React.ReactNode;
}

export const FloatingElement = ({
  className = '',
  delay = 0,
  duration = 6,
  distance = 20,
  children
}: FloatingElementProps) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-distance, distance, -distance],
        rotate: [-2, 2, -2],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};

interface ParticleSystemProps {
  count?: number;
  className?: string;
}

export const ParticleSystem = ({ count = 20, className = '' }: ParticleSystemProps) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 2
    }));
    setParticles(newParticles);
  }, [count]);

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-secondary/30 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

interface AnimatedBackgroundProps {
  className?: string;
  variant?: 'gradient' | 'mesh' | 'dots' | 'lines';
}

export const AnimatedBackground = ({ 
  className = '', 
  variant = 'gradient' 
}: AnimatedBackgroundProps) => {
  const getBackgroundStyle = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-to-br from-violet/5 via-secondary/5 to-violet/5';
      case 'mesh':
        return 'bg-gradient-to-br from-violet/10 via-transparent to-secondary/10';
      case 'dots':
        return 'bg-dot-pattern opacity-20';
      case 'lines':
        return 'bg-line-pattern opacity-10';
      default:
        return 'bg-gradient-to-br from-violet/5 via-secondary/5 to-violet/5';
    }
  };

  return (
    <motion.div
      className={`absolute inset-0 ${getBackgroundStyle()} ${className}`}
      animate={{
        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
};

interface MorphingShapeProps {
  className?: string;
  size?: number;
  color?: string;
}

export const MorphingShape = ({ 
  className = '', 
  size = 100, 
  color = 'hsl(270 70% 60%)' 
}: MorphingShapeProps) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(45deg, ${color}/20, ${color}/40)`,
        filter: 'blur(1px)',
      }}
      animate={{
        borderRadius: [
          '60% 40% 30% 70% / 60% 30% 70% 40%',
          '30% 60% 70% 40% / 50% 60% 30% 60%',
          '60% 40% 30% 70% / 60% 30% 70% 40%'
        ],
        rotate: [0, 180, 360],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

interface GlowOrbProps {
  className?: string;
  size?: number;
  color?: string;
  intensity?: number;
}

export const GlowOrb = ({ 
  className = '', 
  size = 200, 
  color = 'hsl(270 70% 60%)', 
  intensity = 0.3 
}: GlowOrbProps) => {
  return (
    <motion.div
      className={`absolute rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}/${intensity} 0%, transparent 70%)`,
        filter: 'blur(40px)',
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [intensity, intensity * 1.5, intensity],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};