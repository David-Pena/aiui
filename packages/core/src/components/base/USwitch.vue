<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  modelValue: boolean
  label?: string
  description?: string
  disabled?: boolean
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'info' | 'error'
  size?: 'sm' | 'md' | 'lg'
  icon?: any
  iconPosition?: 'left' | 'right'
}>(), {
  disabled: false,
  variant: 'primary',
  size: 'md',
  iconPosition: 'left'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean]
}>()

const toggle = () => {
  if (!props.disabled) {
    const newValue = !props.modelValue
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }
}

const baseClasses = computed(() => [
  'relative inline-flex shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  'disabled:cursor-not-allowed disabled:opacity-50',
  {
    'bg-primary': props.modelValue && props.variant === 'primary',
    'bg-success': props.modelValue && props.variant === 'success',
    'bg-warning': props.modelValue && props.variant === 'warning',
    'bg-info': props.modelValue && props.variant === 'info',
    'bg-error': props.modelValue && props.variant === 'error',
    'bg-muted': !props.modelValue || props.variant === 'default',
    'h-5 w-9': props.size === 'sm',
    'h-6 w-11': props.size === 'md',
    'h-7 w-14': props.size === 'lg'
  }
])

const thumbClasses = computed(() => [
  'pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform duration-200 ease-in-out',
  {
    'h-4 w-4': props.size === 'sm',
    'h-5 w-5': props.size === 'md',
    'h-6 w-6': props.size === 'lg',
    'translate-x-4': props.modelValue && props.size === 'sm',
    'translate-x-5': props.modelValue && props.size === 'md',
    'translate-x-7': props.modelValue && props.size === 'lg',
    'translate-x-0.5': !props.modelValue
  }
])

const iconSizeClasses = computed(() => ({
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6'
})[props.size])

const labelClasses = computed(() => [
  'text-foreground',
  {
    'text-sm': props.size === 'sm',
    'text-base': props.size === 'md',
    'text-lg': props.size === 'lg'
  }
])
</script>

<template>
  <label 
    class="inline-flex items-center gap-3"
    :class="{ 'cursor-pointer': !disabled, 'cursor-not-allowed opacity-50': disabled }"
  >
    <!-- Left Icon -->
    <component 
      v-if="icon && iconPosition === 'left'"
      :is="icon"
      :class="[iconSizeClasses, 'text-muted-foreground']"
    />

    <!-- Label -->
    <div v-if="label || description" class="grid gap-1.5">
      <p v-if="label" :class="labelClasses">{{ label }}</p>
      <p v-if="description" class="text-sm text-muted-foreground">{{ description }}</p>
    </div>

    <!-- Switch -->
    <button
      type="button"
      role="switch"
      :aria-checked="modelValue"
      :disabled="disabled"
      :class="baseClasses"
      @click="toggle"
    >
      <span
        aria-hidden="true"
        :class="thumbClasses"
      />
    </button>

    <!-- Right Icon -->
    <component 
      v-if="icon && iconPosition === 'right'"
      :is="icon"
      :class="[iconSizeClasses, 'text-muted-foreground']"
    />
  </label>
</template>