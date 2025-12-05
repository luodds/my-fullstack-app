"use client"

import * as React from "react"
// 修改点：直接从 "next-themes" 引入 ThemeProviderProps，不要加 /dist/types
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}