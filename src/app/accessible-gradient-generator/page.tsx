import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Accessible Gradient Generator - Free Online Color Tool',
  description: 'Create gradients that maintain sufficient contrast throughout.',
}

export default function Page() {
  return <ToolPageClient />
}
