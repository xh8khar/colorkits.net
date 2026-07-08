'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { colorBlindSimulate } from '@/lib/converters'
const simulate = (input: string) => colorBlindSimulate(input, 'tritanopia')
const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="Tritanopia Simulator"
      description="Simulate how colors appear to users with tritanopia blue-blindness."
      onConvert={simulate}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
