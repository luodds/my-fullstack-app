// components/Navbar.tsx
import Link from 'next/link';
import { Github, Twitter } from 'lucide-react'; // 引入图标

export default function Navbar() {
  const links = [
    { name: '首页', href: '/' },
    { name: '博客', href: '/blog' },
    { name: '关于', href: '/about' },
    { name: '工具', href: '/tools' },
  ];

  return (
    <header className="w-full py-6 px-4">
      <nav className="max-w-4xl mx-auto flex items-center justify-between">
        {/* 左侧 Logo / 标题 */}
        <Link href="/" className="text-xl font-bold hover:text-blue-600 transition">
          我的全栈博客
        </Link>

        {/* 中间/右侧 导航链接 */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex gap-6">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="text-gray-600 hover:text-black hover:underline underline-offset-4 transition font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* 社交图标 */}
          <div className="flex items-center gap-4 border-l pl-4 border-gray-200">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-black">
              <Github size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-400">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}