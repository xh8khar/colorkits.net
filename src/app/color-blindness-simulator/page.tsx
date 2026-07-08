import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Color Blindness Simulator - Free Online Color Tool',
  description: 'Preview your designs through the eyes of users with color blindness.',
}

export default function Page() {
  return <ToolPageClient />
}
