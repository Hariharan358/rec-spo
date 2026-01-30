import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Barlow', 'Roboto', 'sans-serif'],
        display: ['Teko', 'Barlow Condensed', 'sans-serif'],
        body: ['Barlow', 'Roboto', 'sans-serif'],
        heading: ['Teko', 'Barlow Condensed', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        navy: {
          DEFAULT: "hsl(var(--navy))",
          light: "hsl(var(--navy-light))",
        },
        violet: {
          DEFAULT: "hsl(var(--orange))",
          dark: "hsl(var(--orange-dark))",
        },
        lavender: "hsl(var(--gold))",
        success: "hsl(var(--success))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
      },
      backgroundImage: {
        'hero-pattern': 'linear-gradient(135deg, hsl(270 50% 40%) 0%, hsl(270 40% 50%) 50%, hsl(270 70% 60%) 100%)',
        'card-gradient': 'linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(270 10% 98%) 100%)',
        'accent-gradient': 'linear-gradient(135deg, hsl(270 70% 60%) 0%, hsl(270 80% 70%) 100%)',
      },
      boxShadow: {
        'glow': '0 0 30px hsl(270 70% 60% / 0.3)',
        'glow-lg': '0 0 50px hsl(270 70% 60% / 0.4)',
        'card': '0 4px 6px -1px hsl(270 50% 40% / 0.1), 0 2px 4px -2px hsl(270 50% 40% / 0.1)',
        'card-hover': '0 20px 25px -5px hsl(270 50% 40% / 0.15), 0 8px 10px -6px hsl(270 50% 40% / 0.1)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
