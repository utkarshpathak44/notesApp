"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class", // Enables dark mode based on a class
    theme: {
        extend: {
            colors: {
                brand: {
                    50: "var(--color-brand-50)",
                    100: "var(--color-brand-100)",
                    200: "var(--color-brand-200)",
                    300: "var(--color-brand-300)",
                    400: "var(--color-brand-400)",
                    500: "var(--color-brand-500)",
                    600: "var(--color-brand-600)",
                    700: "var(--color-brand-700)",
                    800: "var(--color-brand-800)",
                    900: "var(--color-brand-900)",
                },
                white: "var(--color-white)",
            },
        },
    },
    plugins: [],
};
exports.default = config;
