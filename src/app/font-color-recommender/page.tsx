import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Font Color Recommender - Free Online Color Tool',
  description: 'Get accessible font color recommendations for any background color.',
}

export default function Page() {
  return <ToolPageClient />
}
