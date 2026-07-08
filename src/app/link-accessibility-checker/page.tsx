import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Link Accessibility Checker - Free Online Color Tool',
  description: 'Check link color contrast against surrounding text and backgrounds.',
}

export default function Page() {
  return <ToolPageClient />
}
