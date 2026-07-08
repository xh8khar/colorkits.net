import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Figma Color Export - Free Online Color Tool',
  description: 'Export your color palettes in Figma-compatible format for design systems.',
}

export default function Page() {
  return <ToolPageClient />
}
