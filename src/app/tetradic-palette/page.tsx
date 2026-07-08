import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Tetradic Palette - Free Online Color Tool',
  description: 'Tetradic Palette. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
