import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'WCAG Contrast Checker - Free Online Color Tool',
  description: 'Check color contrast ratios against WCAG 2.2 accessibility standards for web content.',
}

export default function Page() {
  return <ToolPageClient />
}
