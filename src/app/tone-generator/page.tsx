import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Tone Generator - Free Online Color Tool',
  description: 'Tone Generator. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
