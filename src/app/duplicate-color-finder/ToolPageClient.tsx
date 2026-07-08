'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { deltaE } from '@/lib/converters'
const calcDeltaE = (input: string) => {
  const [c1, c2] = input.split('\n').map(s => s.trim())
  if (!c1 || !c2) throw new Error('Provide two colors separated by a newline')
  return `Delta E: ${deltaE(c1, c2).toFixed(2)}`
}
const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="Duplicate Color Finder"
      description="Find and identify duplicate colors within your palette or color list."
      onConvert={calcDeltaE}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
