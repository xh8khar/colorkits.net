import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Split Complementary Palette - Free Online Color Tool',
  description: 'Split Complementary Palette. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
