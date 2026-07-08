import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Accessible Palette Generator - Free Online Color Tool',
  description: 'Generate color palettes that meet WCAG accessibility requirements.',
}

export default function Page() {
  return <ToolPageClient />
}
