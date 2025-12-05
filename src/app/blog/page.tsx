import Link from 'next/link';
import { prisma } from '@/lib/prisma'; // 确保你的 prisma 实例路径正确

// 这是一个异步 Server Component
export default async function BlogPage() {
  // 1. 直接在服务端查询数据库
  const posts = await prisma.post.findMany({
    where: {
      published: true, // 只查询已发布的文章
    },
    orderBy: {
      createdAt: 'desc', // 按创建时间倒序排列（最新的在上面）
    },
  });

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-extrabold tracking-tight mb-10">
        技术博客
      </h1>

      <div className="flex flex-col gap-8">
        {/* 2. 遍历文章列表 */}
        {posts.map((post) => (
          <article 
            key={post.id} 
            className="flex flex-col border-b border-border pb-8 last:border-0"
          >
            <h2 className="text-2xl font-bold mb-3 hover:text-blue-600 transition-colors">
              <Link href={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </h2>
            
            {/* 如果有简介就显示简介，没有就显示一段占位符 */}
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {post.overview || '暂无简介...'}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <time dateTime={post.createdAt.toISOString()}>
                {new Date(post.createdAt).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <Link 
                href={`/blog/${post.slug}`}
                className="font-medium text-blue-600 hover:underline"
              >
                阅读全文 →
              </Link>
            </div>
          </article>
        ))}

        {/* 空状态处理：如果数据库里没文章 */}
        {posts.length === 0 && (
          <p className="text-gray-500 text-center py-10">
            博主正在闭关修炼，暂时还没有文章发布...
          </p>
        )}
      </div>
    </div>
  );
}