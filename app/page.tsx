// app/page.tsx
export default function Home() {
  return (
    <div className="space-y-8">
      {/* 头部区域 */}
      <div className="space-y-4">
        <div className="text-6xl animate-bounce w-fit">🧑‍🚀</div>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          你好，全栈开发者！
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
          欢迎来到我的官方博客模板。这是一个轻量级、极简风格的起步项目，
          专为那些想要使用 <span className="font-semibold text-black">Next.js + Supabase</span> 构建个人网站、博客或作品集的人设计。
        </p>
      </div>

      {/* 功能列表区域 */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
        <h2 className="text-xl font-bold mb-4">如何开始使用这个模板：</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>
            编辑此页面：<code className="bg-gray-200 px-1 py-0.5 rounded text-sm">app/page.tsx</code>
          </li>
          <li>
            修改导航栏：<code className="bg-gray-200 px-1 py-0.5 rounded text-sm">components/Navbar.tsx</code>
          </li>
          <li>
            连接数据库：检查 <code className="bg-gray-200 px-1 py-0.5 rounded text-sm">.env.local</code> 配置
          </li>
          <li>
            添加博客文章：在 <code className="bg-gray-200 px-1 py-0.5 rounded text-sm">app/blog</code> 目录下创建页面
          </li>
        </ul>
      </div>

      {/* 底部引导 */}
      <p className="text-gray-600">
        准备好了吗？如果有问题，请查看 <a href="#" className="text-blue-600 hover:underline">Next.js 文档</a> 或直接开始编码！
      </p>
    </div>
  );
}