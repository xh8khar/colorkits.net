import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Android Colors.xml Generator - Free Online Color Tool',
  description: 'Generate Android colors.xml resource files from your palette.',
}

export default function Page() {
  return <ToolPageClient />
}
