'use client'
import ColorPickerTool from '@/components/tools/ColorPickerTool'

export default function ToolPageClient() {
  return (
    <ColorPickerTool title="Alpha Color Picker" description="Alpha Color Picker. Free online color tool for developers and designers." mode="alpha" showAlpha={true} />
  )
}
