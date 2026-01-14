# Contributing to Artistic Image Generator

Thank you for your interest in contributing to Artistic Image Generator! We welcome contributions from everyone.

## 🤝 How to Contribute

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find that the problem has already been reported.

When creating a bug report, please include:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details (OS, browser, Node.js version)
- Any relevant error messages or logs

### Suggesting Enhancements

Enhancement suggestions are welcome! Please:

- Use a clear and descriptive title
- Provide a detailed description of the proposed enhancement
- Explain why this enhancement would be useful
- Provide examples of how the enhancement would work

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Install dependencies**:

```bash
bun install
```

3. **Make your changes** and follow the code style:

- Use TypeScript for type safety
- Follow the existing code structure
- Add comments for complex logic
- Ensure ESLint passes: `bun run lint`

4. **Test your changes**:

```bash
# Start development server
bun run dev
```

5. **Commit your changes** with a clear commit message

6. **Push to your fork** and submit a pull request

## 📝 Development Guidelines

### Code Style

- Use **TypeScript** for type safety
- Follow **ESLint** rules
- Use **Prettier** for consistent formatting (if configured)
- Write meaningful commit messages
- Keep functions focused and small

### Testing

- Test your changes thoroughly
- Ensure all existing features still work
- Test on different browsers (Chrome, Firefox, Safari, Edge)
- Test on different screen sizes (mobile, tablet, desktop)

### Documentation

- Update the README if needed
- Add comments to complex code
- Update API documentation if you change the API

## 🎯 Feature Requests

If you'd like to request a new feature:

1. Check existing issues and pull requests
2. Create a new issue with:
   - A clear description of the feature
   - Why it would be useful
   - How you envision it working
   - Any relevant examples or references

## 🐛 Bug Reports

When reporting bugs, please:

1. Use a clear and descriptive title
2. Provide steps to reproduce
3. Describe expected vs actual behavior
4. Include screenshots if applicable
5. Provide environment details
6. Share error messages or logs

## 📜 Code of Conduct

- Be respectful and inclusive
- Focus on what is best for the community
- Show empathy towards other community members

## 🎨 Adding New Artistic Styles

To add a new artistic style:

1. Edit `src/app/page.tsx`
2. Add your style to the `IMAGE_STYLES` array:

```typescript
{
  id: 'your-style-id',
  name: 'Your Style Name',
  description: 'Brief description'
}
```

3. Add the style description to `STYLE_DESCRIPTIONS`:

```typescript
'your-style-id': 'detailed description for the AI model',
```

4. Test the new style
5. Submit a pull request

## 💡 Ideas for Contributions

Here are some ideas for contributions:

- Add new artistic styles
- Improve UI/UX
- Add image filters (blur, brightness, contrast, etc.)
- Add image editing features (crop, rotate, etc.)
- Add user authentication
- Save images to user account
- Add image history/gallery
- Add batch image generation
- Add social sharing features
- Improve accessibility
- Add translations (i18n)
- Add unit tests
- Improve performance
- Add responsive design improvements

## 📧 Getting Help

If you need help:

- Check the [README](README.md) for usage instructions
- Check existing [issues](../../issues)
- Create a new issue if you can't find the answer

## 🙏 Thank You

Thank you for contributing to Artistic Image Generator! Your contributions help make this project better for everyone.
