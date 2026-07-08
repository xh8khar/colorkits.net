'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { cssColorConverter } from '@/lib/converters'

const example = 'rgb(255, 0, 68)'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="RGB to HWB"
      description="RGB to HWB. Free online color tool for developers and designers."
      onConvert={cssColorConverter}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
