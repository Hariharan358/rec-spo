import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect, useRef, createContext, useContext } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Context for sharing Lenis instance
const LenisContext = createContext<any>(null);

export const useSmoothScroll = () => useContext(LenisContext);

interface SmoothScrollProps {
    children: React.ReactNode;
}

export const SmoothScroll = ({ children }: SmoothScrollProps) => {
    const lenisRef = useRef<any>(null);

    // Sync Lenis with GSAP ScrollTrigger
    useLenis((lenis) => {
        lenisRef.current = lenis;
    });

    useEffect(() => {
        // Connect Lenis scroll to GSAP's ScrollTrigger
        const update = (time: number) => {
            lenisRef.current?.raf(time * 1000);
        };

        gsap.ticker.add(update);

        // Update ScrollTrigger on Lenis scroll
        const handleScroll = () => {
            ScrollTrigger.update();
        };

        if (lenisRef.current) {
            lenisRef.current.on('scroll', handleScroll);
        }

        return () => {
            gsap.ticker.remove(update);
            if (lenisRef.current) {
                lenisRef.current.off('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <ReactLenis
            root
            options={{
                duration: 1.2,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: 'vertical',
                gestureOrientation: 'vertical',
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 2,
                infinite: false,
            }}
        >
            {children}
        </ReactLenis>
    );
};

export default SmoothScroll;
