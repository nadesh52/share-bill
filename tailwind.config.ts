import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: { fontFamily: { noto: ["Noto Sans Thai"] } },
    colors: {
      primary: "#211951",
      secondary: "#836FFF",
      base: "#F0F3FF",
      accent: "#15F5BA",
      black: "#0F0F0F",
      white: "#FFFFFF",
      red: "#C70039",
      green: "#68B984",
      yellow: "#FED049",
      grey: "#DBEDF3",
    },
    borderColor: {
      DEFAULT: "#DBEDF3",
      primary: "#0C2D57",
    },
    fontSize: {
      xs: ["10px", "14px"],
      sm: ["12px", "16px"],
      md: ["14px", "20px"],
      lg: ["16px", "24px"],
      xl: ["18px", "28px"],
      "2xl": ["20px", "28px"],
      "3xl": ["24px", "32px"],
      "4xl": ["30px", "36px"],
      "5xl": ["36px", "42px"],
    },
    screens: {
      "2xs": "320px",
      xs: "425px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
export default config;
