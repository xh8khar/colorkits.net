import { tools } from '@/lib/navigation'

export interface ToolContent {
  whatIs: string
  howToUse: string[]
  faq: { question: string; answer: string }[]
  relatedTools: { slug: string; name: string }[]
}

const colorSpaces: Record<string, string> = {
  hex: '**HEX** (hexadecimal) is a six-digit color code prefixed with `#`, using base-16 notation to represent red, green, and blue channels — for example, `#ff0044`. Each channel ranges from `00` (0) to `ff` (255). It is the most common color format in web development and CSS, valued for its compactness and direct mapping to display colors.',
  rgb: '**RGB** (Red, Green, Blue) is an additive color model used in digital displays and screens. Colors are created by combining red, green, and blue light at varying intensities from 0 to 255. It is expressed as `rgb(red, green, blue)` and forms the foundation of nearly all digital color representation.',
  rgba: '**RGBA** extends the RGB color model by adding an **alpha channel** that controls transparency. The alpha value ranges from 0.0 (fully transparent) to 1.0 (fully opaque), written as `rgba(red, green, blue, alpha)`. RGBA is essential for creating layered designs, shadows, and overlay effects in CSS and graphics programming.',
  hsl: '**HSL** (Hue, Saturation, Lightness) is a cylindrical color model that describes colors more intuitively than RGB. **Hue** is the color type measured in degrees (0–360) on the color wheel. **Saturation** (0–100%) controls the intensity, from gray to fully vibrant. **Lightness** (0–100%) controls brightness, from black to white. HSL is widely preferred by designers for creating harmonious color schemes.',
  hsla: '**HSLA** adds an alpha transparency channel to the HSL model, written as `hsla(hue, saturation%, lightness%, alpha)`. It gives designers the expressiveness of HSL — intuitive hue, saturation, and lightness controls — combined with the ability to create semi-transparent colors for overlays, shadows, and layered UI elements.',
  hsv: '**HSV** (Hue, Saturation, Value) is similar to HSL but uses **Value** (brightness) instead of Lightness. In HSV, Value represents the maximum intensity of the color, making it the preferred model for color picking in graphics software. Saturation controls how far from gray the color is, and Hue is the base pigment on the color wheel.',
  cmyk: '**CMYK** (Cyan, Magenta, Yellow, Key/Black) is a **subtractive color model** used in color printing. Unlike RGB which adds light, CMYK works by subtracting light using ink on paper. Ink percentages range from 0% to 100% for each channel. Converting from RGB/HEX to CMYK is essential for print design — what looks vibrant on screen may appear duller in print.',
  lab: '**LAB** (CIELAB or L*a*b*) is a perceptually uniform color space developed by the International Commission on Illumination (CIE). **L** represents lightness (0–100), **a** represents the green–red axis, and **b** represents the blue–yellow axis. LAB is designed to approximate human vision, making it ideal for color difference measurement and analysis.',
  lch: '**LCH** (Lightness, Chroma, Hue) is the cylindrical form of the LAB color space. **Lightness** (0–100) matches LAB, **Chroma** (0–~230) represents color intensity/saturation, and **Hue** (0–360) is the angle on the color wheel. LCH is more intuitive than LAB for designers while maintaining perceptual uniformity.',
  oklab: '**OKLab** is a modern perceptually uniform color space developed by Björn Ottosson in 2020. It improves upon CIELAB by providing better hue linearity and more uniform lightness perception. OKLab is optimized for computer graphics and modern display hardware, making it ideal for gradients, color interpolation, and image processing.',
  oklch: '**OKLCH** is the cylindrical representation of OKLab, similar to how LCH relates to LAB. It expresses colors as **Lightness** (0–1), **Chroma** (0–~0.4), and **Hue** (0–360). OKLCH is gaining popularity in modern CSS and design tools because it combines perceptual uniformity with an intuitive hue-chroma-lightness interface.',
  hwb: '**HWB** (Hue, Whiteness, Blackness) is an intuitive color model where **Hue** (0–360) is the base color, **Whiteness** (0–100%) is the amount of white mixed in, and **Blackness** (0–100%) is the amount of black mixed in. HWB is designed to be easier for humans to reason about than HSL — just pick a hue and add white or black to create shades and tints.',
}

const platformDescriptions: Record<string, string> = {
  'css-color-converter': 'CSS supports multiple color notations including named colors (`red`), hexadecimal (`#ff0044`), `rgb()`, `rgba()`, `hsl()`, `hsla()`, `hwb()`, `lab()`, `lch()`, `oklab()`, and `oklch()`. Each format has different use cases: hex for compactness, RGB for programmatic control, HSL for intuitive adjustments, and OKLCH for perceptually uniform color manipulation.',
  'tailwind-color-converter': 'Tailwind CSS uses a curated color system with named shades like `red-500`, `blue-600`, and `green-200`. Each shade represents a specific step in a lightness scale for that hue. Converting between Tailwind class names and raw hex/RGB values helps bridge design tokens and utility classes.',
  'material-color-converter': 'Material Design 3 defines a comprehensive color system based on tonal palettes. Each primary color generates a range of tones from light to dark, with specific roles like primary, secondary, tertiary, error, and surface colors. Converting Material color names to their hex equivalents is essential for implementing Material Design in code.',
  'android-xml-color-converter': 'Android uses XML color resource files (`res/values/colors.xml`) to define colors as `<color name="name">#AARRGGBB</color>` entries. This format uses an 8-digit hex with alpha as the first two digits (AA). Converting between Android XML syntax and standard color formats is necessary for Android app development.',
  'swift-uicolor-converter': 'Swift\'s `UIColor` initializer accepts values in multiple formats including `UIColor(red:green:blue:alpha:)`, `UIColor(hex:)`, and named colors. iOS developers frequently convert between hex codes and UIColor syntax when implementing design mockups in code.',
  'flutter-color-converter': 'Flutter\'s `Color` class uses an ARGB hex integer format: `Color(0xAARRGGBB)` where 0xFF is fully opaque. The Flutter framework also provides `Colors` constants like `Colors.blue.shade200`. Converting between standard color formats and Dart/Flutter syntax accelerates mobile app development.',
  'kotlin-color-converter': 'Kotlin Android development uses `Color.parseColor("#RRGGBB")`, `Color.argb()`, and `ContextCompat.getColor()` for color handling. Kotlin extensions often add convenience methods for hex-to-color conversion. Converting between formats bridges the gap between design tools and Kotlin code.',
  'java-color-converter': 'Java\'s `java.awt.Color` and `android.graphics.Color` classes provide `Color(r, g, b)`, `Color.decode()`, and `Color.parseColor()` for creating colors from different representations. Java developers converting between hex and Color objects helps translate design specs into code.',
  'csharp-color-converter': 'C# uses `System.Drawing.Color` with `Color.FromArgb()`, `Color.FromName()`, and `ColorTranslator` for color handling. In WPF and XAML, colors use `#AARRGGBB` hex format. Converting between these formats streamlines .NET and Unity development workflows.',
  'python-color-converter': 'Python libraries like `matplotlib`, `PIL/Pillow`, and `pygame` handle colors differently — from hex strings to RGB tuples to normalized float values. Web frameworks use hex, while data visualization libraries often expect tuples. Converting between these formats is essential for Python-based graphics and web development.',
  'css-variable-converter': 'CSS custom properties (variables) enable reusable color definitions like `--primary: #f43f5e`. They support dynamic theming, dark mode switching, and cleaner stylesheet organization. Converting between raw color values and CSS variable syntax helps architects design scalable design token systems.',
  'json-color-converter': 'JSON color representation structures color data as key-value pairs, commonly used in design tokens, theme files, and configuration. A typical format is `{"primary": "#f43f5e", "surface": "#ffffff"}`. Converting to and from JSON enables programmatic color management in build pipelines and design systems.',
  'scss-color-converter': 'SCSS (Sassy CSS) provides variables (`$primary: #f43f5e`), built-in color functions like `lighten()`, `darken()`, `mix()`, and `adjust-hue()`, and color operations that preprocessors evaluate at compile time. Converting between SCSS syntax and standard color formats enables powerful color manipulation in Sass-based projects.',
  'less-color-converter': 'LESS CSS preprocessor offers color operations similar to SCSS, including `lighten()`, `darken()`, `saturate()`, `spin()`, and `mix()`. LESS variables use the `@` prefix: `@primary: #f43f5e`. Converting to/from LESS syntax helps maintain color consistency in LESS-based projects.',
}

const genericFaq = {
  free: 'Yes, this tool is completely free to use. No registration, no credit card, no hidden charges. All ColorKits tools are free online utilities.',
  privacy: 'No. This tool runs entirely in your browser. Your colors and data are never uploaded to any server, stored, or processed externally. All conversions happen client-side using JavaScript.',
  offline: 'Yes, this tool works completely offline. The entire color conversion logic runs in your browser with no server communication required.',
}

const howToUseTemplates: Record<string, string[]> = {
  converter: [
    'Enter or paste your color value in the input field above. You can type it manually or use the "Load Example" button to try a sample.',
    'Click the "Convert" button to transform your color into the target format. The result will appear instantly in the output panel.',
    'Click "Copy" to copy the converted color value to your clipboard. You can then paste it directly into your code, design tool, or project.',
    'If available, use the "Swap" button to reverse the conversion direction — for example, switching from "HEX to RGB" to "RGB to HEX" mode.',
  ],
  picker: [
    'Interact with the visual color picker area to select your desired color. Click and drag to explore different hues and saturations.',
    'Fine-tune your selection using the color channel sliders. Adjust individual values like hue, saturation, lightness, or RGB channels for precise control.',
    'Preview your selected color in real-time and see its representation in multiple color formats (HEX, RGB, HSL, etc.) displayed in the output panel.',
    'Copy the color value in your preferred format by clicking the "Copy" button. Use the format selector to switch between different color representations.',
  ],
  palette: [
    'Configure your palette parameters — select a seed color, choose a harmony rule, or pick a theme to start generating colors.',
    'Adjust the number of colors, variation range, and other settings to refine your palette to match your design needs.',
    'Review the generated palette in the output panel. Each color is displayed with its hex value for easy reference.',
    'Export your palette using the "Copy" button or use the palette exporter to save in CSS, SCSS, JSON, or other formats for your project.',
  ],
  gradient: [
    'Select your gradient type — linear, radial, or conic — and choose the direction or angle for the color transition.',
    'Add and position color stops along the gradient. Click to add new stops and drag to adjust their positions.',
    'Fine-tune each color stop\'s value using the color picker. Preview the gradient in real-time as you make adjustments.',
    'Copy the generated CSS or SVG gradient code using the "Copy" button, ready to paste directly into your stylesheets.',
  ],
  accessibility: [
    'Enter two colors — typically a foreground (text) color and a background color — separated by a new line in the input panel.',
    'Click "Convert" to calculate the contrast ratio between the two colors. The result shows the ratio (e.g., 4.5:1) and the corresponding WCAG level.',
    'Review the compliance level: AA requires 4.5:1 for normal text, AAA requires 7:1. Adjust your colors if they don\'t meet your target level.',
    'Use the output as guidance to tweak your color choices until they pass the desired accessibility threshold.',
  ],
  image: [
    'Upload an image file using the file input or paste an image URL. Supported formats include PNG, JPEG, GIF, and WebP.',
    'Select the type of analysis you want — palette extraction, dominant color, color histogram, or other image analysis.',
    'Review the extracted colors or analysis results in the output panel. Each color is displayed with its hex value and visual swatch.',
    'Copy individual colors or export the complete palette using the available export options.',
  ],
  adjustment: [
    'Enter a base color in the input field — you can type a hex code, RGB value, or use the "Load Example" button.',
    'Adjust the slider or parameter controls to modify the specific color property — saturation, brightness, hue, or other adjustment.',
    'Preview the adjusted color in real-time alongside the original color to compare the transformation.',
    'Copy the resulting color value using the "Copy" button, then use it in your design, code, or project.',
  ],
  reference: [
    'Browse or search through the reference library to find the color information you need. Use the search bar to filter by name or value.',
    'Click on any color entry to see its details including hex code, RGB values, and other format representations.',
    'Preview the color in the visual swatch area to see how it looks before using it in your project.',
    'Copy the color value in your preferred format using the available copy buttons.',
  ],
  utility: [
    'Enter your input data — a color value, palette, or configuration — depending on the utility tool you are using.',
    'Configure any generation options or parameters available. Each utility provides specific controls tailored to its function.',
    'Review the generated output in the result panel. The tool processes everything client-side for instant results.',
    'Copy or export your results using the available buttons. Results can be copied to clipboard or downloaded as needed.',
  ],
}

const categoryWhatIs: Record<string, (name: string) => string> = {
  converter: (name) => {
    const lower = name.toLowerCase()
    if (lower.includes('css color converter')) {
      return `The **${name}** converts colors between all CSS-supported color formats. ${platformDescriptions['css-color-converter']}`
    }
    if (lower.includes('tailwind')) {
      return `The **${name}** converts between Tailwind CSS color class names and their corresponding raw hex/RGB values. ${platformDescriptions['tailwind-color-converter']}`
    }
    if (lower.includes('material')) {
      return `The **${name}** converts between Material Design color names and their hex code equivalents. ${platformDescriptions['material-color-converter']}`
    }
    if (lower.includes('android xml')) {
      return `The **${name}** converts between standard color formats and Android XML resource syntax. ${platformDescriptions['android-xml-color-converter']}`
    }
    if (lower.includes('swift') || lower.includes('uicolor')) {
      return `The **${name}** converts between hex codes and Swift UIColor initialization syntax. ${platformDescriptions['swift-uicolor-converter']}`
    }
    if (lower.includes('flutter')) {
      return `The **${name}** converts between standard color formats and Flutter/Dart Color constructor syntax. ${platformDescriptions['flutter-color-converter']}`
    }
    if (lower.includes('kotlin')) {
      return `The **${name}** converts between hex/RGB values and Kotlin Android Color syntax. ${platformDescriptions['kotlin-color-converter']}`
    }
    if (lower.includes('java')) {
      return `The **${name}** converts between color codes and Java Color class initialization. ${platformDescriptions['java-color-converter']}`
    }
    if (lower.includes('c#') || lower.includes('csharp')) {
      return `The **${name}** converts between color codes and C# System.Drawing.Color syntax. ${platformDescriptions['csharp-color-converter']}`
    }
    if (lower.includes('python')) {
      return `The **${name}** converts between hex codes and Python color representation formats used in matplotlib, PIL, and web frameworks. ${platformDescriptions['python-color-converter']}`
    }
    if (lower.includes('css variable')) {
      return `The **${name}** converts between raw color values and CSS custom property syntax. ${platformDescriptions['css-variable-converter']}`
    }
    if (lower.includes('json')) {
      return `The **${name}** converts between color codes and structured JSON color representation. ${platformDescriptions['json-color-converter']}`
    }
    if (lower.includes('scss')) {
      return `The **${name}** converts between standard color formats and SCSS variable/function syntax. ${platformDescriptions['scss-color-converter']}`
    }
    if (lower.includes('less')) {
      return `The **${name}** converts between standard color formats and LESS variable/function syntax. ${platformDescriptions['less-color-converter']}`
    }
    if (lower.includes('format detector')) {
      return 'The **Color Format Detector** automatically identifies the color format of any input string. It can detect whether a color is HEX, RGB, RGBA, HSL, HSLA, HSV, HWB, CMYK, LAB, LCH, OKLab, OKLCH, or a CSS named color. This tool is useful when you receive a color in an unknown format and need to identify it before further processing.'
    }
    if (lower.includes('universal')) {
      return 'The **Universal Color Converter** is a single unified tool that can convert between any two color formats. Simply select the source format and the target format, enter your color, and the tool handles all intermediate conversions automatically. It supports all major color spaces including HEX, RGB, HSL, HSV, CMYK, LAB, LCH, OKLab, OKLCH, and HWB.'
    }
    if (lower.includes('batch')) {
      return 'The **Batch Color Converter** converts multiple colors at once between different color formats. Enter one color per line in the input field, and the tool processes all of them simultaneously. This is ideal for converting entire color palettes, design tokens, or theme files from one format to another in a single operation.'
    }
    return `The **${name}** converts colors between different representations. Color conversion is essential in design and development workflows, where different tools, frameworks, and output media require specific color formats.`
  },
  picker: (name) => name,
  palette: (name) => name,
  gradient: (name) => name,
  accessibility: (name) => name,
  image: (name) => name,
  adjustment: (name) => name,
  reference: (name) => name,
  utility: (name) => name,
}

const converterWhatIs: Record<string, string> = {
  'hex-to-rgb': `The **HEX to RGB** converter transforms hexadecimal color codes into RGB values. ${colorSpaces.hex} ${colorSpaces.rgb} Converting between HEX and RGB is one of the most common color conversion tasks, as HEX is preferred in HTML/CSS while RGB is often used in JavaScript, canvas, and graphics libraries.`,
  'rgb-to-hex': `The **RGB to HEX** converter transforms RGB color values into hexadecimal color codes. ${colorSpaces.rgb} ${colorSpaces.hex} This conversion is essential when you have RGB values from a design tool or graphics library and need the equivalent hex code for use in CSS, HTML, or web development.`,
  'hex-to-hsl': `The **HEX to HSL** converter transforms hexadecimal color codes into HSL (Hue, Saturation, Lightness) values. ${colorSpaces.hex} ${colorSpaces.hsl} Converting HEX to HSL gives designers more intuitive control over color properties, making it easier to create variations and harmonious color schemes.`,
  'hsl-to-hex': `The **HSL to HEX** converter transforms HSL color values into hexadecimal color codes. ${colorSpaces.hsl} ${colorSpaces.hex} This conversion is useful when you have designed a color using HSL's intuitive hue-saturation-lightness model and need the hex equivalent for CSS implementation.`,
  'hex-to-hsv': `The **HEX to HSV** converter transforms hexadecimal color codes into HSV (Hue, Saturation, Value) values. ${colorSpaces.hex} ${colorSpaces.hsv} HSV is the preferred color space for color picker interfaces in graphics software like Photoshop and GIMP, making this conversion valuable when translating between web colors and design tools.`,
  'hsv-to-hex': `The **HSV to HEX** converter transforms HSV color values into hexadecimal color codes. ${colorSpaces.hsv} ${colorSpaces.hex} Designers working with color pickers that output HSV values can use this tool to obtain the hex codes needed for web development and CSS.`,
  'rgb-to-hsl': `The **RGB to HSL** converter transforms RGB color values into HSL (Hue, Saturation, Lightness) representation. ${colorSpaces.rgb} ${colorSpaces.hsl} Converting RGB to HSL helps designers understand the underlying hue, saturation, and lightness characteristics of a color, enabling more intentional color adjustments.`,
  'hsl-to-rgb': `The **HSL to RGB** converter transforms HSL color values into RGB format. ${colorSpaces.hsl} ${colorSpaces.rgb} This conversion is necessary when implementing HSL-based color designs in environments that require RGB values, such as canvas rendering, image processing, and low-level graphics programming.`,
  'rgb-to-hsv': `The **RGB to HSV** converter transforms RGB values into HSV (Hue, Saturation, Value) color space. ${colorSpaces.rgb} ${colorSpaces.hsv} HSV separates color intensity (Value) from the pigment (Hue), making it easier to adjust brightness without affecting the actual color.`,
  'hsv-to-rgb': `The **HSV to RGB** converter transforms HSV color values into RGB format. ${colorSpaces.hsv} ${colorSpaces.rgb} This conversion is essential when taking HSV values from a color picker and converting them to RGB for use in digital displays and graphics programming.`,
  'rgb-to-cmyk': `The **RGB to CMYK** converter transforms RGB colors into CMYK values for print production. ${colorSpaces.rgb} ${colorSpaces.cmyk} This is a critical conversion for print design — RGB colors on screen often look different when printed in CMYK. The conversion helps designers preview and adjust colors for physical output.`,
  'cmyk-to-rgb': `The **CMYK to RGB** converter transforms CMYK print color values into RGB for digital display. ${colorSpaces.cmyk} ${colorSpaces.rgb} Print designers often need to convert CMYK colors to RGB for digital proofs, web previews, or multi-channel publishing workflows.`,
  'hex-to-cmyk': `The **HEX to CMYK** converter transforms hex color codes into CMYK values for print design. ${colorSpaces.hex} ${colorSpaces.cmyk} Web designers creating print materials need this conversion to translate their hex-based web colors into print-ready CMYK formulations.`,
  'cmyk-to-hex': `The **CMYK to HEX** converter transforms CMYK print color values into hexadecimal color codes. ${colorSpaces.cmyk} ${colorSpaces.hex} Print designers expanding into web design use this tool to convert their print color expertise into web-compatible hex codes.`,
  'hex-to-lab': `The **HEX to LAB** converter transforms hex color codes into the CIELAB color space. ${colorSpaces.hex} ${colorSpaces.lab} LAB's perceptual uniformity makes it ideal for color difference measurement, color management workflows, and scientific color analysis.`,
  'lab-to-hex': `The **LAB to HEX** converter transforms CIELAB color values into hexadecimal color codes. ${colorSpaces.lab} ${colorSpaces.hex} This conversion is useful when working with color measurement instruments, scientific color data, or advanced color management systems that output LAB values.`,
  'rgb-to-lab': `The **RGB to LAB** converter transforms RGB values into the perceptually uniform CIELAB color space. ${colorSpaces.rgb} ${colorSpaces.lab} Converting to LAB enables accurate color difference calculations, color matching, and analysis that RGB's device-dependent nature doesn't support.`,
  'lab-to-rgb': `The **LAB to RGB** converter transforms CIELAB color values into RGB for digital display. ${colorSpaces.lab} ${colorSpaces.rgb} This conversion brings perceptually designed or scientifically measured LAB colors into the RGB color space for on-screen viewing and digital use.`,
  'hex-to-lch': `The **HEX to LCH** converter transforms hex color codes into LCH (Lightness, Chroma, Hue) values. ${colorSpaces.hex} ${colorSpaces.lch} LCH combines perceptual uniformity with an intuitive polar coordinate system, making it powerful for creating perceptually smooth gradients and color scales.`,
  'lch-to-hex': `The **LCH to HEX** converter transforms LCH color values into hexadecimal color codes. ${colorSpaces.lch} ${colorSpaces.hex} Designers using LCH for perceptually uniform color design can convert their colors to hex for CSS and web implementation.`,
  'rgb-to-lch': `The **RGB to LCH** converter transforms RGB values into the LCH color space. ${colorSpaces.rgb} ${colorSpaces.lch} LCH provides perceptually uniform hue and chroma dimensions, enabling more accurate color manipulation than what RGB or HSL can offer.`,
  'lch-to-rgb': `The **LCH to RGB** converter transforms LCH color values into RGB format. ${colorSpaces.lch} ${colorSpaces.rgb} Perceptually designed LCH colors can be converted to RGB for display on screens and digital devices.`,
  'hex-to-oklab': `The **HEX to OKLab** converter transforms hex color codes into the OKLab color space. ${colorSpaces.hex} ${colorSpaces.oklab} OKLab's superior uniformity makes it excellent for color interpolation, gradient generation, and image processing where accurate perceptual results matter.`,
  'oklab-to-hex': `The **OKLab to HEX** converter transforms OKLab color values into hexadecimal color codes. ${colorSpaces.oklab} ${colorSpaces.hex} This conversion allows colors designed in the advanced OKLab space to be used in standard web and graphics workflows that require hex codes.`,
  'rgb-to-oklab': `The **RGB to OKLab** converter transforms RGB values into the modern OKLab color space. ${colorSpaces.rgb} ${colorSpaces.oklab} OKLab's linear perceptual characteristics make it superior to CIELAB for many computer graphics applications including image editing and color manipulation.`,
  'oklab-to-rgb': `The **OKLab to RGB** converter transforms OKLab color values into RGB format. ${colorSpaces.oklab} ${colorSpaces.rgb} This conversion brings the benefits of OKLab's perceptual uniformity to standard RGB display pipelines.`,
  'hex-to-oklch': `The **HEX to OKLCH** converter transforms hex color codes into OKLCH (Lightness, Chroma, Hue) values. ${colorSpaces.hex} ${colorSpaces.oklch} OKLCH combines perceptual uniformity with an intuitive cylindrical interface, and is increasingly supported in modern CSS for creating perceptually smooth color systems.`,
  'oklch-to-hex': `The **OKLCH to HEX** converter transforms OKLCH color values into hexadecimal color codes. ${colorSpaces.oklch} ${colorSpaces.hex} As CSS gains native OKLCH support, converting between these formats becomes essential for modern web development workflows.`,
  'rgb-to-oklch': `The **RGB to OKLCH** converter transforms RGB values into OKLCH color space. ${colorSpaces.rgb} ${colorSpaces.oklch} OKLCH provides the most perceptually uniform hue-chroma-lightness representation, making it ideal for designing color scales and accessible color systems.`,
  'oklch-to-rgb': `The **OKLCH to RGB** converter transforms OKLCH color values into RGB format. ${colorSpaces.oklch} ${colorSpaces.rgb} Perceptually optimized OKLCH colors can be accurately converted to RGB for display on standard digital screens.`,
  'rgb-to-hwb': `The **RGB to HWB** converter transforms RGB values into HWB (Hue, Whiteness, Blackness) representation. ${colorSpaces.rgb} ${colorSpaces.hwb} HWB's intuitive model — starting with a pure hue and adding white or black — makes it easy for beginners to understand and use.`,
  'hwb-to-rgb': `The **HWB to RGB** converter transforms HWB color values into RGB format. ${colorSpaces.hwb} ${colorSpaces.rgb} Colors expressed in the intuitive HWB model can be converted to RGB for use in digital displays and graphics applications.`,
  'hex-to-hwb': `The **HEX to HWB** converter transforms hex color codes into HWB values. ${colorSpaces.hex} ${colorSpaces.hwb} This conversion helps web designers working with hex codes to understand their colors in the more intuitive HWB model.`,
  'hwb-to-hex': `The **HWB to HEX** converter transforms HWB color values into hexadecimal color codes. ${colorSpaces.hwb} ${colorSpaces.hex} Colors designed using HWB's intuitive white/blackness adjustments can be converted to hex for CSS implementation.`,
  'rgba-to-hex': `The **RGBA to HEX** converter transforms RGBA colors with alpha transparency into hexadecimal format. ${colorSpaces.rgba} ${colorSpaces.hex} Converting RGBA to hex is useful when you need a compact color representation that preserves alpha — 8-digit hex (#RRGGBBAA) is becoming increasingly common in modern CSS.`,
  'hex-to-rgba': `The **HEX to RGBA** converter transforms hexadecimal color codes into RGBA values with alpha transparency. ${colorSpaces.hex} ${colorSpaces.rgba} This conversion is essential when implementing designs that require explicit alpha channel control in CSS, canvas, or JavaScript environments.`,
  'hsla-to-hex': `The **HSLA to HEX** converter transforms HSLA values with alpha transparency into hexadecimal color codes. ${colorSpaces.hsla} ${colorSpaces.hex} This conversion lets designers use HSL's intuitive controls to design with alpha and then output compact hex codes for production.`,
  'hex-to-hsla': `The **HEX to HSLA** converter transforms hexadecimal color codes into HSLA values with alpha transparency. ${colorSpaces.hex} ${colorSpaces.hsla} This conversion reveals the hue, saturation, lightness, and alpha components of a hex color, helping designers understand and modify color properties more intuitively.`,
}

const categoryFaq: Record<string, { question: string; answer: string }[]> = {
  converter: [
    { question: 'Is this tool free to use?', answer: genericFaq.free },
    { question: 'Does this tool upload my color data to any server?', answer: genericFaq.privacy },
    { question: 'What color formats are supported for input?', answer: 'The tool automatically detects and parses the input color format. It supports standard formats such as HEX (e.g., #ff0044), RGB (e.g., rgb(255, 0, 68)), HSL, HSV, CMYK, and more depending on the specific converter you are using.' },
    { question: 'How accurate are the color conversions?', answer: 'All conversions use mathematically precise algorithms to ensure exact results. However, note that some conversions involve gamut mapping — for example, RGB to CMYK conversion is an approximation because RGB has a wider gamut than CMYK, meaning some RGB colors cannot be exactly reproduced in print.' },
  ],
  picker: [
    { question: 'Is this picker tool free?', answer: genericFaq.free },
    { question: 'Does this tool require an internet connection?', answer: 'No, the color picker runs entirely in your browser with no server communication. You can use it offline without any issues.' },
    { question: 'Can I copy the selected color value?', answer: 'Yes, you can copy the selected color in multiple formats including HEX, RGB, and HSL by clicking the "Copy" button. The output panel displays the color in the format you select.' },
    { question: 'What color spaces does this picker support?', answer: 'This tool supports a wide range of color spaces depending on the specific picker: RGB, HSL, HSV, CMYK, LAB, LCH, OKLab, OKLCH, HWB, and RGBA/HSLA with alpha channel support.' },
  ],
  palette: [
    { question: 'Is this palette generator free?', answer: genericFaq.free },
    { question: 'Can I export the generated palette?', answer: 'Yes, you can copy individual colors or export the entire palette. The palette exporter supports CSS, SCSS, JSON, Tailwind CSS, and other popular formats.' },
    { question: 'How many colors can I generate?', answer: 'You can typically generate between 2 and 12 colors per palette, depending on the palette type and configuration options available.' },
    { question: 'What color harmony rules are available?', answer: 'Available harmony rules include monochromatic, analogous, complementary, split-complementary, triadic, tetradic, and square color schemes, each based on established color theory principles.' },
  ],
  gradient: [
    { question: 'Is this gradient generator free?', answer: genericFaq.free },
    { question: 'Can I use the generated gradients commercially?', answer: 'Yes, all gradients generated with this tool are free to use in any project — personal, commercial, or open source. No attribution is required.' },
    { question: 'What gradient types are supported?', answer: 'The tool supports linear, radial, and conic gradient types. You can also create multi-stop gradients with as many color stops as you need.' },
    { question: 'Can I export the gradient code?', answer: 'Yes, you can copy the CSS or SVG gradient code directly using the "Copy" button. The generated code is clean, well-formatted, and ready to use in production.' },
  ],
  accessibility: [
    { question: 'Is this accessibility checker free?', answer: genericFaq.free },
    { question: 'What WCAG levels are checked?', answer: 'The tool checks against WCAG 2.2 AA and AAA standards. AA requires a contrast ratio of 4.5:1 for normal text and 3:1 for large text. AAA requires 7:1 for normal text and 4.5:1 for large text.' },
    { question: 'Does this tool provide suggestions to fix contrast issues?', answer: 'Yes, the contrast fix generator and related tools can automatically suggest color adjustments to help your color combinations meet accessibility requirements.' },
    { question: 'What is the difference between APCA and WCAG contrast checking?', answer: 'WCAG uses a simple luminance-based contrast ratio formula, while APCA (Advanced Perceptual Contrast Algorithm) uses a more sophisticated model that accounts for perceptual factors like spatial frequency, text weight, and context. APCA is proposed for future WCAG versions.' },
  ],
  image: [
    { question: 'Is this image tool free?', answer: genericFaq.free },
    { question: 'Does this tool upload my images to any server?', answer: 'No. All image processing happens entirely in your browser using the HTML5 Canvas API. Your images are never uploaded to any server, ensuring complete privacy.' },
    { question: 'What image formats are supported?', answer: 'The tool supports common image formats including PNG, JPEG, GIF, WebP, and SVG. Browser support may vary slightly depending on the format.' },
    { question: 'What is the maximum image size I can use?', answer: 'Since processing happens client-side, the limit depends on your device\'s memory and browser capabilities. Very large images may take longer to process or cause performance issues.' },
  ],
  adjustment: [
    { question: 'Is this adjustment tool free?', answer: genericFaq.free },
    { question: 'Can I preview the adjusted color before copying?', answer: 'Yes, the tool provides a real-time preview of the adjusted color, often alongside the original color for comparison.' },
    { question: 'What color adjustments are available?', answer: 'Available adjustments include tint (adding white), shade (adding black), tone (adding gray), saturation, brightness, contrast, hue rotation, vibrance, gamma, opacity/alpha, inversion, grayscale, sepia, and color temperature.' },
    { question: 'Can I adjust non-hex color formats?', answer: 'Yes, the tool accepts HEX, RGB, HSL, and other common color formats as input, automatically parsing them before applying the adjustment.' },
  ],
  reference: [
    { question: 'Is this reference tool free?', answer: genericFaq.free },
    { question: 'How frequently is the color data updated?', answer: 'Brand and framework colors are updated as new versions are released. The reference data includes the latest stable color palettes from major design systems and brands.' },
    { question: 'Can I copy colors directly from the reference?', answer: 'Yes, clicking on any color entry provides copy buttons for its hex code, RGB values, and other format representations.' },
    { question: 'Are the brand colors officially verified?', answer: 'Brand colors are sourced from official brand guidelines and documentation where available. However, some brand colors may have been gathered from community sources and should be verified against official brand resources for production use.' },
  ],
  utility: [
    { question: 'Is this utility tool free?', answer: genericFaq.free },
    { question: 'Can I use the generated output commercially?', answer: 'Yes, all output generated by this tool is free to use in any project without attribution.' },
    { question: 'What export formats are supported?', answer: 'Export formats depend on the specific tool but commonly include CSS, SCSS, JSON, Tailwind CSS configuration, Android XML, Swift assets, and other development formats.' },
    { question: 'Does this tool work offline?', answer: 'Yes, all processing is done client-side in your browser. No server communication is required, making the tool fully functional offline.' },
  ],
}

const specificWhatIs: Record<string, string> = {}

const specificHowToUse: Record<string, string[]> = {}

const specificFaq: Record<string, { question: string; answer: string }[]> = {}

function getToolsByCategory(category: string) {
  return tools.filter(t => t.category === category)
}

function getRelatedTools(slug: string, category: string, count = 6) {
  return tools
    .filter(t => t.category === category && t.id !== slug)
    .slice(0, count)
    .map(t => ({ slug: t.id, name: t.name }))
}

function getCategoryFaq(category: string): { question: string; answer: string }[] {
  return categoryFaq[category] || categoryFaq.utility
}

function getCategoryHowToUse(category: string): string[] {
  return howToUseTemplates[category] || howToUseTemplates.utility
}

function buildConverterWhatIs(name: string): string {
  const slug = name.toLowerCase().replace(/\s+/g, '-')
    .replace('–', '-')
    .replace(/[^a-z0-9-]/g, '')

  if (converterWhatIs[slug]) return converterWhatIs[slug]

  for (const [key, val] of Object.entries(converterWhatIs)) {
    if (slug.includes(key.replace(/-/g, '')) || key.replace(/-/g, '').includes(slug)) {
      return val
    }
    const keyParts = key.split('-')
    const slugParts = slug.split('-')
    const matching = keyParts.filter(k => slugParts.includes(k))
    if (matching.length >= 2) return val
  }

  return `The **${name}** converts colors between different color representations. Whether you are working on web design, print production, or software development, converting between color formats is a common task. This tool provides fast, accurate color conversion with a simple interface — paste your color value, click convert, and copy the result.`
}

function buildAltWhatIs(name: string): string {
  const lower = name.toLowerCase()
  if (lower.includes('picker')) {
    if (lower.includes('color picker')) {
      return `The **${name}** provides an interactive interface to visually select and fine-tune colors. Color pickers are essential tools in design and development workflows, enabling precise color selection through visual interaction.`
    }
    if (lower.includes('eye dropper')) return 'The **Eye Dropper Tool** lets you sample any color from your screen in real-time. This tool is essential for extracting colors from existing designs, websites, images, or any on-screen content for use in your projects.'
    if (lower.includes('screen')) return 'The **Screen Color Picker** captures color values from anywhere on your display. Move your cursor over any pixel on your screen to instantly see its color value in multiple formats.'
    if (lower.includes('hex')) return `The **${name}** lets you pick and fine-tune colors using hexadecimal color code input. ${colorSpaces.hex} Adjust the hex code directly or use sliders to modify each channel visually.`
    if (lower.includes('rgb')) return `The **${name}** lets you select colors by adjusting individual red, green, and blue channel values. ${colorSpaces.rgb} Sliders or number inputs for each channel give you precise control over the final color.`
    if (lower.includes('hsl')) return `The **${name}** provides intuitive hue, saturation, and lightness sliders for color selection. ${colorSpaces.hsl} This is often the preferred picking interface for designers due to its natural color relationships.`
    if (lower.includes('hsv')) return `The **${name}** uses hue, saturation, and value controls for color selection. ${colorSpaces.hsv} HSV is the standard color picking model in most graphics software and provides intuitive control over color properties.`
    if (lower.includes('cmyk')) return `The **${name}** lets you select colors in CMYK mode for print-ready color picking. ${colorSpaces.cmyk} This is essential for print designers who need to preview and select colors in the print color space.`
    if (lower.includes('lab')) return `The **${name}** lets you select colors in the perceptually uniform LAB color space. ${colorSpaces.lab} LAB picking enables precise color selection based on perceptual characteristics rather than device-dependent values.`
    if (lower.includes('lch')) return `The **${name}** provides lightness, chroma, and hue controls for natural color selection. ${colorSpaces.lch} LCH combines perceptual uniformity with intuitive polar coordinates for natural color selection.`
    if (lower.includes('oklab')) return `The **${name}** lets you pick colors using the modern OKLab perceptually uniform color space. ${colorSpaces.oklab} OKLab picking offers superior hue linearity for accurate color selection.`
    if (lower.includes('oklch')) return `The **${name}** provides OKLCH lightness, chroma, and hue controls for accurate color selection. ${colorSpaces.oklch} This modern color space is ideal for designing perceptually uniform color systems.`
    if (lower.includes('hwb')) return `The **${name}** uses hue, whiteness, and blackness sliders for simple color picking. ${colorSpaces.hwb} HWB's intuitive add-white/add-black approach makes color selection accessible even for beginners.`
    if (lower.includes('alpha')) return 'The **Alpha Color Picker** focuses on selecting and adjusting the transparency (alpha) of any color. Control opacity from fully transparent to fully opaque, preview the result against different backgrounds, and copy the value with or without alpha.'
    if (lower.includes('gradient')) return 'The **Gradient Color Picker** lets you select multiple colors for creating seamless gradient transitions. Pick and arrange colors along a gradient line, adjust their positions, and preview the resulting blend in real-time.'
    if (lower.includes('multi')) return 'The **Multi Color Picker** lets you select and manage several colors simultaneously. This is useful for building palettes, comparing color options, and collecting colors for larger design projects.'
    if (lower.includes('image')) return 'The **Image Color Picker** allows you to upload an image and pick colors from any pixel within it. Click anywhere on the image to sample the exact pixel color, making it easy to extract colors from photographs, logos, and illustrations.'
    if (lower.includes('website')) return 'The **Website Color Picker** extracts and displays colors from any website URL you provide. Enter a URL and the tool captures the site\'s color scheme, giving you a palette of the colors used in the page design.'
    if (lower.includes('transparent')) return 'The **Transparent Color Picker** specializes in selecting and previewing colors with varying levels of transparency. Adjust the alpha channel and see how the color appears against white, black, or custom backgrounds.'
    if (lower.includes('random')) return 'The **Random Color Picker** generates unexpected color combinations with a single click. Each click produces a new random color with its values displayed in multiple formats. Great for breaking out of design ruts and discovering fresh color ideas.'
    if (lower.includes('pixel')) return 'The **Pixel Color Picker** lets you zoom into images and select individual pixel colors with precision. This tool is essential for pixel-perfect color matching, icon design, and detailed image analysis.'
    if (lower.includes('magnifier')) return 'The **Magnifier Color Picker** provides a magnified view of your screen area to pick exact pixel colors. The magnifier ensures you can see individual pixels clearly, making it perfect for precise color matching and fine detail work.'
    if (lower.includes('browser')) return 'The **Browser Color Picker** provides a native-style color picker interface adapted for web development workflows. It combines the familiarity of system color pickers with web-friendly output formats.'
    return `The **${name}** provides an interactive interface to visually select and fine-tune colors for your design and development projects.`
  }
  if (lower.includes('palette') || lower.includes('pallete')) {
    if (lower.includes('random')) return 'The **Random Palette Generator** creates unexpected color combinations instantly. Each click generates a new set of cohesive colors based on random seed values, making it perfect for design exploration and overcoming creative blocks.'
    if (lower.includes('ai')) return 'The **AI Palette Generator** uses intelligent algorithms to create harmonious color palettes based on your description or keywords. Describe the mood, theme, or style you want, and the tool generates a matching palette.'
    if (lower.includes('brand')) return 'The **Brand Palette Generator** creates professional color palettes for brand identity. It generates primary, secondary, and accent colors that work together cohesively, with consideration for brand personality and industry conventions.'
    if (lower.includes('ui')) return 'The **UI Palette Generator** creates color schemes optimized for user interface design. It generates balanced palettes with semantic roles — primary, secondary, surface, text, error — following established UI design patterns.'
    if (lower.includes('material')) return 'The **Material Palette Generator** creates palettes following Material Design 3 guidelines. Starting from a seed color, it generates tonal palettes with proper light and dark variations for each Material color role.'
    if (lower.includes('tailwind')) return 'The **Tailwind Palette Generator** creates color scales compatible with Tailwind CSS. It generates the full range of shades (50–900 or 950) for each color, following Tailwind\'s naming convention and luminance progression.'
    if (lower.includes('bootstrap')) return 'The **Bootstrap Palette Generator** creates color schemes compatible with Bootstrap\'s theme system. It generates the full set of Bootstrap semantic colors including primary, secondary, success, danger, warning, info, light, and dark.'
    if (lower.includes('dark')) return 'The **Dark Theme Palette Generator** creates color schemes optimized for dark mode interfaces. It generates backgrounds, surfaces, text colors, and accent colors that work harmoniously on dark backgrounds while maintaining readability.'
    if (lower.includes('light')) return 'The **Light Theme Palette Generator** creates clean, bright color schemes for light mode interfaces. It generates colors with sufficient contrast for readability while maintaining a clean, modern aesthetic.'
    if (lower.includes('pastel')) return 'The **Pastel Palette Generator** creates soft, muted color palettes characterized by high lightness and low to moderate saturation. Pastel colors evoke gentleness, calm, and nostalgia — popular in branding for wellness, baby products, and soft aesthetics.'
    if (lower.includes('neon')) return 'The **Neon Palette Generator** creates vibrant, high-saturation palettes with electric, glowing colors. Neon palettes are bold and energetic, ideal for gaming, nightlife, youth brands, and attention-grabbing designs.'
    if (lower.includes('vintage')) return 'The **Vintage Palette Generator** creates retro-inspired color schemes with warm, slightly faded tones that evoke past eras. These palettes work well for brands seeking a nostalgic, handcrafted, or timeless aesthetic.'
    if (lower.includes('retro')) return 'The **Retro Palette Generator** creates throwback color schemes inspired by specific design eras — from 1950s pastels to 1980s neons. Each palette captures the color spirit of its inspiration period.'
    if (lower.includes('nature')) return 'The **Nature Palette Generator** creates color schemes inspired by natural landscapes — forests, deserts, mountains, and meadows. These earthy, organic palettes bring a sense of calm and authenticity to designs.'
    if (lower.includes('ocean')) return 'The **Ocean Palette Generator** creates color schemes inspired by marine environments — from deep navy depths to turquoise shallows to sandy shores. These palettes evoke tranquility, depth, and freshness.'
    if (lower.includes('sunset')) return 'The **Sunset Palette Generator** creates warm, dramatic color schemes inspired by sunset skies. Rich oranges, pinks, purples, and golds combine to create emotionally resonant, visually striking palettes.'
    if (lower.includes('autumn')) return 'The **Autumn Palette Generator** creates warm, rich palettes inspired by fall foliage. Deep oranges, burgundy reds, golden yellows, and earthy browns capture the cozy, transitional feel of the autumn season.'
    if (lower.includes('spring')) return 'The **Spring Palette Generator** creates fresh, vibrant palettes inspired by springtime. Soft greens, blooming pinks, sunny yellows, and sky blues capture the renewal and energy of the season.'
    if (lower.includes('winter')) return 'The **Winter Palette Generator** creates cool, crisp palettes inspired by winter landscapes. Icy blues, silvery grays, pure whites, and deep navy tones evoke the calm and clarity of winter.'
    if (lower.includes('summer')) return 'The **Summer Palette Generator** creates bright, warm palettes inspired by summer. Vibrant yellows, ocean blues, tropical greens, and sunset oranges capture the energy and warmth of the season.'
    if (lower.includes('monochromatic')) return 'The **Monochromatic Palette Generator** creates harmonious color schemes using variations of a single hue. By adjusting lightness, saturation, and tone while keeping the same base hue, it produces cohesive, elegant palettes that are easy to use and visually pleasing.'
    if (lower.includes('analogous')) return 'The **Analogous Palette Generator** creates smooth, harmonious color schemes using colors that are adjacent to each other on the color wheel. Analogous schemes (typically 2–4 colors) create serene, comfortable designs with minimal contrast.'
    if (lower.includes('complementary')) return 'The **Complementary Palette Generator** creates high-contrast color schemes using colors opposite each other on the color wheel. Complementary pairs create vibrant, energetic designs where colors make each other appear brighter and more intense.'
    if (lower.includes('split-complementary')) return 'The **Split Complementary Palette Generator** creates balanced color schemes using one base color and two colors adjacent to its complement. This variation reduces the tension of pure complementary schemes while maintaining visual interest and contrast.'
    if (lower.includes('triadic')) return 'The **Triadic Palette Generator** creates vibrant, balanced color schemes using three colors evenly spaced around the color wheel (120° apart). Triadic schemes offer strong visual contrast while maintaining harmony and balance.'
    if (lower.includes('tetradic')) return 'The **Tetradic Palette Generator** creates rich, complex color schemes using two complementary pairs (four colors total). Tetradic (double-complementary) schemes offer the widest range of color possibilities but require careful balance to avoid visual chaos.'
    if (lower.includes('square')) return 'The **Square Palette Generator** creates balanced color schemes using four colors evenly spaced around the color wheel (90° apart). Square schemes are versatile and dynamic, offering multiple color relationships within a single palette.'
    if (lower.includes('rainbow')) return 'The **Rainbow Palette Generator** creates vibrant, multi-color palettes spanning the full color spectrum. These cheerful, diverse palettes capture the full range of hues from red through violet for maximum color variety.'
    if (lower.includes('earth')) return 'The **Earth Tone Palette Generator** creates grounded, natural palettes using organic browns, warm tans, olive greens, and rusty oranges. Earth tones are versatile, timeless, and work well for organic, outdoor, and natural brands.'
    if (lower.includes('flat')) return 'The **Flat UI Palette Generator** creates modern, flat design color schemes inspired by popular flat design frameworks and aesthetics. These palettes feature clean, solid colors without gradients or shadows for contemporary interface design.'
    if (lower.includes('corporate')) return 'The **Corporate Palette Generator** creates professional, trustworthy color schemes for business and enterprise branding. Corporate palettes typically use conservative blues, grays, and navy tones accented with a single brand color.'
    if (lower.includes('luxury')) return 'The **Luxury Palette Generator** creates elegant, sophisticated color schemes for premium brands. Deep jewel tones, rich metallics, and refined neutrals combine to convey exclusivity, quality, and craftsmanship.'
    if (lower.includes('gaming')) return 'The **Gaming Palette Generator** creates energetic, immersive color schemes for game design. Bold, high-contrast colors with vibrant accents create the dynamic feel expected in gaming interfaces and environments.'
    if (lower.includes('ecommerce')) return 'The **Ecommerce Palette Generator** creates conversion-optimized color schemes for online stores. These palettes balance trust-building blues and greens with action-driving accent colors for CTAs and promotions.'
    if (lower.includes('dashboard')) return 'The **Dashboard Palette Generator** creates data-friendly color schemes for analytics and dashboard interfaces. These palettes include distinct, distinguishable colors for data series along with semantic colors for status indicators.'
    if (lower.includes('mobile')) return 'The **Mobile App Palette Generator** creates color schemes optimized for mobile interfaces. These palettes consider small screen constraints, touch targets, and mobile-specific UI patterns for iOS and Android apps.'
    if (lower.includes('saas')) return 'The **SaaS Palette Generator** creates professional color schemes for software-as-a-service products. These palettes balance trust, usability, and brand personality for subscription-based web applications.'
    if (lower.includes('logo')) return 'The **Logo Palette Generator** creates memorable, distinctive color combinations for brand logos and visual identities. These palettes are designed to be recognizable, scalable, and effective across different media.'
    if (lower.includes('fashion')) return 'The **Fashion Palette Generator** creates trend-aware color schemes for fashion and apparel design. These palettes reflect current color trends while maintaining harmony and visual appeal for clothing collections.'
    if (lower.includes('food')) return 'The **Food Palette Generator** creates appetizing color schemes for food and culinary branding. Warm reds, fresh greens, creamy whites, and rich browns evoke taste associations and stimulate appetite.'
    return `The **${name}** generates cohesive color palettes for your design projects. Color palettes are collections of colors designed to work together harmoniously, forming the foundation of visual branding, interface design, and artistic projects.`
  }
  if (lower.includes('gradient')) {
    if (lower.includes('linear')) return 'The **Linear Gradient Generator** creates smooth color transitions along a straight line. Linear gradients are the most common gradient type in CSS and graphic design, used for backgrounds, buttons, text effects, and UI elements. You control the direction (angle) and the colors at each stop point.'
    if (lower.includes('radial')) return 'The **Radial Gradient Generator** creates color transitions that radiate outward from a central point, creating circular or elliptical patterns. Radial gradients are ideal for creating spotlight effects, vignettes, and organic-looking backgrounds.'
    if (lower.includes('conic')) return 'The **Conic Gradient Generator** creates color transitions that rotate around a center point, like a color wheel. Conic gradients are used for creating pie charts, color wheels, and unique visual effects that require angular color transitions.'
    if (lower.includes('mesh')) return 'The **Mesh Gradient Generator** creates complex, multi-dimensional gradients with multiple color control points arranged in a grid. Mesh gradients produce rich, organic color transitions similar to the gradients found in modern design tools like Figma and Illustrator.'
    if (lower.includes('css')) return 'The **CSS Gradient Generator** creates gradients with production-ready CSS code output. It supports all CSS gradient types — linear, radial, and conic — and generates clean, cross-browser compatible code with proper vendor prefixes where needed.'
    if (lower.includes('svg')) return 'The **SVG Gradient Generator** creates SVG gradient definitions for use in SVG graphics, icons, and illustrations. It generates both `<linearGradient>` and `<radialGradient>` SVG elements with proper attributes for seamless integration into SVG code.'
    if (lower.includes('animated')) return 'The **Animated Gradient Generator** creates CSS keyframe animations for moving, shifting gradient effects. Animated gradients add visual interest and dynamism to backgrounds, headers, and hero sections with smooth color transitions over time.'
    if (lower.includes('text')) return 'The **Text Gradient Generator** applies gradient effects to text using CSS `background-clip` with transparent text. Text gradients create eye-catching headlines and typography without requiring images, making them lightweight and responsive.'
    if (lower.includes('button')) return 'The **Button Gradient Generator** designs gradient buttons with hover effects and custom styling. Generate buttons with smooth gradient backgrounds, hover transitions, and shadow effects ready for production use.'
    if (lower.includes('background')) return 'The **Background Gradient Generator** creates full-page or section background gradients optimized for websites and apps. These gradients are designed to work as backdrop environments for content while maintaining readability.'
    if (lower.includes('border')) return 'The **Gradient Border Generator** applies gradient color transitions to element borders and outlines. It uses CSS border-image techniques to create colorful borders that flow smoothly from one color to another around any element.'
    if (lower.includes('shadow')) return 'The **Gradient Shadow Generator** creates box shadows with gradient color transitions for depth and visual effects. Gradient shadows add a more natural, multi-colored shadow appearance compared to solid-color shadows.'
    if (lower.includes('multi-stop') || lower.includes('multi stop')) return 'The **Multi-stop Gradient** creates gradients with more than two color stops for rich, complex color transitions. Adding intermediate stops allows for nuanced color progressions, rainbow effects, and precise color control at specific positions.'
    if (lower.includes('three-color') || lower.includes('three color')) return 'The **Three Color Gradient** creates gradients with three distinct color stops for richer color blends than standard two-color gradients. Three-color gradients offer more complex and interesting color transitions suitable for vibrant backgrounds and creative designs.'
    if (lower.includes('four-color') || lower.includes('four color')) return 'The **Four Color Gradient** creates gradients using four color stops for complex, multi-hue color transitions. Four-color gradients can create rich rainbow-like effects or subtle multi-tone blends for sophisticated design elements.'
    if (lower.includes('mixer')) return 'The **Gradient Mixer** blends multiple colors into seamless gradient transitions. Experiment with different color combinations, stop positions, and blending options to create unique gradient effects.'
    if (lower.includes('reverser')) return 'The **Gradient Reverser** inverts the order of color stops in any gradient with one click. This is useful when you want to flip the direction of a gradient without manually recreating the stop positions.'
    if (lower.includes('angle')) return 'The **Gradient Angle Generator** provides precise control over gradient direction with an interactive angle selector. Fine-tune the angle of linear gradients from 0° to 360° with visual feedback showing the exact direction.'
    if (lower.includes('preview')) return 'The **Gradient Preview** renders gradients at full size for accurate visual assessment before use. Preview how gradients appear on different background colors, at different sizes, and in various contexts.'
    if (lower.includes('exporter')) return 'The **Gradient Exporter** saves gradients in multiple formats including CSS, SVG, PNG images, and more. Export gradients for use in various tools, frameworks, and output media.'
    if (lower.includes('tailwind')) return 'The **Tailwind Gradient Generator** creates gradients using Tailwind CSS gradient utility classes. It generates the correct Tailwind syntax including `bg-gradient-to-*` direction classes and color stop utilities.'
    if (lower.includes('bootstrap')) return 'The **Bootstrap Gradient Generator** creates gradients compatible with Bootstrap 5\'s CSS framework. It generates gradient code using Bootstrap\'s utility classes and theme color variables.'
    if (lower.includes('glass')) return 'The **Glass Gradient Generator** creates glassmorphism-style gradients with frosted glass, transparency, and blur effects. These gradients combine semi-transparent colors with backdrop blur for the popular glass aesthetic.'
    if (lower.includes('aurora')) return 'The **Aurora Gradient Generator** creates flowing, multi-colored gradients inspired by the aurora borealis (northern lights). These ethereal gradients feature soft transitions between greens, blues, purples, and pinks.'
    if (lower.includes('metallic')) return 'The **Metallic Gradient Generator** creates shiny, reflective gradients that simulate gold, silver, bronze, copper, and other metallic finishes. Add specular highlights and directional sheen for realistic metal effects.'
    if (lower.includes('neon')) return 'The **Neon Gradient Generator** creates bright, electric gradients with glowing color effects. Neon gradients feature high-saturation colors with simulated glow for vibrant, attention-getting designs.'
    if (lower.includes('pastel')) return 'The **Pastel Gradient Generator** creates soft, gentle gradients with pastel color transitions. These gradients use light, muted colors for calm, soothing visual effects in backgrounds and subtle design elements.'
    if (lower.includes('instagram')) return 'The **Instagram Gradient Generator** creates gradients inspired by Instagram Stories, filters, and brand aesthetics. These vibrant, warm-toned gradients capture the social media platform\'s signature look.'
    if (lower.includes('noise')) return 'The **Gradient Noise Generator** adds organic noise textures to gradients for a natural, tactile look. Noise reduces the sterile, artificial appearance of smooth gradients, adding depth and character to backgrounds.'
    if (lower.includes('grain')) return 'The **Grain Gradient Generator** creates grainy gradient textures with subtle noise overlay effects. Grain textures add a film-like, analog quality to digital gradients, popular in modern retro and organic design aesthetics.'
    if (lower.includes('svg mesh')) return 'The **SVG Mesh Generator** creates SVG-based mesh gradients with customizable control point grids. Mesh gradients use multiple color points arranged in a grid to create smooth, organic color transitions within SVG graphics.'
    if (lower.includes('animation builder')) return 'The **Gradient Animation Builder** creates keyframe animations for gradient transitions. Define starting and ending gradient states, duration, easing, and other animation parameters to create smooth, eye-catching gradient animations.'
    if (lower.includes('overlay')) return 'The **Gradient Overlay Generator** creates gradient overlays for images, videos, and interface elements. Overlay gradients are semi-transparent gradients placed on top of content to improve text readability, add mood, or create visual depth.'
    if (lower.includes('code')) return 'The **Gradient Code Generator** creates production-ready CSS gradient code optimized for real projects. The generated code follows best practices, includes fallbacks, and is formatted for direct use in stylesheets.'
    if (lower.includes('library')) return 'The **Gradient Library** provides a curated collection of beautiful, pre-made gradients ready to use. Browse gradients by color, style, or mood, and copy any gradient code with a single click.'
    return `The **${name}** creates beautiful color transitions for your design projects. Gradients blend two or more colors together to create smooth transitions, adding depth, dimension, and visual interest to backgrounds, UI elements, and graphics.`
  }
  if (lower.includes('accessibility') || lower.includes('contrast') || lower.includes('readability') || lower.includes('color-blind') || lower.includes('wcag') || lower.includes('apca')) {
    if (lower.includes('wcag') && !lower.includes('report')) return 'The **WCAG Contrast Checker** evaluates color contrast ratios against the Web Content Accessibility Guidelines (WCAG) 2.2 standards. It calculates the luminance-based contrast ratio between two colors (typically text and background) and reports the compliance level — AA (4.5:1), AAA (7:1), or fail. WCAG compliance is essential for making web content accessible to users with visual impairments.'
    if (lower.includes('apca')) return 'The **APCA Contrast Checker** evaluates contrast using the Advanced Perceptual Contrast Algorithm, a more sophisticated model being considered for future WCAG versions. APCA accounts for spatial frequency, text weight, font size, and contextual factors that simple luminance ratios miss, providing more accurate readability assessments.'
    if (lower.includes('aaa')) return 'The **AAA Contrast Checker** specifically tests color combinations against the strictest WCAG AAA compliance level, which requires a contrast ratio of at least 7:1 for normal text and 4.5:1 for large text (18pt+ or 14pt bold+). AAA is the highest level of accessibility conformance.'
    if (lower.includes('aa') && !lower.includes('aaa') && !lower.includes('wcag')) return 'The **AA Contrast Checker** verifies color pairs meet WCAG AA standards, which require a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text (18pt+ or 14pt bold+). AA is the minimum compliance level required for most government and enterprise websites.'
    if (lower.includes('color-blindness')) return 'The **Color Blindness Simulator** shows how your designs appear to users with various types of color vision deficiency (CVD). It simulates protanopia (red-blind), deuteranopia (green-blind), tritanopia (blue-blind), and achromatopsia (total color blindness) to help you design inclusively for the approximately 8% of men and 0.5% of women with some form of color blindness.'
    if (lower.includes('protanopia')) return 'The **Protanopia Simulator** simulates how colors appear to users with protanopia, a type of red-green color blindness where the eyes lack functional red cone cells (L-cones). Protanopes have difficulty distinguishing between red, green, and related hues — reds appear darker and greener, making certain color combinations problematic.'
    if (lower.includes('deuteranopia')) return 'The **Deuteranopia Simulator** simulates how colors appear to users with deuteranopia, the most common type of red-green color blindness where green cone cells (M-cones) are missing. Deuteranopes struggle to distinguish between greens, reds, and yellows, and colors containing these hues may appear muddy or indistinguishable.'
    if (lower.includes('tritanopia')) return 'The **Tritanopia Simulator** simulates how colors appear to users with tritanopia, a rare form of color blindness where blue cone cells (S-cones) are absent. Tritanopes have difficulty distinguishing between blue and yellow, and colors may appear in red/green tones with reduced blue perception.'
    if (lower.includes('monochrome')) return 'The **Monochrome Preview** converts your design or color palette to grayscale, removing all color information to test contrast and readability based solely on lightness differences. A design that works well in grayscale will be accessible to users with all types of color blindness.'
    if (lower.includes('readability')) return 'The **Readability Checker** assesses text readability based on color contrast, font size, and background context. Beyond simple contrast ratios, it considers factors like text weight, spacing, and the surrounding visual environment to provide a comprehensive readability assessment.'
    if (lower.includes('accessible palette')) return 'The **Accessible Palette Generator** creates color palettes where every combination meets WCAG contrast requirements. It generates colors with sufficient contrast between text and background pairs while maintaining aesthetic harmony and design intent.'
    if (lower.includes('accessible gradient')) return 'The **Accessible Gradient Generator** creates gradients that maintain sufficient contrast throughout the transition. It ensures that text placed anywhere on the gradient meets accessibility standards by checking contrast at multiple points along the gradient path.'
    if (lower.includes('text-contrast')) return 'The **Text Contrast Generator** finds text colors that meet contrast requirements against any background. Enter a background color, and the tool suggests text colors (both light and dark) that pass WCAG AA or AAA standards.'
    if (lower.includes('background-contrast')) return 'The **Background Contrast Generator** finds accessible background colors for any foreground text color. It ensures your text remains readable against the background while maintaining the desired color direction.'
    if (lower.includes('button')) return 'The **Button Accessibility Checker** verifies that button color combinations — including default, hover, active, and disabled states — meet accessibility standards. It ensures your interactive elements are perceivable by users with visual impairments.'
    if (lower.includes('link')) return 'The **Link Accessibility Checker** checks link color contrast against surrounding text and background colors. It verifies that links are distinguishable from body text while maintaining sufficient contrast for readability.'
    if (lower.includes('ui accessibility')) return 'The **UI Accessibility Tester** tests entire UI component color schemes for accessibility compliance. It evaluates multiple color pairs within a component — text, background, border, icon, and state colors — providing a comprehensive compliance report.'
    if (lower.includes('dashboard')) return 'The **Dashboard Accessibility Checker** evaluates color schemes for data visualization accessibility. It checks that chart colors, status indicators, and data points are distinguishable for users with color vision deficiencies and meet contrast requirements.'
    if (lower.includes('report')) return 'The **Accessibility Report Generator** creates comprehensive documentation of your color accessibility status. The report includes contrast ratios, WCAG levels, pass/fail status for each color pair, and recommendations for improvement.'
    if (lower.includes('matrix')) return 'The **Contrast Matrix Generator** creates a matrix comparing contrast ratios across multiple color pairs. This is useful for design systems where you need to verify that every combination of text and background colors meets accessibility requirements.'
    if (lower.includes('vision test')) return 'The **Color Vision Test** provides interactive tests to assess your own color vision. Using Ishihara-style plates and other diagnostic patterns, it helps identify potential color vision deficiencies for awareness and inclusive design practices.'
    if (lower.includes('heatmap')) return 'The **Accessibility Heatmap** visualizes accessibility issues across your color palette with an intuitive heatmap display. Problematic color combinations are highlighted in warm colors, while accessible combinations appear cool, making it easy to spot and fix issues at a glance.'
    if (lower.includes('contrast fix') || lower.includes('contrast-fix')) return 'The **Contrast Fix Generator** automatically suggests color adjustments to fix contrast failures. When a color pair doesn\'t meet accessibility requirements, the tool recommends adjusted colors that maintain the original intent while achieving compliance.'
    if (lower.includes('dark mode')) return 'The **Dark Mode Contrast Checker** specifically verifies contrast ratios in dark mode interfaces. Dark backgrounds change how contrast is perceived, and this tool accounts for the unique challenges of ensuring readability on dark surfaces.'
    if (lower.includes('light mode')) return 'The **Light Mode Contrast Checker** verifies contrast ratios for light mode interface designs. It evaluates the standard light-background, dark-text scenarios that dominate most web and app interfaces.'
    if (lower.includes('font color')) return 'The **Font Color Recommender** suggests accessible font colors for any background color. Given a background, it recommends both light and dark text options that meet WCAG compliance levels, along with the exact contrast ratio for each.'
    if (lower.includes('background color recommender')) return 'The **Background Color Recommender** suggests accessible background colors that work with your text colors. It ensures sufficient contrast while preserving the mood and color direction of your design.'
    if (lower.includes('compliance')) return 'The **Color Compliance Checker** provides comprehensive compliance checking against global accessibility standards including WCAG 2.2, section 508, and EN 301 549. It evaluates your entire color system for regulatory compliance across multiple frameworks.'
    if (lower.includes('wcag report')) return 'The **WCAG Report Exporter** generates detailed, professional WCAG compliance reports that document the accessibility status of your color palette. Reports include individual color pair ratios, compliance levels, and overall pass/fail summaries suitable for audits and documentation.'
    if (lower.includes('palette optimizer')) return 'The **Accessibility Palette Optimizer** automatically adjusts your color palette to maximize accessibility compliance. It fine-tunes colors while preserving their visual relationships and overall palette character, suggesting minimal adjustments needed to achieve compliance.'
    return `The **${name}** helps ensure your color choices meet web accessibility standards. Accessible color design ensures that content is perceivable, operable, and understandable by users with visual impairments, including the millions of people with color blindness, low vision, or other visual conditions.`
  }
  if (lower.includes('image') || lower.includes('photo') || lower.includes('logo') || lower.includes('screenshot') || lower.includes('pixel') || lower.includes('artwork') || lower.includes('wallpaper') || lower.includes('icon') || lower.includes('accent') || lower.includes('mood') || lower.includes('shadow') || lower.includes('highlight') || lower.includes('histogram') || lower.includes('cluster') || lower.includes('balance') || lower.includes('saturation') || lower.includes('brightness') || lower.includes('vibrance') || lower.includes('temperature')) {
    if (lower.includes('palette extractor')) return 'The **Image Palette Extractor** analyzes any uploaded image and extracts its complete color palette. Using advanced color quantization algorithms, it identifies the most prominent colors in the image and presents them as a usable palette with hex codes.'
    if (lower.includes('dominant')) return 'The **Dominant Color Extractor** identifies the most prevalent colors in any image. It finds the colors that occupy the largest areas of the image, which is useful for creating color schemes that match photography, branding materials, or artwork.'
    if (lower.includes('average')) return 'The **Average Color Finder** calculates the mean color value across an entire image or selected region. The average color represents the overall tone of the image, useful for creating harmonious backgrounds, gradient seeds, or theme colors from photos.'
    if (lower.includes('logo')) return 'The **Logo Color Extractor** specifically extracts brand colors from company logo images. It identifies the distinct color regions in logos — typically 1–4 colors — and returns their exact hex values for branding and design consistency.'
    if (lower.includes('screenshot')) return 'The **Website Screenshot Color Extractor** captures website screenshots and analyzes their color palettes. Enter any URL, and the tool renders a screenshot and extracts the site\'s color scheme for design reference and inspiration.'
    if (lower.includes('histogram')) return 'The **Image Color Histogram** visualizes the color distribution of any image as a histogram chart. It shows how many pixels fall into each color range, revealing the tonal range and color balance of the image at a glance.'
    if (lower.includes('cluster')) return 'The **Color Cluster Analyzer** groups similar colors in an image into clusters using K-means or similar algorithms. This reveals the main color groups in complex images, helping you understand the color composition beyond just the most dominant colors.'
    if (lower.includes('background color detect')) return 'The **Background Color Detector** identifies the primary background color in images. It distinguishes the background from foreground objects, useful for extracting background colors for design matching or removing backgrounds.'
    if (lower.includes('transparent color')) return 'The **Transparent Color Detector** identifies transparent areas and their underlying colors in PNG and other transparency-supporting images. It reveals what color the image would appear on different backgrounds.'
    if (lower.includes('photo palette')) return 'The **Photo Palette Generator** creates beautiful, cohesive color palettes inspired by your photographs. It analyzes the photo\'s color composition and produces a harmonious palette of 4–8 colors that capture the image\'s mood and aesthetic.'
    if (lower.includes('pixel analyzer')) return 'The **Pixel Analyzer** provides detailed information about individual pixels in an uploaded image. Zoom in to examine specific pixels and see their exact color values in multiple formats. Essential for precise color matching and image analysis.'
    if (lower.includes('color counter')) return 'The **Image Color Counter** counts the total number of distinct colors present in an image. It helps quantify the color complexity of images, useful for optimizing images, analyzing brand consistency, and evaluating color usage in designs.'
    if (lower.includes('brand color finder')) return 'The **Brand Color Finder** identifies brand colors from product images, marketing materials, and packaging. It recognizes common brand color patterns and extracts the likely brand palette for competitive analysis and design reference.'
    if (lower.includes('theme generator')) return 'The **Image Theme Generator** creates themed color palettes based on the emotional tone and visual content of your images. It analyzes the image\'s mood — calm, energetic, warm, cool, etc. — and produces a palette that amplifies that emotional quality.'
    if (lower.includes('balance analyzer')) return 'The **Color Balance Analyzer** evaluates the color balance and temperature distribution in images. It measures the relative amounts of warm vs. cool colors and identifies color casts or imbalances that may need correction.'
    if (lower.includes('saturation analyzer')) return 'The **Saturation Analyzer** measures the saturation levels across different regions of an image. It identifies which areas are vibrant and which are muted, helping evaluate the overall color intensity and punch of photographs.'
    if (lower.includes('brightness analyzer')) return 'The **Brightness Analyzer** examines the brightness distribution and exposure characteristics of images. It reveals which areas are properly exposed, overexposed, or underexposed through luminance analysis across the image.'
    if (lower.includes('vibrance analyzer')) return 'The **Vibrance Analyzer** measures the vibrance and color intensity of images, similar to saturation but with more emphasis on midtones and less saturated areas. Vibrance analysis is more perceptually relevant than simple saturation measurement.'
    if (lower.includes('temperature detector')) return 'The **Color Temperature Detector** analyzes images to determine their overall color temperature — classifying them as warm (yellow/orange tones), cool (blue tones), or neutral. Color temperature affects the emotional impact and perceived mood of photographs.'
    if (lower.includes('shadow detector')) return 'The **Shadow Detector** identifies shadow regions in images and analyzes their color characteristics. It maps shadow areas, measures their darkness level, and can help with exposure correction or creative shadow manipulation.'
    if (lower.includes('highlight detector')) return 'The **Highlight Detector** identifies highlight regions in images — the brightest areas where details may be lost. It maps blown-out or near-white areas and helps determine exposure quality and highlight preservation.'
    if (lower.includes('mood generator')) return 'The **Image Mood Generator** analyzes the emotional tone of images based on their color composition, saturation levels, brightness, and color temperature. It categorizes images as happy, calm, sad, energetic, mysterious, or other emotional qualities based on color psychology principles.'
    if (lower.includes('accent color')) return 'The **Image Accent Color Finder** identifies accent colors that complement the dominant tones in an image. Accent colors are typically contrasting, vibrant colors that stand out from the main palette and can be used for CTAs, highlights, or design elements.'
    if (lower.includes('ui screenshot')) return 'The **UI Screenshot Palette** extracts complete design system colors from UI screenshot images. It identifies the structured color usage — backgrounds, text, buttons, borders, and accents — from user interface screenshots for reverse engineering or design reference.'
    if (lower.includes('icon')) return 'The **Icon Palette Extractor** extracts colors from icon sets and SVG files. Icons typically use a limited color palette, and this tool identifies the exact colors used for consistent icon styling across a set.'
    if (lower.includes('artwork')) return 'The **Artwork Palette Generator** creates color palettes inspired by famous artworks, illustrations, and artistic movements. Explore the color compositions of masterpieces from different eras and styles for creative inspiration.'
    if (lower.includes('wallpaper')) return 'The **Wallpaper Palette Extractor** analyzes wallpaper images and extracts their color schemes for theme and interface design. It identifies the dominant and accent colors in wallpapers for creating coordinated UI themes.'
    if (lower.includes('batch')) return 'The **Batch Image Color Extractor** processes multiple images simultaneously to extract their color palettes. Upload several images at once and get a unified report of colors across all images, ideal for analyzing brand consistency or creating themed collections.'
    if (lower.includes('image-gradient') || lower.includes('image gradient')) return 'The **Image Gradient Generator** creates color gradients inspired by the colors found in your uploaded images. It analyzes the image\'s color composition and generates a gradient that captures its visual essence, bridging image content and CSS design.'
    if (lower.includes('image-to-css') || lower.includes('image to css')) return 'The **Image to CSS Gradient** analyzes your image and generates a CSS gradient that approximates its color composition. It extracts the key colors and creates a multi-stop CSS gradient that captures the image\'s overall color feel.'
    return `The **${name}** analyzes colors in images to extract useful color information. Image color analysis is essential for design workflows where you need to derive color palettes, identify brand colors, or understand the color composition of visual content.`
  }
  if (lower.includes('adjustment') || lower.includes('generator') || lower.includes('adjuster') || lower.includes('rotator') || lower.includes('mixer') || lower.includes('blend') || lower.includes('overlay') || lower.includes('dodge') || lower.includes('burn') || lower.includes('harmonizer') || lower.includes('equalizer') || lower.includes('lighten') || lower.includes('darken') || lower.includes('desaturate') || lower.includes('invert') || lower.includes('grayscale') || lower.includes('sepia')) {
    if (lower.includes('tint')) return 'The **Tint Generator** creates lighter versions of any color by adding white. In color theory, a tint is created by mixing a color with white, which increases lightness while reducing saturation. Tints are used for creating highlights, backgrounds, and lighter design elements.'
    if (lower.includes('shade')) return 'The **Shade Generator** creates darker versions of any color by adding black. A shade is created by mixing a color with black, decreasing lightness while often increasing depth. Shades are used for shadows, depth effects, and darker design elements.'
    if (lower.includes('tone')) return 'The **Tone Generator** creates muted versions of any color by adding gray (both white and black). Toning reduces the saturation and intensity of a color, creating more subtle, sophisticated variations. Tones are widely used in professional design for backgrounds and secondary elements.'
    if (lower.includes('saturation')) return 'The **Saturation Adjuster** increases or decreases the intensity of any color. Higher saturation produces more vivid, pure colors, while lower saturation creates more muted, grayish tones. Adjusting saturation independently allows you to fine-tune color intensity without changing the hue or brightness.'
    if (lower.includes('brightness')) return 'The **Brightness Adjuster** modifies the perceived luminance of any color. Increasing brightness makes colors appear lighter and more luminous, while decreasing brightness darkens them. Unlike lightness in HSL, brightness adjustment typically preserves the relative color relationships.'
    if (lower.includes('contrast')) return 'The **Contrast Adjuster** fine-tunes the contrast between color elements in your design. For a single color, contrast adjustment typically expands or compresses the range between its darkest and lightest components.'
    if (lower.includes('hue')) return 'The **Hue Rotator** shifts the hue of any color around the color wheel. Rotating hue by specific angles creates different color relationships — 60° for analogous, 180° for complementary, 120° for triadic — enabling rapid exploration of color variations.'
    if (lower.includes('vibrance')) return 'The **Vibrance Adjuster** intelligently modifies color intensity with a focus on less saturated areas. Unlike saturation which adjusts all colors uniformly, vibrance boosts muted colors more than already-vibrant ones, preserving skin tones and preventing clipping.'
    if (lower.includes('gamma')) return 'The **Gamma Adjuster** applies gamma correction to colors, adjusting the midtones while preserving shadows and highlights. Gamma correction is essential for display calibration and ensuring colors appear correctly across different screens.'
    if (lower.includes('opacity')) return 'The **Opacity Generator** creates versions of any color at different opacity levels. It generates a range of alpha values for the same color, useful for creating layered designs, hover states, and multi-surface color systems.'
    if (lower.includes('alpha')) return 'The **Alpha Adjuster** modifies the alpha transparency channel of any color. Adjust the opacity from fully transparent (0) to fully opaque (1) and preview how the color appears against different backgrounds.'
    if (lower.includes('lighten')) return 'The **Lighten Color** tool increases the lightness of any color by a specified percentage. It produces incrementally lighter versions while preserving the hue and saturation characteristics of the original color.'
    if (lower.includes('darken')) return 'The **Darken Color** tool decreases the lightness of any color by a specified percentage. It produces incrementally darker versions while maintaining the original color\'s hue character.'
    if (lower.includes('desaturate')) return 'The **Desaturate Color** tool progressively reduces the saturation of any color toward grayscale. At 100% desaturation, the color becomes a neutral gray, with the specific gray value determined by the color\'s original lightness.'
    if (lower.includes('invert')) return 'The **Invert Color** tool calculates the exact opposite of any color on the color wheel. Inversion flips each RGB channel to its complementary value (255 - value), creating a direct negative of the original color useful for dark mode, accessibility, and creative effects.'
    if (lower.includes('grayscale')) return 'The **Grayscale Generator** converts any color to its grayscale equivalent by removing all saturation while preserving the perceived luminance. The resulting gray maintains the original color\'s visual weight, useful for testing designs in monochrome.'
    if (lower.includes('sepia')) return 'The **Sepia Generator** applies a vintage sepia tone effect to any color, mimicking the warm brown tone of historical photographs. The sepia effect shifts colors toward warm browns and ochres, creating a nostalgic, old-photograph aesthetic.'
    if (lower.includes('temperature')) return 'The **Temperature Adjuster** shifts the color temperature of any color between warm and cool tones. Warm colors shift toward orange/yellow, cool colors toward blue, allowing fine control over the emotional feel of a color palette.'
    if (lower.includes('color mixer') || lower.includes('colour mixer')) return 'The **Color Mixer** blends two or more colors together and shows the resulting mixed color. It simulates both additive (light-based) and subtractive (pigment-based) mixing models for different use cases.'
    if (lower.includes('blend mode')) return 'The **Blend Mode Simulator** demonstrates how CSS blend modes affect the visual combination of two colors. It simulates multiply, screen, overlay, soft light, hard light, color dodge, and other blend modes used in CSS and image editing.'
    if (lower.includes('overlay')) return 'The **Overlay Color Generator** creates overlay color effects for layering on images and interface elements. It generates semi-transparent color overlays that can be applied as gradients or solid color layers over content.'
    if (lower.includes('multiply')) return 'The **Multiply Blend Generator** applies the multiply blend mode between colors, which darkens the result by multiplying each channel value. Multiply is useful for creating shadows, adding texture, and simulating ink on paper.'
    if (lower.includes('screen')) return 'The **Screen Blend Generator** applies the screen blend mode between colors, which lightens the result by inverting, multiplying, and inverting again. Screen is the opposite of multiply and is useful for adding highlights and light effects.'
    if (lower.includes('soft light')) return 'The **Soft Light Generator** creates a soft, subdued lighting effect between colors. Soft light is a softer version of overlay that produces gentle contrast enhancement without harsh transitions, similar to diffused lighting.'
    if (lower.includes('hard light')) return 'The **Hard Light Generator** creates a dramatic, high-contrast lighting effect between colors. Hard light is the inverse of overlay and produces more pronounced lighting effects suitable for strong highlights and shadows.'
    if (lower.includes('dodge')) return 'The **Color Dodge Generator** applies color dodge blending, which lightens and brightens the base color by decreasing contrast. Color dodge creates intense, glowing highlights and is commonly used for light leaks and brightening effects.'
    if (lower.includes('burn')) return 'The **Burn Generator** applies burn blending effects, which darkens and enriches colors by increasing contrast. Burn is used for deepening shadows, adding richness, and creating dramatic dark effects in color combinations.'
    if (lower.includes('harmonizer')) return 'The **Color Harmonizer** automatically adjusts colors to create harmonious combinations based on established color theory principles. It analyzes your colors and suggests adjustments to create balanced, visually pleasing relationships.'
    if (lower.includes('dynamic theme')) return 'The **Dynamic Theme Generator** creates adaptive color themes that respond to user preferences, time of day, or system settings. It generates both light and dark variants, plus accent color variations, for flexible theming systems.'
    if (lower.includes('equalizer')) return 'The **Color Equalizer** provides granular control over individual color channels — similar to a graphic equalizer for audio — allowing independent adjustment of red, green, blue, hue ranges, and other color attributes for precise color tuning.'
    return `The **${name}** modifies specific properties of colors to create variations and effects. Color adjustment tools are essential for fine-tuning design systems, creating accessible color scales, and generating cohesive color hierarchies.`
  }
  if (lower.includes('reference') || lower.includes('named') || lower.includes('colors') && (lower.includes('css') || lower.includes('html') || lower.includes('tailwind') || lower.includes('material') || lower.includes('bootstrap') || lower.includes('brand') || lower.includes('flag') || lower.includes('google') || lower.includes('apple') || lower.includes('microsoft') || lower.includes('discord') || lower.includes('youtube') || lower.includes('instagram') || lower.includes('spotify') || lower.includes('netflix') || lower.includes('pantone') || lower.includes('ral') || lower.includes('ncs') || lower.includes('meaning') || lower.includes('psychological') || lower.includes('trends') || lower.includes('token') || lower.includes('semantic') || lower.includes('status') || lower.includes('neutral') || lower.includes('pastel') || lower.includes('web-safe') || lower.includes('color name') || lower.includes('fifa') || lower.includes('nba') || lower.includes('league') || lower.includes('country'))) {
    if (lower.includes('css named') || lower.includes('html named')) return `The **${name}** provides a searchable reference of all color names defined in the CSS or HTML specification. CSS defines 148 named colors (including red, blue, rebeccapurple, and many more) that can be used directly in stylesheets without hex codes. This tool lets you browse, search, and preview each named color with its corresponding hex, RGB, and HSL values.`
    if (lower.includes('tailwind')) return 'The **Tailwind Colors** reference provides a complete catalog of the Tailwind CSS color palette including all shades from 50 to 950 for every color family. Tailwind\'s color system is one of the most popular in modern web development, and this reference helps you find the exact color you need for your Tailwind projects.'
    if (lower.includes('material colors')) return 'The **Material Colors** reference provides the complete Material Design 3 color system, including primary, secondary, tertiary, neutral, and error color palettes. Each palette contains multiple tones for light and dark themes, plus additional colors for specific Material components.'
    if (lower.includes('bootstrap')) return 'The **Bootstrap Colors** reference catalogs all default Bootstrap 5 color variables including semantic colors (primary, secondary, success, danger, warning, info, light, dark) and their utility class equivalents.'
    if (lower.includes('brand colors database')) return 'The **Brand Colors Database** is a searchable collection of official color codes from thousands of companies and brands worldwide. From Fortune 500 companies to popular startups, find the exact brand colors with hex values for competitive analysis, partnerships, and design reference.'
    if (lower.includes('country flag') || lower.includes('national flag')) return `The **${name}** reference catalogs the official colors used in national flags from countries around the world. Flag colors carry deep cultural and historical significance, and this tool provides the exact color codes for each flag\'s design elements.`
    if (lower.includes('google')) return 'The **Google Colors** reference provides the official Google brand colors including the primary Google logo colors (blue, red, yellow, green) and extended product palette for Google Workspace, Android, Chrome, and other Google products.'
    if (lower.includes('apple')) return 'The **Apple Colors** reference catalogs Apple\'s design system colors used across iOS, macOS, watchOS, and their brand materials. It includes system colors, semantic interface colors, and brand palette references for Apple platform design.'
    if (lower.includes('microsoft')) return 'The **Microsoft Colors** reference documents Microsoft brand colors and Fluent Design system palette. It includes the official Microsoft logo colors and the comprehensive Fluent UI color tokens used across Microsoft 365 and Windows.'
    if (lower.includes('discord')) return 'The **Discord Colors** reference provides Discord\'s brand colors and UI theme color palette. It includes the signature blurple, dark theme backgrounds, status colors (online green, idle yellow, DND red), and other Discord interface colors.'
    if (lower.includes('youtube')) return 'The **YouTube Colors** reference catalogs YouTube\'s brand colors including the iconic red play button, dark and light theme interface colors, and the extended YouTube brand palette for creators and partners.'
    if (lower.includes('x-brand') || lower.includes('x brand')) return 'The **X Brand Colors** reference provides the official X (formerly Twitter) brand color palette, including the signature black, blue verified checkmark, and the platform\'s interface colors for light and dark themes.'
    if (lower.includes('instagram')) return 'The **Instagram Colors** reference catalogs Instagram\'s brand colors and the iconic gradient palette. It includes the famous sunset-inspired gradient (purple, pink, orange, yellow) and the platform\'s interface color system.'
    if (lower.includes('spotify')) return 'The **Spotify Colors** reference provides Spotify\'s brand colors including the signature Spotify green, dark theme backgrounds, and the platform\'s music-themed interface color palette.'
    if (lower.includes('netflix')) return 'The **Netflix Colors** reference catalogs Netflix\'s brand colors including the iconic Netflix red, dark interface backgrounds, and the streaming platform\'s extended entertainment brand palette.'
    if (lower.includes('fifa') || lower.includes('nba') || lower.includes('premier') || lower.includes('league')) {
      const sport = lower.includes('fifa') ? 'FIFA World Cup national football teams' : lower.includes('nba') ? 'NBA basketball teams' : 'Premier League football clubs'
      return `The **${name}** reference provides the official colors of ${sport}. Each team entry includes primary and secondary colors with accurate hex codes, useful for sports-themed design projects, fan applications, and merchandise design.`
    }
    if (lower.includes('web-safe')) return 'The **Web Safe Colors** reference catalogs the 216 web-safe colors — the palette of colors that display consistently across all monitors and browsers using 6-bit color (256 colors per channel reduced to 6 bits per channel = 216 colors). While less critical with modern displays, web-safe colors remain relevant for retro computing and legacy support.'
    if (lower.includes('pantone')) return 'The **Pantone Finder** helps you find Pantone Matching System (PMS) colors and their nearest equivalents in other color spaces. Pantone colors are proprietary color standards widely used in print, product design, and branding for consistent color reproduction.'
    if (lower.includes('ral')) return 'The **RAL Color Finder** helps you find RAL Classic, RAL Design, and RAL Effect color codes. RAL is a German color standard system widely used in architecture, construction, and industrial design across Europe.'
    if (lower.includes('ncs')) return 'The **NCS Color Finder** helps you find Natural Color System (NCS) codes. NCS is a Swedish color standard based on the six elementary colors — white, black, yellow, red, blue, and green — and describes colors by their similarity to these fundamentals.'
    if (lower.includes('css color names')) return 'The **CSS Color Names Search** provides a fast, searchable interface for finding CSS color names. Type a color name, hex code, or keyword to instantly find matching CSS named colors with previews and values in multiple formats.'
    if (lower.includes('meaning')) return 'The **Color Meaning Guide** explores the psychological and cultural meanings associated with different colors. Red symbolizes passion and urgency, blue represents trust and calm, green suggests nature and growth — this guide helps designers make informed color choices based on the emotional and symbolic impact of colors.'
    if (lower.includes('psychological')) return 'The **Psychological Colors Guide** delves into how colors affect human mood, behavior, and perception. Based on color psychology research, it explains how different hues influence emotions, decision-making, and brand perception, helping designers create more effective and emotionally resonant designs.'
    if (lower.includes('ui color library')) return 'The **UI Color Library** is a curated collection of color schemes specifically designed for user interfaces. Each scheme includes carefully balanced colors for backgrounds, text, buttons, links, and UI elements following modern design best practices.'
    if (lower.includes('seasonal')) return 'The **Seasonal Color Library** presents color palettes inspired by each season — spring, summer, autumn, and winter. Seasonal colors capture the unique mood, temperature, and natural palette of each time of year for thematically appropriate designs.'
    if (lower.includes('color trends')) return 'The **Color Trends** reference tracks current and emerging color trends in graphic design, web design, branding, and fashion. Stay informed about popular color directions and make trend-aware design decisions for contemporary projects.'
    if (lower.includes('design tokens')) return 'The **Design Tokens Library** provides a reference system for color design tokens — the standardized color names and values used in design systems. It follows naming conventions like `color.primary.500` and `color.surface.default` for cross-platform design token management.'
    if (lower.includes('semantic')) return 'The **Semantic Color Library** documents semantic color naming conventions used in design systems. Semantic colors describe the purpose of a color (e.g., `color-primary`, `color-danger`, `color-success`) rather than its visual appearance. This library provides standard semantic color definitions for design system architecture.'
    if (lower.includes('status')) return 'The **Status Color Library** catalogs standard color conventions for system status indicators — success (green), warning (yellow/orange), error (red), info (blue), and neutral (gray). These universal color associations help users quickly understand system states and notifications.'
    if (lower.includes('neutral')) return 'The **Neutral Color Library** provides comprehensive collections of neutral colors — whites, grays, blacks, and beiges — for use in design systems. Neutral colors form the foundation of most designs, providing structure, hierarchy, and readability without competing with accent colors.'
    if (lower.includes('pastel')) return 'The **Pastel Library** is a curated collection of soft, muted pastel colors suitable for gentle, calming design aesthetics. Pastels are characterized by high lightness and low to moderate saturation, making them ideal for backgrounds, baby products, wellness brands, and soft design styles.'
    return `The **${name}** provides a searchable reference of color data for design and development reference. Color reference tools help designers and developers find, compare, and use standardized color values from established systems, frameworks, and brand guidelines.`
  }
  if (lower.includes('utility') || lower.includes('finder') || lower.includes('checker') || lower.includes('calculator') || lower.includes('generator') || lower.includes('wheel') || lower.includes('exporter') || lower.includes('importer') || lower.includes('variable') || lower.includes('theme') || lower.includes('figma') || lower.includes('ase') || lower.includes('scss') || lower.includes('json') || lower.includes('android') || lower.includes('swift') || lower.includes('flutter') || lower.includes('react') || lower.includes('token') || lower.includes('playground')) {
    if (lower.includes('color name finder')) return 'The **Color Name Finder** matches any hex code, RGB value, or HSL value to the closest human-readable color name. Using a comprehensive database of named colors — from CSS named colors to X11 color names to common design color names — it finds the best match and displays its name alongside the original value.'
    if (lower.includes('similarity')) return 'The **Color Similarity Checker** measures how similar or different two colors are using Delta E (CIE76, CIE94, or CIEDE2000) perceptual difference metrics. It provides both a numerical similarity score and visual feedback showing the gradient between the two colors, helping designers evaluate color proximity.'
    if (lower.includes('duplicate')) return 'The **Duplicate Color Finder** scans your palette or color list and identifies duplicate or near-duplicate colors. It uses perceptual difference thresholds to find colors that are visually indistinguishable, helping maintain clean, efficient color systems without redundant entries.'
    if (lower.includes('difference')) return 'The **Color Difference Calculator** calculates the exact Delta E (CIE76, CIE94, or CIEDE2000) perceptual difference between two colors. Delta E values indicate how different colors appear to the human eye — values below 1.0 are imperceptible, 1–2 are very slight, 2–6 are noticeable, and above 6 are clearly different.'
    if (lower.includes('random color')) return 'The **Random Color Generator** generates random colors with full information displayed in HEX, RGB, HSL, and other popular formats with each click. It\'s a great tool for design inspiration, finding unexpected color combinations, and breaking out of creative ruts.'
    if (lower.includes('wheel')) return 'The **Color Wheel** provides an interactive visualization of color relationships based on the traditional RYB or modern RGB color wheel. Explore complementary, analogous, triadic, and tetradic relationships by rotating around the wheel, with real-time color value updates for each relationship.'
    if (lower.includes('palette exporter') || lower.includes('palette-exporter')) return 'The **Palette Exporter** converts your color palette into multiple output formats including CSS custom properties, SCSS variables, JSON, Tailwind config, and more. It\'s the essential tool for moving from design to development by generating production-ready color code.'
    if (lower.includes('palette importer') || lower.includes('palette-importer')) return 'The **Palette Importer** reads color palettes from CSS, SCSS, JSON, Tailwind configuration, and other color file formats, extracting the color values for use in your projects. It saves time by automatically parsing existing color definitions rather than requiring manual re-entry.'
    if (lower.includes('css variable')) return 'The **CSS Variable Generator** creates CSS custom property (`--variable`) definitions from your color palette. It generates clean, well-organized `:root` declarations with your named color tokens, ready to drop directly into your stylesheet for a scalable design token system.'
    if (lower.includes('tailwind theme')) return 'The **Tailwind Theme Generator** creates a complete Tailwind CSS `theme.extend.colors` configuration from your palette. It generates the proper Tailwind config syntax with your custom color names and values, ready to plug into your `tailwind.config.js` or CSS-based Tailwind v4 configuration.'
    if (lower.includes('figma')) return 'The **Figma Color Export** tool formats your color palette for direct import into Figma design files. It generates structured color data compatible with Figma\'s design token plugins and color style systems, bridging the gap between color tools and UI design.'
    if (lower.includes('ase')) return 'The **Adobe ASE Export** creates Adobe Swatch Exchange (.ase) files from your color palette. ASE is the standard format for sharing color palettes between Adobe Creative Suite applications including Photoshop, Illustrator, and InDesign.'
    if (lower.includes('scss variables') || lower.includes('scss-variables')) return 'The **SCSS Variables Generator** creates SCSS variable definitions (`$variable`) from your color palette. It generates clean, namespaced SCSS variables suitable for import into any Sass-based project, with optional `!default` flags for overriding.'
    if (lower.includes('json palette') || lower.includes('json-palette')) return 'The **JSON Palette Generator** creates structured JSON palette files for design system consumption. It outputs a clean JSON object with your color names and values, ready for use in JavaScript/TypeScript projects, build pipelines, and design token systems.'
    if (lower.includes('android colors') || lower.includes('android xml')) return 'The **Android Colors.xml Generator** creates Android resource color definitions (`<color name="name">#AARRGGBB</color>`) from your palette. It generates a complete `colors.xml` file for your Android project with proper Android color format (8-digit hex with alpha).'
    if (lower.includes('swift color assets')) return 'The **Swift Color Assets Generator** creates Swift code for defining UIColor assets and color sets. It generates `Color` or `UIColor` extensions with your custom colors, ready for use in SwiftUI or UIKit iOS/macOS applications.'
    if (lower.includes('flutter theme')) return 'The **Flutter Theme Generator** creates Flutter `ThemeData` color configuration from your palette. It generates a complete Flutter theme configuration including `colorScheme`, `primarySwatch`, and other theme properties for Material Design Flutter apps.'
    if (lower.includes('react theme')) return 'The **React Theme Generator** creates React context and provider code for implementing your color theme. It generates a TypeScript-friendly theme object with your color tokens, ready to use with React Context, styled-components, or Emotion for consistent theming.'
    if (lower.includes('design token')) return 'The **Design Token Generator** creates cross-platform design tokens from your color palette. It outputs tokens in multiple formats — JSON, YAML, TypeScript, CSS — following industry-standard naming conventions for comprehensive design system architecture.'
    if (lower.includes('playground')) return 'The **Color Playground** is a free-form interactive space for experimenting with colors. Mix, match, adjust, and explore colors without constraints — combine different color tools, preview color combinations, and discover new palettes in a sandbox environment designed for creative exploration.'
    return `The **${name}** provides essential color utility functions for design and development workflows. These tools help you manage, convert, export, and analyze colors efficiently across different projects and platforms.`
  }
  return `The **${name}** is a free online color tool for designers and developers.`
}

export function getToolContent(slug: string): ToolContent | null {
  const tool = tools.find(t => t.id === slug)
  if (!tool) return null

  const name = tool.name
  const category = tool.category

  let whatIs: string
  if (slug in converterWhatIs) {
    whatIs = converterWhatIs[slug]
  } else if (slug in specificWhatIs) {
    whatIs = specificWhatIs[slug]
  } else if (category === 'converter') {
    whatIs = buildConverterWhatIs(name)
  } else {
    whatIs = buildAltWhatIs(name)
  }

  let howToUse: string[]
  if (slug in specificHowToUse) {
    howToUse = specificHowToUse[slug]
  } else {
    howToUse = getCategoryHowToUse(category)
  }

  let faq: { question: string; answer: string }[]
  if (slug in specificFaq) {
    faq = specificFaq[slug]
  } else {
    faq = getCategoryFaq(category)
  }

  const relatedTools = getRelatedTools(slug, category)

  return { whatIs, howToUse, faq, relatedTools }
}
