import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Triadic Palette - Free Online Color Tool',
  description: 'Triadic Palette. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
