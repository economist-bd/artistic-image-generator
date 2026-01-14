'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sparkles, Download, Loader2, Image as ImageIcon, RefreshCw } from 'lucide-react'

const IMAGE_STYLES = [
  { id: 'minimalism', name: 'Minimalism', description: 'Simple, clean, negative space' },
  { id: 'surrealism', name: 'Surrealism', description: 'Dream-like, bizarre imagery' },
  { id: 'abstract', name: 'Abstract', description: 'Shapes, colors, textures' },
  { id: 'film-noir', name: 'Film Noir', description: 'High-contrast black and white' },
  { id: 'vintage', name: 'Vintage / Retro', description: 'Sepia tones, film grain' },
  { id: 'hdr', name: 'HDR', description: 'Vivid, hyper-realistic detail' },
  { id: 'pop-art', name: 'Pop Art', description: 'Bright, bold colors' },
  { id: 'glitch-art', name: 'Glitch Art', description: 'Digital corruption aesthetic' },
  { id: 'cyberpunk', name: 'Cyberpunk', description: 'Neon lights, futuristic' },
  { id: 'double-exposure', name: 'Double Exposure', description: 'Layered ghostly effect' },
  { id: 'silhouette', name: 'Silhouette', description: 'Dark outline against bright background' },
  { id: 'bokeh', name: 'Bokeh', description: 'Soft out-of-focus blur' },
  { id: 'high-key', name: 'High Key', description: 'Bright, airy, light tones' },
  { id: 'low-key', name: 'Low Key', description: 'Dark, dramatic shadows' },
  { id: 'cinematic', name: 'Cinematic', description: 'Movie-like composition' },
  { id: 'grunge', name: 'Grunge', description: 'Dark, textured, gritty' },
  { id: 'vaporwave', name: 'Vaporwave', description: '80s/90s digital nostalgia' },
  { id: 'lomography', name: 'Lomography', description: 'Oversaturated, vignetting' },
  { id: 'geometric', name: 'Geometric', description: 'Lines, angles, symmetry' },
  { id: 'long-exposure', name: 'Long Exposure', description: 'Blurred motion, light trails' },
  { id: 'disney-pixar', name: 'Disney Pixar', description: '3D animated movie style' },
]

const STYLE_DESCRIPTIONS: Record<string, string> = {
  minimalism: 'minimalist style, clean composition, lots of negative space, simple and elegant',
  surrealism: 'surrealist style, dream-like imagery, bizarre and fantastical, blending reality with imagination',
  abstract: 'abstract style, focus on shapes and colors rather than realistic representation, artistic and expressive',
  'film-noir': 'film noir style, black and white photography, dramatic shadows, high contrast, 1940s crime film aesthetic',
  vintage: 'vintage photography style, sepia tones, film grain, faded colors, nostalgic retro look',
  hdr: 'HDR photography, high dynamic range, vivid colors, hyper-realistic detail, enhanced contrast and saturation',
  'pop-art': 'pop art style, bright bold colors, high contrast, comic book inspired, 1950s-60s aesthetic',
  'glitch-art': 'glitch art style, digital corruption, distorted aesthetic, technological errors, corrupted data look',
  cyberpunk: 'cyberpunk aesthetic, neon lights in pink and blue, futuristic urban setting, high-tech elements',
  'double-exposure': 'double exposure photography, superimposed images, layered ghostly effect, artistic overlay',
  silhouette: 'silhouette photography, dark subject against bright background, focus on outline shape',
  bokeh: 'bokeh photography, soft out-of-focus background blur, glowing light orbs, aesthetic blur',
  'high-key': 'high-key photography, bright and airy, mostly light tones, minimal shadows, clean and fresh',
  'low-key': 'low-key photography, dark and dramatic, dominated by shadows, revealing specific contours only',
  cinematic: 'cinematic style, movie-like composition, cinematic color grading, dramatic lighting, storytelling',
  grunge: 'grunge aesthetic, dark and gritty, textures like rust and concrete, desaturated muddy colors',
  vaporwave: 'vaporwave aesthetic, 80s/90s computer graphics, pastel colors, marble statues, digital nostalgia',
  lomography: 'lomography style, oversaturated colors, high contrast, vignetting dark corners, toy camera look',
  geometric: 'geometric composition, focus on lines and angles, symmetrical arrangement, architectural style',
  'long-exposure': 'long exposure photography, blurred moving elements, light trails, stationary objects sharp, motion blur',
  'disney-pixar': 'Disney Pixar 3D animation style, cute characters, vibrant colors, clean 3D rendering, animated movie aesthetic',
}

const IMAGE_SIZES = [
  { value: '1024x1024', label: 'Square (1024x1024)', aspect: '1:1' },
  { value: '1344x768', label: 'Landscape (1344x768)', aspect: '16:9' },
  { value: '1152x864', label: 'Landscape (1152x864)', aspect: '4:3' },
  { value: '1440x720', label: 'Wide (1440x720)', aspect: '2:1' },
  { value: '768x1344', label: 'Portrait (768x1344)', aspect: '9:16' },
  { value: '864x1152', label: 'Portrait (864x1152)', aspect: '3:4' },
  { value: '720x1440', label: 'Tall (720x1440)', aspect: '1:2' },
]

export default function Home() {
  const [subject, setSubject] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('')
  const [selectedSize, setSelectedSize] = useState('1024x1024')
  const [isLoading, setIsLoading] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<{ url: string; prompt: string } | null>(null)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleGenerate = async () => {
    if (!subject.trim() || !selectedStyle) {
      setError('Please provide a subject and select a style')
      return
    }

    setError('')
    setIsLoading(true)
    setGeneratedImage(null)

    try {
      const styleDescription = STYLE_DESCRIPTIONS[selectedStyle]
      const prompt = `${subject}, ${styleDescription}, high quality, detailed, professional`

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          size: selectedSize,
          style: selectedStyle,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image')
      }

      setGeneratedImage({
        url: data.imageUrl,
        prompt: data.prompt || prompt,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate image')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    if (!generatedImage?.url) return

    // Check if URL is base64 or regular URL
    const isBase64 = generatedImage.url.startsWith('data:')

    const link = document.createElement('a')
    link.href = generatedImage.url

    if (isBase64) {
      // For base64, we need to use fetch to get the blob
      fetch(generatedImage.url)
        .then(res => res.blob())
        .then(blob => {
          const blobUrl = URL.createObjectURL(blob)
          link.href = blobUrl
          link.download = `artistic-image-${selectedStyle}-${Date.now()}.png`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(blobUrl)
        })
    } else {
      // For regular URLs, direct download
      link.download = `artistic-image-${selectedStyle}-${Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleReset = () => {
    setSubject('')
    setSelectedStyle('')
    setSelectedSize('1024x1024')
    setGeneratedImage(null)
    setError('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-6 w-6 text-primary" />
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Artistic Image Generator
                </h1>
                <p className="text-xs text-muted-foreground">
                  Create stunning artwork with AI
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="hidden sm:flex">
              {IMAGE_STYLES.length}+ Styles
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Controls */}
          <div className="space-y-6">
            {/* Subject Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Subject
                </CardTitle>
                <CardDescription>
                  Describe what you want to create
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="e.g., A majestic mountain at sunset"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                  disabled={isLoading}
                />
              </CardContent>
            </Card>

            {/* Style Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Artistic Style</CardTitle>
                <CardDescription>
                  Choose an artistic style for your image
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select
                  value={selectedStyle}
                  onValueChange={setSelectedStyle}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a style" />
                  </SelectTrigger>
                  <SelectContent>
                    <ScrollArea className="h-96">
                      {IMAGE_STYLES.map((style) => (
                        <SelectItem key={style.id} value={style.id}>
                          <div className="flex flex-col">
                            <span className="font-medium">{style.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {style.description}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
                {selectedStyle && (
                  <div className="mt-3 p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      {STYLE_DESCRIPTIONS[selectedStyle]}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Size Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Image Size</CardTitle>
                <CardDescription>
                  Choose dimensions for your image
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select
                  value={selectedSize}
                  onValueChange={setSelectedSize}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a size" />
                  </SelectTrigger>
                  <SelectContent>
                    {IMAGE_SIZES.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        <div className="flex flex-col">
                          <span className="font-medium">{size.label}</span>
                          <span className="text-xs text-muted-foreground">
                            {size.aspect}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleGenerate}
                disabled={isLoading || !subject.trim() || !selectedStyle}
                className="flex-1"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Image
                  </>
                )}
              </Button>
              <Button
                onClick={handleReset}
                disabled={isLoading}
                variant="outline"
                size="lg"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                {error}
              </div>
            )}
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-6">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Generated Image</CardTitle>
                <CardDescription>
                  Your AI-generated artwork will appear here
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden relative">
                  {isLoading ? (
                    <div className="flex flex-col items-center gap-4 text-muted-foreground">
                      <Loader2 className="h-12 w-12 animate-spin" />
                      <p className="text-sm">Creating your masterpiece...</p>
                    </div>
                  ) : generatedImage?.url ? (
                    <div className="relative w-full h-full">
                      <img
                        src={generatedImage.url}
                        alt="Generated artwork"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-4 text-muted-foreground p-8">
                      <ImageIcon className="h-16 w-16 opacity-20" />
                      <div className="text-center space-y-2">
                        <p className="font-medium">No image generated yet</p>
                        <p className="text-sm">
                          Enter a subject, select a style, and click generate
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {generatedImage && (
                  <div className="mt-4 space-y-4">
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">
                        Prompt Used:
                      </p>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {generatedImage.prompt}
                      </p>
                    </div>
                    <Button
                      onClick={handleDownload}
                      className="w-full"
                      size="lg"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Image
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-auto">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-sm text-muted-foreground">
            Powered by AI • Create stunning artwork with 21+ artistic styles
          </p>
        </div>
      </footer>
    </div>
  )
}