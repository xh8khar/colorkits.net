import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Color Equalizer - Free Online Color Tool',
  description: 'Color Equalizer. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
