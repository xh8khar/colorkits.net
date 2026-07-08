import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Contrast Fix Generator - Free Online Color Tool',
  description: 'Automatically suggest color adjustments to fix contrast failures.',
}

export default function Page() {
  return <ToolPageClient />
}
