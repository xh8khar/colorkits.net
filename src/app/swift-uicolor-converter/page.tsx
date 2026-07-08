import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Swift UIColor Converter - Free Online Color Tool',
  description: 'Swift UIColor Converter. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
