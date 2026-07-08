import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Multi Color Picker - Free Online Color Tool',
  description: 'Multi Color Picker. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
