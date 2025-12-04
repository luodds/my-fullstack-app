// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="w-full py-10 mt-10 text-center text-gray-500 text-sm">
      <p>&copy; {new Date().getFullYear()} 你的名字. 保留所有权利。</p>
      <div className="flex justify-center gap-4 mt-2">
        <a href="#" className="hover:text-black">隐私政策</a>
        <a href="#" className="hover:text-black">联系我</a>
      </div>
    </footer>
  );
}