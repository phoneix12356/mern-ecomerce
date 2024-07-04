/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(39, 41, 53)",
        "pink-btn": "rgb(255, 122, 198)",
        "login-btn": "#FF4E82",
        "navbar-background": "rgb(24, 25, 32)",
        b1: "hsl(217,92%,10%,1)",
        b2: "hsl(217,100%,97%,1)",
        b3: "hsl(247,47%,43%,1)",
        b4: "hsl(310 , 49% , 52% , 1)",
        b5: "hsl(212,100%,51%,1)",
        b6: "hsl(219,44%,92%,1)",
        b7: "hsl(247,47%,43%,1)",
        t1: "hsl(231,100%,93%,1)",
        t2: "hsl(229,10%,80%,1)",
        t3: "hsl(214,30%,32%,1)",
        t4: "hsl(246,40%,88%,1)",
        t5: "hsl(256, 40% , 88% , 1)",
      },
      fontFamily: {
        "comfy-sofa":
          "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
      },
      padding: {
        "1/3": "33.33333%",
        "2/3": "66.66667%",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/aspect-ratio"),
  ],
  darkMode: "class",
};
