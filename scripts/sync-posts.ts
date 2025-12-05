import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 1. 定义源目录和目标目录
const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

// 定义图片在 public 下的存放根路径 (例如: public/images/blog)
const BLOG_IMAGES_WEB_PATH = '/images/blog';
const BLOG_IMAGES_SYS_PATH = path.join(PUBLIC_DIR, 'images', 'blog');

/**
 * 核心功能：处理 Markdown 中的图片
 * 1. 找到图片引用
 * 2. 复制图片到 public 目录
 * 3. 返回替换了路径后的新 Markdown 内容
 */
function processContentAndImages(content: string, slug: string, mdFilePath: string): string {
  // 正则匹配 Markdown 图片语法: ![alt](url)
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;

  return content.replace(imageRegex, (match, alt, originalUrl) => {
    // A. 如果是网络图片 (http开头)，直接忽略，不做处理
    if (originalUrl.startsWith('http') || originalUrl.startsWith('//')) {
      return match;
    }

    // B. 处理本地图片
    try {
      // 1. 确定源图片路径 (假设图片和 .md 文件在同一目录，或者在相对目录)
      const mdDir = path.dirname(mdFilePath);
      const sourceImagePath = path.resolve(mdDir, originalUrl);

      if (!fs.existsSync(sourceImagePath)) {
        console.warn(`   ⚠️ 警告: 找不到图片 ${originalUrl} (在 ${slug} 中)`);
        return match; // 找不到文件就不替换，保持原样
      }

      // 2. 确定目标路径 (public/images/blog/[slug]/[filename])
      // 使用 slug 做文件夹，避免不同文章的图片重名冲突
      const imageFileName = path.basename(originalUrl);
      const targetDir = path.join(BLOG_IMAGES_SYS_PATH, slug);
      const targetPath = path.join(targetDir, imageFileName);

      // 3. 确保目标文件夹存在
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      // 4. 复制文件 (如果目标已存在且大小一样，可以跳过，这里简单起见每次都覆盖)
      fs.copyFileSync(sourceImagePath, targetPath);
      // console.log(`   🖼️ 已搬运图片: ${imageFileName}`);

      // 5. 生成新的 Web 路径 (存入数据库的路径)
      // 结果类似: /images/blog/my-post/image.png
      const newWebUrl = `${BLOG_IMAGES_WEB_PATH}/${slug}/${imageFileName}`;
      
      return `![${alt}](${newWebUrl})`;

    } catch (error) {
      console.error(`   ❌ 处理图片出错: ${originalUrl}`, error);
      return match;
    }
  });
}

async function syncPosts() {
  console.log('🚀 开始同步文章 (含图片处理)...');

  if (!fs.existsSync(POSTS_DIR)) {
    console.error(`❌ 目录不存在: ${POSTS_DIR}`);
    return;
  }

  const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'));
  console.log(`📂 发现 ${files.length} 篇 Markdown 文章`);

  for (const file of files) {
    const filePath = path.join(POSTS_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    if (!data.title || !data.slug) {
      console.warn(`⚠️ 跳过 ${file}: 缺少 title 或 slug`);
      continue;
    }

    console.log(`🔄 处理中: ${data.title}`);

    // 🔥 关键步骤：处理正文中的图片
    const processedContent = processContentAndImages(content, data.slug, filePath);

    await prisma.post.upsert({
      where: { slug: data.slug },
      update: {
        title: data.title,
        content: processedContent, // 注意：这里存入的是处理过路径的内容
        overview: data.description || data.overview || '',
        published: data.published ?? true,
      },
      create: {
        slug: data.slug,
        title: data.title,
        content: processedContent,
        overview: data.description || '',
        published: data.published ?? true,
      },
    });
  }

  console.log('✅ 同步完成！所有图片已搬运至 public 目录。');
}

syncPosts()
  .catch((e) => {
    console.error('❌ 同步出错:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });