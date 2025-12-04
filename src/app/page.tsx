import { prisma } from "@/lib/prisma"; // 引入我们要死要活才配好的 prisma 实例
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

export default async function Home() {
  // 1. 尝试向数据库写入一条数据 (如果是空的)
  const count = await prisma.user.count();
  if (count === 0) {
    await prisma.user.create({
      data: {
        email: "first_user@demo.com",
        name: "我的第一个用户",
      },
    });
  }

  // 2. 从数据库读取所有用户
  const users = await prisma.user.findMany();

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-4">数据库连接测试</h1>
      
      <div className="border p-4 rounded bg-gray-50 text-black">
        <h2 className="font-semibold mb-2">用户列表：</h2>
        {users.map((user: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; email: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
          <div key={user.id} className="flex justify-between border-b py-2">
            <span>{user.name}</span>
            <span className="text-gray-500">{user.email}</span>
          </div>
        ))}
      </div>
      
      <p className="mt-4 text-green-600">
        如果能看到上面的列表，说明全栈链路打通了！🚀
      </p>
    </main>
  );
}