import React from 'react';
import { cn } from "@/lib/utils";

interface TechCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string; // Standard prop
}

export const TechCard = ({ children, className, ...props }: TechCardProps) => {
    return (
        <div
            className={cn(
                "relative rounded-xl border border-black/40 dark:border-white/5 bg-white dark:bg-[#0a0a0a] overflow-hidden group hover:border-violet-500/50 transition-all duration-500 shadow-xl shadow-black/5 dark:shadow-none",
                className
            )}
            {...props}
        >
            {/* Corner Brackets */}
            {/* Top Left */}
            <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none z-10">
                <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 16V2H16" stroke="currentColor" strokeWidth="2" className="text-black/20 dark:text-white/20 group-hover:text-violet-500 transition-colors duration-500" />
                </svg>
            </div>
            {/* Top Right */}
            <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none z-10">
                <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M62 16V2H48" stroke="currentColor" strokeWidth="2" className="text-black/20 dark:text-white/20 group-hover:text-violet-500 transition-colors duration-500" />
                </svg>
            </div>
            {/* Bottom Left */}
            <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none z-10">
                <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 48V62H16" stroke="currentColor" strokeWidth="2" className="text-black/20 dark:text-white/20 group-hover:text-violet-500 transition-colors duration-500" />
                </svg>
            </div>
            {/* Bottom Right */}
            <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none z-10">
                <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M62 48V62H48" stroke="currentColor" strokeWidth="2" className="text-black/20 dark:text-white/20 group-hover:text-violet-500 transition-colors duration-500" />
                </svg>
            </div>

            {/* Tech Accents - Plus signs */}
            <div className="absolute top-4 left-4 text-black/10 dark:text-white/10 font-mono text-xs pointer-events-none group-hover:text-violet-500/50 transition-colors">+</div>
            <div className="absolute top-4 right-4 text-black/10 dark:text-white/10 font-mono text-xs pointer-events-none group-hover:text-violet-500/50 transition-colors">+</div>
            <div className="absolute bottom-4 left-4 text-black/10 dark:text-white/10 font-mono text-xs pointer-events-none group-hover:text-violet-500/50 transition-colors">+</div>
            <div className="absolute bottom-4 right-4 text-black/10 dark:text-white/10 font-mono text-xs pointer-events-none group-hover:text-violet-500/50 transition-colors">+</div>

            {/* Top Center Diamond */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-black/20 dark:via-white/20 to-transparent group-hover:via-violet-500/50 transition-colors" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-1 bg-black/10 dark:bg-white/10 group-hover:bg-violet-500 transition-colors [clip-path:polygon(0_0,100%_0,50%_100%)]" />

            {/* Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

            {/* Content */}
            <div className="relative z-20">
                {children}
            </div>
        </div>
    );
};
