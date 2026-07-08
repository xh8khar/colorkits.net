import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Accessibility Heatmap - Free Online Color Tool',
  description: 'Visualize accessibility issues across your color palette with a heatmap.',
}

export default function Page() {
  return <ToolPageClient />
}
