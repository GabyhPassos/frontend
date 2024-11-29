import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#fbbf24", // Amarelo vibrante
        secondary: "#f59e0b", // Amarelo escuro
        background: "#fef9c3", // Amarelo claro
        text: "#1c1c1c", // Preto para textos
      },
    },
  },
  plugins: [],
} satisfies Config;
