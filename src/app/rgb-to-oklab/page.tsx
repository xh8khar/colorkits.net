import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'RGB to OKLab - Free Online Color Tool',
  description: 'RGB to OKLab. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
