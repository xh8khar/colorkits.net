import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Accessibility Palette Optimizer - Free Online Color Tool',
  description: 'Optimize your color palette to maximize accessibility compliance.',
}

export default function Page() {
  return <ToolPageClient />
}
