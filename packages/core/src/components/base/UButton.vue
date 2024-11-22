<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit'
  icon?: any
  iconPosition?: 'left' | 'right'
}>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  type: 'button',
  iconPosition: 'left'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const baseClasses = computed(() => [
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  'disabled:pointer-events-none disabled:opacity-50',
  {
    'bg-primary text-primary-foreground hover:bg-primary/90': props.variant === 'primary',
    'bg-secondary text-secondary-foreground hover:bg-secondary/80': props.variant === 'secondary',
    'border border-input bg-background hover:bg-accent hover:text-accent-foreground': props.variant === 'outline',
    'hover:bg-accent hover:text-accent-foreground': props.variant === 'ghost',
    'h-9 px-3 text-sm gap-1.5': props.size === 'sm',
    'h-10 px-4 py-2 gap-2': props.size === 'md',
    'h-11 px-8 text-lg gap-2.5': props.size === 'lg'
  }
])

const iconSizeClasses = computed(() => ({
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6'
})[props.size])

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="baseClasses"
    @click="handleClick"
  >
    <span v-if="loading" class="mr-2">
      <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
      </svg>
    </span>
    <component 
      v-if="icon && iconPosition === 'left' && !loading" 
      :is="icon"
      :class="iconSizeClasses"
    />
    <slot />
    <component 
      v-if="icon && iconPosition === 'right' && !loading" 
      :is="icon"
      :class="iconSizeClasses"
    />
  </button>
</template>