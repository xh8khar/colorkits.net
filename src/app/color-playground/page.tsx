import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Color Playground - Free Online Color Tool',
  description: 'Experiment with colors interactively in a free-form color playground.',
}

export default function Page() {
  return <ToolPageClient />
}
