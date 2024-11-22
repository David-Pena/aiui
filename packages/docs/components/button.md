# Button

The Button component is used to trigger an action or event.

## Import

```vue
import { UButton } from '@ai-ui/core'
```

## Usage

### Basic Button

```vue
<template>
  <UButton>Default Button</UButton>
  <UButton variant="primary">Primary Button</UButton>
  <UButton variant="secondary">Secondary Button</UButton>
</template>
```

### Variants

```vue
<template>
  <UButton variant="primary">Primary</UButton>
  <UButton variant="secondary">Secondary</UButton>
  <UButton variant="outline">Outline</UButton>
  <UButton variant="ghost">Ghost</UButton>
</template>
```

### Sizes

```vue
<template>
  <UButton size="sm">Small</UButton>
  <UButton size="md">Medium</UButton>
  <UButton size="lg">Large</UButton>
</template>
```

### With Icons

```vue
<script setup>
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <UButton :icon="ArrowRightIcon">
    Continue
  </UButton>
</template>
```

## API

### Props

| Prop           | Type                                               | Default     | Description                       |
| -------------- | -------------------------------------------------- | ----------- | --------------------------------- |
| `variant`      | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | The visual style of the button    |
| `size`         | `'sm' \| 'md' \| 'lg'`                             | `'md'`      | The size of the button            |
| `disabled`     | `boolean`                                          | `false`     | Whether the button is disabled    |
| `loading`      | `boolean`                                          | `false`     | Whether to show a loading spinner |
| `type`         | `'button' \| 'submit'`                             | `'button'`  | The type of button                |
| `icon`         | `Component`                                        | -           | Icon component to display         |
| `iconPosition` | `'left' \| 'right'`                                | `'left'`    | Position of the icon              |

### Events

| Event   | Type         | Description                        |
| ------- | ------------ | ---------------------------------- |
| `click` | `MouseEvent` | Emitted when the button is clicked |

### Slots

| Slot      | Description               |
| --------- | ------------------------- |
| `default` | The content of the button |
