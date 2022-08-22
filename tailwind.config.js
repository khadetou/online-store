/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "300px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        primary: "#0A472E",
        secondary: "#a8b324",
        "light-gray": "#777777",
        "dark-gray": "#2b2b2b",
        "bg-color": "#FCF4EB",
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        CaveatBrush: ["Caveat Brush", "cursive"],
        Playfair: ["Playfair Display", "serif"],
      },
      backgroundImage: {
        img1: "url('https://res.cloudinary.com/didh3wbru/image/upload/v1658135339/Ecommerce/Images/categorie/h1_ct1-ok_c6yfdj.jpg')",
        img2: "url('https://res.cloudinary.com/didh3wbru/image/upload/v1658135339/Ecommerce/Images/categorie/h1_ct2-ok_we5bli.jpg')",
        img3: "url('https://res.cloudinary.com/didh3wbru/image/upload/v1658135339/Ecommerce/Images/categorie/h1_ct3-ok1_unkwek.jpg')",
        img4: "url('https://res.cloudinary.com/didh3wbru/image/upload/v1658135339/Ecommerce/Images/categorie/h1_ct4-ok_gnmpuf.jpg')",
        img5: "url('https://res.cloudinary.com/didh3wbru/image/upload/v1658135339/Ecommerce/Images/categorie/h1_ct1_q4rahp.jpg')",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
