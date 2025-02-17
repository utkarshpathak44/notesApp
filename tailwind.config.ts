
const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#181818", // Deep black
          100: "#222222", // Slightly lighter than black
          200: "#242424", // Soft dark tone
          300: "#292929", // Main background or primary color
          400: "#333333", // Slightly lighter background
          500: "#444444", // UI accents
          600: "#555555", // Hover highlights
          700: "#666666", // Muted text or borders
          800: "#999999", // Lighter text color
          900: "#AAAAAA"  // Light
        },
      },
    },
  },
  plugins: [],
};

export default config;
