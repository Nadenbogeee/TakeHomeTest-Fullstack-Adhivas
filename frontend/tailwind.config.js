import { color } from "framer-motion";

/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // Add the Poppins font
      },
      colors: {
        "custom-blue": "#2A2545",
      },
      borderRadius: {
        "3xl": "3rem",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
