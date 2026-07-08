'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { colorBlindSimulate } from '@/lib/converters'
const simulate = (input: string) => colorBlindSimulate(input, 'protanopia')
const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="Protanopia Simulator"
      description="Simulate how colors appear to users with protanopia red-blindness."
      onConvert={simulate}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
