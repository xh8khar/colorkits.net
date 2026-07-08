import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'CSS Variable Converter - Free Online Color Tool',
  description: 'CSS Variable Converter. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
