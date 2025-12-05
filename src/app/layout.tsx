// src/app/layout.tsx
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
// 👇 新增这一行 (引入 Atom One Dark 主题)
import "highlight.js/styles/atom-one-dark.css";
import { ThemeProvider } from '@/components/features/ThemeProvider';

export const metadata = {
  title: '我的全栈博客',
  description: '使用 Next.js 构建的全栈应用',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning> 
      <body 
        // 👇 关键修改：
        // 1. bg-background: 自动适配亮色(白) / 暗色(深黑)
        // 2. text-foreground: 自动适配文字颜色
        // 3. antialiased: 让字体渲染更平滑
        // 4. 删除了 transition-colors: 防止页面加载时出现颜色闪烁
        className="min-h-screen flex flex-col bg-background text-foreground antialiased"
      >
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem
          disableTransitionOnChange // 建议加上，防止切换主题时 CSS 动画导致闪烁
        >
          <Navbar />
          <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}