import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'APCA Contrast Checker - Free Online Color Tool',
  description: 'Evaluate contrast using the Advanced Perceptual Contrast Algorithm (APCA).',
}

export default function Page() {
  return <ToolPageClient />
}
