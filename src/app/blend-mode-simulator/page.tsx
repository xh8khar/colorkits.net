import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Blend Mode Simulator - Free Online Color Tool',
  description: 'Blend Mode Simulator. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
