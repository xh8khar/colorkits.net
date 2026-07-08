import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Gradient Code Generator - Free Online Color Tool',
  description: 'Gradient Code Generator. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
