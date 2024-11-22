<script setup lang="ts">
import { ref, computed } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const props = withDefaults(defineProps<{
  variant?: 'default' | 'success' | 'warning' | 'info' | 'error'
  dismissible?: boolean
  modelValue?: boolean
  icon?: any
}>(), {
  variant: 'default',
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

const variantClasses = computed(() => ({
  default: 'bg-muted text-muted-foreground border-muted',
  success: 'bg-success-light text-success-foreground border-success',
  warning: 'bg-warning-light text-warning-foreground border-warning',
  info: 'bg-info-light text-info-foreground border-info',
  error: 'bg-error-light text-error-foreground border-error'
})[props.variant])
</script>

<template>
  <div
    v-if="isVisible"
    class="relative flex items-center gap-3 rounded-lg border p-4"
    :class="variantClasses"
    role="alert"
  >
    <!-- Icon slot -->
    <div v-if="icon || $slots.icon" class="flex-shrink-0">
      <slot name="icon">
        <component :is="icon" class="h-5 w-5" />
      </slot>
    </div>

    <!-- Content -->
    <div class="flex-1">
      <slot />
    </div>

    <!-- Dismiss button -->
    <button
      v-if="dismissible"
      type="button"
      class="flex-shrink-0 ml-auto -mr-1.5 -mt-1.5 p-1.5 rounded-full transition-opacity hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2"
      :class="`focus:ring-${variant === 'default' ? 'muted' : variant}`"
      @click="handleDismiss"
    >
      <span class="sr-only">Dismiss</span>
      <XMarkIcon class="h-4 w-4" />
    </button>
  </div>
</template>