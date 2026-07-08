import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Transparent Color Detector - Free Online Color Tool',
  description: 'Transparent Color Detector. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
