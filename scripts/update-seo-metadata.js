import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs'
import { join } from 'path'

const appDir = join(process.cwd(), 'src/app')
const excludeDirs = new Set([
  'blog', 'learn', 'about', 'contact', 'privacy', 'terms', 'cookies', 'disclaimer',
  'api', 'blog/[slug]', 'learn/[slug]',
])

function toTitle(slug) {
  return slug
    .split('-')
    .map((w, i) => {
      if (['to', 'and', 'for', 'with', 'or'].includes(w)) return w
      if (['hex', 'rgb', 'hsl', 'hsla', 'hsv', 'hwb', 'lab', 'lch', 'cmyk', 'rgba', 'ui', 'wcag', 'css', 'scss', 'svg', 'ase', 'xml', 'json', 'api', 'saas'].includes(w)) return w.toUpperCase()
      if (w === 'oklab') return 'OKLab'
      if (w === 'oklch') return 'OKLCH'
      if (w === 'youtube') return 'YouTube'
      if (w === 'nba') return 'NBA'
      if (w === 'fifa') return 'FIFA'
      if (w === 'netflix') return 'Netflix'
      if (w === 'spotify') return 'Spotify'
      if (w === 'discord') return 'Discord'
      if (w === 'instagram') return 'Instagram'
      if (w === 'tailwind') return 'Tailwind'
      if (w === 'bootstrap') return 'Bootstrap'
      if (w === 'flutter') return 'Flutter'
      if (w === 'pantone') return 'Pantone'
      if (w === 'ral') return 'RAL'
      if (w === 'ncs') return 'NCS'
      if (w === 'adobe') return 'Adobe'
      if (w === 'figma') return 'Figma'
      if (w === 'material') return 'Material'
      if (w === 'google') return 'Google'
      if (w === 'microsoft') return 'Microsoft'
      if (w === 'apple') return 'Apple'
      if (w === 'swift') return 'Swift'
      if (w === 'kotlin') return 'Kotlin'
      if (w === 'python') return 'Python'
      if (w === 'java') return 'Java'
      if (w === 'csharp') return 'C#'
      if (w === 'less') return 'Less'
      if (w === 'apca') return 'APCA'
      if (w === 'wcag') return 'WCAG'
      if (w === 'uuid') return 'UUID'
      if (w.name === 'dom') return 'DOM'
      if (w === 'ecommerce') return 'eCommerce'
      if (i === 0) return w.charAt(0).toUpperCase() + w.slice(1)
      return w.charAt(0).toUpperCase() + w.slice(1)
    })
    .join(' ')
}

function kebabToDisplay(slug) {
  return slug.replace(/-/g, ' ')
}

const manualMeta = {
  'hex-to-rgb': {
    title: 'HEX to RGB Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert HEX color codes to RGB values instantly. Free online HEX to RGB converter for web developers and designers. Supports #RRGGBB, #RGB, and 8-digit HEX formats with real-time preview.',
    kw: ['hex to rgb', 'hex to rgb converter', 'hex color converter', 'hex code to rgb', 'hex to rgb calculator'],
  },
  'rgb-to-hex': {
    title: 'RGB to HEX Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert RGB color values to HEX codes instantly. Free online RGB to HEX converter for web developers and designers. Supports rgb(), rgba(), and comma-separated formats with real-time preview.',
    kw: ['rgb to hex', 'rgb to hex converter', 'rgb color to hex', 'rgb to hex code', 'rgb converter'],
  },
  'hex-to-hsl': {
    title: 'HEX to HSL Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert HEX color codes to HSL values instantly. Free online HEX to HSL converter for web developers and designers. Get hue, saturation, and lightness values from any HEX color.',
    kw: ['hex to hsl', 'hex to hsl converter', 'hsl converter', 'hex to hsl color', 'hsl color converter'],
  },
  'hex-to-hsla': {
    title: 'HEX to HSLA Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert HEX color codes to HSLA values with alpha channel. Free online HEX to HSLA converter for web developers and designers. Supports transparency in color conversion.',
    kw: ['hex to hsla', 'hex to hsla converter', 'hsla converter', 'hex to hsla color', 'hex with alpha'],
  },
  'hex-to-hsv': {
    title: 'HEX to HSV Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert HEX color codes to HSV (Hue, Saturation, Value) values instantly. Free online HEX to HSV converter for designers and developers working with color picking interfaces.',
    kw: ['hex to hsv', 'hex to hsv converter', 'hsv converter', 'hex to hsv color', 'hsv color converter'],
  },
  'hex-to-hwb': {
    title: 'HEX to HWB Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert HEX color codes to HWB (Hue, Whiteness, Blackness) values instantly. Free online HEX to HWB converter for CSS Color Module Level 4 color format support.',
    kw: ['hex to hwb', 'hex to hwb converter', 'hwb converter', 'hex to hwb color', 'hwb color converter'],
  },
  'hex-to-lab': {
    title: 'HEX to LAB Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert HEX color codes to CIELAB (L*a*b*) color space values instantly. Free online HEX to LAB converter for accurate, device-independent color representation.',
    kw: ['hex to lab', 'hex to lab converter', 'lab color converter', 'hex to lab color', 'cielab converter'],
  },
  'hex-to-lch': {
    title: 'HEX to LCH Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert HEX color codes to LCH (Lightness, Chroma, Hue) values instantly. Free online HEX to LCH converter supporting CSS Color Level 4 color format.',
    kw: ['hex to lch', 'hex to lch converter', 'lch color converter', 'hex to lch color', 'cie lch converter'],
  },
  'hex-to-oklab': {
    title: 'HEX to OKLab Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert HEX color codes to OKLab color space values instantly. Free online HEX to OKLab converter for perceptually uniform color representation in modern web development.',
    kw: ['hex to oklab', 'hex to oklab converter', 'oklab converter', 'hex to oklab color', 'oklab color space'],
  },
  'hex-to-oklch': {
    title: 'HEX to OKLCH Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert HEX color codes to OKLCH (Lightness, Chroma, Hue) values instantly. Free online HEX to OKLCH converter for modern CSS Color Level 4 color format support.',
    kw: ['hex to oklch', 'hex to oklch converter', 'oklch converter', 'hex to oklch color', 'oklch color space'],
  },
  'hex-to-cmyk': {
    title: 'HEX to CMYK Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert HEX color codes to CMYK values for print preparation. Free online HEX to CMYK converter for graphic designers and print professionals. Accurate color space conversion.',
    kw: ['hex to cmyk', 'hex to cmyk converter', 'cmyk converter', 'hex to cmyk print', 'cmyk color converter'],
  },
  'hex-to-rgba': {
    title: 'HEX to RGBA Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert HEX color codes to RGBA values with alpha channel. Free online HEX to RGBA converter for web developers and designers. Supports transparency in color conversion with real-time preview.',
    kw: ['hex to rgba', 'hex to rgba converter', 'rgba converter', 'hex with alpha', 'hex to rgba color'],
  },
  'hsl-to-hex': {
    title: 'HSL to HEX Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert HSL color values to HEX codes instantly. Free online HSL to HEX converter for web developers and designers. Enter hue, saturation, and lightness to get your HEX color code.',
    kw: ['hsl to hex', 'hsl to hex converter', 'hsl to hex code', 'hsl color to hex', 'hsl converter'],
  },
  'hsl-to-rgb': {
    title: 'HSL to RGB Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert HSL color values to RGB format instantly. Free online HSL to RGB converter for web developers and designers. Transform hue, saturation, and lightness into rgb() values.',
    kw: ['hsl to rgb', 'hsl to rgb converter', 'hsl to rgb color', 'hsl to rgb calculator', 'hsl converter'],
  },
  'hsla-to-hex': {
    title: 'HSLA to HEX Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert HSLA color values with alpha channel to HEX codes. Free online HSLA to HEX converter for web developers needing precise color format conversion with transparency.',
    kw: ['hsla to hex', 'hsla to hex converter', 'hsla to hex color', 'hsla with alpha', 'hsla converter'],
  },
  'hsv-to-hex': {
    title: 'HSV to HEX Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert HSV (Hue, Saturation, Value) color values to HEX codes instantly. Free online HSV to HEX converter for designers working with color picker interfaces.',
    kw: ['hsv to hex', 'hsv to hex converter', 'hsv to hex code', 'hsv color to hex', 'hsv converter'],
  },
  'hsv-to-rgb': {
    title: 'HSV to RGB Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert HSV (Hue, Saturation, Value) color values to RGB format instantly. Free online HSV to RGB converter for designers and developers working with color models.',
    kw: ['hsv to rgb', 'hsv to rgb converter', 'hsv to rgb color', 'hsv color to rgb', 'hsv converter'],
  },
  'hwb-to-hex': {
    title: 'HWB to HEX Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert HWB (Hue, Whiteness, Blackness) color values to HEX codes instantly. Free online HWB to HEX converter supporting CSS Color Module Level 4 format.',
    kw: ['hwb to hex', 'hwb to hex converter', 'hwb to hex code', 'hwb color to hex', 'hwb converter'],
  },
  'hwb-to-rgb': {
    title: 'HWB to RGB Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert HWB (Hue, Whiteness, Blackness) color values to RGB format instantly. Free online HWB to RGB converter for modern CSS color format support.',
    kw: ['hwb to rgb', 'hwb to rgb converter', 'hwb to rgb color', 'hwb color to rgb', 'hwb converter'],
  },
  'lab-to-hex': {
    title: 'LAB to HEX Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert CIELAB (L*a*b*) color space values to HEX codes instantly. Free online LAB to HEX converter for accurate, device-independent color representation in web projects.',
    kw: ['lab to hex', 'lab to hex converter', 'lab color to hex', 'cielab to hex', 'lab converter'],
  },
  'lab-to-rgb': {
    title: 'LAB to RGB Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert CIELAB (L*a*b*) color space values to RGB format instantly. Free online LAB to RGB converter for accurate color space transformation in design workflows.',
    kw: ['lab to rgb', 'lab to rgb converter', 'lab color to rgb', 'cielab to rgb', 'lab converter'],
  },
  'lch-to-hex': {
    title: 'LCH to HEX Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert LCH (Lightness, Chroma, Hue) color values to HEX codes instantly. Free online LCH to HEX converter for CSS Color Level 4 color format support.',
    kw: ['lch to hex', 'lch to hex converter', 'lch color to hex', 'cie lch to hex', 'lch converter'],
  },
  'lch-to-rgb': {
    title: 'LCH to RGB Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert LCH (Lightness, Chroma, Hue) color values to RGB format instantly. Free online LCH to RGB converter for modern color space workflows and CSS Color Level 4.',
    kw: ['lch to rgb', 'lch to rgb converter', 'lch color to rgb', 'cie lch to rgb', 'lch converter'],
  },
  'oklab-to-hex': {
    title: 'OKLab to HEX Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert OKLab color space values to HEX codes instantly. Free online OKLab to HEX converter for perceptually uniform color representation in modern web applications.',
    kw: ['oklab to hex', 'oklab to hex converter', 'oklab color to hex', 'oklab to hex code', 'oklab converter'],
  },
  'oklab-to-rgb': {
    title: 'OKLab to RGB Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert OKLab color space values to RGB format instantly. Free online OKLab to RGB converter for accurate color transformations using perceptually uniform color space.',
    kw: ['oklab to rgb', 'oklab to rgb converter', 'oklab color to rgb', 'oklab to rgb value', 'oklab converter'],
  },
  'oklch-to-hex': {
    title: 'OKLCH to HEX Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert OKLCH (Lightness, Chroma, Hue) color values to HEX codes instantly. Free online OKLCH to HEX converter for modern CSS Color Level 4 color format support.',
    kw: ['oklch to hex', 'oklch to hex converter', 'oklch color to hex', 'oklch to hex code', 'oklch converter'],
  },
  'oklch-to-rgb': {
    title: 'OKLCH to RGB Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert OKLCH (Lightness, Chroma, Hue) color values to RGB format instantly. Free online OKLCH to RGB converter for modern CSS Color Level 4 and perceptually uniform color.',
    kw: ['oklch to rgb', 'oklch to rgb converter', 'oklch color to rgb', 'oklch to rgb value', 'oklch converter'],
  },
  'rgb-to-hsl': {
    title: 'RGB to HSL Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert RGB color values to HSL (Hue, Saturation, Lightness) format instantly. Free online RGB to HSL converter for web developers and designers. Supports rgb() and rgba() input formats.',
    kw: ['rgb to hsl', 'rgb to hsl converter', 'rgb color to hsl', 'rgb to hsl calculator', 'hsl converter'],
  },
  'rgb-to-hsv': {
    title: 'RGB to HSV Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert RGB color values to HSV (Hue, Saturation, Value) format instantly. Free online RGB to HSV converter for designers working with color picking interfaces.',
    kw: ['rgb to hsv', 'rgb to hsv converter', 'rgb color to hsv', 'rgb to hsv calculator', 'hsv converter'],
  },
  'rgb-to-hwb': {
    title: 'RGB to HWB Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert RGB color values to HWB (Hue, Whiteness, Blackness) format instantly. Free online RGB to HWB converter for CSS Color Module Level 4 format support.',
    kw: ['rgb to hwb', 'rgb to hwb converter', 'rgb color to hwb', 'rgb to hwb calculator', 'hwb converter'],
  },
  'rgb-to-lab': {
    title: 'RGB to LAB Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert RGB color values to CIELAB (L*a*b*) color space instantly. Free online RGB to LAB converter for accurate, device-independent color representation and analysis.',
    kw: ['rgb to lab', 'rgb to lab converter', 'rgb color to lab', 'rgb to cielab', 'lab converter'],
  },
  'rgb-to-lch': {
    title: 'RGB to LCH Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert RGB color values to LCH (Lightness, Chroma, Hue) format instantly. Free online RGB to LCH converter for CSS Color Level 4 and advanced color science workflows.',
    kw: ['rgb to lch', 'rgb to lch converter', 'rgb color to lch', 'rgb to cielch', 'lch converter'],
  },
  'rgb-to-oklab': {
    title: 'RGB to OKLab Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert RGB color values to OKLab color space instantly. Free online RGB to OKLab converter for perceptually uniform color representation in modern web development.',
    kw: ['rgb to oklab', 'rgb to oklab converter', 'rgb to oklab color', 'oklab color space', 'rgb converter'],
  },
  'rgb-to-oklch': {
    title: 'RGB to OKLCH Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert RGB color values to OKLCH (Lightness, Chroma, Hue) format instantly. Free online RGB to OKLCH converter for modern CSS Color Level 4 color format support.',
    kw: ['rgb to oklch', 'rgb to oklch converter', 'rgb to oklch color', 'oklch color space', 'rgb converter'],
  },
  'rgb-to-cmyk': {
    title: 'RGB to CMYK Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert RGB color values to CMYK for print preparation. Free online RGB to CMYK converter for graphic designers and print professionals. Accurate screen-to-print color conversion.',
    kw: ['rgb to cmyk', 'rgb to cmyk converter', 'cmyk for print', 'rgb to cmyk print', 'cmyk converter'],
  },
  'cmyk-to-rgb': {
    title: 'CMYK to RGB Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert CMYK color values to RGB format for digital displays. Free online CMYK to RGB converter for print designers converting artwork for web and screen use.',
    kw: ['cmyk to rgb', 'cmyk to rgb converter', 'cmyk to rgb color', 'cmyk for web', 'cmyk converter'],
  },
  'cmyk-to-hex': {
    title: 'CMYK to HEX Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert CMYK color values to HEX codes for web development. Free online CMYK to HEX converter for print designers moving projects from print to digital.',
    kw: ['cmyk to hex', 'cmyk to hex converter', 'cmyk to hex code', 'cmyk for web', 'cmyk converter'],
  },
  'rgba-to-hex': {
    title: 'RGBA to HEX Converter - Free Online Color Tool | ColorKits',
    desc: 'Convert RGBA color values with alpha channel to HEX codes instantly. Free online RGBA to HEX converter for web developers and designers preserving transparency in conversion.',
    kw: ['rgba to hex', 'rgba to hex converter', 'rgba with alpha to hex', 'rgba to hex code', 'rgba converter'],
  },
}

const descriptions = {
  'hex-color-picker': 'Pick HEX color codes with an interactive color picker. Free online HEX color picker for web developers and designers. Select colors visually and get instant HEX values with real-time preview.',
  'rgb-color-picker': 'Pick RGB colors with an interactive color picker. Free online RGB color picker for web developers and designers. Select colors visually and get rgb() values instantly with live preview.',
  'hsl-color-picker': 'Pick HSL colors with an interactive color picker. Free online HSL color picker for web developers and designers. Select colors visually and get hsl() values with real-time preview.',
  'hsla-color-picker': 'Pick HSLA colors with alpha channel support. Free online HSLA color picker for web developers and designers. Select colors with transparency and get hsla() values instantly.',
  'hsv-color-picker': 'Pick HSV colors with an interactive color picker. Free online HSV color picker for designers and developers. Select colors visually with hue, saturation, and value controls.',
  'hwb-color-picker': 'Pick HWB colors with an interactive color picker. Free online HWB color picker supporting CSS Color Module Level 4 format. Select colors with whiteness and blackness controls.',
  'lab-color-picker': 'Pick LAB color space values with an interactive picker. Free online CIELAB color picker for designers working with device-independent color representation.',
  'lch-color-picker': 'Pick LCH color values with an interactive color picker. Free online LCH color picker for CSS Color Level 4 and advanced color science applications.',
  'oklab-color-picker': 'Pick OKLab color space values with an interactive picker. Free online OKLab color picker for perceptually uniform color selection in modern design workflows.',
  'oklch-color-picker': 'Pick OKLCH color values with an interactive color picker. Free online OKLCH color picker for modern CSS Color Level 4 with perceptually uniform color selection.',
  'cmyk-color-picker': 'Pick CMYK colors for print design with an interactive picker. Free online CMYK color picker for graphic designers preparing artwork for print production.',
  'rgba-color-picker': 'Pick RGBA colors with alpha channel support. Free online RGBA color picker for web developers and designers. Select colors with transparency and get rgba() values.',
  'transparent-color-picker': 'Pick transparent and semi-transparent colors visually. Free online transparent color picker for designers and developers working with opacity and alpha channels.',
  'screen-color-picker': 'Pick colors from anywhere on your screen. Free online screen color picker for designers and developers. Identify and capture color values from any application or website.',
  'image-color-picker': 'Pick colors from uploaded images with precision. Free online image color picker for designers and developers. Extract color values from photos, illustrations, and graphics.',
  'pixel-color-picker': 'Pick individual pixel colors from images with precision zoom. Free online pixel color picker for detailed color analysis and extraction from digital images.',
  'magnifier-color-picker': 'Magnify and pick colors from images with precision zoom controls. Free online magnifier color picker for detailed color selection and analysis.',
  'multi-color-picker': 'Pick multiple colors simultaneously with an advanced color picker. Free online multi-color picker for building color palettes and comparing color values side by side.',
  'gradient-color-picker': 'Pick and create gradient colors with an interactive picker. Free online gradient color picker for designing smooth color transitions and multi-stop gradients.',
  'random-color-picker': 'Discover random colors with a fun interactive picker. Free online random color picker for inspiration and exploration. Generate surprise colors with one click.',
  'browser-color-picker': 'Pick colors from web pages in your browser. Free online browser color picker for web developers and designers to inspect and capture colors from any webpage.',
  'eye-dropper-tool': 'Use an eye dropper tool to pick colors from anywhere on screen. Free online eye dropper for designers and developers to sample and capture exact color values.',
  'background-color-detector': 'Detect and identify background colors from images and designs. Free online background color detector for analyzing color schemes and extracting dominant background hues.',
  'color-picker': 'Pick and identify colors from anywhere with a precision color picker. Free online color picker for web developers and designers. Select colors visually and get instant values in multiple formats.',
  'alpha-color-picker': 'Pick colors with alpha channel and transparency controls. Free online alpha color picker for designers and developers working with RGBA, HSLA, and opacity values.',
  'universal-color-converter': 'Convert colors between HEX, RGB, HSL, HSV, CMYK, LAB, LCH, OKLab, OKLCH, and HWB formats. Free online universal color converter with real-time preview and batch conversion support.',
}

const paletteTitles = new Map([
  ['analogous-palette', 'Analogous Palette Generator'],
  ['complementary-palette', 'Complementary Palette Generator'],
  ['split-complementary-palette', 'Split Complementary Palette Generator'],
  ['triadic-palette', 'Triadic Palette Generator'],
  ['tetradic-palette', 'Tetradic Palette Generator'],
  ['square-palette', 'Square Palette Generator'],
  ['monochromatic-palette', 'Monochromatic Palette Generator'],
  ['rainbow-palette', 'Rainbow Palette Generator'],
  ['neon-palette-generator', 'Neon Palette Generator'],
  ['pastel-palette-generator', 'Pastel Palette Generator'],
  ['retro-palette-generator', 'Retro Palette Generator'],
  ['vintage-palette-generator', 'Vintage Palette Generator'],
  ['luxury-palette', 'Luxury Color Palette'],
  ['corporate-palette', 'Corporate Color Palette'],
  ['flat-ui-palette', 'Flat UI Color Palette'],
  ['material-palette-generator', 'Material Design Palette Generator'],
  ['bootstrap-palette-generator', 'Bootstrap Palette Generator'],
  ['tailwind-palette-generator', 'Tailwind CSS Palette Generator'],
  ['accessible-palette-generator', 'Accessible Color Palette Generator'],
  ['dark-theme-palette', 'Dark Theme Color Palette'],
  ['light-theme-palette', 'Light Theme Color Palette'],
  ['ui-palette-generator', 'UI Color Palette Generator'],
  ['ui-color-library', 'UI Color Library'],
  ['seasonal-color-library', 'Seasonal Color Library'],
  ['semantic-color-library', 'Semantic Color Library'],
  ['status-color-library', 'Status Color Library'],
  ['neutral-color-library', 'Neutral Color Library'],
  ['pastel-library', 'Pastel Color Library'],
  ['css-named-colors', 'CSS Named Colors Reference'],
  ['html-named-colors', 'HTML Named Colors Reference'],
  ['web-safe-colors', 'Web Safe Colors Reference'],
  ['tailwind-colors', 'Tailwind CSS Colors Reference'],
  ['bootstrap-colors', 'Bootstrap Colors Reference'],
  ['material-colors', 'Material Design Colors Reference'],
  ['google-colors', 'Google Brand Colors'],
  ['microsoft-colors', 'Microsoft Brand Colors'],
  ['apple-colors', 'Apple Brand Colors'],
  ['x-brand-colors', 'X (Twitter) Brand Colors'],
  ['youtube-colors', 'YouTube Brand Colors'],
  ['spotify-colors', 'Spotify Brand Colors'],
  ['discord-colors', 'Discord Brand Colors'],
  ['instagram-colors', 'Instagram Brand Colors'],
  ['netflix-colors', 'Netflix Brand Colors'],
  ['nba-team-colors', 'NBA Team Colors Reference'],
  ['premier-league-colors', 'Premier League Team Colors'],
  ['fifa-team-colors', 'FIFA World Cup Team Colors'],
  ['fashion-palette', 'Fashion Color Palette'],
  ['food-palette', 'Food Color Palette'],
  ['nature-palette-generator', 'Nature Color Palette Generator'],
  ['ocean-palette-generator', 'Ocean Color Palette Generator'],
  ['sunset-palette-generator', 'Sunset Color Palette Generator'],
  ['autumn-palette-generator', 'Autumn Color Palette Generator'],
  ['spring-palette-generator', 'Spring Color Palette Generator'],
  ['summer-palette-generator', 'Summer Color Palette Generator'],
  ['winter-palette-generator', 'Winter Color Palette Generator'],
  ['earth-tone-palette', 'Earth Tone Color Palette'],
  ['aurora-gradient-generator', 'Aurora Gradient Generator'],
  ['neon-gradient-generator', 'Neon Gradient Generator'],
  ['pastel-gradient-generator', 'Pastel Gradient Generator'],
  ['metallic-gradient-generator', 'Metallic Gradient Generator'],
  ['glass-gradient-generator', 'Glassmorphism Gradient Generator'],
  ['grain-gradient-generator', 'Grain Texture Gradient Generator'],
  ['mesh-gradient-generator', 'Mesh Gradient Generator'],
  ['animated-gradient-generator', 'Animated Gradient Generator'],
  ['background-gradient-generator', 'Background Gradient Generator'],
  ['button-gradient-generator', 'Button Gradient Generator'],
  ['text-gradient-generator', 'Text Gradient Generator'],
  ['gradient-border-generator', 'Gradient Border Generator'],
  ['gradient-shadow-generator', 'Gradient Shadow Generator'],
  ['gradient-overlay-generator', 'Gradient Overlay Generator'],
  ['multi-stop-gradient', 'Multi-Stop Gradient Generator'],
  ['three-color-gradient', 'Three Color Gradient Generator'],
])

const gradientKeywords = {
  'linear-gradient-generator': ['linear gradient', 'linear gradient generator', 'css linear gradient', 'linear gradient css', 'gradient generator'],
  'radial-gradient-generator': ['radial gradient', 'radial gradient generator', 'css radial gradient', 'radial gradient css', 'gradient generator'],
  'conic-gradient-generator': ['conic gradient', 'conic gradient generator', 'css conic gradient', 'conic gradient css', 'gradient generator'],
  'svg-gradient-generator': ['svg gradient', 'svg gradient generator', 'svg linear gradient', 'svg radial gradient', 'svg fill gradient'],
  'image-gradient-generator': ['image gradient', 'image gradient generator', 'gradient over image', 'image overlay gradient', 'photo gradient'],
  'animated-gradient-generator': ['animated gradient', 'animated gradient generator', 'css gradient animation', 'moving gradient', 'gradient animation css'],
  'mesh-gradient-generator': ['mesh gradient', 'mesh gradient generator', 'mesh gradient css', 'fluid gradient', 'mesh gradient background'],
  'grain-gradient-generator': ['grain gradient', 'grain texture gradient', 'noise gradient', 'grain gradient generator', 'textured gradient'],
  'glass-gradient-generator': ['glassmorphism gradient', 'glass gradient', 'glassmorphism generator', 'glass effect gradient', 'glass gradient css'],
  'metallic-gradient-generator': ['metallic gradient', 'metal gradient', 'metallic gradient generator', 'metallic effect css', 'shiny gradient'],
  'neon-gradient-generator': ['neon gradient', 'neon gradient generator', 'neon effect css', 'neon gradient background', 'glow gradient'],
  'pastel-gradient-generator': ['pastel gradient', 'pastel gradient generator', 'pastel gradient background', 'soft gradient', 'pastel colors gradient'],
  'aurora-gradient-generator': ['aurora gradient', 'aurora gradient generator', 'aurora borealis gradient', 'northern lights gradient', 'aurora background css'],
  'multi-stop-gradient': ['multi stop gradient', 'multi color gradient', 'multiple stop gradient', 'css multi stop gradient', 'gradient with multiple colors'],
  'three-color-gradient': ['three color gradient', '3 color gradient', 'tri color gradient', 'three stop gradient', '3 color gradient css'],
  'gradient-border-generator': ['gradient border', 'gradient border generator', 'css gradient border', 'gradient border css', 'border with gradient'],
  'gradient-shadow-generator': ['gradient shadow', 'gradient shadow generator', 'css gradient shadow', 'colored shadow', 'gradient box shadow'],
  'gradient-overlay-generator': ['gradient overlay', 'gradient overlay generator', 'css gradient overlay', 'image gradient overlay', 'overlay gradient'],
  'gradient-preview': ['gradient preview', 'css gradient preview', 'gradient live preview', 'gradient visualizer', 'gradient tester'],
  'gradient-mixer': ['gradient mixer', 'gradient blender', 'mix gradients', 'gradient combiner', 'gradient tool'],
  'gradient-reverser': ['gradient reverser', 'reverse gradient', 'flip gradient', 'gradient direction', 'invert gradient'],
  'gradient-angle-generator': ['gradient angle', 'gradient angle generator', 'css gradient angle', 'gradient direction', 'gradient degree'],
  'gradient-animation-builder': ['gradient animation', 'gradient animation builder', 'animated gradient css', 'css gradient animation', 'moving gradient background'],
  'gradient-code-generator': ['gradient code generator', 'css gradient code', 'gradient css generator', 'gradient code', 'copy gradient css'],
  'gradient-library': ['gradient library', 'css gradient examples', 'gradient collection', 'premade gradients', 'gradient inspiration'],
  'gradient-exporter': ['gradient exporter', 'export gradient', 'gradient to css', 'gradient to svg', 'gradient download'],
  'gradient-noise-generator': ['noise gradient', 'gradient noise', 'noise texture gradient', 'gradient with noise', 'perlin noise gradient'],
}

function getManualMeta(slug) {
  return manualMeta[slug] || null
}

function getPaletteMeta(slug) {
  const displayName = paletteTitles.get(slug)
  if (!displayName) return null

  const lower = slug.replace(/-/g, ' ')
  const titleStr = `${displayName} - Free Online Color Tool | ColorKits`

  let desc
  if (slug.includes('brand') || slug.includes('colors') && !slug.includes('palette') && !slug.includes('generator')) {
    desc = `Browse and explore ${displayName.toLowerCase()} for your design projects. Free online reference tool for designers and developers. Find and copy exact brand color values with HEX, RGB, and HSL codes.`
  } else if (slug.includes('reference') || slug.includes('library')) {
    desc = `Browse and explore ${displayName.toLowerCase()} for your design projects. Free online color reference tool for designers and developers. Find the perfect colors with search, filter, and copy-ready color values.`
  } else if (slug.includes('team')) {
    desc = `Browse all ${displayName.toLowerCase()} for sports design projects. Free online reference tool for designers and developers. Find official team colors with HEX, RGB, and HSL color codes.`
  } else if (slug.includes('palette') || slug.includes('palette-generator')) {
    desc = `Generate stunning ${lower} color schemes instantly. Free online ${lower} for designers and developers. Create harmonious color combinations with real-time preview and export options.`
  } else {
    desc = `Generate and explore ${lower} for your design projects. Free online tool for designers and developers. Create beautiful color combinations with real-time preview.`
  }

  return { title: titleStr, desc, kw: [lower, `${lower} tool`, `${lower} online`, `${lower} color tool`] }
}

function getGradientMeta(slug) {
  const gradSlugs = [
    'linear-gradient-generator', 'radial-gradient-generator', 'conic-gradient-generator',
    'svg-gradient-generator', 'image-gradient-generator', 'css-gradient-generator',
    'background-gradient-generator', 'button-gradient-generator', 'text-gradient-generator',
    'gradient-border-generator', 'gradient-shadow-generator', 'gradient-overlay-generator',
    'gradient-noise-generator', 'gradient-animation-builder', 'gradient-code-generator',
    'gradient-preview', 'gradient-library', 'gradient-exporter', 'gradient-mixer',
    'gradient-reverser', 'gradient-angle-generator', 'multi-stop-gradient',
    'three-color-gradient', 'animated-gradient-generator',
  ]
  if (!gradSlugs.includes(slug)) return null

  const titleName = slug === 'conic-gradient-generator' ? 'Conic Gradient Generator' :
    slug === 'radial-gradient-generator' ? 'Radial Gradient Generator' :
    slug === 'linear-gradient-generator' ? 'Linear Gradient Generator' :
    slug === 'svg-gradient-generator' ? 'SVG Gradient Generator' :
    slug === 'image-gradient-generator' ? 'Image Gradient Generator' :
    slug === 'css-gradient-generator' ? 'CSS Gradient Generator' :
    slug.includes('background') ? 'Background Gradient Generator' :
    slug.includes('button') ? 'Button Gradient Generator' :
    slug.includes('text') ? 'Text Gradient Generator' :
    slug.includes('border') ? 'Gradient Border Generator' :
    slug.includes('shadow') ? 'Gradient Shadow Generator' :
    slug.includes('overlay') ? 'Gradient Overlay Generator' :
    slug.includes('noise') ? 'Gradient Noise Generator' :
    slug.includes('animation') ? 'Gradient Animation Builder' :
    slug.includes('builder') ? 'Gradient Animation Builder' :
    slug.includes('code') ? 'Gradient Code Generator' :
    slug.includes('preview') ? 'Gradient Preview Tool' :
    slug.includes('library') ? 'Gradient Library' :
    slug.includes('exporter') ? 'Gradient Exporter' :
    slug.includes('mixer') ? 'Gradient Mixer' :
    slug.includes('reverser') ? 'Gradient Reverser' :
    slug.includes('angle') ? 'Gradient Angle Generator' :
    slug.includes('multi') ? 'Multi-Stop Gradient Generator' :
    slug.includes('three') ? 'Three Color Gradient Generator' :
    'CSS Gradient Generator'

  const display = paletteTitles.get(slug) || titleName
  const titleStr = `${display} - Free Online Color Tool | ColorKits`
  const lower = slug.replace(/-/g, ' ')
  const cleanLower = lower.replace(/ generator$/, '')
  const kw = gradientKeywords[slug] || [cleanLower, `${cleanLower} generator`, `css ${cleanLower}`, `${cleanLower} online`, 'gradient generator']

  let desc
  if (slug.includes('generator') && !slug.includes('animation') && !slug.includes('border') && !slug.includes('shadow') && !slug.includes('overlay') && !slug.includes('noise') && !slug.includes('code')) {
    desc = `Create beautiful ${cleanLower} with customizable colors and angles. Free online ${cleanLower} generator for web developers and designers. Generate smooth color transitions with real-time preview and ready-to-use CSS code.`
  } else if (slug.includes('linear')) {
    desc = 'Create beautiful linear gradients with customizable colors, angles, and stops. Free online linear gradient generator for web developers and designers. Generate smooth color transitions with real-time preview and ready-to-use CSS code.'
  } else if (slug.includes('radial')) {
    desc = 'Create beautiful radial gradients with customizable colors and shape options. Free online radial gradient generator for web developers and designers. Generate circular color transitions with real-time preview and CSS code export.'
  } else if (slug.includes('conic')) {
    desc = 'Create beautiful conic gradients with customizable colors and angles. Free online conic gradient generator for web developers and designers. Generate cone-shaped color transitions with real-time preview and CSS code.'
  } else if (slug.includes('svg')) {
    desc = 'Create SVG gradients for web graphics and illustrations. Free online SVG gradient generator for web developers and designers. Generate linear and radial SVG gradients with customizable colors and exportable SVG code.'
  } else if (slug.includes('image')) {
    desc = 'Add gradient overlays to images for stunning visual effects. Free online image gradient generator for designers and developers. Customize gradient colors, opacity, and direction with real-time preview.'
  } else if (slug.includes('background')) {
    desc = 'Create beautiful background gradients for websites and apps. Free online background gradient generator with customizable colors, angles, and multi-stop support. Perfect for hero sections and UI backgrounds.'
  } else if (slug.includes('button')) {
    desc = 'Design gradient buttons for your website or app UI. Free online button gradient generator for web developers and designers. Customize colors, hover effects, and border radius with real-time preview.'
  } else if (slug.includes('text')) {
    desc = 'Create gradient text effects for headings and titles. Free online text gradient generator for web developers and designers. Apply colorful gradient fills to text with CSS background-clip technique.'
  } else {
    desc = `Create beautiful ${cleanLower} with customizable options. Free online ${cleanLower} generator for web developers and designers. Generate with real-time preview and CSS code export.`
  }

  return { title: titleStr, desc, kw }
}

const slugToMeta = {}

// Build manual metadata first
function buildMeta() {
  const entries = readdirSync(appDir, { withFileTypes: true })
  const toolDirs = entries
    .filter(e => e.isDirectory())
    .map(e => e.name)
    .filter(name => !excludeDirs.has(name) && !name.startsWith('['))

  for (const slug of toolDirs) {
    const titleName = toTitle(slug)
    const lower = slug.replace(/-/g, ' ')
    let meta = getManualMeta(slug)
    if (meta) {
      slugToMeta[slug] = meta
      continue
    }

    meta = getPaletteMeta(slug)
    if (meta) {
      slugToMeta[slug] = meta
      continue
    }

    meta = getGradientMeta(slug)
    if (meta) {
      slugToMeta[slug] = meta
      continue
    }

    // Use keyword-based descriptions lookup
    const descOverride = descriptions[slug]
    const titleStr = `${titleName} - Free Online Color Tool | ColorKits`
    const descName = slug.includes('generator') ? lower.replace(/ generator$/, '') : lower

    let desc
    let kw
    if (descOverride) {
      desc = descOverride
      kw = [descName, `${descName} tool`, `${descName} online`, `${descName} color tool`]
    } else if (slug.includes('contrast') || slug.includes('accessibility') || slug.includes('wcag') || slug.includes('aa-') || slug.includes('aaa-') || slug.includes('readability') || slug.includes('checker') || slug.includes('apca')) {
      const cat = slug.includes('button') ? 'button' :
        slug.includes('dashboard') ? 'dashboard' :
        slug.includes('link') ? 'link' :
        slug.includes('text') ? 'text' :
        slug.includes('font') ? 'font' :
        slug.includes('background') ? 'background' : 'color'
      desc = `Check ${cat} contrast against WCAG accessibility standards. Free online ${descName} for web developers and designers. Ensure your designs meet WCAG 2.2 AA and AAA requirements with detailed pass/fail analysis.`
      kw = [descName, `${descName} tool`, 'web accessibility contrast', 'wcag 2.2 compliance', 'accessibility checker']
    } else if (slug.includes('simulator') || slug.includes('blindness') || slug.includes('deuteranopia') || slug.includes('protanopia') || slug.includes('tritanopia') || slug.includes('vision')) {
      desc = `Simulate color vision deficiencies to design for accessibility. Free online ${descName} for designers and developers. Preview how your designs appear to users with color blindness and other visual impairments.`
      kw = [descName, `${descName} online`, 'color blindness simulator', 'accessibility testing tool', 'color vision deficiency simulator']
    } else if (slug.includes('generator') && slug.includes('theme')) {
      desc = `Generate ${descName} for your projects. Free online ${descName} with customizable options. Create complete color schemes for applications and websites with real-time preview.`
      kw = [descName, `${descName} generator`, 'theme generator', 'color theme generator', `${descName} theme`]
    } else if (slug.includes('generator')) {
      desc = `Generate ${descName} for your design projects. Free online ${descName} with customizable options. Create beautiful color combinations and effects with real-time preview and export features.`
      kw = [descName, `${descName} generator`, `${descName} tool`, `${descName} online`, 'color generator']
    } else if (slug.includes('converter') || slug.includes('convert')) {
      desc = `Convert ${descName} between different color formats and systems. Free online ${descName} for developers and designers. Fast, accurate color format conversion with real-time preview and copy-ready output.`
      kw = [descName, `${descName} converter`, `${descName} tool`, `${descName} online`, 'color converter']
    } else if (slug.includes('pantone')) {
      desc = 'Find Pantone colors and match them to digital color values. Free online Pantone color finder for graphic designers. Look up Pantone formulas with HEX, RGB, and CMYK equivalents.'
      kw = ['pantone finder', 'pantone colors', 'pantone color lookup', 'pantone to hex', 'pantone color finder']
    } else if (slug.includes('ral')) {
      desc = 'Find RAL classic and design colors with digital color equivalents. Free online RAL color finder for industrial and architectural designers. Look up RAL color codes with HEX, RGB, and CMYK conversions.'
      kw = ['ral finder', 'ral colors', 'ral color lookup', 'ral to hex', 'ral color finder']
    } else if (slug.includes('ncs')) {
      desc = 'Find Natural Color System (NCS) codes with digital color values. Free online NCS color finder for designers. Look up NCS notation with HEX and RGB equivalents for accurate color matching.'
      kw = ['ncs finder', 'ncs colors', 'natural color system', 'ncs color lookup', 'ncs to hex']
    } else if (slug.includes('color-name') || slug.includes('name-finder')) {
      desc = 'Find the name of any color by its HEX or RGB value. Free online color name finder for designers and developers. Identify HTML color names, CSS named colors, and custom color names.'
      kw = ['color name finder', 'color names', 'find color name', 'color name lookup', 'html color names']
    } else if (slug.includes('extractor') || slug.includes('detector') || slug.includes('finder') || slug.includes('analyzer') || slug.includes('counter') || slug.includes('histogram')) {
      if (slug.includes('dominant')) {
        desc = 'Extract dominant colors from any image with AI-powered analysis. Free online dominant color extractor for designers and developers. Get the most prominent color palette from your photos and graphics.'
      } else if (slug.includes('accent')) {
        desc = 'Find accent colors from images for your design projects. Free online image accent color finder for designers and developers. Extract complementary accent colors from any uploaded image.'
      } else if (slug.includes('brand-color') || slug.includes('brand-finder')) {
        desc = 'Find and identify brand colors from any website or logo. Free online brand color finder for designers and developers. Extract exact brand color values for competitor analysis and design reference.'
      } else if (slug.includes('duplicate')) {
        desc = 'Find duplicate or similar colors in your design projects. Free online duplicate color finder for designers and developers. Identify and eliminate redundant colors from your palette.'
      } else if (slug.includes('artwork') || slug.includes('logo')) {
        desc = `Extract colors from ${slug.includes('artwork') ? 'artwork' : 'logos'} and visual assets. Free online ${descName} for designers. Generate color palettes from your ${slug.includes('artwork') ? 'artwork' : 'logo'} with accurate color analysis.`
      } else {
        desc = `Analyze and detect colors in images and designs. Free online ${descName} for color analysis and optimization. Get detailed insights about color properties and distributions.`
      }
      kw = [descName, `${descName} tool`, `${descName} online`, 'color extractor', 'color analyzer']
    } else if (slug.includes('picker')) {
      if (descriptions[slug]) {
        desc = descriptions[slug]
      } else {
        desc = `Pick and identify colors with a precision ${descName}. Free online ${descName} for web developers and designers. Select colors visually and get instant color values in multiple formats.`
      }
      kw = [descName, `${lower} tool`, `${lower} online`, 'color picker', 'color selector']
    } else if (slug.includes('adjuster') || slug.includes('adjust')) {
      desc = `Adjust ${descName} with precision controls for your design projects. Free online ${descName} for designers and developers. Fine-tune color properties with real-time preview and exact value controls.`
      kw = [descName, `${lower} tool`, `${lower} online`, 'color adjuster', 'color fine tuner']
    } else if (slug.includes('exporter') || slug.includes('export')) {
      desc = `Export ${descName} in multiple formats for your projects. Free online ${descName} for developers and designers. Generate and download color assets with copy-ready code snippets.`
      kw = [descName, `${lower} tool`, `${lower} online`, 'color exporter', 'design export tool']
    } else if (slug.includes('importer')) {
      desc = `Import ${descName} from external sources into your projects. Free online ${descName} for designers and developers. Load color palettes and configurations from files and URLs.`
      kw = [descName, `${lower} tool`, `${lower} online`, 'color importer', 'palette importer']
    } else if (slug.includes('library') || slug.includes('database') || slug.includes('collection') || slug.includes('guide')) {
      desc = `Browse and explore ${descName} for your design projects. Free online ${descName} reference tool for designers and developers. Find colors with search, filter, and copy-ready color values.`
      kw = [descName, `${lower} reference`, `${lower} library`, `${lower} online`, 'color reference']
    } else if (slug.includes('generator') && (slug.includes('contrast') || slug.includes('fix'))) {
      desc = `Generate accessible ${descName} that meet WCAG standards. Free online ${descName} for designers and developers. Create color combinations with guaranteed contrast ratios and accessibility compliance.`
      kw = [descName, `${descName} generator`, `${descName} tool`, 'accessible color generator', `wcag ${descName}`]
    } else if (slug.includes('preview')) {
      desc = `Preview ${descName} in real-time for your design projects. Free online ${descName} for designers and developers. Visualize colors and gradients in different contexts with instant updates.`
      kw = [descName, `${lower} preview`, `${lower} tool`, `${lower} online`, 'color preview']
    } else if (slug.includes('playground')) {
      desc = `Experiment and play with colors in an interactive playground. Free online color playground for designers and developers. Mix, blend, and explore colors with real-time visual feedback and multiple tools.`
      kw = [descName, 'color playground', `${lower} tool`, 'color experiment', 'interactive color tool']
    } else if (slug.includes('mixer')) {
      desc = `Mix colors together to create new custom shades. Free online ${descName} for designers and artists. Blend two or more colors with adjustable ratios and real-time preview.`
      kw = [descName, 'color mixer', 'color blender', `${lower} tool`, 'mix colors online']
    } else if (slug.includes('wheel')) {
      desc = `Explore color relationships with an interactive color wheel. Free online color wheel for designers and artists. Visualize hue, saturation, and color harmony relationships with real-time updates.`
      kw = ['color wheel', 'color wheel tool', 'color harmony wheel', 'color relationships', 'color wheel online']
    } else if (slug.includes('shade') || slug.includes('tint') || slug.includes('tone')) {
      const type = slug.includes('shade') ? 'shades' : slug.includes('tint') ? 'tints' : 'tones'
      desc = `Generate ${type} of any color for your design projects. Free online ${descName} for designers and developers. Create complete ${type} variations with real-time preview and copy-ready color values.`
      kw = [descName, `${lower} generator`, `color ${type}`, `${lower} tool`, `color ${type} generator`]
    } else if (slug.includes('invert')) {
      desc = 'Invert any color to its opposite on the color wheel. Free online color inverter for designers and developers. Get accurate complementary and inverted colors with real-time preview.'
      kw = ['invert color', 'color inverter', 'inverse color', 'complementary color', 'color invert tool']
    } else if (slug.includes('grayscale') || slug.includes('sepia') || slug.includes('desaturate')) {
      const type = slug.includes('grayscale') ? 'grayscale' : slug.includes('sepia') ? 'sepia' : 'desaturated'
      desc = `Convert colors to ${type} with adjustable intensity. Free online ${descName} for designers and developers. Create ${type} versions of any color with real-time preview and multiple format output.`
      kw = [descName, `${lower} tool`, `${type} converter`, `color to ${type}`, `${type} effect`]
    } else if (slug.includes('opacity')) {
      desc = 'Generate color opacity variations for your design projects. Free online opacity generator for designers and developers. Create transparent color versions with adjustable alpha values and real-time preview.'
      kw = ['opacity generator', 'color opacity', 'transparency tool', 'alpha opacity', 'css opacity generator']
    } else if (slug.includes('burn') || slug.includes('dodge') || slug.includes('multiply') || slug.includes('screen') || slug.includes('overlay') || slug.includes('hard-light') || slug.includes('soft-light') || slug.includes('blend')) {
      desc = `Apply ${descName} effects to colors and images. Free online blend mode generator for designers and developers. Experiment with layer blending effects and see real-time results.`
      kw = [descName, `${lower} generator`, 'blend mode tool', `${lower} effect`, 'color blending']
    } else if (slug.includes('screenshot')) {
      desc = `Extract colors from website screenshots and UI designs. Free online ${descName} for designers and developers. Analyze color usage in web pages and applications with color extraction.`
      kw = [descName, `${lower} tool`, 'screenshot color extractor', 'ui color analyzer', 'website color extractor']
    } else if (slug.includes('css') && slug.includes('variable')) {
      desc = `Generate and manage CSS custom properties for your design system. Free online ${descName} for web developers. Create organized CSS variable collections with consistent naming conventions.`
      kw = [descName, 'css variables', 'css custom properties', `${lower} tool`, 'design tokens css']
    } else if (slug.includes('design-token') || slug.includes('design token')) {
      desc = 'Generate and manage design tokens for your design system. Free online design token generator for developers and designers. Create platform-agnostic design tokens with consistent naming and values.'
      kw = ['design tokens', 'design token generator', 'design system tokens', 'design token tool', 'design tokens library']
    } else if (slug.includes('json') && slug.includes('palette')) {
      desc = 'Generate color palettes in JSON format for your development projects. Free online JSON palette generator for developers. Create structured color palette data with exportable JSON output.'
      kw = ['json palette', 'json palette generator', 'color palette json', 'palette to json', 'json color palette']
    } else if (slug.includes('json') && slug.includes('converter')) {
      desc = 'Convert color data to and from JSON format for development projects. Free online JSON color converter for developers. Transform between structured color data formats with validation.'
      kw = ['json color converter', 'color to json', 'json color format', 'color data converter', 'json converter']
    } else if (slug.includes('scss') && slug.includes('variable')) {
      desc = 'Generate SCSS variables for your design system. Free online SCSS variable generator for Sass developers. Create organized, maintainable color variables with consistent naming conventions.'
      kw = ['scss variables', 'scss color variables', 'sass variables', 'scss variable generator', 'scss color palette']
    } else if (slug.includes('semantic') && slug.includes('color')) {
      desc = 'Create semantic color naming systems for your design tokens. Free online semantic color library for designers and developers. Define meaningful color roles like primary, success, warning, and error.'
      kw = ['semantic colors', 'semantic color library', 'color naming system', 'design tokens colors', 'semantic color palette']
    } else if (slug.includes('random') && slug.includes('color') && slug.includes('generator')) {
      desc = 'Generate random colors with one click for design inspiration. Free online random color generator for designers and developers. Discover unexpected color combinations with optional constraints.'
      kw = ['random color generator', 'random color', 'color generator', 'random color palette', 'random hex color']
    } else if (slug.includes('random') && slug.includes('palette')) {
      desc = 'Generate random color palettes for design inspiration. Free online random palette generator for designers and developers. Discover harmonious color combinations with one click.'
      kw = ['random palette generator', 'random color palette', 'palette generator', 'random palette', 'color scheme generator']
    } else if (slug.includes('temperature') || slug.includes('warm') || slug.includes('cool')) {
      desc = `Detect and analyze ${descName} in your designs. Free online ${descName} for designers and developers. Measure color warmth and coolness with accurate temperature analysis.`
      kw = [descName, 'color temperature', 'warm cool colors', `${lower} tool`, 'color warmth detector']
    } else if (slug.includes('tone') || slug.includes('tint') || slug.includes('shade')) {
      desc = `Generate ${descName} for comprehensive color systems. Free online ${descName} for designers and developers. Create complete tonal ranges with consistent steps and real-time preview.`
      kw = [descName, `${lower} generator`, 'color tone tool', `${lower} online`, 'color tonal range']
    } else if (slug.includes('trend')) {
      desc = 'Explore current color trends for your design projects. Free online color trends tool for designers. Stay updated with trending color palettes and popular color combinations.'
      kw = ['color trends', 'trending colors', 'color trends tool', 'popular colors', 'color trends 2026']
    } else if (slug.includes('meaning') || slug.includes('psychology')) {
      desc = 'Learn about color meanings and psychological effects for better design decisions. Free online color meaning guide for designers and marketers. Understand how colors influence perception and emotion.'
      kw = ['color meaning', 'color psychology', 'color symbolism', 'color meaning guide', 'psychology of color']
    } else if (slug.includes('flag')) {
      desc = 'Browse country flag colors for your design projects. Free online national flag color reference tool for designers. Find official flag color codes with HEX, RGB, and CMYK values for any country.'
      kw = ['flag colors', 'country flag colors', 'national flag colors', 'flag color codes', 'flag color reference']
    } else if (slug.includes('tailwind') && slug.includes('theme')) {
      desc = 'Generate Tailwind CSS theme configurations for your projects. Free online Tailwind theme generator for web developers. Create custom color palettes and theme extensions for Tailwind CSS.'
      kw = ['tailwind theme', 'tailwind theme generator', 'tailwind config', 'tailwind color theme', 'tailwind css theme']
    } else if (slug.includes('bootstrap') && slug.includes('theme')) {
      desc = 'Generate Bootstrap theme color configurations. Free online Bootstrap theme generator for web developers. Create custom color schemes and theme overrides for Bootstrap 5.'
      kw = ['bootstrap theme', 'bootstrap theme generator', 'bootstrap colors', 'bootstrap color theme', 'bootstrap customization']
    } else if (slug.includes('material') && slug.includes('theme')) {
      desc = 'Generate Material Design 3 theme color configurations. Free online Material theme generator for developers and designers. Create dynamic color schemes following Material You principles.'
      kw = ['material theme', 'material design theme', 'material you theme', 'material theme generator', 'material color scheme']
    } else if (slug.includes('flutter') && slug.includes('theme')) {
      desc = 'Generate Flutter theme configurations with Material Design 3 colors. Free online Flutter theme generator for mobile developers. Create complete ThemeData with dynamic color schemes.'
      kw = ['flutter theme', 'flutter theme generator', 'flutter color theme', 'flutter theming', 'flutter material theme']
    } else if (slug.includes('react') && slug.includes('theme')) {
      desc = 'Generate React theme configurations for your component library. Free online React theme generator for frontend developers. Create color themes with CSS variables and theme context setup.'
      kw = ['react theme', 'react theme generator', 'react color theme', 'react theming', 'react css variables theme']
    } else if (slug.includes('design') && slug.includes('system')) {
      desc = 'Build and manage design system color foundations. Free online design system tool for designers and developers. Create comprehensive color scales, semantic tokens, and documentation.'
      kw = ['design system', 'design system colors', 'color design system', 'design system tool', 'color system generator']
    } else if (slug.includes('css') && slug.includes('search')) {
      desc = 'Search and browse CSS color names with visual previews. Free online CSS color names search tool for web developers. Find named colors with HEX, RGB, and HSL values and live swatch previews.'
      kw = ['css color names', 'css named colors', 'css color search', 'web color names', 'css color reference']
    } else if (slug.includes('format') && slug.includes('detect')) {
      desc = 'Detect and identify color format from any string. Free online color format detector for developers. Automatically recognize HEX, RGB, HSL, HSV, CMYK, and other color formats.'
      kw = ['color format detector', 'detect color format', 'color format identifier', 'color type detector', 'color parser']
    } else if (slug.includes('android') && slug.includes('xml')) {
      desc = 'Generate Android colors.xml resource files from your color palette. Free online Android XML color generator for mobile developers. Export color resources with Material Design 3 compatible formatting.'
      kw = ['android xml colors', 'android colors xml', 'android color resource', 'xml color generator', 'android theme colors']
    } else if (slug.includes('android') && slug.includes('convert')) {
      desc = 'Convert color values to Android AOSP color formats. Free online Android color converter for mobile developers. Transform HEX and RGB colors to Android-specific color integer formats.'
      kw = ['android color converter', 'android aosp color', 'android color format', 'android color integer', 'android color resource']
    } else if (slug.includes('swift') && slug.includes('ui') && slug.includes('color')) {
      desc = 'Convert color values to Swift UIColor for iOS development. Free online Swift UIColor converter for iOS developers. Generate UIColor initializer code from HEX, RGB, or HSL color values.'
      kw = ['swift uicolor', 'uicolor converter', 'swift color converter', 'ios uicolor', 'swift uicolor hex']
    } else if (slug.includes('swift') && slug.includes('asset')) {
      desc = 'Generate Swift color asset catalogs for iOS and macOS apps. Free online Swift color assets generator for Apple developers. Create complete Asset Catalog color sets with light and dark mode variants.'
      kw = ['swift color assets', 'xcassets colors', 'swift asset catalog', 'ios color assets', 'apple color catalog']
    } else if (slug.includes('flutter') && slug.includes('color') && slug.includes('converter')) {
      desc = 'Convert color values to Flutter Color class format. Free online Flutter color converter for mobile developers. Generate Color() constructor code from HEX, RGB, or HSL values.'
      kw = ['flutter color converter', 'flutter color', 'flutter color class', 'dart color converter', 'flutter hex color']
    } else if (slug.includes('kotlin') && slug.includes('color')) {
      desc = 'Convert color values to Kotlin Color class format for Android development. Free online Kotlin color converter for Android developers. Generate Color() constructor code with Kotlin syntax.'
      kw = ['kotlin color converter', 'kotlin android color', 'kotlin color class', 'android kotlin color', 'kotlin color format']
    } else if (slug.includes('java') && slug.includes('color')) {
      desc = 'Convert color values to Java Color class format for Android development. Free online Java color converter for Android developers. Generate Color constructor code with Java syntax.'
      kw = ['java color converter', 'java android color', 'java color class', 'android java color', 'java color format']
    } else if (slug.includes('python') && slug.includes('color')) {
      desc = 'Convert color values to Python color formats for plotting and visualization. Free online Python color converter for data scientists and developers. Generate matplotlib-friendly color values.'
      kw = ['python color converter', 'python color format', 'matplotlib color', 'python hex color', 'python rgb color']
    } else if (slug.includes('csharp') && slug.includes('color')) {
      desc = 'Convert color values to C# Color format for .NET and Unity development. Free online C# color converter for .NET developers. Generate System.Drawing.Color constructor code from any color value.'
      kw = ['csharp color converter', 'c# color', 'dotnet color', 'unity color', 'system.drawing.color']
    } else if (slug.includes('less') && slug.includes('color')) {
      desc = 'Convert color values to Less CSS variable format. Free online Less color converter for frontend developers. Generate Less color variables with proper syntax and formatting.'
      kw = ['less color converter', 'less css colors', 'less variables', 'less color variable', 'less color format']
    } else if (slug.includes('scss') && slug.includes('color') && slug.includes('converter')) {
      desc = 'Convert color values to SCSS variable format with Sass syntax. Free online SCSS color converter for frontend developers. Generate $color variables with proper SCSS formatting.'
      kw = ['scss color converter', 'sass color', 'scss variable color', 'sass color variable', 'scss color format']
    } else if (slug.includes('css') && slug.includes('color') && slug.includes('converter')) {
      desc = 'Convert color values between all CSS color formats. Free online CSS color converter for web developers. Transform CSS color values between HEX, rgb(), hsl(), hwb(), lab(), lch(), oklab(), and oklch().'
      kw = ['css color converter', 'css color format', 'css color types', 'css color converter tool', 'web color converter']
    } else if (slug.includes('css') && slug.includes('variable') && slug.includes('convert')) {
      desc = 'Convert named color values to CSS custom properties. Free online CSS variable converter for web developers. Transform static color values into reusable CSS variables with consistent naming.'
      kw = ['css variable converter', 'css custom properties', 'color to css variable', 'css var converter', 'css variable tool']
    } else if (slug.includes('css') && slug.includes('variable') && slug.includes('generator')) {
      desc = 'Generate CSS custom properties for your design system. Free online CSS variable generator for web developers. Create organized color variable collections with consistent naming and fallbacks.'
      kw = ['css variable generator', 'css custom properties', 'css var generator', 'design tokens css', 'css color variables']
    } else if (slug.includes('figma') && slug.includes('color') && slug.includes('export')) {
      desc = 'Export colors from your designs to Figma-compatible format. Free online Figma color export tool for designers. Generate Figma shared styles and color variables from any palette.'
      kw = ['figma color export', 'figma colors', 'figma style export', 'figma color variables', 'figma palette export']
    } else if (slug.includes('adobe') && slug.includes('ase')) {
      desc = 'Export color palettes to Adobe ASE (Adobe Swatch Exchange) format. Free online Adobe ASE export tool for designers. Create .ase files for use in Photoshop, Illustrator, and InDesign.'
      kw = ['adobe ase export', 'ase file', 'adobe swatch exchange', 'ase color palette', 'adobe color export']
    } else if (slug.includes('android') && slug.includes('xml')) {
      desc = 'Generate Android colors.xml resource files from your color schemes. Free online Android XML color generator for mobile developers. Create complete color resource files with Material Design 3 support.'
      kw = ['android xml colors', 'colors.xml', 'android color resources', 'xml color generator', 'android theme colors']
    } else if (slug.includes('batch') && slug.includes('converter')) {
      desc = 'Convert multiple colors between different formats simultaneously. Free online batch color converter for developers and designers. Process multiple color values at once with support for all major color formats.'
      kw = ['batch color converter', 'bulk color converter', 'multiple color converter', 'batch color conversion', 'convert colors in bulk']
    } else if (slug.includes('batch') && slug.includes('image') && slug.includes('extract')) {
      desc = 'Extract colors from multiple images at once in batch. Free online batch image color extractor for designers and developers. Process multiple images simultaneously and get comprehensive color palettes.'
      kw = ['batch image color extract', 'bulk color extraction', 'multiple image palette', 'batch palette generator', 'image batch color analyzer']
    } else if (slug.includes('format') && slug.includes('detect')) {
      desc = 'Automatically detect and identify color format from any input string. Free online color format detector for developers and designers. Parse and identify HEX, RGB, HSL, HSV, CMYK, and more.'
      kw = ['color format detector', 'detect color format', 'color parser', 'color identifier', 'color format checker']
    } else if (slug.includes('difference') || slug.includes('similarity')) {
      desc = `Calculate the difference and similarity between colors for design analysis. Free online ${descName} for designers and developers. Measure color distance using Delta E, Euclidean distance, and perceptual difference formulas.`
      kw = ['color difference', 'delta e calculator', 'color distance', `${descName} tool`, 'color similarity']
    } else {
      desc = `Use this free online ${descName} tool for developers and designers. Convert, generate, and analyze colors with real-time preview and export features. Perfect for web design and development projects.`
      kw = [descName, `${descName} tool`, `${descName} online`, `${descName} color tool`]
    }

    slugToMeta[slug] = { title: titleStr, desc, kw }
  }
}

buildMeta()

const entries = readdirSync(appDir, { withFileTypes: true })
const toolDirs = entries
  .filter(e => e.isDirectory())
  .map(e => e.name)
  .filter(name => !excludeDirs.has(name) && !name.startsWith('['))

let updated = 0
let skipped = 0

for (const dir of toolDirs) {
  const pagePath = join(appDir, dir, 'page.tsx')
  if (!existsSync(pagePath)) {
    skipped++
    continue
  }

  const content = readFileSync(pagePath, 'utf-8')
  const meta = slugToMeta[dir]
  if (!meta) {
    console.log(`WARNING: No metadata for ${dir}`)
    skipped++
    continue
  }

  const { title, desc, kw } = meta
  const firstSentence = desc.split('.')[0] + '.'

  const newContent = `import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: '${title}',
  description: '${desc}',
  keywords: [${kw.map(k => `'${k.replace(/'/g, "\\'")}'`).join(', ')}],
  openGraph: {
    title: '${title}',
    description: '${firstSentence}',
  },
  twitter: {
    title: '${title}',
    description: '${firstSentence}',
  },
}

export default function Page() {
  return <ToolPageClient />
}
`

  writeFileSync(pagePath, newContent, 'utf-8')
  updated++
  if (updated <= 5 || updated % 100 === 0) {
    console.log(`[${updated}] Updated: ${dir}`)
  }
}

console.log(`\nDone! Updated ${updated} files. Skipped ${skipped}.`)
