const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  content: ["pages/*.js", "pages/**/*.js", "components/*.js", 'layouts/*.js'],
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
