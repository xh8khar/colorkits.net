import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Mobile App Palette - Free Online Color Tool',
  description: 'Mobile App Palette. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
