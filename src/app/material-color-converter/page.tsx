import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Material Color Converter - Free Online Color Tool',
  description: 'Material Color Converter. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
