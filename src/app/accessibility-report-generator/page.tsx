import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Accessibility Report Generator - Free Online Color Tool',
  description: 'Generate comprehensive accessibility reports for your color choices.',
}

export default function Page() {
  return <ToolPageClient />
}
