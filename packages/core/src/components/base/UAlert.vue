<script setup lang="ts">
import { computed } from 'vue'
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

const props = withDefaults(defineProps<{
  /**
   * The variant/type of the alert
   */
  variant?: 'success' | 'warning' | 'info' | 'error'
  /**
   * The title of the alert
   */
  title?: string
  /**
   * Whether the alert can be dismissed
   */
  dismissible?: boolean
  /**
   * The visibility state of the alert
   */
  modelValue?: boolean
  /**
   * Custom icon component
   */
  icon?: any
}>(), {
  variant: 'info',
  dismissible: false,
  modelValue: true
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'dismiss': []
}>()

const handleDismiss = () => {
  emit('update:modelValue', false)
  emit('dismiss')
}

const defaultIcons = {
  success: CheckCircleIcon,
  warning: ExclamationTriangleIcon,
  info: InformationCircleIcon,
  error: XCircleIcon
}

const variantClasses = computed(() => ({
  success: 'bg-success-light border-success text-success-foreground',
  warning: 'bg-warning-light border-warning text-warning-foreground',
  info: 'bg-info-light border-info text-info-foreground',
  error: 'bg-error-light border-error text-error-foreground'
})[props.variant])

const iconClasses = computed(() => ({
  success: 'text-success',
  warning: 'text-warning',
  info: 'text-info',
  error: 'text-error'
})[props.variant])
</script>

<template>
  <div
    v-if="modelValue"
    :class="[
      'relative w-full rounded-lg border p-4',
      variantClasses
    ]"
    role="alert"
  >
    <div class="flex gap-3">
      <!-- Icon -->
      <div v-if="icon || defaultIcons[variant]" class="flex-shrink-0">
        <component 
          :is="icon || defaultIcons[variant]"
          class="h-5 w-5"
          :class="iconClasses"
          aria-hidden="true"
        />
      </div>

      <!-- Content -->
      <div class="flex-1">
        <h3 
          v-if="title"
          class="font-medium leading-6"
        >
          {{ title }}
        </h3>
        <div 
          :class="[
            'text-sm',
            title && 'mt-1'
          ]"
        >
          <slot />
        </div>
      </div>

      <!-- Dismiss Button -->
      <div v-if="dismissible" class="flex-shrink-0">
        <button
          type="button"
          class="inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
          :class="[
            `focus:ring-${variant}`,
            `hover:bg-${variant}/10`
          ]"
          @click="handleDismiss"
        >
          <span class="sr-only">Dismiss</span>
          <XMarkIcon class="h-5 w-5" :class="iconClasses" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
</template>