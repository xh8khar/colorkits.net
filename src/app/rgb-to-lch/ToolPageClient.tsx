'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { rgbToLch } from '@/lib/converters'

const example = 'rgb(255, 0, 68)'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="RGB to LCH"
      description="RGB to LCH. Free online color tool for developers and designers."
      onConvert={rgbToLch}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
