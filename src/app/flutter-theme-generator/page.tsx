import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Flutter Theme Generator - Free Online Color Tool',
  description: 'Generate Flutter ThemeData color configuration from your palette.',
}

export default function Page() {
  return <ToolPageClient />
}
