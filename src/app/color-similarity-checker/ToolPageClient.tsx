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
      title="Color Similarity Checker"
      description="Measure how similar or different two colors are using Delta E perceptual difference."
      onConvert={calcDeltaE}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
