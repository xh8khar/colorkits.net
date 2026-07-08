import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Highlight Detector - Free Online Color Tool',
  description: 'Highlight Detector. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
