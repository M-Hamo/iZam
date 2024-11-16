module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {},
    },
  },
  plugins: [require("flowbite/plugin")],
};
