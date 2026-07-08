import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Readability Checker - Free Online Color Tool',
  description: 'Assess text readability based on color contrast and accessibility guidelines.',
}

export default function Page() {
  return <ToolPageClient />
}
