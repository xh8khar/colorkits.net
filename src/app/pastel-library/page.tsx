import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Pastel Library - Free Online Color Tool',
  description: 'Pastel Library. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
