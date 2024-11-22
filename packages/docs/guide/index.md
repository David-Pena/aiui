# Getting Started

Bolt UI is a Vue 3 component library designed to help you build beautiful, accessible, and responsive web applications quickly and efficiently.

## Prerequisites

- Node.js 16 or higher
- Vue 3
- TypeScript (recommended)
- Tailwind CSS

## Installation

1. Install the package using your preferred package manager:

```bash
npm install @ai-ui/core
```

2. Import the styles in your main entry file:

```ts
// main.ts or main.js
import '@ai-ui/core/style.css'
```

3. Start using components:

```vue
<script setup>
import { UButton, UInput } from '@ai-ui/core'
</script>

<template>
  <div>
    <UInput v-model="name" placeholder="Enter your name" />
    <UButton variant="primary">Submit</UButton>
  </div>
</template>
```

## TypeScript Support

Bolt UI is written in TypeScript and provides full type definitions out of the box.