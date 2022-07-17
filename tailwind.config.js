/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      screen: {
        sm: 550,
        md: 1100,
        lg: 1500,
      },
    },
  },
  plugins: [require("daisyui")],
};
