import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Gaming Palette - Free Online Color Tool',
  description: 'Gaming Palette. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
