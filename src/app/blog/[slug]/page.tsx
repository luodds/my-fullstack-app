import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight'; // 👇 引入高亮插件
import remarkGfm from 'remark-gfm';           // 👇 引入 GitHub 语法插件

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// 🎁 额外福利：动态生成网页标题 (SEO)
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  return {
    title: post ? `${post.title} | 我的全栈博客` : '文章不存在',
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      {/* 🔙 返回按钮 */}
      <div className="mb-8">
        <Link 
          href="/blog"
          className="text-sm text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1"
        >
          ← 返回文章列表
        </Link>
      </div>

      <article>
        <header className="mb-10 text-center">
          <time className="text-sm text-gray-500 mb-2 block">
            {new Date(post.createdAt).toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-balance">
            {post.title}
          </h1>
        </header>

        {/* Markdown 渲染区升级：
           1. remarkPlugins: 支持表格等高级语法
           2. rehypePlugins: 支持代码高亮
        */}
        <div className="prose prose-lg dark:prose-invert mx-auto break-words 
          prose-headings:text-foreground 
          prose-p:text-foreground 
          prose-strong:text-foreground 
          prose-li:text-foreground">
          
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]} 
            rehypePlugins={[rehypeHighlight]}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}