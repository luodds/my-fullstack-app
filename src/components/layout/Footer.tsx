export default function Footer() {
  return (
    // ✨ 语义化改造：
    // border-t border-border: 顶部边框
    // bg-muted/30: 极浅的背景色，区分内容区
    // text-muted-foreground: 次要文字颜色
    <footer className="w-full py-10 mt-10 border-t border-border bg-muted/30">
      <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} MyFullStack. 保留所有权利。</p>
        <div className="flex justify-center gap-6 mt-4 font-medium">
          {/* hover:text-foreground: 悬浮时变成主要文字颜色 */}
          <a href="#" className="hover:text-foreground transition-colors">隐私政策</a>
          <a href="#" className="hover:text-foreground transition-colors">联系我</a>
        </div>
      </div>
    </footer>
  );
}