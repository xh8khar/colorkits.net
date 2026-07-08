import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'UI Palette Generator - Free Online Color Tool',
  description: 'UI Palette Generator. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
