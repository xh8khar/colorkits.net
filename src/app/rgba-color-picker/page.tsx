import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'RGBA Color Picker - Free Online Color Tool',
  description: 'RGBA Color Picker. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
