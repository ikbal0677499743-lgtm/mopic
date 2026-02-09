'use client'

import { ReactNode } from 'react'

interface EditorLayoutProps {
  children: ReactNode
}

export function EditorLayout({ children }: EditorLayoutProps) {
  return (
    <div className="flex h-screen flex-col bg-gray-50">
      {children}
    </div>
  )
}
