const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  content: ["pages/*.js", 
            "pages/**/*.js", 
            "components/*.js", 
            'layouts/*.js', 
            './pages/**/*.{js,ts,jsx,tsx}',
            './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: colors.neutral,
        cream: "#f4f3ef",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
