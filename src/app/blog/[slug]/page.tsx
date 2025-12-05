import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { MdxContent } from '@/components/features/blog/mdx-content';

// 假设我们有一个交互组件（这里先用简单的按钮代替，后续可以封装成独立文件）
// 或者你自己写一个简单的 Client Component

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post) notFound();

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      {/* 1. 顶部导航区 (React 组件) */}
      <div className="mb-8">
        <Link 
          href="/blog"
          className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
        >
          ← 返回文章列表
        </Link>
      </div>

      <article>
        {/* 2. 文章头部信息 (React 渲染数据) */}
        <header className="mb-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
             <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium">
               技术文章
             </span>
             <time className="text-sm text-muted-foreground">
              {new Date(post.createdAt).toLocaleDateString('zh-CN')}
             </time>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-balance">
            {post.title}
          </h1>
        </header>

        {/* 3. 核心内容区 (纯净的 Markdown 渲染) 
            这里使用 format: 'md' 模式，保证任何乱七八糟的符号都能显示，不报错。
        */}
        <div className="prose prose-lg mx-auto break-words mb-16">
          <MdxContent source={post.content} />
        </div>

        {/* 4. 底部交互区 (React 组件与 Markdown 分离) 
            你可以在这里随意放置复杂的交互组件，完全不受 Markdown 语法的限制。
        */}
        <div className="border-t border-border pt-10">
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-xl font-bold">觉得文章有帮助？</h3>
            
            {/* 这里的 LikeButton 是一个 Client Component，包含 useState 等交互逻辑 */}
            {/* <LikeButton postId={post.id} />  <-- 这种写法是完全支持的 */}
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity">
              👍 点赞支持一下
            </button>
          </div>

          {/* 作者卡片 */}
          <div className="mt-10 p-6 bg-muted/50 rounded-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
               {/* <Image ... /> */}
            </div>
            <div>
              <p className="font-bold">My Fullstack App</p>
              <p className="text-sm text-muted-foreground">分享全栈开发技术与心得。</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}