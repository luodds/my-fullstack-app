// src/app/guestbook/page.tsx
import { prisma } from "@/lib/prisma";
import GuestbookForm from "@/components/features/guestbook/GuestbookForm"; // 👈 引入新组件

export default async function GuestbookPage() {
  const entries = await prisma.guestbook.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">留言板</h1>

      {/* 使用新的客户端组件 */}
      <GuestbookForm />

      <div className="space-y-4">
        {entries.map((entry) => (
          <div key={entry.id} className="border p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-lg">{entry.username}</span>
              <span className="text-sm text-gray-500">
                {entry.createdAt.toLocaleString()}
              </span>
            </div>
            <p className="text-gray-700">{entry.content}</p>
          </div>
        ))}
         {entries.length === 0 && (
          <p className="text-center text-gray-500">还没有留言，快来抢沙发！</p>
        )}
      </div>
    </div>
  );
}