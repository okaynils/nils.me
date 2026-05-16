const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./components/**/*.{js,jsx}",
    "./layouts/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
    "./ui/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: colors.neutral,
        cream: "#f4f3ef",
      },
      fontFamily: {
        serif: ['"Lora"', 'serif']
      },
    },
  },
  plugins: [],
};
