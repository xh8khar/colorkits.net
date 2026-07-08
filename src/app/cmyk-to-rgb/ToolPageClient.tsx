'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { cmykToRgb } from '@/lib/converters'

const example = 'cmyk(0, 100%, 73%, 0%)'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="CMYK to RGB"
      description="CMYK to RGB. Free online color tool for developers and designers."
      onConvert={cmykToRgb}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
