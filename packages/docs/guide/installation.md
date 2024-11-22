# Installation

## Package Managers

You can install AiUI using any of the following package managers:

### npm

```bash
npm install @ai-ui/core
```

### yarn

```bash
yarn add @ai-ui/core
```

### pnpm

```bash
pnpm add @ai-ui/core
```

## Setup

1. Import the styles in your main entry file:

```ts
// main.ts or main.js
import '@ai-ui/core/style.css'
```

2. Import and use components:

```vue
<script setup>
import { UButton } from '@ai-ui/core'
</script>

<template>
  <UButton variant="primary">
    Click me!
  </UButton>
</template>
```

## Configuration

### Tailwind CSS

If you're using Tailwind CSS, make sure to add Bolt UI's path to your content configuration:

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/@ai-ui/core/dist/**/*.{vue,js,ts,jsx,tsx}'
  ],
  // ... rest of your config
}
```

### TypeScript

AiUI includes TypeScript definitions out of the box. No additional configuration is needed.