import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Color Compliance Checker - Free Online Color Tool',
  description: 'Comprehensive color compliance checking against global accessibility standards.',
}

export default function Page() {
  return <ToolPageClient />
}
