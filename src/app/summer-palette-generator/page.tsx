import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Summer Palette Generator - Free Online Color Tool',
  description: 'Summer Palette Generator. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
