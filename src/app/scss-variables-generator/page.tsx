import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'SCSS Variables Generator - Free Online Color Tool',
  description: 'Generate SCSS variable definitions from your color palette.',
}

export default function Page() {
  return <ToolPageClient />
}
