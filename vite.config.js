// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// var vite_1 = require("vite");
// var plugin_react_swc_1 = require("@vitejs/plugin-react-swc");
// var vite_2 = require("@tailwindcss/vite");
// // https://vite.dev/config/
// exports.default = (0, vite_1.defineConfig)({
//     plugins: [(0, vite_2.default)(), (0, plugin_react_swc_1.default)()],
// });

// import {defineConfig } from 'vite';
// import tailwindcss from '@tailwindcss/vite';
// import react from '@vitejs/plugin-react'export default defineConfig({
//   plugins: [
//     tailwindcss(),
//     react()
//   ],
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
});
