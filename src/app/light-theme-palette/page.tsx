import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Light Theme Palette - Free Online Color Tool',
  description: 'Light Theme Palette. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
