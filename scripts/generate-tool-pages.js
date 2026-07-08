const fs = require('fs')
const path = require('path')

const BASE = path.resolve(__dirname, '..')
const SRC_APP = path.join(BASE, 'src/app')

const tools = [
  { id: 'color-picker', name: 'Color Picker', category: 'picker' },
  { id: 'eye-dropper-tool', name: 'Eye Dropper Tool', category: 'picker' },
  { id: 'screen-color-picker', name: 'Screen Color Picker', category: 'picker' },
  { id: 'hex-color-picker', name: 'HEX Color Picker', category: 'picker' },
  { id: 'rgb-color-picker', name: 'RGB Color Picker', category: 'picker' },
  { id: 'hsl-color-picker', name: 'HSL Color Picker', category: 'picker' },
  { id: 'hsv-color-picker', name: 'HSV Color Picker', category: 'picker' },
  { id: 'cmyk-color-picker', name: 'CMYK Color Picker', category: 'picker' },
  { id: 'lab-color-picker', name: 'LAB Color Picker', category: 'picker' },
  { id: 'lch-color-picker', name: 'LCH Color Picker', category: 'picker' },
  { id: 'oklab-color-picker', name: 'OKLab Color Picker', category: 'picker' },
  { id: 'oklch-color-picker', name: 'OKLCH Color Picker', category: 'picker' },
  { id: 'hwb-color-picker', name: 'HWB Color Picker', category: 'picker' },
  { id: 'rgba-color-picker', name: 'RGBA Color Picker', category: 'picker' },
  { id: 'hsla-color-picker', name: 'HSLA Color Picker', category: 'picker' },
  { id: 'alpha-color-picker', name: 'Alpha Color Picker', category: 'picker' },
  { id: 'gradient-color-picker', name: 'Gradient Color Picker', category: 'picker' },
  { id: 'multi-color-picker', name: 'Multi Color Picker', category: 'picker' },
  { id: 'image-color-picker', name: 'Image Color Picker', category: 'picker' },
  { id: 'website-color-picker', name: 'Website Color Picker', category: 'picker' },
  { id: 'transparent-color-picker', name: 'Transparent Color Picker', category: 'picker' },
  { id: 'random-color-picker', name: 'Random Color Picker', category: 'picker' },
  { id: 'browser-color-picker', name: 'Browser Color Picker', category: 'picker' },
  { id: 'pixel-color-picker', name: 'Pixel Color Picker', category: 'picker' },
  { id: 'magnifier-color-picker', name: 'Magnifier Color Picker', category: 'picker' },
  { id: 'hex-to-rgb', name: 'HEX to RGB', category: 'converter' },
  { id: 'rgb-to-hex', name: 'RGB to HEX', category: 'converter' },
  { id: 'hex-to-hsl', name: 'HEX to HSL', category: 'converter' },
  { id: 'hsl-to-hex', name: 'HSL to HEX', category: 'converter' },
  { id: 'hex-to-hsv', name: 'HEX to HSV', category: 'converter' },
  { id: 'hsv-to-hex', name: 'HSV to HEX', category: 'converter' },
  { id: 'rgb-to-hsl', name: 'RGB to HSL', category: 'converter' },
  { id: 'hsl-to-rgb', name: 'HSL to RGB', category: 'converter' },
  { id: 'rgb-to-hsv', name: 'RGB to HSV', category: 'converter' },
  { id: 'hsv-to-rgb', name: 'HSV to RGB', category: 'converter' },
  { id: 'rgb-to-cmyk', name: 'RGB to CMYK', category: 'converter' },
  { id: 'cmyk-to-rgb', name: 'CMYK to RGB', category: 'converter' },
  { id: 'hex-to-cmyk', name: 'HEX to CMYK', category: 'converter' },
  { id: 'cmyk-to-hex', name: 'CMYK to HEX', category: 'converter' },
  { id: 'hex-to-lab', name: 'HEX to LAB', category: 'converter' },
  { id: 'lab-to-hex', name: 'LAB to HEX', category: 'converter' },
  { id: 'rgb-to-lab', name: 'RGB to LAB', category: 'converter' },
  { id: 'lab-to-rgb', name: 'LAB to RGB', category: 'converter' },
  { id: 'hex-to-lch', name: 'HEX to LCH', category: 'converter' },
  { id: 'lch-to-hex', name: 'LCH to HEX', category: 'converter' },
  { id: 'rgb-to-lch', name: 'RGB to LCH', category: 'converter' },
  { id: 'lch-to-rgb', name: 'LCH to RGB', category: 'converter' },
  { id: 'hex-to-oklab', name: 'HEX to OKLab', category: 'converter' },
  { id: 'oklab-to-hex', name: 'OKLab to HEX', category: 'converter' },
  { id: 'rgb-to-oklab', name: 'RGB to OKLab', category: 'converter' },
  { id: 'oklab-to-rgb', name: 'OKLab to RGB', category: 'converter' },
  { id: 'hex-to-oklch', name: 'HEX to OKLCH', category: 'converter' },
  { id: 'oklch-to-hex', name: 'OKLCH to HEX', category: 'converter' },
  { id: 'rgb-to-oklch', name: 'RGB to OKLCH', category: 'converter' },
  { id: 'oklch-to-rgb', name: 'OKLCH to RGB', category: 'converter' },
  { id: 'rgb-to-hwb', name: 'RGB to HWB', category: 'converter' },
  { id: 'hwb-to-rgb', name: 'HWB to RGB', category: 'converter' },
  { id: 'hex-to-hwb', name: 'HEX to HWB', category: 'converter' },
  { id: 'hwb-to-hex', name: 'HWB to HEX', category: 'converter' },
  { id: 'rgba-to-hex', name: 'RGBA to HEX', category: 'converter' },
  { id: 'hex-to-rgba', name: 'HEX to RGBA', category: 'converter' },
  { id: 'hsla-to-hex', name: 'HSLA to HEX', category: 'converter' },
  { id: 'hex-to-hsla', name: 'HEX to HSLA', category: 'converter' },
  { id: 'css-color-converter', name: 'CSS Color Converter', category: 'converter' },
  { id: 'tailwind-color-converter', name: 'Tailwind Color Converter', category: 'converter' },
  { id: 'material-color-converter', name: 'Material Color Converter', category: 'converter' },
  { id: 'android-xml-color-converter', name: 'Android XML Color Converter', category: 'converter' },
  { id: 'swift-uicolor-converter', name: 'Swift UIColor Converter', category: 'converter' },
  { id: 'flutter-color-converter', name: 'Flutter Color Converter', category: 'converter' },
  { id: 'kotlin-color-converter', name: 'Kotlin Color Converter', category: 'converter' },
  { id: 'java-color-converter', name: 'Java Color Converter', category: 'converter' },
  { id: 'csharp-color-converter', name: 'C# Color Converter', category: 'converter' },
  { id: 'python-color-converter', name: 'Python Color Converter', category: 'converter' },
  { id: 'css-variable-converter', name: 'CSS Variable Converter', category: 'converter' },
  { id: 'json-color-converter', name: 'JSON Color Converter', category: 'converter' },
  { id: 'scss-color-converter', name: 'SCSS Color Converter', category: 'converter' },
  { id: 'less-color-converter', name: 'LESS Color Converter', category: 'converter' },
  { id: 'color-format-detector', name: 'Color Format Detector', category: 'converter' },
  { id: 'universal-color-converter', name: 'Universal Color Converter', category: 'converter' },
  { id: 'batch-color-converter', name: 'Batch Color Converter', category: 'converter' },
  { id: 'random-palette-generator', name: 'Random Palette Generator', category: 'palette' },
  { id: 'ai-palette-generator', name: 'AI Palette Generator', category: 'palette' },
  { id: 'brand-palette-generator', name: 'Brand Palette Generator', category: 'palette' },
  { id: 'ui-palette-generator', name: 'UI Palette Generator', category: 'palette' },
  { id: 'material-palette-generator', name: 'Material Palette Generator', category: 'palette' },
  { id: 'tailwind-palette-generator', name: 'Tailwind Palette Generator', category: 'palette' },
  { id: 'bootstrap-palette-generator', name: 'Bootstrap Palette Generator', category: 'palette' },
  { id: 'dark-theme-palette', name: 'Dark Theme Palette', category: 'palette' },
  { id: 'light-theme-palette', name: 'Light Theme Palette', category: 'palette' },
  { id: 'pastel-palette-generator', name: 'Pastel Palette Generator', category: 'palette' },
  { id: 'neon-palette-generator', name: 'Neon Palette Generator', category: 'palette' },
  { id: 'vintage-palette-generator', name: 'Vintage Palette Generator', category: 'palette' },
  { id: 'retro-palette-generator', name: 'Retro Palette Generator', category: 'palette' },
  { id: 'nature-palette-generator', name: 'Nature Palette Generator', category: 'palette' },
  { id: 'ocean-palette-generator', name: 'Ocean Palette Generator', category: 'palette' },
  { id: 'sunset-palette-generator', name: 'Sunset Palette Generator', category: 'palette' },
  { id: 'autumn-palette-generator', name: 'Autumn Palette Generator', category: 'palette' },
  { id: 'spring-palette-generator', name: 'Spring Palette Generator', category: 'palette' },
  { id: 'winter-palette-generator', name: 'Winter Palette Generator', category: 'palette' },
  { id: 'summer-palette-generator', name: 'Summer Palette Generator', category: 'palette' },
  { id: 'monochromatic-palette', name: 'Monochromatic Palette', category: 'palette' },
  { id: 'analogous-palette', name: 'Analogous Palette', category: 'palette' },
  { id: 'complementary-palette', name: 'Complementary Palette', category: 'palette' },
  { id: 'split-complementary-palette', name: 'Split Complementary Palette', category: 'palette' },
  { id: 'triadic-palette', name: 'Triadic Palette', category: 'palette' },
  { id: 'tetradic-palette', name: 'Tetradic Palette', category: 'palette' },
  { id: 'square-palette', name: 'Square Palette', category: 'palette' },
  { id: 'rainbow-palette', name: 'Rainbow Palette', category: 'palette' },
  { id: 'earth-tone-palette', name: 'Earth Tone Palette', category: 'palette' },
  { id: 'flat-ui-palette', name: 'Flat UI Palette', category: 'palette' },
  { id: 'corporate-palette', name: 'Corporate Palette', category: 'palette' },
  { id: 'luxury-palette', name: 'Luxury Palette', category: 'palette' },
  { id: 'gaming-palette', name: 'Gaming Palette', category: 'palette' },
  { id: 'ecommerce-palette', name: 'Ecommerce Palette', category: 'palette' },
  { id: 'dashboard-palette', name: 'Dashboard Palette', category: 'palette' },
  { id: 'mobile-app-palette', name: 'Mobile App Palette', category: 'palette' },
  { id: 'saas-palette', name: 'SaaS Palette', category: 'palette' },
  { id: 'logo-palette', name: 'Logo Palette', category: 'palette' },
  { id: 'fashion-palette', name: 'Fashion Palette', category: 'palette' },
  { id: 'food-palette', name: 'Food Palette', category: 'palette' },
  { id: 'linear-gradient-generator', name: 'Linear Gradient Generator', category: 'gradient' },
  { id: 'radial-gradient-generator', name: 'Radial Gradient Generator', category: 'gradient' },
  { id: 'conic-gradient-generator', name: 'Conic Gradient Generator', category: 'gradient' },
  { id: 'mesh-gradient-generator', name: 'Mesh Gradient Generator', category: 'gradient' },
  { id: 'css-gradient-generator', name: 'CSS Gradient Generator', category: 'gradient' },
  { id: 'svg-gradient-generator', name: 'SVG Gradient Generator', category: 'gradient' },
  { id: 'animated-gradient-generator', name: 'Animated Gradient Generator', category: 'gradient' },
  { id: 'text-gradient-generator', name: 'Text Gradient Generator', category: 'gradient' },
  { id: 'button-gradient-generator', name: 'Button Gradient Generator', category: 'gradient' },
  { id: 'background-gradient-generator', name: 'Background Gradient Generator', category: 'gradient' },
  { id: 'gradient-border-generator', name: 'Gradient Border Generator', category: 'gradient' },
  { id: 'gradient-shadow-generator', name: 'Gradient Shadow Generator', category: 'gradient' },
  { id: 'multi-stop-gradient', name: 'Multi-stop Gradient', category: 'gradient' },
  { id: 'three-color-gradient', name: 'Three Color Gradient', category: 'gradient' },
  { id: 'four-color-gradient', name: 'Four Color Gradient', category: 'gradient' },
  { id: 'gradient-mixer', name: 'Gradient Mixer', category: 'gradient' },
  { id: 'gradient-reverser', name: 'Gradient Reverser', category: 'gradient' },
  { id: 'gradient-angle-generator', name: 'Gradient Angle Generator', category: 'gradient' },
  { id: 'gradient-preview', name: 'Gradient Preview', category: 'gradient' },
  { id: 'gradient-exporter', name: 'Gradient Exporter', category: 'gradient' },
  { id: 'tailwind-gradient-generator', name: 'Tailwind Gradient Generator', category: 'gradient' },
  { id: 'bootstrap-gradient-generator', name: 'Bootstrap Gradient Generator', category: 'gradient' },
  { id: 'glass-gradient-generator', name: 'Glass Gradient Generator', category: 'gradient' },
  { id: 'aurora-gradient-generator', name: 'Aurora Gradient Generator', category: 'gradient' },
  { id: 'metallic-gradient-generator', name: 'Metallic Gradient Generator', category: 'gradient' },
  { id: 'neon-gradient-generator', name: 'Neon Gradient Generator', category: 'gradient' },
  { id: 'pastel-gradient-generator', name: 'Pastel Gradient Generator', category: 'gradient' },
  { id: 'instagram-gradient-generator', name: 'Instagram Gradient Generator', category: 'gradient' },
  { id: 'gradient-noise-generator', name: 'Gradient Noise Generator', category: 'gradient' },
  { id: 'grain-gradient-generator', name: 'Grain Gradient Generator', category: 'gradient' },
  { id: 'svg-mesh-generator', name: 'SVG Mesh Generator', category: 'gradient' },
  { id: 'gradient-animation-builder', name: 'Gradient Animation Builder', category: 'gradient' },
  { id: 'gradient-overlay-generator', name: 'Gradient Overlay Generator', category: 'gradient' },
  { id: 'gradient-code-generator', name: 'Gradient Code Generator', category: 'gradient' },
  { id: 'gradient-library', name: 'Gradient Library', category: 'gradient' },
  { id: 'wcag-contrast-checker', name: 'WCAG Contrast Checker', category: 'accessibility' },
  { id: 'apca-contrast-checker', name: 'APCA Contrast Checker', category: 'accessibility' },
  { id: 'aaa-contrast-checker', name: 'AAA Contrast Checker', category: 'accessibility' },
  { id: 'aa-contrast-checker', name: 'AA Contrast Checker', category: 'accessibility' },
  { id: 'color-blindness-simulator', name: 'Color Blindness Simulator', category: 'accessibility' },
  { id: 'protanopia-simulator', name: 'Protanopia Simulator', category: 'accessibility' },
  { id: 'deuteranopia-simulator', name: 'Deuteranopia Simulator', category: 'accessibility' },
  { id: 'tritanopia-simulator', name: 'Tritanopia Simulator', category: 'accessibility' },
  { id: 'monochrome-preview', name: 'Monochrome Preview', category: 'accessibility' },
  { id: 'readability-checker', name: 'Readability Checker', category: 'accessibility' },
  { id: 'accessible-palette-generator', name: 'Accessible Palette Generator', category: 'accessibility' },
  { id: 'accessible-gradient-generator', name: 'Accessible Gradient Generator', category: 'accessibility' },
  { id: 'text-contrast-generator', name: 'Text Contrast Generator', category: 'accessibility' },
  { id: 'background-contrast-generator', name: 'Background Contrast Generator', category: 'accessibility' },
  { id: 'button-accessibility-checker', name: 'Button Accessibility Checker', category: 'accessibility' },
  { id: 'link-accessibility-checker', name: 'Link Accessibility Checker', category: 'accessibility' },
  { id: 'ui-accessibility-tester', name: 'UI Accessibility Tester', category: 'accessibility' },
  { id: 'dashboard-accessibility-checker', name: 'Dashboard Accessibility Checker', category: 'accessibility' },
  { id: 'accessibility-report-generator', name: 'Accessibility Report Generator', category: 'accessibility' },
  { id: 'contrast-matrix-generator', name: 'Contrast Matrix Generator', category: 'accessibility' },
  { id: 'color-vision-test', name: 'Color Vision Test', category: 'accessibility' },
  { id: 'accessibility-heatmap', name: 'Accessibility Heatmap', category: 'accessibility' },
  { id: 'contrast-fix-generator', name: 'Contrast Fix Generator', category: 'accessibility' },
  { id: 'dark-mode-contrast-checker', name: 'Dark Mode Contrast Checker', category: 'accessibility' },
  { id: 'light-mode-contrast-checker', name: 'Light Mode Contrast Checker', category: 'accessibility' },
  { id: 'font-color-recommender', name: 'Font Color Recommender', category: 'accessibility' },
  { id: 'background-color-recommender', name: 'Background Color Recommender', category: 'accessibility' },
  { id: 'color-compliance-checker', name: 'Color Compliance Checker', category: 'accessibility' },
  { id: 'wcag-report-exporter', name: 'WCAG Report Exporter', category: 'accessibility' },
  { id: 'accessibility-palette-optimizer', name: 'Accessibility Palette Optimizer', category: 'accessibility' },
  { id: 'image-palette-extractor', name: 'Image Palette Extractor', category: 'image' },
  { id: 'dominant-color-extractor', name: 'Dominant Color Extractor', category: 'image' },
  { id: 'average-color-finder', name: 'Average Color Finder', category: 'image' },
  { id: 'logo-color-extractor', name: 'Logo Color Extractor', category: 'image' },
  { id: 'website-screenshot-color-extractor', name: 'Website Screenshot Color Extractor', category: 'image' },
  { id: 'image-gradient-generator', name: 'Image Gradient Generator', category: 'image' },
  { id: 'image-to-css-gradient', name: 'Image to CSS Gradient', category: 'image' },
  { id: 'image-color-histogram', name: 'Image Color Histogram', category: 'image' },
  { id: 'color-cluster-analyzer', name: 'Color Cluster Analyzer', category: 'image' },
  { id: 'background-color-detector', name: 'Background Color Detector', category: 'image' },
  { id: 'transparent-color-detector', name: 'Transparent Color Detector', category: 'image' },
  { id: 'photo-palette-generator', name: 'Photo Palette Generator', category: 'image' },
  { id: 'pixel-analyzer', name: 'Pixel Analyzer', category: 'image' },
  { id: 'image-color-counter', name: 'Image Color Counter', category: 'image' },
  { id: 'brand-color-finder', name: 'Brand Color Finder', category: 'image' },
  { id: 'image-theme-generator', name: 'Image Theme Generator', category: 'image' },
  { id: 'color-balance-analyzer', name: 'Color Balance Analyzer', category: 'image' },
  { id: 'saturation-analyzer', name: 'Saturation Analyzer', category: 'image' },
  { id: 'brightness-analyzer', name: 'Brightness Analyzer', category: 'image' },
  { id: 'vibrance-analyzer', name: 'Vibrance Analyzer', category: 'image' },
  { id: 'color-temperature-detector', name: 'Color Temperature Detector', category: 'image' },
  { id: 'shadow-detector', name: 'Shadow Detector', category: 'image' },
  { id: 'highlight-detector', name: 'Highlight Detector', category: 'image' },
  { id: 'image-mood-generator', name: 'Image Mood Generator', category: 'image' },
  { id: 'image-accent-color-finder', name: 'Image Accent Color Finder', category: 'image' },
  { id: 'ui-screenshot-palette', name: 'UI Screenshot Palette', category: 'image' },
  { id: 'icon-palette-extractor', name: 'Icon Palette Extractor', category: 'image' },
  { id: 'artwork-palette-generator', name: 'Artwork Palette Generator', category: 'image' },
  { id: 'wallpaper-palette-extractor', name: 'Wallpaper Palette Extractor', category: 'image' },
  { id: 'batch-image-color-extractor', name: 'Batch Image Color Extractor', category: 'image' },
  { id: 'tint-generator', name: 'Tint Generator', category: 'adjustment' },
  { id: 'shade-generator', name: 'Shade Generator', category: 'adjustment' },
  { id: 'tone-generator', name: 'Tone Generator', category: 'adjustment' },
  { id: 'saturation-adjuster', name: 'Saturation Adjuster', category: 'adjustment' },
  { id: 'brightness-adjuster', name: 'Brightness Adjuster', category: 'adjustment' },
  { id: 'contrast-adjuster', name: 'Contrast Adjuster', category: 'adjustment' },
  { id: 'hue-rotator', name: 'Hue Rotator', category: 'adjustment' },
  { id: 'vibrance-adjuster', name: 'Vibrance Adjuster', category: 'adjustment' },
  { id: 'gamma-adjuster', name: 'Gamma Adjuster', category: 'adjustment' },
  { id: 'opacity-generator', name: 'Opacity Generator', category: 'adjustment' },
  { id: 'alpha-adjuster', name: 'Alpha Adjuster', category: 'adjustment' },
  { id: 'lighten-color', name: 'Lighten Color', category: 'adjustment' },
  { id: 'darken-color', name: 'Darken Color', category: 'adjustment' },
  { id: 'desaturate-color', name: 'Desaturate Color', category: 'adjustment' },
  { id: 'invert-color', name: 'Invert Color', category: 'adjustment' },
  { id: 'grayscale-generator', name: 'Grayscale Generator', category: 'adjustment' },
  { id: 'sepia-generator', name: 'Sepia Generator', category: 'adjustment' },
  { id: 'temperature-adjuster', name: 'Temperature Adjuster', category: 'adjustment' },
  { id: 'color-mixer', name: 'Color Mixer', category: 'adjustment' },
  { id: 'blend-mode-simulator', name: 'Blend Mode Simulator', category: 'adjustment' },
  { id: 'overlay-color-generator', name: 'Overlay Color Generator', category: 'adjustment' },
  { id: 'multiply-blend-generator', name: 'Multiply Blend Generator', category: 'adjustment' },
  { id: 'screen-blend-generator', name: 'Screen Blend Generator', category: 'adjustment' },
  { id: 'soft-light-generator', name: 'Soft Light Generator', category: 'adjustment' },
  { id: 'hard-light-generator', name: 'Hard Light Generator', category: 'adjustment' },
  { id: 'color-dodge-generator', name: 'Color Dodge Generator', category: 'adjustment' },
  { id: 'burn-generator', name: 'Burn Generator', category: 'adjustment' },
  { id: 'color-harmonizer', name: 'Color Harmonizer', category: 'adjustment' },
  { id: 'dynamic-theme-generator', name: 'Dynamic Theme Generator', category: 'adjustment' },
  { id: 'color-equalizer', name: 'Color Equalizer', category: 'adjustment' },
  { id: 'css-named-colors', name: 'CSS Named Colors', category: 'reference' },
  { id: 'html-named-colors', name: 'HTML Named Colors', category: 'reference' },
  { id: 'tailwind-colors', name: 'Tailwind Colors', category: 'reference' },
  { id: 'material-colors', name: 'Material Colors', category: 'reference' },
  { id: 'bootstrap-colors', name: 'Bootstrap Colors', category: 'reference' },
  { id: 'brand-colors-database', name: 'Brand Colors Database', category: 'reference' },
  { id: 'country-flag-colors', name: 'Country Flag Colors', category: 'reference' },
  { id: 'google-colors', name: 'Google Colors', category: 'reference' },
  { id: 'apple-colors', name: 'Apple Colors', category: 'reference' },
  { id: 'microsoft-colors', name: 'Microsoft Colors', category: 'reference' },
  { id: 'discord-colors', name: 'Discord Colors', category: 'reference' },
  { id: 'youtube-colors', name: 'YouTube Colors', category: 'reference' },
  { id: 'x-brand-colors', name: 'X Brand Colors', category: 'reference' },
  { id: 'instagram-colors', name: 'Instagram Colors', category: 'reference' },
  { id: 'spotify-colors', name: 'Spotify Colors', category: 'reference' },
  { id: 'netflix-colors', name: 'Netflix Colors', category: 'reference' },
  { id: 'fifa-team-colors', name: 'FIFA Team Colors', category: 'reference' },
  { id: 'nba-team-colors', name: 'NBA Team Colors', category: 'reference' },
  { id: 'premier-league-colors', name: 'Premier League Colors', category: 'reference' },
  { id: 'national-flag-colors', name: 'National Flag Colors', category: 'reference' },
  { id: 'web-safe-colors', name: 'Web Safe Colors', category: 'reference' },
  { id: 'pantone-finder', name: 'Pantone Finder', category: 'reference' },
  { id: 'ral-color-finder', name: 'RAL Color Finder', category: 'reference' },
  { id: 'ncs-color-finder', name: 'NCS Color Finder', category: 'reference' },
  { id: 'css-color-names-search', name: 'CSS Color Names Search', category: 'reference' },
  { id: 'color-meaning-guide', name: 'Color Meaning Guide', category: 'reference' },
  { id: 'psychological-colors-guide', name: 'Psychological Colors Guide', category: 'reference' },
  { id: 'ui-color-library', name: 'UI Color Library', category: 'reference' },
  { id: 'seasonal-color-library', name: 'Seasonal Color Library', category: 'reference' },
  { id: 'color-trends', name: 'Color Trends', category: 'reference' },
  { id: 'design-tokens-library', name: 'Design Tokens Library', category: 'reference' },
  { id: 'semantic-color-library', name: 'Semantic Color Library', category: 'reference' },
  { id: 'status-color-library', name: 'Status Color Library', category: 'reference' },
  { id: 'neutral-color-library', name: 'Neutral Color Library', category: 'reference' },
  { id: 'pastel-library', name: 'Pastel Library', category: 'reference' },
  { id: 'color-name-finder', name: 'Color Name Finder', category: 'utility' },
  { id: 'color-similarity-checker', name: 'Color Similarity Checker', category: 'utility' },
  { id: 'duplicate-color-finder', name: 'Duplicate Color Finder', category: 'utility' },
  { id: 'color-difference-calculator', name: 'Color Difference Calculator', category: 'utility' },
  { id: 'random-color-generator', name: 'Random Color Generator', category: 'utility' },
  { id: 'color-wheel', name: 'Color Wheel', category: 'utility' },
  { id: 'palette-exporter', name: 'Palette Exporter', category: 'utility' },
  { id: 'palette-importer', name: 'Palette Importer', category: 'utility' },
  { id: 'css-variable-generator', name: 'CSS Variable Generator', category: 'utility' },
  { id: 'tailwind-theme-generator', name: 'Tailwind Theme Generator', category: 'utility' },
  { id: 'figma-color-export', name: 'Figma Color Export', category: 'utility' },
  { id: 'adobe-ase-export', name: 'Adobe ASE Export', category: 'utility' },
  { id: 'scss-variables-generator', name: 'SCSS Variables Generator', category: 'utility' },
  { id: 'json-palette-generator', name: 'JSON Palette Generator', category: 'utility' },
  { id: 'android-colors-xml-generator', name: 'Android Colors.xml Generator', category: 'utility' },
  { id: 'swift-color-assets-generator', name: 'Swift Color Assets Generator', category: 'utility' },
  { id: 'flutter-theme-generator', name: 'Flutter Theme Generator', category: 'utility' },
  { id: 'react-theme-generator', name: 'React Theme Generator', category: 'utility' },
  { id: 'design-token-generator', name: 'Design Token Generator', category: 'utility' },
  { id: 'color-playground', name: 'Color Playground', category: 'utility' },
]

const specific = {
  'hex-to-rgb': ['hexToRgb', '#ff0044', '#ff0044'],
  'rgb-to-hex': ['rgbToHex', 'rgb(255, 0, 68)', '#ff0044'],
  'hex-to-hsl': ['hexToHsl', '#ff0044', '#ff0044'],
  'hsl-to-hex': ['hslToHex', 'hsl(348, 100%, 50%)', '#ff0044'],
  'hex-to-hsv': ['hexToHsv', '#ff0044', '#ff0044'],
  'hsv-to-hex': ['hsvToHex', 'hsv(348, 100%, 100%)', '#ff0044'],
  'rgb-to-hsl': ['rgbToHsl', 'rgb(255, 0, 68)', '#ff0044'],
  'hsl-to-rgb': ['hslToRgb', 'hsl(348, 100%, 50%)', '#ff0044'],
  'rgb-to-hsv': ['rgbToHsv', 'rgb(255, 0, 68)', '#ff0044'],
  'hsv-to-rgb': ['hsvToRgb', 'hsv(348, 100%, 100%)', '#ff0044'],
  'rgb-to-cmyk': ['rgbToCmyk', 'rgb(255, 0, 68)', '#ff0044'],
  'cmyk-to-rgb': ['cmykToRgb', 'cmyk(0, 100%, 73%, 0%)', '#ff0044'],
  'hex-to-cmyk': ['hexToCmyk', '#ff0044', '#ff0044'],
  'cmyk-to-hex': ['cmykToHex', 'cmyk(0, 100%, 73%, 0%)', '#ff0044'],
  'hex-to-lab': ['hexToLab', '#ff0044', '#ff0044'],
  'lab-to-hex': ['labToHex', 'lab(50, 70, 30)', '#ff0044'],
  'rgb-to-lab': ['rgbToLab', 'rgb(255, 0, 68)', '#ff0044'],
  'lab-to-rgb': ['labToRgb', 'lab(50, 70, 30)', '#ff0044'],
  'hex-to-lch': ['hexToLch', '#ff0044', '#ff0044'],
  'lch-to-hex': ['lchToHex', 'lch(50, 76, 23)', '#ff0044'],
  'rgb-to-lch': ['rgbToLch', 'rgb(255, 0, 68)', '#ff0044'],
  'lch-to-rgb': ['lchToRgb', 'lch(50, 76, 23)', '#ff0044'],
  'hex-to-oklab': ['hexToOklab', '#ff0044', '#ff0044'],
  'oklab-to-hex': ['oklabToHex', 'oklab(0.5, 0.3, 0.1)', '#ff0044'],
  'rgb-to-oklab': ['rgbToOklab', 'rgb(255, 0, 68)', '#ff0044'],
  'oklab-to-rgb': ['oklabToRgb', 'oklab(0.5, 0.3, 0.1)', '#ff0044'],
  'hex-to-oklch': ['hexToOklch', '#ff0044', '#ff0044'],
  'oklch-to-hex': ['oklchToHex', 'oklch(0.5, 0.3, 23)', '#ff0044'],
  'rgb-to-oklch': ['rgbToOklch', 'rgb(255, 0, 68)', '#ff0044'],
  'oklch-to-rgb': ['oklchToRgb', 'oklch(0.5, 0.3, 23)', '#ff0044'],
  'rgb-to-hwb': ['cssColorConverter', 'rgb(255, 0, 68)', '#ff0044'],
  'hwb-to-rgb': ['cssColorConverter', 'hwb(348, 0%, 0%)', '#ff0044'],
  'hex-to-hwb': ['hexToHwb', '#ff0044', '#ff0044'],
  'hwb-to-hex': ['hwbToHex', 'hwb(348, 0%, 0%)', '#ff0044'],
  'rgba-to-hex': ['rgbaToHex', 'rgba(255, 0, 68, 0.8)', '#ff0044'],
  'hex-to-rgba': ['hexToRgba', '#ff0044cc', '#ff0044'],
  'hsla-to-hex': ['hslaToHex', 'hsla(348, 100%, 50%, 0.8)', '#ff0044'],
  'hex-to-hsla': ['hexToHsla', '#ff0044cc', '#ff0044'],
  'css-color-converter': ['cssColorConverter', '#ff0044', '#ff0044'],
  'tailwind-color-converter': ['cssColorConverter', '#ff0044', '#ff0044'],
  'material-color-converter': ['cssColorConverter', '#ff0044', '#ff0044'],
  'android-xml-color-converter': ['cssColorConverter', '#ff0044', '#ff0044'],
  'swift-uicolor-converter': ['cssColorConverter', '#ff0044', '#ff0044'],
  'flutter-color-converter': ['cssColorConverter', '#ff0044', '#ff0044'],
  'kotlin-color-converter': ['cssColorConverter', '#ff0044', '#ff0044'],
  'java-color-converter': ['cssColorConverter', '#ff0044', '#ff0044'],
  'csharp-color-converter': ['cssColorConverter', '#ff0044', '#ff0044'],
  'python-color-converter': ['cssColorConverter', '#ff0044', '#ff0044'],
  'css-variable-converter': ['cssColorConverter', '#ff0044', '#ff0044'],
  'json-color-converter': ['cssColorConverter', '#ff0044', '#ff0044'],
  'scss-color-converter': ['cssColorConverter', '#ff0044', '#ff0044'],
  'less-color-converter': ['cssColorConverter', '#ff0044', '#ff0044'],
  'color-format-detector': ['colorFormatDetector', '#ff0044', '#ff0044'],
  'universal-color-converter': ['cssColorConverter', '#ff0044', '#ff0044'],
  'batch-color-converter': ['cssColorConverter', '#ff0044\n#00ff44\n#0044ff', '#ff0044'],
  'color-name-finder': ['colorName', '#ff0044', '#ff0044'],
}

const categoryDefaults = {
  converter:     { fn: 'cssColorConverter', example: '#ff0044', preview: '#ff0044' },
  palette:       { fn: 'generateShades', example: '#ff0044', preview: '#ff0044' },
  gradient:      { fn: 'cssColorConverter', example: '#ff0044\n#00ff88', preview: '#ff0044' },
  picker:        { fn: 'hexToRgb', example: '#ff0044', preview: '#ff0044' },
  accessibility: { fn: 'cssColorConverter', example: '#ff0044', preview: '#ff0044' },
  image:         { fn: 'hexToRgb', example: '#ff0044', preview: '#ff0044' },
  adjustment:    { fn: 'cssColorConverter', example: '#ff0044', preview: '#ff0044' },
  reference:     { fn: 'colorName', example: '#ff0044', preview: '#ff0044' },
  utility:       { fn: 'colorName', example: '#ff0044', preview: '#ff0044' },
}

const descriptions = {
  'color-similarity-checker': 'Measure how similar or different two colors are using Delta E perceptual difference.',
  'duplicate-color-finder': 'Find and identify duplicate colors within your palette or color list.',
  'color-difference-calculator': 'Calculate the precise Delta E perceptual difference between two colors.',
  'color-wheel': 'Explore color relationships with an interactive color wheel visualization.',
  'palette-exporter': 'Export your color palettes in CSS, SCSS, JSON, and other popular formats.',
  'palette-importer': 'Import color palettes from CSS, JSON, SCSS, and other color file formats.',
  'css-variable-generator': 'Generate CSS custom property definitions from your color palette.',
  'tailwind-theme-generator': 'Generate Tailwind CSS theme configuration from your color palette.',
  'figma-color-export': 'Export your color palettes in Figma-compatible format for design systems.',
  'adobe-ase-export': 'Export color palettes as Adobe Swatch Exchange (.ase) files.',
  'scss-variables-generator': 'Generate SCSS variable definitions from your color palette.',
  'json-palette-generator': 'Generate structured JSON palette files for your design system.',
  'android-colors-xml-generator': 'Generate Android colors.xml resource files from your palette.',
  'swift-color-assets-generator': 'Generate Swift color asset definitions for iOS development.',
  'flutter-theme-generator': 'Generate Flutter ThemeData color configuration from your palette.',
  'react-theme-generator': 'Generate React theme provider configuration from color palettes.',
  'design-token-generator': 'Generate cross-platform design tokens from your color palette.',
  'color-playground': 'Experiment with colors interactively in a free-form color playground.',
  'wcag-contrast-checker': 'Check color contrast ratios against WCAG 2.2 accessibility standards for web content.',
  'apca-contrast-checker': 'Evaluate contrast using the Advanced Perceptual Contrast Algorithm (APCA).',
  'aaa-contrast-checker': 'Verify color pairs meet the strictest WCAG AAA compliance level (7:1 ratio).',
  'aa-contrast-checker': 'Check color combinations against WCAG AA standards (4.5:1 ratio).',
  'monochrome-preview': 'Preview your designs in grayscale to test contrast and readability.',
  'readability-checker': 'Assess text readability based on color contrast and accessibility guidelines.',
  'accessible-palette-generator': 'Generate color palettes that meet WCAG accessibility requirements.',
  'accessible-gradient-generator': 'Create gradients that maintain sufficient contrast throughout.',
  'text-contrast-generator': 'Find text colors that meet contrast requirements against any background.',
  'background-contrast-generator': 'Generate accessible background colors for any foreground text color.',
  'button-accessibility-checker': 'Verify button color combinations meet accessibility standards.',
  'link-accessibility-checker': 'Check link color contrast against surrounding text and backgrounds.',
  'ui-accessibility-tester': 'Test entire UI component color schemes for accessibility compliance.',
  'dashboard-accessibility-checker': 'Evaluate dashboard color schemes for data visualization accessibility.',
  'accessibility-report-generator': 'Generate comprehensive accessibility reports for your color choices.',
  'contrast-matrix-generator': 'Compare contrast ratios across multiple color pairs in a matrix view.',
  'color-vision-test': 'Test your own color vision with interactive color discrimination tests.',
  'accessibility-heatmap': 'Visualize accessibility issues across your color palette with a heatmap.',
  'contrast-fix-generator': 'Automatically suggest color adjustments to fix contrast failures.',
  'dark-mode-contrast-checker': 'Verify color contrast ratios specifically for dark mode interfaces.',
  'light-mode-contrast-checker': 'Verify color contrast ratios for light mode interface designs.',
  'font-color-recommender': 'Get accessible font color recommendations for any background color.',
  'background-color-recommender': 'Find accessible background colors that work with your text colors.',
  'color-compliance-checker': 'Comprehensive color compliance checking against global accessibility standards.',
  'wcag-report-exporter': 'Export detailed WCAG compliance reports for your color palette.',
  'accessibility-palette-optimizer': 'Optimize your color palette to maximize accessibility compliance.',
  'color-blindness-simulator': 'Preview your designs through the eyes of users with color blindness.',
  'protanopia-simulator': 'Simulate how colors appear to users with protanopia red-blindness.',
  'deuteranopia-simulator': 'Simulate how colors appear to users with deuteranopia green-blindness.',
  'tritanopia-simulator': 'Simulate how colors appear to users with tritanopia blue-blindness.',
}

function makeDescription(tool) {
  return descriptions[tool.id] || `${tool.name}. Free online color tool for developers and designers.`
}

function makeTitle(tool) {
  return `${tool.name} - Free Online Color Tool`
}

function getConfig(tool) {
  if (specific[tool.id]) {
    const [fn, example, preview] = specific[tool.id]
    return { fn, example, preview }
  }
  const def = categoryDefaults[tool.category] || categoryDefaults.utility
  return { fn: def.fn, example: def.example, preview: def.preview }
}

function escape(str) {
  return str.replace(/'/g, "\\'").replace(/\n/g, '\\n')
}

function generatePage(tool) {
  const title = escape(makeTitle(tool))
  const description = escape(makeDescription(tool))
  return `import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: '${title}',
  description: '${description}',
}

export default function Page() {
  return <ToolPageClient />
}
`
}

function generateClient(tool) {
  const cfg = getConfig(tool)
  const title = tool.name
  const description = makeDescription(tool)
  const example = cfg.example

  let wrapperCode = ''
  let convertCall = cfg.fn
  const needed = new Set()

  switch (tool.id) {
    case 'wcag-contrast-checker':
    case 'apca-contrast-checker':
    case 'aaa-contrast-checker':
    case 'aa-contrast-checker':
    case 'readability-checker':
    case 'text-contrast-generator':
    case 'background-contrast-generator':
    case 'button-accessibility-checker':
    case 'link-accessibility-checker':
    case 'ui-accessibility-tester':
    case 'dashboard-accessibility-checker':
    case 'dark-mode-contrast-checker':
    case 'light-mode-contrast-checker':
    case 'font-color-recommender':
    case 'background-color-recommender':
    case 'color-compliance-checker':
    case 'contrast-matrix-generator':
    case 'contrast-fix-generator':
      needed.add('contrastRatio')
      needed.add('wcagLevel')
      wrapperCode = `const checkContrast = (input: string) => {
  const [c1, c2] = input.split('\\n').map(s => s.trim())
  if (!c1 || !c2) throw new Error('Provide two colors separated by a newline')
  const ratio = contrastRatio(c1, c2)
  const level = wcagLevel(ratio)
  return \`Contrast Ratio: \${ratio.toFixed(2)}:1\\nWCAG Level: \${level}\`
}`
      convertCall = 'checkContrast'
      break

    case 'color-blindness-simulator':
      needed.add('colorBlindSimulate')
      wrapperCode = `const simulate = (input: string) => colorBlindSimulate(input, 'achromatopsia')`
      convertCall = 'simulate'
      break

    case 'protanopia-simulator':
      needed.add('colorBlindSimulate')
      wrapperCode = `const simulate = (input: string) => colorBlindSimulate(input, 'protanopia')`
      convertCall = 'simulate'
      break

    case 'deuteranopia-simulator':
      needed.add('colorBlindSimulate')
      wrapperCode = `const simulate = (input: string) => colorBlindSimulate(input, 'deuteranopia')`
      convertCall = 'simulate'
      break

    case 'tritanopia-simulator':
      needed.add('colorBlindSimulate')
      wrapperCode = `const simulate = (input: string) => colorBlindSimulate(input, 'tritanopia')`
      convertCall = 'simulate'
      break

    case 'monochrome-preview':
      needed.add('cssColorConverter')
      wrapperCode = `const toGrayscale = (input: string) => {
  const hex = cssColorConverter(input)
  return \`Grayscale: \${hex}\`
}`
      convertCall = 'toGrayscale'
      break

    case 'color-similarity-checker':
    case 'duplicate-color-finder':
    case 'color-difference-calculator':
      needed.add('deltaE')
      wrapperCode = `const calcDeltaE = (input: string) => {
  const [c1, c2] = input.split('\\n').map(s => s.trim())
  if (!c1 || !c2) throw new Error('Provide two colors separated by a newline')
  return \`Delta E: \${deltaE(c1, c2).toFixed(2)}\`
}`
      convertCall = 'calcDeltaE'
      break

    case 'random-color-generator':
      needed.add('randomColor')
      wrapperCode = `const genRandom = () => randomColor()`
      convertCall = 'genRandom'
      break

    case 'color-temperature-detector':
      needed.add('colorTemperature')
      wrapperCode = `const detectTemp = (input: string) => \`Color temperature: \${colorTemperature(input)}\``
      convertCall = 'detectTemp'
      break

    default:
      needed.add(cfg.fn)
      break
  }

  const colorPreview = cfg.preview ? `\n      colorPreview="${cfg.preview}"` : ''
  const importList = [...needed].join(', ')
  const escapedExample = escape(example)

  return `'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { ${importList} } from '@/lib/converters'
${wrapperCode}
const example = '${escapedExample}'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="${escape(title)}"
      description="${escape(description)}"
      onConvert={${convertCall}}
      exampleInput={example}${colorPreview}
    />
  )
}
`
}

let created = 0
for (const tool of tools) {
  const dir = path.join(SRC_APP, tool.id)
  fs.mkdirSync(dir, { recursive: true })

  const pageContent = generatePage(tool)
  fs.writeFileSync(path.join(dir, 'page.tsx'), pageContent)

  const clientContent = generateClient(tool)
  fs.writeFileSync(path.join(dir, 'ToolPageClient.tsx'), clientContent)

  created++
}

console.log(`Generated ${created} tool pages (${created * 2} files total)`)
