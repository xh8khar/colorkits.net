import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'HSLA Color Picker - Free Online Color Tool',
  description: 'HSLA Color Picker. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
