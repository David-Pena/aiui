<script setup lang="ts">
import { ref, computed } from 'vue'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'

const props = withDefaults(defineProps<{
  type?: string
  placeholder?: string
  label?: string
  disabled?: boolean
  error?: string
  modelValue?: string | number
  icon?: string
  iconPosition?: 'left' | 'right'
  variant?: 'default' | 'filled' | 'underlined' | 'floating'
}>(), {
  type: 'text',
  disabled: false,
  iconPosition: 'left',
  variant: 'default'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const showPassword = ref(false)
const isPasswordType = computed(() => props.type === 'password')
const inputType = computed(() => isPasswordType.value && showPassword.value ? 'text' : props.type)

const togglePassword = (e: Event) => {
  e.preventDefault()
  showPassword.value = !showPassword.value
}

const variantClasses = computed(() => ({
  'default': 'border border-input bg-background focus-visible:border-primary focus-visible:ring-1',
  'filled': 'border-0 bg-secondary/50 focus-visible:bg-secondary/70 focus-visible:ring-1',
  'underlined': 'border-0 border-b border-input bg-transparent rounded-none focus-visible:border-b-1 focus-visible:border-primary focus-visible:ring-0',
  'floating': 'border border-input bg-background focus-visible:border-primary focus-visible:ring-1 placeholder:text-transparent'
}))

const paddingClass = computed(() => {
  if (isPasswordType.value) return 'pr-10'
  if (props.icon) {
    return props.iconPosition === 'left' ? 'pl-10' : 'pr-10'
  }
  return props.variant === 'floating' ? 'pt-4' : ''
})

const labelClasses = computed(() => [
  'absolute text-sm transition-all duration-200',
  props.variant === 'floating' 
    ? [
        'left-3 pointer-events-none',
        props.modelValue || props.type === 'date'
          ? '-translate-y-2 scale-75 text-primary'
          : 'translate-y-2 text-muted-foreground'
      ]
    : 'left-0 -top-6 text-foreground'
])

const baseClasses = computed(() => [
  'flex h-10 w-full px-3 py-2 text-sm ring-offset-background transition-all duration-200',
  'file:border-0 file:bg-transparent file:text-sm file:font-medium',
  'placeholder:text-muted-foreground',
  'focus-visible:outline-none focus-visible:ring-primary/20',
  'disabled:cursor-not-allowed disabled:opacity-50',
  props.variant !== 'underlined' ? 'rounded-md' : '',
  variantClasses.value[props.variant],
  props.error ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20' : '',
  paddingClass.value
])
</script>

<template>
  <div class="space-y-1 relative">
    <!-- Label -->
    <label 
      v-if="label"
      :class="labelClasses"
    >
      {{ label }}
    </label>

    <!-- Left Icon -->
    <div 
      v-if="icon && iconPosition === 'left'" 
      class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500"
    >
      <component :is="icon" class="h-5 w-5" />
    </div>

    <input
      :type="inputType"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="baseClasses"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >

    <!-- Right Icon -->
    <div 
      v-if="icon && iconPosition === 'right'" 
      class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500"
    >
      <component :is="icon" class="h-5 w-5" />
    </div>

    <!-- Password Toggle -->
    <button
      v-if="isPasswordType"
      type="button"
      class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
      @click="togglePassword"
      @mousedown.prevent
    >
      <EyeSlashIcon v-if="showPassword" class="h-5 w-5" />
      <EyeIcon v-else class="h-5 w-5" />
    </button>

    <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
  </div>
</template>