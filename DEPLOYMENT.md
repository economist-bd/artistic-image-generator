# Deployment Guide

This guide will help you deploy the Artistic Image Generator to various platforms.

## 🚀 Deployment Options

### Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

#### Step-by-Step Deployment

1. **Push your code to GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/artistic-image-generator.git
git push -u origin main
```

2. **Deploy to Vercel**

- Go to [vercel.com](https://vercel.com)
- Sign up or log in
- Click "Add New Project"
- Import your repository from GitHub
- Configure project settings (defaults are usually fine)
- Click "Deploy"

That's it! Vercel will handle everything automatically.

#### Environment Variables (if needed)

No environment variables are required for this project. The `z-ai-web-dev-sdk` handles everything server-side.

### Netlify

#### Using Netlify CLI

```bash
# Install Netlify CLI
bun install -g netlify-cli

# Login to Netlify
netlify login

# Initialize
netlify init

# Build
bun run build

# Deploy
netlify deploy --prod
```

#### Using Netlify Dashboard

1. Go to [netlify.com](https://netlify.com)
2. Sign up or log in
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository
5. Configure build settings:
   - Build command: `bun run build`
   - Publish directory: `.next`
6. Click "Deploy site"

### Railway

```bash
# Install Railway CLI
bun install -g @railway/cli

# Login
railway login

# Initialize
railway init

# Deploy
railway up
```

### Render

1. Go to [render.com](https://render.com)
2. Sign up or log in
3. Click "New" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - Build Command: `bun run build`
   - Start Command: `bun start`
   - Environment: Node
6. Click "Create Web Service"

### Docker Deployment

#### Dockerfile

Create a `Dockerfile` in the root directory:

```dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json bun.lockb* ./
RUN corepack enable && corepack prepare bun@latest --activate
RUN bun install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack enable && corepack prepare bun@latest --activate
RUN bun run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### Build and Run

```bash
# Build image
docker build -t artistic-image-generator .

# Run container
docker run -p 3000:3000 artistic-image-generator
```

### Traditional Server (VPS)

#### Prerequisites

- Node.js 18+
- Bun or npm
- PM2 (for process management)

#### Deployment Steps

```bash
# Clone repository
git clone https://github.com/yourusername/artistic-image-generator.git
cd artistic-image-generator

# Install dependencies
bun install

# Build application
bun run build

# Start with PM2
bun install -g pm2
pm2 start bun --name "artistic-image-generator" -- start

# Setup PM2 to start on boot
pm2 startup
pm2 save
```

#### Nginx Configuration (Optional)

Create `/etc/nginx/sites-available/artistic-image-generator`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/artistic-image-generator /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 🔧 Configuration

### Environment Variables

This project doesn't require any environment variables. However, you can add them if needed:

Create a `.env` file:

```env
# Optional: Add if you need additional configuration
NODE_ENV=production
```

### Build Settings

Most platforms auto-detect Next.js settings. If you need to configure:

- **Build Command**: `bun run build`
- **Start Command**: `bun start`
- **Output Directory**: `.next` (auto-detected)

## 📊 Monitoring

### Vercel Analytics

Vercel provides built-in analytics. Enable it in your Vercel dashboard.

### Custom Analytics

You can add Google Analytics or other analytics by:

1. Edit `src/app/layout.tsx`
2. Add your analytics script in the `<head>` section

## 🔒 Security

### Best Practices

1. **Keep dependencies updated**:

```bash
bun update
```

2. **Use HTTPS** - All deployment platforms provide SSL certificates

3. **Monitor logs** - Check your platform's dashboard for errors

4. **Set up alerts** - Configure error tracking (Sentry, etc.)

## 🚦 Post-Deployment Checklist

- [ ] Application loads successfully
- [ ] Image generation works
- [ ] All 21+ styles work correctly
- [ ] Download functionality works
- [ ] UI is responsive on mobile
- [ ] No console errors
- [ ] Analytics are tracking (if configured)
- [ ] Custom domain is set up (if desired)

## 🐛 Troubleshooting

### Build Fails

1. Check Node.js version (18+)
2. Clear cache and rebuild:
   ```bash
   rm -rf .next node_modules
   bun install
   bun run build
   ```

### Images Not Generating

1. Check server logs
2. Verify `z-ai-web-dev-sdk` is installed
3. Check API endpoint is accessible

### Slow Performance

1. Enable caching
2. Use CDN for static assets
3. Optimize images

## 📞 Support

If you encounter issues:

1. Check the [README](README.md)
2. Search [existing issues](../../issues)
3. Create a new issue with:
   - Deployment platform
   - Error messages
   - Steps to reproduce

---

Happy deploying! 🚀
