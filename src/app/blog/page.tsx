export default function BlogPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">我的博客文章</h1>
      <p>这里将展示从 Supabase 获取的文章列表...</p>
      {/* 这里以后可以放你之前的 useEffect 代码来读取数据库 */}
    </div>
  );
}