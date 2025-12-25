/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0b0b0f",
        panel: "#12121a",
        accent: "#6cf2c2",
      },
    },
  },
  plugins: [],
};
