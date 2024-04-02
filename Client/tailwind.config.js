// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customRed: '#561C24',
        customDarkRed: '#6D2932',
        customBeige: '#C7B7A3',
        customLightBeige: '#E8D8C4',
      },
    },
  },
  plugins: [],
};
