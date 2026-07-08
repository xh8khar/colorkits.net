import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Design Token Generator - Free Online Color Tool',
  description: 'Generate cross-platform design tokens from your color palette.',
}

export default function Page() {
  return <ToolPageClient />
}
