import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Darken Color - Free Online Color Tool',
  description: 'Darken Color. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
