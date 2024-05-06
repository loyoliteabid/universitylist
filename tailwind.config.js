/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bright-blue-10": "var(--bright-blue-10)",
        "deep-blue": "var(--deep-blue)",
        "bright-blue-40": "var(--bright-blue-40)",
      },
    },
  },
  plugins: [],
};
