import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Color Similarity Checker - Free Online Color Tool',
  description: 'Measure how similar or different two colors are using Delta E perceptual difference.',
}

export default function Page() {
  return <ToolPageClient />
}
