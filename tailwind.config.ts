import type { Config } from "tailwindcss";

const config: Config = {
  // 这里是最关键的一行！告诉 Tailwind 通过类名来切换夜间模式
  darkMode: 'class', 
  
  content: [
    // 告诉 Tailwind 扫描这些文件里的 class
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}", 
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;