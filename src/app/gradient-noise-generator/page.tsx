import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Gradient Noise Generator - Free Online Color Tool',
  description: 'Gradient Noise Generator. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
