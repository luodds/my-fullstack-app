"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, Settings, Moon, Sun, Monitor } from 'lucide-react';
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
  const pathname = usePathname();

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

  if (!mounted) return <div className="h-16" />;

  return (
    // ✨ 语义化改造：
    // bg-background/80: 背景色 + 透明度
    // border-border: 自动适配边框颜色
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <nav className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo: 使用 foreground (主文字色) */}
        <Link 
          href="/" 
          className="text-xl font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity"
        >
          MyFullStack
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  // ✨ 语义化改造：
                  // 激活状态: bg-primary (主色调) + text-primary-foreground (主色调上的文字)
                  // 普通状态: text-muted-foreground (次要文字) + hover:bg-accent (强调背景)
                  className={`
                    relative px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200
                    ${isActive 
                      ? 'bg-primary text-primary-foreground shadow-sm' 
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    }
                  `}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3 border-l border-border pl-4">
            <a 
              href="https://github.com/luodds/my-fullstack-app" 
              target="_blank" 
              rel="noreferrer"
              className="p-2 rounded-full text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Github size={20} />
            </a>

            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className={`
                  p-2 rounded-full transition-colors duration-200
                  ${isSettingsOpen 
                    ? 'bg-accent text-accent-foreground' 
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}
                `}
              >
                <Settings size={20} />
              </button>

              {isSettingsOpen && (
                // ✨ 下拉菜单: 使用 bg-popover
                <div className="absolute right-0 mt-3 w-48 origin-top-right bg-popover text-popover-foreground rounded-xl shadow-lg border border-border ring-1 ring-black/5 focus:outline-none animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-2 space-y-1">
                    <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      外观
                    </div>
                    
                    {['light', 'dark', 'system'].map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setTheme(mode)}
                        className={`w-full flex items-center gap-2 px-2 py-2 text-sm rounded-lg transition-colors
                          ${theme === mode 
                            ? 'bg-accent text-accent-foreground font-medium' 
                            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                          }
                        `}
                      >
                        {mode === 'light' && <Sun size={16} />}
                        {mode === 'dark' && <Moon size={16} />}
                        {mode === 'system' && <Monitor size={16} />}
                        <span>
                          {mode === 'light' ? '亮色模式' : mode === 'dark' ? '暗色模式' : '跟随系统'}
                        </span>
                      </button>
                    ))}
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