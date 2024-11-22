<script setup lang="ts">
withDefaults(defineProps<{
  /**
   * The current progress value (0-100)
   */
  value: number
  /**
   * The maximum value
   */
  max?: number
  /**
   * The size of the progress bar
   */
  size?: 'tiny' | 'smaller' | 'small' | 'default'
  /**
   * The variant/color of the progress bar
   */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'info' | 'error'
  /**
   * Whether to show the progress value
   */
  showValue?: boolean
  /**
   * Whether to show indeterminate state
   */
  indeterminate?: boolean
}>(), {
  max: 100,
  size: 'default',
  variant: 'primary',
  showValue: false,
  indeterminate: false
})

const sizeClasses = {
  tiny: 'h-0.5',
  smaller: 'h-1',
  small: 'h-2',
  default: 'h-3'
}

const variantClasses = {
  default: 'bg-secondary',
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  info: 'bg-info',
  error: 'bg-error'
}

const backgroundClasses = {
  default: 'bg-secondary/20',
  primary: 'bg-primary/20',
  success: 'bg-success/20',
  warning: 'bg-warning/20',
  info: 'bg-info/20',
  error: 'bg-error/20'
}
</script>

<template>
  <div class="relative w-full">
    <div
      class="w-full overflow-hidden rounded-full"
      :class="[sizeClasses[size], backgroundClasses[variant]]"
      role="progressbar"
      :aria-valuemin="0"
      :aria-valuemax="max"
      :aria-valuenow="!indeterminate ? value : undefined"
      :aria-valuetext="!indeterminate ? `${value}%` : undefined"
    >
      <div
        :class="[
          'h-full transition-all duration-300 ease-in-out',
          variantClasses[variant],
          { 'animate-indeterminate': indeterminate }
        ]"
        :style="!indeterminate ? { width: `${(value / max) * 100}%` } : undefined"
      />
    </div>
    
    <span 
      v-if="showValue && !indeterminate" 
      class="absolute right-0 -top-6 text-sm"
      :class="`text-${variant}-foreground`"
    >
      {{ Math.round((value / max) * 100) }}%
    </span>
  </div>
</template>

<style scoped>
@keyframes indeterminate {
  0% {
    transform: translateX(-100%);
    width: 100%;
  }
  100% {
    transform: translateX(100%);
    width: 100%;
  }
}

.animate-indeterminate {
  animation: indeterminate 1.5s infinite;
}
</style>