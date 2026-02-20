import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimatedSectionProps {
    children: React.ReactNode;
    className?: string;
    animation?: 'fade-up' | 'fade-left' | 'fade-right' | 'scale' | 'blur' | 'clip-reveal';
    delay?: number;
    duration?: number;
    scrub?: boolean;
}

/**
 * A wrapper component that animates its children on scroll using GSAP ScrollTrigger.
 * Works seamlessly with Lenis smooth scrolling.
 */
export const ScrollAnimatedSection = ({
    children,
    className = '',
    animation = 'fade-up',
    delay = 0,
    duration = 1,
    scrub = false,
}: ScrollAnimatedSectionProps) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const el = ref.current;
        let animationConfig: gsap.TweenVars = {};

        switch (animation) {
            case 'fade-up':
                animationConfig = { y: 80, opacity: 0 };
                break;
            case 'fade-left':
                animationConfig = { x: -100, opacity: 0 };
                break;
            case 'fade-right':
                animationConfig = { x: 100, opacity: 0 };
                break;
            case 'scale':
                animationConfig = { scale: 0.85, opacity: 0 };
                break;
            case 'blur':
                animationConfig = { opacity: 0, filter: 'blur(20px)' };
                break;
            case 'clip-reveal':
                animationConfig = { clipPath: 'inset(0 0 100% 0)', opacity: 0 };
                break;
        }

        const ctx = gsap.context(() => {
            gsap.from(el, {
                ...animationConfig,
                duration,
                delay,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    end: 'top 20%',
                    toggleActions: scrub ? undefined : 'play none none none',
                    scrub: scrub ? 1 : false,
                },
            });
        }, ref);

        return () => ctx.revert();
    }, [animation, delay, duration, scrub]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
};

/**
 * A horizontal scroll section that transforms vertical scroll into horizontal movement.
 * Uses GSAP ScrollTrigger pin + scrub for the effect.
 */
interface HorizontalScrollProps {
    children: React.ReactNode;
    className?: string;
}

export const HorizontalScrollSection = ({ children, className = '' }: HorizontalScrollProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !scrollRef.current) return;

        const ctx = gsap.context(() => {
            const scrollWidth = scrollRef.current!.scrollWidth - window.innerWidth;

            gsap.to(scrollRef.current, {
                x: -scrollWidth,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: () => `+=${scrollWidth}`,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className={`overflow-hidden ${className}`}>
            <div ref={scrollRef} className="flex h-screen items-center">
                {children}
            </div>
        </div>
    );
};

/**
 * Scroll-linked progress indicator for sections
 */
interface SectionProgressProps {
    children: React.ReactNode;
    className?: string;
    barColor?: string;
}

export const SectionWithProgress = ({ children, className = '', barColor }: SectionProgressProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current || !barRef.current) return;

        const ctx = gsap.context(() => {
            gsap.to(barRef.current, {
                scaleX: 1,
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
    }, []);

    return (
        <div ref={ref} className={`relative ${className}`}>
            <div
                ref={barRef}
                className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left"
                style={{
                    transform: 'scaleX(0)',
                    background: barColor || 'linear-gradient(90deg, hsl(270 70% 60%), hsl(270 80% 70%))',
                }}
            />
            {children}
        </div>
    );
};

export default ScrollAnimatedSection;
