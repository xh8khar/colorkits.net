import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Rainbow Palette - Free Online Color Tool',
  description: 'Rainbow Palette. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
