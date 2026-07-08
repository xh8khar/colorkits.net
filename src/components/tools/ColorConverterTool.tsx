'use client'
import ToolLayout from './ToolLayout'

interface ColorConverterToolProps {
  title: string
  description: string
  convertFn: (input: string) => string | Promise<string>
  reverseFn?: (input: string) => string | Promise<string>
  exampleInput?: string
  colorPreview?: string
  bidirectional?: boolean
}

export default function ColorConverterTool(props: ColorConverterToolProps) {
  const { title, description, convertFn, reverseFn, exampleInput, colorPreview, bidirectional } = props
  return (
    <ToolLayout
      title={title}
      description={description}
      onConvert={convertFn}
      onReverse={reverseFn}
      exampleInput={exampleInput}
      colorPreview={colorPreview}
      bidirectional={bidirectional}
    />
  )
}
