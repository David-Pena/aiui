<script setup lang="ts">
import { ref, computed } from 'vue'

const props = withDefaults(defineProps<{
  variant?: 'default' | 'success' | 'warning' | 'danger'
  shape?: 'rounded' | 'curved' | 'outlined' | 'elevated'
  size?: 'sm' | 'md' | 'lg'
  dismissible?: boolean
  modelValue?: boolean
}>(), {
  variant: 'default',
  shape: 'rounded',
  size: 'md',
  dismissible: false,
  modelValue: true
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  dismiss: []
}>()

const isVisible = ref(props.modelValue)

const handleDismiss = () => {
  isVisible.value = false
  emit('update:modelValue', false)
  emit('dismiss')
}

const variantClasses = {
  default: 'bg-secondary text-secondary-foreground',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  danger: 'bg-red-100 text-red-800'
}

const shapeClasses = {
  rounded: 'rounded-full',
  curved: 'rounded-lg',
  outlined: 'rounded-full bg-transparent border',
  elevated: 'rounded-full shadow-md'
}

const outlinedVariantClasses = {
  default: 'border-secondary-foreground text-secondary-foreground',
  success: 'border-green-800 text-green-800',
  warning: 'border-yellow-800 text-yellow-800',
  danger: 'border-red-800 text-red-800'
}

const sizeClasses = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
  lg: 'text-base px-4 py-1.5'
}

const computedClasses = computed(() => [
  'inline-flex items-center font-medium transition-colors',
  shapeClasses[props.shape],
  sizeClasses[props.size],
  props.shape === 'outlined' ? outlinedVariantClasses[props.variant] : variantClasses[props.variant]
])
</script>

<template>
  <span
    v-if="isVisible"
    :class="computedClasses"
  >
    <slot />
    <button
      v-if="dismissible"
      type="button"
      class="ml-1 hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current rounded-full"
      @click="handleDismiss"
    >
      <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
      </svg>
    </button>
  </span>
</template>