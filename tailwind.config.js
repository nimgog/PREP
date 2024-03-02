/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

const robotoFontFamily = ["Roboto", ...defaultTheme.fontFamily.sans];
const poppinsFontFamily = ["Poppins", ...robotoFontFamily];

module.exports = {
  content: ["./index.html", "./src/**/*.{html,ts,md}"],
  theme: {
    extend: {
      colors: {
        "prep-beige": "#DAD7CD",
        "prep-green": "#344E41",
      },
      fontFamily: {
        gunplay: ["Gunplay", ...robotoFontFamily],
        poppins: poppinsFontFamily,
        roboto: robotoFontFamily,
        sans: poppinsFontFamily,
      },
      maxWidth: {
        "centered-content": "1184px",
      },
    },
  },
  plugins: [],
};
