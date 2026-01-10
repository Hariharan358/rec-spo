import { cn } from "@/lib/utils";
import React from "react";

export function GridBackground({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative w-full bg-white dark:bg-black">
            {/* Grid Pattern */}
            <div className="absolute inset-0 z-0 h-full w-full bg-white bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-black dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"></div>

            {/* Radial Gradient Fading */}
            <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
