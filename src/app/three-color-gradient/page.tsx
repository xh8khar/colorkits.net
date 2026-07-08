import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Three Color Gradient - Free Online Color Tool',
  description: 'Three Color Gradient. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
