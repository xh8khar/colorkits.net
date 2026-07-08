import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'AA Contrast Checker - Free Online Color Tool',
  description: 'Check color combinations against WCAG AA standards (4.5:1 ratio).',
}

export default function Page() {
  return <ToolPageClient />
}
