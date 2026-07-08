'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { hsvToHex } from '@/lib/converters'

const example = 'hsv(348, 100%, 100%)'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="HSV to HEX"
      description="HSV to HEX. Free online color tool for developers and designers."
      onConvert={hsvToHex}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
