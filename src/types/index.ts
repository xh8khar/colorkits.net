export interface Tool {
  id: string
  name: string
  description: string
  category: ToolCategory
  slug: string
  icon: string
}

export type ToolCategory =
  | 'converter'
  | 'palette'
  | 'gradient'
  | 'picker'
  | 'accessibility'
  | 'image'
  | 'adjustment'
  | 'reference'
  | 'generator'
  | 'utility'

export interface NavItem {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

export interface FAQItem {
  question: string
  answer: string
}

export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
  icon?: string
}

export interface BlogPost {
  slug: string
  title: string
  description: string
  keywords: string
  content: string
  date: string
  readTime: string
  relatedTools: { name: string; href: string }[]
}
