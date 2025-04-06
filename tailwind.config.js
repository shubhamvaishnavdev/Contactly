import { Colors } from "./constants/Colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        ...Colors.light, // used in className directly like 'bg-background'
        dark: Colors.dark, // referenceable via 'dark:bg-dark.background' etc
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
