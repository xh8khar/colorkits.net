import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Shadow Detector - Free Online Color Tool',
  description: 'Shadow Detector. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
