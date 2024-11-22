# AiUi (WIP)

A modern Vue 3 component library built with TypeScript and Tailwind CSS made with [Bolt.new](https://bolt.new) (and Cursor when I'm out of tokens).

## Features

- 🎨 Beautiful, modern design
- 🔧 Fully typed components
- 📱 Responsive and accessible
- 🎯 Easy to use and customize
- 🚀 Built with Vue 3 and TypeScript
- 🎨 Powered by Tailwind CSS
- 📚 Comprehensive documentation
- 🧪 Well-tested components
- 📦 Tree-shakeable
- 🌙 Dark mode support

## Packages

This monorepo contains the following packages:

- `@ai-ui/core` - The core component library
- `@ai-ui/docs` - Documentation site built with VitePress

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development
pnpm dev:core    # Run core component library
pnpm dev:docs    # Run documentation site
pnpm storybook   # Run Storybook
```

## Development

### Prerequisites

- Node.js 16 or higher
- pnpm 8 or higher

### Setup

1. Clone the repository:
```bash
git clone https://github.com/David-Pena/ai-ui.git
cd ai-ui
```

2. Install dependencies:
```bash
pnpm install
```

3. Start development:
```bash
# Run core component library
pnpm dev:core

# Run documentation site
pnpm dev:docs

# Run Storybook
pnpm storybook
```

### Project Structure

```
ai-ui/
├── packages/
│   ├── core/           # Core component library
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── stories/
│   │   │   └── tests/
│   │   └── package.json
│   │
│   └── docs/          # Documentation site
│       ├── .vitepress/
│       ├── guide/
│       ├── components/
│       └── package.json
│
├── package.json       # Root package.json
└── pnpm-workspace.yaml
```

### Commands

#### Root Commands
- `pnpm dev:core` - Start core library development
- `pnpm dev:docs` - Start documentation site
- `pnpm storybook` - Start Storybook
- `pnpm build` - Build all packages
- `pnpm test` - Run tests

#### Core Package
- `pnpm --filter @ai-ui/core dev` - Start development
- `pnpm --filter @ai-ui/core build` - Build package
- `pnpm --filter @ai-ui/core test` - Run tests
- `pnpm --filter @ai-ui/core storybook` - Run Storybook

#### Docs Package
- `pnpm --filter @bolt-ui/docs dev` - Start development
- `pnpm --filter @bolt-ui/docs build` - Build documentation
- `pnpm --filter @bolt-ui/docs preview` - Preview built documentation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Vue.js](https://vuejs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Documentation powered by [VitePress](https://vitepress.dev/)
- Component development with [Storybook](https://storybook.js.org/)
