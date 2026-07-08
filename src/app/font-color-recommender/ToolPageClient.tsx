'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { contrastRatio, wcagLevel } from '@/lib/converters'
const checkContrast = (input: string) => {
  const [c1, c2] = input.split('\n').map(s => s.trim())
  if (!c1 || !c2) throw new Error('Provide two colors separated by a newline')
  const ratio = contrastRatio(c1, c2)
  const level = wcagLevel(ratio)
  return `Contrast Ratio: ${ratio.toFixed(2)}:1\nWCAG Level: ${level}`
}
const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="Font Color Recommender"
      description="Get accessible font color recommendations for any background color."
      onConvert={checkContrast}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
