/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0f",
        surface: "#121218",
        border: "#22222c",
        violet: {
          DEFAULT: "#7c5cff",
          light: "#a78bfa",
          dark: "#5b3df0",
        },
      },
      fontFamily: {
        sans: ["Inter Variable", "Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk Variable", "Space Grotesk", "Inter Variable", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}

