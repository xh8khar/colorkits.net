import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Image Color Counter - Free Online Color Tool',
  description: 'Image Color Counter. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
