import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'AAA Contrast Checker - Free Online Color Tool',
  description: 'Verify color pairs meet the strictest WCAG AAA compliance level (7:1 ratio).',
}

export default function Page() {
  return <ToolPageClient />
}
