import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Protanopia Simulator - Free Online Color Tool',
  description: 'Simulate how colors appear to users with protanopia red-blindness.',
}

export default function Page() {
  return <ToolPageClient />
}
