import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'HSL Color Picker - Free Online Color Tool',
  description: 'HSL Color Picker. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
