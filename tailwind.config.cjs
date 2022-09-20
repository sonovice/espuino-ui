const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {},
  },

  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#27272a",
          "secondary": "#f97316",
          // "accent": "#fb923c",
          // "neutral": "#f4f4f5",
          "base-100": "#ffffff",
          // "info": "#3ABFF8",
          // "success": "#36D399",
          // "warning": "#FBBD23",
          // "error": "#F87272",
        },
      },
    ],
  },

  plugins: [
    require("@tailwindcss/forms"),
    require("daisyui"),
  ],
};

module.exports = config;
