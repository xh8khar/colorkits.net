import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Background Color Detector - Free Online Color Tool',
  description: 'Background Color Detector. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
