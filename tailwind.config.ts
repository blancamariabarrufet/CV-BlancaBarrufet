import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", '"Space Grotesk"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Precision Architect surface tiers (updated to warm cream)
        surface: {
          DEFAULT: "#f4f1ea",
          lowest: "#ffffff",
          low: "#fbf8f1",
          container: "#eae6db",
          high: "#dfdacb",
          highest: "#d4cfbd",
        },
        // Ink / text tokens (updated to dark brown/obsidian)
        ink: {
          DEFAULT: "#1a1916",
          muted: "#6b6864",
          subtle: "#7a766c",
          outline: "rgba(26, 25, 22, 0.15)",
        },
        // Deep obsidian brown/black palette
        obsidian: {
          50: "#eae6db",
          100: "#d4cfbd",
          200: "#a9a393",
          300: "#7a766c",
          400: "#55524a",
          500: "#3f3c37",
          600: "#2a2824",
          700: "#1e1d1a",
          800: "#171614",
          900: "#1a1916",
        },
        // Soft rose accents
        blush: {
          50: "#fff1f6",
          100: "#ffdfea",
          200: "#ffc3d6",
          300: "#f4a7bd",
          400: "#e886a5",
          500: "#d66f92",
          DEFAULT: "#d66f92",
        },
      },
      boxShadow: {
        "deep-tech": "0px 24px 48px rgba(26, 25, 22, 0.06)",
        "deep-tech-hover": "0px 32px 64px rgba(26, 25, 22, 0.09)",
        "blush-glow": "0px 20px 40px rgba(214, 111, 146, 0.18)",
      },
      borderRadius: {
        md: "0.375rem",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #1e1d1a 0%, #3f3c37 100%)",
        "blush-wash":
          "linear-gradient(180deg, rgba(255, 223, 234, 0.55) 0%, rgba(244, 241, 234, 0) 80%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
