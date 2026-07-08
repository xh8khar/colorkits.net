'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { rgbToHsl } from '@/lib/converters'

const example = 'rgb(255, 0, 68)'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="RGB to HSL"
      description="RGB to HSL. Free online color tool for developers and designers."
      onConvert={rgbToHsl}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
