/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        success: "#6ede87",
        fail: "#ff595e",
        blue: "#1976D2",
      },
      backgroundImage: {
        home: "url('./Resources/cool-background.png')",
      },
      fontFamily: {
        'poppins': 'Poppins',
     }
    },
  },
  plugins: [],
};
