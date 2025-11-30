// app/layout.tsx
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
    <html lang="zh-CN">
      <body className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
        <Navbar />
        {/* 主要内容区域：设置最大宽度并居中 */}
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}