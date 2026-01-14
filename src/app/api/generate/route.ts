import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import ZAI from 'z-ai-web-dev-sdk'

// Create images directory if it doesn't exist
const ensureImagesDir = async () => {
  const imagesDir = path.join(process.cwd(), 'public', 'generated-images')
  if (!existsSync(imagesDir)) {
    await mkdir(imagesDir, { recursive: true })
  }
  return imagesDir
}

// Initialize ZAI instance
let zaiInstance: any = null

const getZAIInstance = async () => {
  if (!zaiInstance) {
    zaiInstance = await ZAI.create()
  }
  return zaiInstance
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, size = '1024x1024', style } = body

    // Validate input
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    // Validate size
    const validSizes = ['1024x1024', '768x1344', '864x1152', '1344x768', '1152x864', '1440x720', '720x1440']
    if (!validSizes.includes(size)) {
      return NextResponse.json(
        { error: `Invalid size. Must be one of: ${validSizes.join(', ')}` },
        { status: 400 }
      )
    }

    // Get ZAI instance
    const zai = await getZAIInstance()

    // Generate image
    const response = await zai.images.generations.create({
      prompt: prompt,
      size: size,
    })

    // Check if response has valid data
    if (!response.data || !response.data[0] || !response.data[0].base64) {
      throw new Error('Invalid response from image generation service')
    }

    const imageBase64 = response.data[0].base64
    const filename = `${style || 'image'}-${Date.now()}.png`
    let imageUrl = ''
    let isBase64 = false

    // Try to save to filesystem
    try {
      const imagesDir = await ensureImagesDir()
      const filepath = path.join(imagesDir, filename)
      const buffer = Buffer.from(imageBase64, 'base64')
      await writeFile(filepath, buffer)
      imageUrl = `/generated-images/${filename}`
      console.log(`Image saved to: ${filepath}`)
    } catch (fsError: any) {
      // If filesystem write fails, return base64 directly
      console.warn('Filesystem write failed, returning base64:', fsError.message)
      imageUrl = `data:image/png;base64,${imageBase64}`
      isBase64 = true
    }

    return NextResponse.json({
      success: true,
      imageUrl: imageUrl,
      isBase64: isBase64,
      prompt: prompt,
      size: size,
      style: style,
      filename: isBase64 ? filename : undefined,
    })
  } catch (error: any) {
    console.error('Error generating image:', error)
    return NextResponse.json(
      {
        error: error.message || 'Failed to generate image',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Artistic Image Generator API',
    version: '1.0.0',
    endpoints: {
      POST: '/api/generate - Generate an artistic image',
    },
    parameters: {
      prompt: 'Text description of the image to generate',
      size: 'Image size: 1024x1024, 768x1344, 864x1152, 1344x768, 1152x864, 1440x720, 720x1440',
      style: 'Artistic style identifier (optional)',
    },
  })
}