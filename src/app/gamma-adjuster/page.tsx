import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Gamma Adjuster - Free Online Color Tool',
  description: 'Gamma Adjuster. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
