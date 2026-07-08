'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { colorBlindSimulate } from '@/lib/converters'
const simulate = (input: string) => colorBlindSimulate(input, 'deuteranopia')
const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="Deuteranopia Simulator"
      description="Simulate how colors appear to users with deuteranopia green-blindness."
      onConvert={simulate}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
