import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'LAB Color Picker - Free Online Color Tool',
  description: 'LAB Color Picker. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
