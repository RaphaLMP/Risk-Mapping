// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // seu código
    "./node_modules/flowbite/**/*.js" // adicionar esta linha
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin') // importar plugin do Flowbite
  ],
}
