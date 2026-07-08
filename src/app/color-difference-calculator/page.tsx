import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Color Difference Calculator - Free Online Color Tool',
  description: 'Calculate the precise Delta E perceptual difference between two colors.',
}

export default function Page() {
  return <ToolPageClient />
}
