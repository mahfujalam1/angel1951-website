import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#1A3BDB",
                    dark: "#1230B3",
                    light: "#3A5BFF",
                },
                secondary: {
                    DEFAULT: "#F5A623",
                    dark: "#D4891A",
                },
                dark: {
                    DEFAULT: "#0D1117",
                    nav: "#0A0E1A",
                },
                "light-gray": "#F3F6FF",
            },
            fontFamily: {
                sora: ["var(--font-sora)", "sans-serif"],
                inter: ["var(--font-inter)", "sans-serif"],
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                slideUp: {
                    from: { opacity: "0", transform: "translateY(20px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
                fadeIn: {
                    from: { opacity: "0", transform: "translateY(10px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
            },
            animation: {
                slideUp: "slideUp 0.4s ease",
                fadeIn: "fadeIn 0.4s ease",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};

export default config;