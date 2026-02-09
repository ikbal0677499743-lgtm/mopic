'use client'

import { ReactNode, useState } from 'react'
import { cn } from '@/lib/utils/cn'
import { ChevronDown } from 'lucide-react'

interface DropdownProps {
  trigger: ReactNode
  children: ReactNode
  className?: string
}

export function Dropdown({ trigger, children, className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div
            className={cn(
              'absolute right-0 z-20 mt-2 min-w-[200px] rounded-md border bg-white py-1 shadow-lg',
              className
            )}
          >
            {children}
          </div>
        </>
      )}
    </div>
  )
}

export function DropdownItem({
  children,
  onClick,
}: {
  children: ReactNode
  onClick?: () => void
}) {
  return (
    <button
      className="w-full px-4 py-2 text-left hover:bg-gray-100"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
