import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Dark Mode Contrast Checker - Free Online Color Tool',
  description: 'Verify color contrast ratios specifically for dark mode interfaces.',
}

export default function Page() {
  return <ToolPageClient />
}
