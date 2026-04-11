import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          300: "#ffc4e0",
          400: "#ff8fcc",
          500: "#f059b2",
          600: "#d6489e",
        },
      },
    },
  },
  plugins: [],
};

export default config;

