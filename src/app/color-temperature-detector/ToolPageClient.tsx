'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { colorTemperature } from '@/lib/converters'
const detectTemp = (input: string) => `Color temperature: ${colorTemperature(input)}`
const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="Color Temperature Detector"
      description="Color Temperature Detector. Free online color tool for developers and designers."
      onConvert={detectTemp}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
