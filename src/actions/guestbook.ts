// src/actions/guestbook.ts
"use server"; // 👈 关键！标记这是一个在服务端运行的 Server Action

import { prisma } from "@/lib/prisma"; // 引入你配置好的单例 Prisma 客户端
import { revalidatePath } from "next/cache";

export async function addEntry(formData: FormData) {
  // 1. 从表单数据中提取值
  // .get('name') 对应前端 input 的 name 属性
  const content = formData.get("content") as string;
  const username = formData.get("username") as string;

  if (!content || !username) {
    return; // 简单校验，如果有空值就不处理
  }

  // 2. 写入数据库
  await prisma.guestbook.create({
    data: {
      content: content,
      username: username,
    },
  });

  // 3. 刷新页面缓存
  // 告诉 Next.js: "/guestbook" 这个页面的数据变了，下次访问或当前页面需要重新获取最新数据
  revalidatePath("/guestbook");
}