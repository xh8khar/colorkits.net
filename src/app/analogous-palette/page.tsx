import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Analogous Palette - Free Online Color Tool',
  description: 'Analogous Palette. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
