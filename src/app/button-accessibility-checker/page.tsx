import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Button Accessibility Checker - Free Online Color Tool',
  description: 'Verify button color combinations meet accessibility standards.',
}

export default function Page() {
  return <ToolPageClient />
}
