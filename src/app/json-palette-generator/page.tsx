import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'JSON Palette Generator - Free Online Color Tool',
  description: 'Generate structured JSON palette files for your design system.',
}

export default function Page() {
  return <ToolPageClient />
}
