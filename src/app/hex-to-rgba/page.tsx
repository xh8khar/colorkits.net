import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'HEX to RGBA - Free Online Color Tool',
  description: 'HEX to RGBA. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
