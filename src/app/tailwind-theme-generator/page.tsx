import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Tailwind Theme Generator - Free Online Color Tool',
  description: 'Generate Tailwind CSS theme configuration from your color palette.',
}

export default function Page() {
  return <ToolPageClient />
}
