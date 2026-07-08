'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { rgbToCmyk } from '@/lib/converters'

const example = 'rgb(255, 0, 68)'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="RGB to CMYK"
      description="RGB to CMYK. Free online color tool for developers and designers."
      onConvert={rgbToCmyk}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
