import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Color Vision Test - Free Online Color Tool',
  description: 'Test your own color vision with interactive color discrimination tests.',
}

export default function Page() {
  return <ToolPageClient />
}
