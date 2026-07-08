import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Swift Color Assets Generator - Free Online Color Tool',
  description: 'Generate Swift color asset definitions for iOS development.',
}

export default function Page() {
  return <ToolPageClient />
}
