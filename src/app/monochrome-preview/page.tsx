import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Monochrome Preview - Free Online Color Tool',
  description: 'Preview your designs in grayscale to test contrast and readability.',
}

export default function Page() {
  return <ToolPageClient />
}
