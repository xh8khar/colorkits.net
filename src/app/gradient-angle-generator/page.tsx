import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Gradient Angle Generator - Free Online Color Tool',
  description: 'Gradient Angle Generator. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
