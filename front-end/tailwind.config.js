/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      keyframes: {
        "rev-spin": {
          to: { transform: "rotate(-360deg)" },
        },
      },
      animation: {
        "neg-spin": "rev-spin 1s linear infinite",
      },
    },
  },
  plugins: [],
};
