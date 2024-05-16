/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          black: "#262626",
          blue: "#02274F",
          yellow: "#FDCF00",
          gray: "#F1F1F1",
        },
      },
      boxShadow: {
        login: "0px 0px 64px 0px #00000040",
        profile: "00px 2px 10px 0px #0000001A",
      },
      animation: {
        animation: "spin 1s linear infinite",
      },
      keyframes: {
        spin: {
          from: { transform: "rotate(0deg)" },
          to: {
            transform: "rotate(360deg)",
          },
        },
      },
    },
  },
  plugins: [],
};
