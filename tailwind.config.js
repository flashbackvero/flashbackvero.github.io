/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        flash: {
          ink: "#101014",
          cream: "#fffaf0",
          red: "#f04438",
          blue: "#1d4ed8",
          yellow: "#facc15",
          green: "#16a34a",
          violet: "#7c3aed",
          cabinet: "#17171e",
          panel: "#232330",
        },
      },
      boxShadow: {
        arcade: "0 10px 0 #101014",
        glow: "0 0 28px rgba(250, 204, 21, 0.2)",
      },
      fontFamily: {
        display: ["Arial Black", "Arial", "sans-serif"],
        body: ["Inter", "Arial", "sans-serif"],
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0) rotate(var(--tw-rotate, 0deg))" },
          "50%": { transform: "translateY(-10px) rotate(var(--tw-rotate, 0deg))" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        floaty: "floaty 4s ease-in-out infinite",
        scan: "scan 5s linear infinite",
      },
    },
  },
  plugins: [],
};
