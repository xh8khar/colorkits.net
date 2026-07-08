import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Light Mode Contrast Checker - Free Online Color Tool',
  description: 'Verify color contrast ratios for light mode interface designs.',
}

export default function Page() {
  return <ToolPageClient />
}
