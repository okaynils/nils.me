const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  content: ["pages/*.js", 
            "pages/**/*.js", 
            "components/*.js", 
            'layouts/*.js', 
            './pages/**/*.{js,ts,jsx,tsx}',
            './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // Explicitly disable dark mode - app stays in light mode only
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
  variants: {
    extend: {},
  },
  plugins: [],
};
