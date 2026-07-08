import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Contrast Matrix Generator - Free Online Color Tool',
  description: 'Compare contrast ratios across multiple color pairs in a matrix view.',
}

export default function Page() {
  return <ToolPageClient />
}
