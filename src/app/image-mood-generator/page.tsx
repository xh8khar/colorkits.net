import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Image Mood Generator - Free Online Color Tool',
  description: 'Image Mood Generator. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
