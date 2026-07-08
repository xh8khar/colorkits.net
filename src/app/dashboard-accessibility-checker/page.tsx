import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Dashboard Accessibility Checker - Free Online Color Tool',
  description: 'Evaluate dashboard color schemes for data visualization accessibility.',
}

export default function Page() {
  return <ToolPageClient />
}
