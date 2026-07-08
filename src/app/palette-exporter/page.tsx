import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Palette Exporter - Free Online Color Tool',
  description: 'Export your color palettes in CSS, SCSS, JSON, and other popular formats.',
}

export default function Page() {
  return <ToolPageClient />
}
