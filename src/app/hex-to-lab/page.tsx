import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'HEX to LAB - Free Online Color Tool',
  description: 'HEX to LAB. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
