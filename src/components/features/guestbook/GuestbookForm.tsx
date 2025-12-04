"use client";

import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { addEntry } from "@/actions/guestbook";

export default function GuestbookForm() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await addEntry(formData);
        formRef.current?.reset();
      }}
      // ✨ 魔法时刻：
      // bg-card: 自动适配亮色(白) / 暗色(深黑)
      // border-border: 自动适配边框颜色
      className="flex flex-col gap-4 mb-12 p-6 rounded-lg border bg-card border-border shadow-sm"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="username" className="text-sm font-medium text-foreground">
          你的名字
        </label>
        <input
          id="username"
          name="username"
          placeholder="请输入名字"
          required
          // ✨ bg-background: 输入框背景
          // ✨ text-foreground: 输入文字颜色
          className="p-3 rounded-md border border-input bg-background text-foreground 
                     placeholder:text-muted-foreground outline-none
                     focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="content" className="text-sm font-medium text-foreground">
          留言内容
        </label>
        <textarea
          id="content"
          name="content"
          placeholder="写下你的想法..."
          rows={3}
          required
          className="p-3 rounded-md border border-input bg-background text-foreground 
                     placeholder:text-muted-foreground outline-none resize-none
                     focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
        />
      </div>
      
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      // ✨ bg-primary: 主题色
      // ✨ text-primary-foreground: 确保在主题色上文字可读
      className={`py-2.5 px-4 rounded-md font-medium text-primary-foreground transition-all
        ${pending 
          ? "bg-muted cursor-not-allowed opacity-70" 
          : "bg-primary hover:opacity-90 active:scale-[0.98] shadow-sm"
        }`}
    >
      {pending ? "正在提交..." : "提交留言"}
    </button>
  );
}