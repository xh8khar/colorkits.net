'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { colorBlindSimulate } from '@/lib/converters'
const simulate = (input: string) => colorBlindSimulate(input, 'achromatopsia')
const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="Color Blindness Simulator"
      description="Preview your designs through the eyes of users with color blindness."
      onConvert={simulate}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
