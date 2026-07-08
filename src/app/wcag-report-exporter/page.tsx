import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'WCAG Report Exporter - Free Online Color Tool',
  description: 'Export detailed WCAG compliance reports for your color palette.',
}

export default function Page() {
  return <ToolPageClient />
}
