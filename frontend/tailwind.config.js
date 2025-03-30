/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        ls: "1300px",
        ms: "1200px",
        ss: "650px",
        xs: "500px",
        pa: "380px",
      },
    },
  },
  plugins: [],
};
