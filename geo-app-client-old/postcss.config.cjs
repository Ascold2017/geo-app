const daisyui = require("daisyui");
const typography = require("@tailwindcss/typography");
module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-import": {},
    tailwindcss: {
      content: ["./src/**/*.{js,jsx,ts,tsx}"],
      plugins: [typography, daisyui],
      daisyui: {
        themes: ["light", "dark"],
      },
    },
  },
};
