/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: [
    "./index.html",
    "./quiz.html",
    "./tailwind-classes.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", ...defaultTheme.fontFamily.sans],
        title: ["Nunito", ...defaultTheme.fontFamily.sans],
      },
      dropShadow: {
        card: ".4rem .4rem 0 #27272a",
        title: "0 0 0 1rem #27272a",
      },
      aspectRatio: {
        card: "4 / 3",
      },
    },
  },
  plugins: [],
};
