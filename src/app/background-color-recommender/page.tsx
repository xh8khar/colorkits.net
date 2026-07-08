import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Background Color Recommender - Free Online Color Tool',
  description: 'Find accessible background colors that work with your text colors.',
}

export default function Page() {
  return <ToolPageClient />
}
