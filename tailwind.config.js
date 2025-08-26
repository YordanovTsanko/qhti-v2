/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#124880", // Customize to your preferred primary
        secondary: "#B45400", // Customize to your preferred secondary
      },
      boxShadow: {
        custom: "2px 2px 6px 0px rgba(0,0,0,0.8)",
      },
    },
  },
  plugins: [],
};
