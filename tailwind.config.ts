import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        utk: "var(--font-utk)",
      },
      colors: {
        regalBlue: "var(--color-regal-blue)",
        avocado: {
          100: "var(--color-avocado-100)",
          200: "var(--color-avocado-200)",
          300: "var(--color-avocado-300)",
          400: "var(--color-avocado-400)",
          500: "var(--color-avocado-500)",
          600: "var(--color-avocado-600)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
