/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.tsx",
    "./app/**/*.{js,jsx,ts,tsx}"
  ],  
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        bgcolor: '#000000', // Replace with your desired background color
        defaultText: '#D9D9D9 ', // Replace with your desired default color
        folderText: '#FFCC00 ', // Replace with your desired default color
        folderBg: '#ac64009c  ', // Replace with your desired default color
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};
