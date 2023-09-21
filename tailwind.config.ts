import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./views/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./views/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "Helvetica, Arial, sans-serif",
      },
      colors: {
        mainRed: "#ac0000",
      },
      mixBlendMode: {
        difference: 'difference', 
      },
      backgroundColor: {
        'red': "#ac0000"
      },
    },
  },
  plugins: [],
}
export default config
