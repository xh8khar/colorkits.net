'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { hslToRgb } from '@/lib/converters'

const example = 'hsl(348, 100%, 50%)'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="HSL to RGB"
      description="HSL to RGB. Free online color tool for developers and designers."
      onConvert={hslToRgb}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
