import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Palette Importer - Free Online Color Tool',
  description: 'Import color palettes from CSS, JSON, SCSS, and other color file formats.',
}

export default function Page() {
  return <ToolPageClient />
}
