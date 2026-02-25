import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GridScan } from "@/component/GridScan";

export const IntroSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Phase 1: 0-0.3 = Text visible, slight zoom begins
    // Phase 2: 0.3-0.7 = Zoom into "S" letter
    // Phase 3: 0.7-1.0 = S fills screen, white wash to content

    // Overall scale of the text group (zooms into S)
    const textScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 1.2, 25, 80]);

    // Move the text so the S is centered as we zoom
    const textX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ["0%", "0%", "-15%", "-15%"]);
    const textY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ["0%", "0%", "10%", "10%"]);

    // Opacity of the entire intro sticky wrapper (hides after white wash)
    const introOpacity = useTransform(scrollYProgress, [0.88, 0.98], [1, 0]);

    // White overlay that washes in during zoom
    const whiteOverlayOpacity = useTransform(scrollYProgress, [0.55, 0.85], [0, 1]);

    // Scanlines opacity
    const scanlinesOpacity = useTransform(scrollYProgress, [0, 0.5], [0.06, 0]);

    // Subtitle opacity - fades before zoom
    const subtitleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

    // Glow effect on S as we zoom
    const sGlow = useTransform(scrollYProgress, [0.2, 0.5, 0.7], [0, 30, 0]);

    // Letter spacing animation
    const letterSpacing = useTransform(scrollYProgress, [0, 0.2], [0.05, 0.02]);

    // Background zoom - follows the text zoom for a cohesive scroll transition
    const bgScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 1.15, 12, 40]);

    return (
        <div ref={containerRef} className="intro-scroll-container">
            {/* Sticky intro screen */}
            <motion.div
                className="intro-sticky-wrapper"
                style={{ opacity: introOpacity }}
            >
                {/* Dark background with subtle gradient */}
                <div className="intro-background">
                    {/* GridScan Background Effect */}
                    <motion.div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, scale: bgScale, transformOrigin: 'center center' }}>
                        <GridScan
                            sensitivity={0.55}
                            lineThickness={1}
                            linesColor="#392e4e"
                            gridScale={0.1}
                            scanColor="#FF9FFC"
                            scanOpacity={0.4}
                            enablePost
                            bloomIntensity={0.6}
                            chromaticAberration={0.002}
                            noiseIntensity={0.01}
                        />
                    </motion.div>

                    {/* Subtle horizontal scanlines like the reference */}
                    <motion.div
                        className="intro-scanlines"
                        style={{ opacity: scanlinesOpacity }}
                    />

                    {/* Radial vignette */}
                    <div className="intro-vignette" />
                </div>

                {/* Main text container - zooms into S */}
                <div className="intro-text-viewport">
                    <motion.div
                        className="intro-text-container"
                        style={{
                            scale: textScale,
                            x: textX,
                            y: textY,
                        }}
                    >
                        <motion.h1
                            className="intro-title"
                            style={{ letterSpacing: useTransform(letterSpacing, (v) => `${v}em`) }}
                        >
                            <span className="intro-letter">R</span>
                            <span className="intro-letter">E</span>
                            <span className="intro-letter">C</span>
                            <span className="intro-letter-space" />
                            <motion.span
                                className="intro-letter intro-letter-s"
                                style={{
                                    textShadow: useTransform(
                                        sGlow,
                                        (v) => `0 0 ${v}px rgba(139, 92, 246, ${v > 0 ? 0.6 : 0}), 0 0 ${v * 2}px rgba(139, 92, 246, ${v > 0 ? 0.3 : 0})`
                                    ),
                                }}
                            >
                                S
                            </motion.span>
                            <span className="intro-letter">P</span>
                            <span className="intro-letter">O</span>
                        </motion.h1>
                    </motion.div>
                </div>

                {/* White wash overlay - fades in as zoom progresses */}
                <motion.div
                    className="intro-white-overlay"
                    style={{ opacity: whiteOverlayOpacity }}
                />

                {/* Subtitle */}
                <motion.div
                    className="intro-subtitle-container"
                    style={{ opacity: subtitleOpacity }}
                >
                    <p className="intro-subtitle">scroll to explore</p>
                    <div className="intro-scroll-indicator">
                        <div className="intro-scroll-dot" />
                    </div>
                </motion.div>

                {/* Floating particles */}
                <div className="intro-particles">
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="intro-particle"
                            style={{
                                left: `${8 + (i * 7.5) % 85}%`,
                                top: `${15 + (i * 13) % 70}%`,
                            }}
                            animate={{
                                y: [0, -20, 0],
                                opacity: [0.15, 0.4, 0.15],
                            }}
                            transition={{
                                duration: 3 + (i % 3),
                                repeat: Infinity,
                                delay: i * 0.3,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
};
