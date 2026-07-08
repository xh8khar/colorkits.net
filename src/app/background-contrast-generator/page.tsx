import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Background Contrast Generator - Free Online Color Tool',
  description: 'Generate accessible background colors for any foreground text color.',
}

export default function Page() {
  return <ToolPageClient />
}
