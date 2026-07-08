import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Opacity Generator - Free Online Color Tool',
  description: 'Opacity Generator. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
