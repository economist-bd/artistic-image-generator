# 🎨 Artistic Image Generator

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

**Create stunning artwork with AI using 21+ artistic styles**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [API](#-api) • [Contributing](#-contributing)

</div>

---

## ✨ Features

### 🎯 **21+ Artistic Styles**
Create images in various artistic styles:
- **Minimalism** - Clean, simple, negative space
- **Surrealism** - Dream-like, bizarre imagery
- **Abstract** - Shapes, colors, textures
- **Film Noir** - High-contrast black and white
- **Vintage / Retro** - Sepia tones, film grain
- **HDR** - Vivid, hyper-realistic detail
- **Pop Art** - Bright, bold colors
- **Glitch Art** - Digital corruption aesthetic
- **Cyberpunk** - Neon lights, futuristic
- **Double Exposure** - Layered ghostly effect
- **Silhouette** - Dark outline against bright background
- **Bokeh** - Soft out-of-focus blur
- **High Key** - Bright, airy, light tones
- **Low Key** - Dark, dramatic shadows
- **Cinematic** - Movie-like composition
- **Grunge** - Dark, textured, gritty
- **Vaporwave** - 80s/90s digital nostalgia
- **Lomography** - Oversaturated, vignetting
- **Geometric** - Lines, angles, symmetry
- **Long Exposure** - Blurred motion, light trails
- **Disney Pixar** - 3D animated movie style

### 🚀 **Multiple Image Sizes**
- Square (1024x1024)
- Landscape (1344x768, 1152x864, 1440x720)
- Portrait (768x1344, 864x1152, 720x1440)

### 💎 **Modern UI/UX**
- Beautiful, responsive design with shadcn/ui
- Dark mode support
- Real-time preview
- One-click download
- Loading states and error handling

### 🔒 **No API Key Required**
Users don't need to provide any API keys - everything is handled server-side using **z-ai-web-dev-sdk**.

---

## 🎬 Demo

### How to Use

1. **Enter a Subject** - Describe what you want to create (e.g., "A majestic mountain at sunset")
2. **Choose a Style** - Select from 21+ artistic styles
3. **Select Size** - Pick your preferred image dimensions
4. **Generate** - Click the generate button and watch the magic happen
5. **Download** - Save your AI-generated artwork

---

## 📦 Installation

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or bun

### Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/artistic-image-generator.git
cd artistic-image-generator

# Install dependencies
bun install
# or
npm install
# or
yarn install
```

### Environment Setup

This project uses **z-ai-web-dev-sdk** for image generation. No additional configuration is required - the SDK handles everything server-side.

---

## 🚀 Usage

### Development Mode

```bash
# Start the development server
bun run dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build the application
bun run build
# or
npm run build
# or
yarn build

# Start production server
bun start
# or
npm start
# or
yarn start
```

### Linting

```bash
# Run ESLint
bun run lint
# or
npm run lint
# or
yarn lint
```

---

## 🔌 API

### Generate Image

**Endpoint:** `POST /api/generate`

**Request Body:**

```json
{
  "prompt": "A majestic mountain at sunset",
  "size": "1024x1024",
  "style": "cinematic"
}
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `prompt` | string | Yes | Text description of the image to generate |
| `size` | string | No | Image size (default: "1024x1024") |
| `style` | string | No | Artistic style identifier |

**Valid Sizes:**
- `1024x1024` - Square (1:1)
- `1344x768` - Landscape (16:9)
- `1152x864` - Landscape (4:3)
- `1440x720` - Wide (2:1)
- `768x1344` - Portrait (9:16)
- `864x1152` - Portrait (3:4)
- `720x1440` - Tall (1:2)

**Response:**

```json
{
  "success": true,
  "imageUrl": "/generated-images/cinematic-1234567890.png",
  "prompt": "A majestic mountain at sunset, cinematic style, movie-like composition, cinematic color grading, dramatic lighting, storytelling, high quality, detailed, professional",
  "size": "1024x1024",
  "style": "cinematic",
  "filename": "cinematic-1234567890.png"
}
```

**Error Response:**

```json
{
  "error": "Error message here"
}
```

### API Information

**Endpoint:** `GET /api/generate`

**Response:**

```json
{
  "message": "Artistic Image Generator API",
  "version": "1.0.0",
  "endpoints": {
    "POST": "/api/generate - Generate an artistic image"
  },
  "parameters": {
    "prompt": "Text description of the image to generate",
    "size": "Image size: 1024x1024, 768x1344, 864x1152, 1344x768, 1152x864, 1440x720, 720x1440",
    "style": "Artistic style identifier (optional)"
  }
}
```

---

## 🛠️ Tech Stack

### Core
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework

### UI Components
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality, accessible components
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[Framer Motion](https://www.framer.com/motion/)** - Smooth animations

### Backend
- **[z-ai-web-dev-sdk](https://github.com/z-ai-web-dev-sdk)** - AI image generation SDK
- **Next.js API Routes** - Server-side API endpoints

### Tools
- **ESLint** - Code linting
- **TypeScript** - Static type checking

---

## 📁 Project Structure

```
artistic-image-generator/
├── public/
│   └── generated-images/      # Generated images stored here
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── generate/
│   │   │       └── route.ts   # API endpoint for image generation
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Main page (UI)
│   ├── components/
│   │   └── ui/                # shadcn/ui components
│   ├── hooks/                 # Custom React hooks
│   └── lib/                   # Utility functions
├── prisma/
│   └── schema.prisma          # Database schema (if needed)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

---

## 🎨 Customization

### Adding New Styles

Edit `src/app/page.tsx` and add your style to the `IMAGE_STYLES` array:

```typescript
const IMAGE_STYLES = [
  // ... existing styles
  {
    id: 'your-style-id',
    name: 'Your Style Name',
    description: 'Brief description of the style'
  }
]
```

Add the style description to `STYLE_DESCRIPTIONS`:

```typescript
const STYLE_DESCRIPTIONS: Record<string, string> = {
  // ... existing descriptions
  'your-style-id': 'your style description for the AI model',
}
```

### Customizing UI

The UI is built with shadcn/ui components and Tailwind CSS. You can customize:
- Colors in `tailwind.config.ts`
- Components in `src/components/ui/`
- Layout in `src/app/page.tsx`

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
bun install -g vercel

# Deploy
vercel
```

### Other Platforms

This Next.js application can be deployed to:
- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)
- [Railway](https://railway.app)
- [Render](https://render.com)
- Your own server (using `bun start`)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **[z-ai-web-dev-sdk](https://github.com/z-ai-web-dev-sdk)** - For providing the AI image generation capabilities
- **[shadcn/ui](https://ui.shadcn.com/)** - For the beautiful UI components
- **[Next.js](https://nextjs.org/)** - For the amazing framework
- **[Radix UI](https://www.radix-ui.com/)** - For the accessible primitives

---

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact the maintainer

---

<div align="center">

**⭐ Star this repo if it helped you!**

Made with ❤️ by [Your Name]

</div>
