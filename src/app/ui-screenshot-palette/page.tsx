import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'UI Screenshot Palette - Free Online Color Tool',
  description: 'UI Screenshot Palette. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
