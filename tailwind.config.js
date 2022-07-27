/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-black": "#565656",
        "light-grey": "#f1f1f1",
        grey: "#b0b0b0",
        "at-blue": "#5601ff",
      },
      transitionProperty: {
        width: "width",
      },
    },
    fontFamily: {
      Albert: ["Albert Sans, sans-serif"],
    },
    flex: {
      1: "1 1 0%",
      2: "2 2 0%",
    },
    container: {
      center: true,
      screens: {
        lg: "1124px",
        xl: "1124px",
        "2xl": "1124px",
      },
    },
  },
  plugins: [],
};
