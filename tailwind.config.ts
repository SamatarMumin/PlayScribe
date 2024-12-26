import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: { backgroundImage: {
      LastOfUs2: "url('/assets/images/loginImage.jpg')",
     }},
 
  },
  plugins: [],
} satisfies Config;


