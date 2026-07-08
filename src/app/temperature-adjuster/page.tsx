import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Temperature Adjuster - Free Online Color Tool',
  description: 'Temperature Adjuster. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
