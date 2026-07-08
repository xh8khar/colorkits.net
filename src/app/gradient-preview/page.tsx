import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Gradient Preview - Free Online Color Tool',
  description: 'Gradient Preview. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
