import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// 1. 自定义组件映射
const components = {
  // 替换图片
  img: (props: any) => (
    <span className="block my-8 relative w-full h-[400px] rounded-lg overflow-hidden bg-muted">
      <Image
        src={props.src}
        alt={props.alt || 'Blog Image'}
        fill
        className="object-cover transition-transform hover:scale-105 duration-500"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </span>
  ),
  // 替换链接
  a: ({ href, children, ...props }: any) => {
    // 排除锚点链接 (我们下面配置生成的 anchor-link 类名)
    if (props.className && props.className.includes('anchor-link')) {
      return (
        <a href={href} {...props}>
          {children}
        </a>
      );
    }

    const isInternal = href && (href.startsWith('/') || href.startsWith('#'));
    if (isInternal) {
      return (
        <Link href={href} className="text-primary font-medium hover:underline decoration-primary/30 underline-offset-4">
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary font-medium hover:underline decoration-primary/30 underline-offset-4 inline-flex items-center gap-0.5"
        {...props}
      >
        {children}
        <span className="text-[10px] opacity-70">↗</span>
      </a>
    );
  },
  table: (props: any) => (
    <div className="overflow-x-auto my-6 rounded-lg border border-border">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  th: (props: any) => (
    <th className="border-b border-border bg-muted/50 px-4 py-2 text-left font-bold" {...props} />
  ),
  td: (props: any) => (
    <td className="border-b border-border px-4 py-2 last:border-0" {...props} />
  ),
};

// 2. 高亮插件配置
const prettyCodeOptions = {
  theme: 'github-dark',
  keepBackground: true,
  onVisitLine(node: any) {
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }];
    }
  },
};

interface MdxContentProps {
  source: string;
}

export async function MdxContent({ source }: MdxContentProps) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          format: 'md', 
          remarkPlugins: [
            remarkGfm, 
            remarkMath
          ],
          rehypePlugins: [
            rehypeSlug,
            // 👇 修改核心：配置自动链接的行为
            [
              rehypeAutolinkHeadings, 
              { 
                // 改为 'append'，意思是把链接加在标题文字后面，而不是包住它
                behavior: 'append', 
                properties: {
                  // 这个类名 anchor-link 很重要，我们在 CSS 里用它来控制显示
                  className: 'anchor-link ml-2 text-muted-foreground opacity-0 transition-opacity no-underline font-normal',
                  ariaHidden: true,
                  tabIndex: -1,
                },
                content: {
                  type: 'text',
                  value: '#', // 显示一个井号
                }
              }
            ],
            rehypeKatex,
            [rehypePrettyCode, prettyCodeOptions],
          ],
        },
      }}
    />
  );
}