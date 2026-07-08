'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { hsvToRgb } from '@/lib/converters'

const example = 'hsv(348, 100%, 100%)'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="HSV to RGB"
      description="HSV to RGB. Free online color tool for developers and designers."
      onConvert={hsvToRgb}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
