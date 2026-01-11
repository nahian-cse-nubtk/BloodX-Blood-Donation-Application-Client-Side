import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class", // enables manual dark mode
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark"], // DaisyUI themes
  },
}