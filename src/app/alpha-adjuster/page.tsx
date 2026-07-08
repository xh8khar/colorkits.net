import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Alpha Adjuster - Free Online Color Tool',
  description: 'Alpha Adjuster. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
