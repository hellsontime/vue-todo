/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-black": "#565656",
        "light-white": "#f7f7f7",
        "light-grey": "#f1f1f1",
        grey: "#b0b0b0",
        "at-blue": "#0800ff",
        "at-light-blue": "#e7e5ff",
      },
      transitionProperty: {
        width: "width",
        minWidth: "min-width",
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
    screens: {
      xs: "475px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
