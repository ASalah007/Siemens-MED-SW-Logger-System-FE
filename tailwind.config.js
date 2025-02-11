/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        success: "#32de84",
        fail: "#ff595e",
        Blue: "#1976D2",
        parentNode: "#ffb703",
        parentNodeHover: "#ffdd00",
        childNode: "#0496FF",
      },
      backgroundImage: {
        home: "url('./Resources/cool-background.png')",
      },
      fontFamily: {
        poppins: "Poppins",
      },
    },
  },
  plugins: [],
};
