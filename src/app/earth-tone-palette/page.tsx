import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Earth Tone Palette - Free Online Color Tool',
  description: 'Earth Tone Palette. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
