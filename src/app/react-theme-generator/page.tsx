import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'React Theme Generator - Free Online Color Tool',
  description: 'Generate React theme provider configuration from color palettes.',
}

export default function Page() {
  return <ToolPageClient />
}
