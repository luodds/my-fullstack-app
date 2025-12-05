import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PrismaClient } from '@prisma/client';

// 脚本独立运行，直接实例化一个新的 PrismaClient
const prisma = new PrismaClient();

// 文章存放的本地目录
const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

async function syncPosts() {
  console.log('🚀 开始同步文章...');

  // 1. 确保目录存在
  if (!fs.existsSync(POSTS_DIR)) {
    console.error(`❌ 目录不存在: ${POSTS_DIR}`);
    console.log('请先创建 content/posts 文件夹并放入 .md 文件');
    return;
  }

  // 2. 读取所有 .md 文件
  const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'));
  console.log(`📂 发现 ${files.length} 篇 Markdown 文章`);

  for (const file of files) {
    const filePath = path.join(POSTS_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // 3. 解析 Frontmatter (元数据) 和 正文
    const { data, content } = matter(fileContent);

    // 必要的校验
    if (!data.title) {
      console.warn(`⚠️ 跳过 ${file}: 缺少 title 字段`);
      continue;
    }
    
    if (!data.slug) {
      console.warn(`⚠️ 跳过 ${file}: 缺少 slug 字段`);
      continue;
    }

    console.log(`🔄 正在处理: ${data.title} (${data.slug})`);

    // 4. Upsert (更新或插入) 到数据库
    // 如果 slug 存在就更新，不存在就创建
    await prisma.post.upsert({
      where: { slug: data.slug },
      update: {
        title: data.title,
        content: content, // 正文部分
        overview: data.description || data.overview || '', // 兼容 description 字段
        published: data.published ?? true, // 默认发布
        // 如果你还想同步创建时间，可以在这里加: createdAt: new Date(data.date)
      },
      create: {
        slug: data.slug,
        title: data.title,
        content: content,
        overview: data.description || '',
        published: data.published ?? true,
      },
    });
  }

  console.log('✅ 同步完成！🎉');
}

syncPosts()
  .catch((e) => {
    console.error('❌ 同步出错:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
});