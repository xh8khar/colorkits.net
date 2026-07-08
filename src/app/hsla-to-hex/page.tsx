import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'HSLA to HEX - Free Online Color Tool',
  description: 'HSLA to HEX. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
