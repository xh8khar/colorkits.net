'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { cssColorConverter } from '@/lib/converters'

const example = 'hwb(348, 0%, 0%)'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="HWB to RGB"
      description="HWB to RGB. Free online color tool for developers and designers."
      onConvert={cssColorConverter}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
