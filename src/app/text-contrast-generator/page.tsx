import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Text Contrast Generator - Free Online Color Tool',
  description: 'Find text colors that meet contrast requirements against any background.',
}

export default function Page() {
  return <ToolPageClient />
}
