import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Color Wheel - Free Online Color Tool',
  description: 'Explore color relationships with an interactive color wheel visualization.',
}

export default function Page() {
  return <ToolPageClient />
}
