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
        head: ["var(--font-baloo)", "cursive"],
        body: ["var(--font-nunito)", "sans-serif"],
      },
      colors: {
        sky: {
          light: "#EBF4FF",
          mid: "#B8D9F8",
          DEFAULT: "#4A90E2",
          dark: "#2563EB",
        },
        coral: {
          light: "#FFF3F0",
          mid: "#FFCCBC",
          DEFAULT: "#FF7043",
          warm: "#FF8C42",
        },
      },
      borderRadius: {
        xl: "16px",
        "2xl": "24px",
      },
      boxShadow: {
        card: "0 4px 24px rgba(74,144,226,0.12)",
        "card-lg": "0 8px 40px rgba(74,144,226,0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
