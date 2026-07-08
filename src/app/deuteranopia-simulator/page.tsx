import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Deuteranopia Simulator - Free Online Color Tool',
  description: 'Simulate how colors appear to users with deuteranopia green-blindness.',
}

export default function Page() {
  return <ToolPageClient />
}
