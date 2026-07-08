import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Gradient Shadow Generator - Free Online Color Tool',
  description: 'Gradient Shadow Generator. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
