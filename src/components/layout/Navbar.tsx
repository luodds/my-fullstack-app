// components/Navbar.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // 1. 引入钩子获取当前路径
import { Github, Settings, Moon, Sun, Monitor, Laptop } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export default function Navbar() {
  const links = [
    { name: '首页', href: '/' },
    { name: '博客', href: '/blog' },
    { name: '关于', href: '/about' },
    { name: '工具', href: '/tools' },
  ];

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname(); // 2. 获取当前路径

  useEffect(() => {
    setMounted(true);
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return <div className="h-20" />; // 防止布局抖动，返回一个占位高度

  return (
    // 3. Header 容器：添加 sticky 固定定位 + backdrop-blur 毛玻璃效果
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl transition-colors duration-300">
      <nav className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* 左侧 Logo：使用渐变色或更醒目的字体 */}
        <Link 
          href="/" 
          className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 hover:opacity-80 transition"
        >
          MyFullStack
        </Link>

        {/* 右侧区域 */}
        <div className="flex items-center gap-6">
          
          {/* 中间导航链接：胶囊样式 */}
          <div className="hidden sm:flex items-center gap-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    relative px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-gray-900 text-white dark:bg-white dark:text-black shadow-md' // 激活状态：黑底白字(亮) / 白底黑字(暗)
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100' // 普通状态：悬浮变色
                    }
                  `}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3 border-l pl-4 border-gray-200 dark:border-gray-800">
            {/* Github 图标 */}
            <a 
              href="https://github.com/luodds/my-fullstack-app" 
              target="_blank" 
              rel="noreferrer"
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:text-gray-400 dark:hover:text-white transition"
            >
              <Github size={20} />
            </a>

            {/* 设置菜单 */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className={`
                  p-2 rounded-full transition duration-200
                  ${isSettingsOpen 
                    ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white' 
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'}
                `}
              >
                <Settings size={20} />
              </button>

              {/* 下拉菜单面板 */}
              {isSettingsOpen && (
                <div className="absolute right-0 mt-3 w-48 origin-top-right bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-2 space-y-1">
                    <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      外观
                    </div>
                    
                    {/* 主题切换按钮：更直观的选项 */}
                    <button
                      onClick={() => setTheme('light')}
                      className={`w-full flex items-center gap-2 px-2 py-2 text-sm rounded-lg transition-colors ${theme === 'light' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                    >
                      <Sun size={16} /> <span>亮色模式</span>
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={`w-full flex items-center gap-2 px-2 py-2 text-sm rounded-lg transition-colors ${theme === 'dark' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                    >
                      <Moon size={16} /> <span>暗色模式</span>
                    </button>
                    <button
                      onClick={() => setTheme('system')}
                      className={`w-full flex items-center gap-2 px-2 py-2 text-sm rounded-lg transition-colors ${theme === 'system' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                    >
                      <Laptop size={16} /> <span>跟随系统</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}