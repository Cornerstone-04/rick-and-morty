import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "bg-rm": 'url("/public/images/rick_and_morty_bg1.jpeg")',
      },
      fontFamily: {
        "sf-pro-display": ["SF Pro Display", "sans-serif"],
      },
      colors: {
        primary: "#4BE41A",
        "mid-white": "rgba(225,225,225,80)",
        backdrop: "#283724",
        nero: "#252525",
        // "rm-purple": "#2c345c",
      },
    },
  },
  plugins: [],
};
export default config;
