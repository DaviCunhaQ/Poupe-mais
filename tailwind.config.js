const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // ...
    flowbite.content(),
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'verde-principal': '#5BBA6F',
        'branco': '#ffffff',
        'verde-secundario': '#3fa34d',
        'verde-terciario': '#2a9134',
        'verde-quarternario': '#137547',
        'verde-fundo': '#054a29',
        'menta': '#f2fff5',
        'verde-saldo': '#cfdfd1',
        'vermelho-despesas': '#db9d9d',
        'azul-options': '#92badf',
        'cinza-texto': '#c4c4c4',
        'verde-contorno': '#cfdfd1'
    },
  },
  plugins: [
    // ...
    flowbite.plugin(),
  ],
}}


