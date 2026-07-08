import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'CSS Variable Generator - Free Online Color Tool',
  description: 'Generate CSS custom property definitions from your color palette.',
}

export default function Page() {
  return <ToolPageClient />
}
