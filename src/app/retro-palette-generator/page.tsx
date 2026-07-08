import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Retro Palette Generator - Free Online Color Tool',
  description: 'Retro Palette Generator. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
