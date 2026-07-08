import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Dark Theme Palette - Free Online Color Tool',
  description: 'Dark Theme Palette. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
