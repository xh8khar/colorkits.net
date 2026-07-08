import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Adobe ASE Export - Free Online Color Tool',
  description: 'Export color palettes as Adobe Swatch Exchange (.ase) files.',
}

export default function Page() {
  return <ToolPageClient />
}
