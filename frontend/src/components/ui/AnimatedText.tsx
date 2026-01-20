import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  type?: 'typewriter' | 'fade-in' | 'slide-up' | 'scale-in' | 'flip-in';
  staggerDelay?: number;
}

export const AnimatedText = ({ 
  text, 
  className = '', 
  delay = 0, 
  duration = 0.8,
  type = 'fade-in',
  staggerDelay = 0.05
}: AnimatedTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (type === 'typewriter') {
      const timer = setTimeout(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }
      }, delay + currentIndex * 50);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, delay, type]);

  if (type === 'typewriter') {
    return (
      <span className={`${className} inline-block`}>
        {displayText}
        <span className="animate-pulse">|</span>
      </span>
    );
  }

  const getVariants = () => {
    switch (type) {
      case 'fade-in':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
      case 'slide-up':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        };
      case 'scale-in':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 }
        };
      case 'flip-in':
        return {
          hidden: { opacity: 0, rotateX: -90 },
          visible: { opacity: 1, rotateX: 0 }
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
    }
  };

  const variants = getVariants();

  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay
          }
        }
      }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          variants={variants}
          transition={{ duration }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

interface AnimatedHeadingProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  type?: 'slide-up' | 'fade-in' | 'scale-in' | 'flip-in';
}

export const AnimatedHeading = ({ 
  children, 
  className = '', 
  delay = 0,
  type = 'slide-up'
}: AnimatedHeadingProps) => {
  const getVariants = () => {
    switch (type) {
      case 'slide-up':
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 }
        };
      case 'fade-in':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
      case 'scale-in':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 }
        };
      case 'flip-in':
        return {
          hidden: { opacity: 0, rotateX: -90 },
          visible: { opacity: 1, rotateX: 0 }
        };
      default:
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 }
        };
    }
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={getVariants()}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  );
};

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  delay?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export const AnimatedCounter = ({ 
  end, 
  duration = 2, 
  delay = 0, 
  className = '',
  suffix = '',
  prefix = ''
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;

    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (endTime - startTime), 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(updateCount);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [end, duration, delay, hasStarted]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => setHasStarted(true)}
      transition={{ duration: 0.5, delay }}
    >
      {prefix}{count}{suffix}
    </motion.span>
  );
};