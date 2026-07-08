import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Duplicate Color Finder - Free Online Color Tool',
  description: 'Find and identify duplicate colors within your palette or color list.',
}

export default function Page() {
  return <ToolPageClient />
}
