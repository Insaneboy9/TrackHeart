/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        red: "#ff4757",
        grey: "#2f3542",
        lightGrey: "#a4b0be",
        bg: "#dfe4ea",
        black: "#000000",
        green: "#7bed9f",
        darkGreen: "#0be881",
        accentColor: "#3742fa",
      },
      backgroundImage: (theme) => ({
        rainbow:
          "linear-gradient(81.66deg, #00B5EE 7.21%, #FF45A4 45.05%, #FFBA00 78.07%)",

        rainblue:
          "linear-gradient(90deg, #24CBFF 14.53%, #FC59FF 69.36%, #FFBD0C 117.73%)",
      }),
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        opensans: ["Open Sans", "sans-serif"],
      },
      content: {
        brush: "url('./assets/brush.png')",
      },
      height: {
        xl: "30rem",
      },
      minHeight: {
        nav: "7rem",
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
