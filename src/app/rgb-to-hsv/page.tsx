import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'RGB to HSV - Free Online Color Tool',
  description: 'RGB to HSV. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
