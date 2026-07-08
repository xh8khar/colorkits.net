import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Image to CSS Gradient - Free Online Color Tool',
  description: 'Image to CSS Gradient. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
