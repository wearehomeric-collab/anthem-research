'use client'

import React from 'react'

interface TocItem {
  id: string
  number: string
  label: string
}

interface TableOfContentsProps {
  items: TocItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  return (
    <nav className="space-y-1">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="group flex items-center gap-4 py-3 px-4 border border-transparent hover:border-[#1E3A5F] hover:bg-[#0C1220] transition-all duration-200"
        >
          <span className="font-mono text-sm text-[#3B82F6] w-8 shrink-0">{item.number}</span>
          <span className="text-[#E2E8F0] group-hover:text-white transition-colors text-sm">
            {item.label}
          </span>
        </a>
      ))}
    </nav>
  )
}
