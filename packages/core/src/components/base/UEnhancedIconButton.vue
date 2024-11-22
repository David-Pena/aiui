<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFloating, autoUpdate, offset, flip, shift, arrow } from '@floating-ui/vue'
import { onClickOutside } from '@vueuse/core'

const props = withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit'
  icon: any
  label: string
  tooltip?: string
  tooltipPosition?: 'top' | 'right' | 'bottom' | 'left'
  popover?: boolean
  popoverPosition?: 'top' | 'right' | 'bottom' | 'left'
}>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  type: 'button',
  tooltipPosition: 'top',
  popoverPosition: 'bottom',
  popover: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// Base classes for the button
const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'

const variantClasses = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  ghost: 'hover:bg-accent hover:text-accent-foreground'
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12'
}

const iconSizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6'
}

// Tooltip functionality
const buttonRef = ref<HTMLElement | null>(null)
const tooltipRef = ref<HTMLElement | null>(null)
const tooltipArrowRef = ref<HTMLElement | null>(null)
const showTooltip = ref(false)

const {
  floatingStyles: tooltipStyles,
  middlewareData: tooltipMiddlewareData
} = useFloating(buttonRef, tooltipRef, {
  placement: props.tooltipPosition,
  middleware: [
    offset(8),
    flip(),
    shift(),
    arrow({ element: tooltipArrowRef })
  ],
  whileElementsMounted: autoUpdate
})

// Popover functionality
const popoverRef = ref<HTMLElement | null>(null)
const popoverArrowRef = ref<HTMLElement | null>(null)
const showPopover = ref(false)

const {
  floatingStyles: popoverStyles,
  middlewareData: popoverMiddlewareData
} = useFloating(buttonRef, popoverRef, {
  placement: props.popoverPosition,
  middleware: [
    offset(8),
    flip(),
    shift(),
    arrow({ element: popoverArrowRef })
  ],
  whileElementsMounted: autoUpdate
})

onClickOutside(popoverRef, () => {
  showPopover.value = false
})

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    if (props.popover) {
      showPopover.value = !showPopover.value
    }
    emit('click', event)
  }
}

// Computed arrow positions for tooltip and popover
const tooltipArrowStyle = computed(() => {
  const { arrow: arrowData } = tooltipMiddlewareData.value
  if (!arrowData) return {}
  
  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right'
  }[props.tooltipPosition] || 'top'

  return {
    left: arrowData.x != null ? `${arrowData.x}px` : '',
    top: arrowData.y != null ? `${arrowData.y}px` : '',
    [staticSide]: '-4px'
  }
})

const popoverArrowStyle = computed(() => {
  const { arrow: arrowData } = popoverMiddlewareData.value
  if (!arrowData) return {}
  
  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right'
  }[props.popoverPosition] || 'top'

  return {
    left: arrowData.x != null ? `${arrowData.x}px` : '',
    top: arrowData.y != null ? `${arrowData.y}px` : '',
    [staticSide]: '-4px'
  }
})
</script>

<template>
  <div class="relative inline-block">
    <button
      ref="buttonRef"
      :type="type"
      :disabled="disabled || loading"
      :class="[
        baseClasses,
        variantClasses[variant],
        sizeClasses[size]
      ]"
      :aria-label="label"
      @click="handleClick"
      @mouseenter="tooltip && (showTooltip = true)"
      @mouseleave="tooltip && (showTooltip = false)"
      @focus="tooltip && (showTooltip = true)"
      @blur="tooltip && (showTooltip = false)"
    >
      <span v-if="loading" class="flex items-center justify-center">
        <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
      </span>
      <component 
        v-else
        :is="icon"
        :class="iconSizeClasses[size]"
      />
    </button>

    <Teleport to="body">
      <!-- Tooltip -->
      <div
        v-if="tooltip && showTooltip"
        ref="tooltipRef"
        :style="[tooltipStyles, { zIndex: 9999 }]"
        class="fixed px-2 py-1 text-sm font-medium text-white bg-gray-900 rounded-md shadow-sm"
        role="tooltip"
      >
        {{ tooltip }}
        <div
          ref="tooltipArrowRef"
          class="tooltip-arrow"
          :style="tooltipArrowStyle"
        />
      </div>

      <!-- Popover -->
      <div
        v-if="popover && showPopover"
        ref="popoverRef"
        :style="[popoverStyles, { zIndex: 9999 }]"
        class="fixed min-w-[200px] p-4 bg-white rounded-md shadow-lg border border-gray-200"
        role="dialog"
      >
        <slot name="popover">
          <div class="text-sm">
            Default popover content
          </div>
        </slot>
        <div
          ref="popoverArrowRef"
          class="popover-arrow"
          :style="popoverArrowStyle"
        />
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.tooltip-arrow,
.popover-arrow {
  position: absolute;
  width: 8px;
  height: 8px;
  background: inherit;
  pointer-events: none;
}

.tooltip-arrow::before,
.popover-arrow::before {
  position: absolute;
  width: 8px;
  height: 8px;
  background: inherit;
  content: '';
  transform: rotate(45deg);
}

.tooltip-arrow::before {
  background: #111827;
}

.popover-arrow::before {
  border: 1px solid #e5e7eb;
  background: white;
}
</style>