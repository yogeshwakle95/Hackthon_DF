/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lavender: "#dde0ff",
        white: "#fff",
        dimgray: {
          "100": "#717070",
          "200": "#676767",
        },
        darkgray: "#b1afaf",
        secondary: "#20304a",
        lightslategray: "#a08cb0",
        indigo: "#5c218b",
      },
      spacing: {},
      fontFamily: {
        poppins: "Poppins",
        inter: "Inter",
      },
      borderRadius: {
        "8xs": "5px",
      },
    },
    fontSize: {
      "8xl": "27px",
      base: "16px",
      "13xl": "32px",
      inherit: "inherit",
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}

