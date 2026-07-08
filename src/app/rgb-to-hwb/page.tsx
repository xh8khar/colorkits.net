import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'RGB to HWB - Free Online Color Tool',
  description: 'RGB to HWB. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
