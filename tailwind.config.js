/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          "blue-900": "hsl(209, 23%, 22%)", // Dark mode elements
          "blue-950": "hsl(207, 26%, 17%)", // Dark mode background
          "grey-950": "hsl(200, 15%, 8%)",  // Light mode text
          "grey-400": "hsl(0, 0%, 50%)",    // Light mode input
          "grey-50": "hsl(0, 0%, 99%)",     // Light mode background
          white: "hsl(0, 100%, 100%)",      // Dark mode text & light mode elements
        },
      },
      fontFamily: {
        nunito: ["'Nunito Sans'", "sans-serif"],
      },
      fontSize: {
        body: "14px",  // Homepage items
        base: "16px",  // Detail page
      },
      fontWeight: {
        light: 300,
        semibold: 600,
        bold: 800,
      },
      screens: {
        mobile: "375px",
        desktop: "1440px",
      },
    },
  },
  plugins: [],
}
