import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Dynamic Theme Generator - Free Online Color Tool',
  description: 'Dynamic Theme Generator. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
