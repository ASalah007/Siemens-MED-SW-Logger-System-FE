/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        success: "#6ede87",
        fail: "#ff595e",
      },
      backgroundImage: {
        home: "url('./Resources/cool-background.png')",
      },
    },
  },
  plugins: [],
};
