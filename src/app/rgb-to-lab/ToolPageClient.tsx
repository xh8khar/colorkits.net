'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { rgbToLab } from '@/lib/converters'

const example = 'rgb(255, 0, 68)'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="RGB to LAB"
      description="RGB to LAB. Free online color tool for developers and designers."
      onConvert={rgbToLab}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
