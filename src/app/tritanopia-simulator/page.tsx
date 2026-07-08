import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Tritanopia Simulator - Free Online Color Tool',
  description: 'Simulate how colors appear to users with tritanopia blue-blindness.',
}

export default function Page() {
  return <ToolPageClient />
}
