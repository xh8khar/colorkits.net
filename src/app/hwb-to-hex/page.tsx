import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'HWB to HEX - Free Online Color Tool',
  description: 'HWB to HEX. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
