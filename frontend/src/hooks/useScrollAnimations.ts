import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook to add scroll-triggered animations to elements.
 * Uses GSAP ScrollTrigger for performant, scroll-linked animations.
 */

// Fade-up animation triggered on scroll
export const useScrollFadeUp = (options?: {
    delay?: number;
    duration?: number;
    y?: number;
    stagger?: number;
}) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const ctx = gsap.context(() => {
            gsap.from(ref.current, {
                y: options?.y || 80,
                opacity: 0,
                duration: options?.duration || 1,
                delay: options?.delay || 0,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: ref.current,
                    start: 'top 85%',
                    end: 'top 25%',
                    toggleActions: 'play none none reverse',
                },
            });
        }, ref);

        return () => ctx.revert();
    }, [options?.delay, options?.duration, options?.y]);

    return ref;
};

// Scale-in animation on scroll
export const useScrollScaleIn = (options?: {
    delay?: number;
    duration?: number;
    scale?: number;
}) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const ctx = gsap.context(() => {
            gsap.from(ref.current, {
                scale: options?.scale || 0.8,
                opacity: 0,
                duration: options?.duration || 1,
                delay: options?.delay || 0,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: ref.current,
                    start: 'top 85%',
                    end: 'top 30%',
                    toggleActions: 'play none none reverse',
                },
            });
        }, ref);

        return () => ctx.revert();
    }, [options?.delay, options?.duration, options?.scale]);

    return ref;
};

// Horizontal slide animation
export const useScrollSlideIn = (options?: {
    direction?: 'left' | 'right';
    delay?: number;
    duration?: number;
    distance?: number;
}) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;
        const dir = options?.direction === 'right' ? 1 : -1;

        const ctx = gsap.context(() => {
            gsap.from(ref.current, {
                x: (options?.distance || 100) * dir,
                opacity: 0,
                duration: options?.duration || 1,
                delay: options?.delay || 0,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: ref.current,
                    start: 'top 85%',
                    end: 'top 30%',
                    toggleActions: 'play none none reverse',
                },
            });
        }, ref);

        return () => ctx.revert();
    }, [options?.direction, options?.delay, options?.duration, options?.distance]);

    return ref;
};

// Parallax-on-scroll effect for backgrounds & decorative elements
export const useScrollParallax = (speed: number = 0.5) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const ctx = gsap.context(() => {
            gsap.to(ref.current, {
                y: () => speed * 200,
                ease: 'none',
                scrollTrigger: {
                    trigger: ref.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }, ref);

        return () => ctx.revert();
    }, [speed]);

    return ref;
};

// Stagger children animation on scroll  
export const useScrollStagger = (options?: {
    stagger?: number;
    y?: number;
    duration?: number;
    childSelector?: string;
}) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;
        const children = ref.current.querySelectorAll(options?.childSelector || ':scope > *');

        const ctx = gsap.context(() => {
            gsap.from(children, {
                y: options?.y || 60,
                opacity: 0,
                duration: options?.duration || 0.8,
                stagger: options?.stagger || 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: ref.current,
                    start: 'top 80%',
                    end: 'top 20%',
                    toggleActions: 'play none none reverse',
                },
            });
        }, ref);

        return () => ctx.revert();
    }, [options?.stagger, options?.y, options?.duration, options?.childSelector]);

    return ref;
};

// Rotate in from angle on scroll
export const useScrollRotateIn = (options?: {
    rotation?: number;
    delay?: number;
    duration?: number;
}) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const ctx = gsap.context(() => {
            gsap.from(ref.current, {
                rotation: options?.rotation || 10,
                opacity: 0,
                y: 50,
                duration: options?.duration || 1,
                delay: options?.delay || 0,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: ref.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                },
            });
        }, ref);

        return () => ctx.revert();
    }, [options?.rotation, options?.delay, options?.duration]);

    return ref;
};

// Text reveal - line by line with clip-path
export const useScrollTextReveal = () => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const ctx = gsap.context(() => {
            gsap.from(ref.current, {
                clipPath: 'inset(100% 0% 0% 0%)',
                opacity: 0,
                y: 30,
                duration: 1.2,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: ref.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                },
            });
        }, ref);

        return () => ctx.revert();
    }, []);

    return ref;
};

// Progress-linked scroll animation (for scroll indicators, progress bars, etc.)
export const useScrollProgress = () => {
    const ref = useRef<HTMLDivElement>(null);
    const progressRef = useRef(0);

    useEffect(() => {
        if (!ref.current) return;

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: ref.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
                onUpdate: (self) => {
                    progressRef.current = self.progress;
                    if (ref.current) {
                        ref.current.style.setProperty('--scroll-progress', `${self.progress}`);
                    }
                },
            });
        }, ref);

        return () => ctx.revert();
    }, []);

    return { ref, progress: progressRef };
};

// Magnetic effect on hover
export const useMagneticEffect = (strength: number = 0.3) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;
        const el = ref.current;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(el, {
                x: x * strength,
                y: y * strength,
                duration: 0.4,
                ease: 'power2.out',
            });
        };

        const handleMouseLeave = () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: 'elastic.out(1, 0.3)',
            });
        };

        el.addEventListener('mousemove', handleMouseMove);
        el.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            el.removeEventListener('mousemove', handleMouseMove);
            el.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [strength]);

    return ref;
};
