import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'UI Accessibility Tester - Free Online Color Tool',
  description: 'Test entire UI component color schemes for accessibility compliance.',
}

export default function Page() {
  return <ToolPageClient />
}
