<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFloating, autoUpdate, offset, flip, shift } from '@floating-ui/vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { onClickOutside } from '@vueuse/core'

export interface DropdownOption {
  id: string
  label: string
  icon?: any
  disabled?: boolean
  divider?: boolean
}

const props = withDefaults(defineProps<{
  /**
   * Label for the dropdown trigger
   */
  label?: string
  /**
   * Icon for the trigger button
   */
  icon?: any
  /**
   * Visual variant of the trigger button
   */
  variant?: 'default' | 'outline' | 'ghost' | 'field' | 'transparent'
  /**
   * Size of the trigger button
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * Whether to show the dropdown on hover
   */
  hover?: boolean
  /**
   * Alignment of the dropdown menu
   */
  align?: 'start' | 'center' | 'end'
  /**
   * Whether to show the dropdown above the trigger
   */
  up?: boolean
  /**
   * Array of dropdown options
   */
  options?: DropdownOption[]
  /**
   * Currently selected option id
   */
  modelValue?: string
  /**
   * Whether to show icons in the menu items
   */
  showIcons?: boolean
  /**
   * Whether the dropdown is disabled
   */
  disabled?: boolean
}>(), {
  variant: 'default',
  size: 'md',
  align: 'start',
  up: false,
  showIcons: true,
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'select': [option: DropdownOption]
}>()

// State
const isOpen = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
let closeTimeout: NodeJS.Timeout | null = null

// Floating UI setup
const {
  floatingStyles,
  placement
} = useFloating(triggerRef, contentRef, {
  placement: computed(() => `${props.up ? 'top' : 'bottom'}-${props.align}` as const),
  middleware: [
    offset(4),
    flip(),
    shift({ padding: 8 })
  ],
  whileElementsMounted: autoUpdate
})

// Click outside handling
onClickOutside(contentRef, () => {
  if (!props.hover) {
    isOpen.value = false
  }
})

// Methods
const toggle = () => {
  if (!props.disabled && !props.hover) {
    isOpen.value = !isOpen.value
  }
}

const handleSelect = (option: DropdownOption) => {
  if (!option.disabled) {
    emit('update:modelValue', option.id)
    emit('select', option)
    if (!props.hover) {
      isOpen.value = false
    }
  }
}

// Computed
const triggerClasses = computed(() => [
  'inline-flex items-center justify-center gap-2 font-medium transition-colors',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  'disabled:pointer-events-none disabled:opacity-50',
  {
    'rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground': props.variant === 'outline',
    'hover:bg-accent hover:text-accent-foreground': props.variant === 'ghost',
    'bg-primary text-primary-foreground hover:bg-primary/90': props.variant === 'default',
    'rounded-md border border-input bg-background': props.variant === 'field',
    'rounded-md border border-input bg-transparent': props.variant === 'transparent',
    'h-9 px-3': props.size === 'sm',
    'h-10 px-4': props.size === 'md',
    'h-11 px-5': props.size === 'lg',
    'cursor-default': props.disabled,
    'justify-between w-full': props.variant === 'field' || props.variant === 'transparent'
  }
])

const iconClasses = computed(() => ({
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6'
})[props.size])

// Event handlers
const handleMouseEnter = () => {
  if (props.hover && !props.disabled) {
    if (closeTimeout) {
      clearTimeout(closeTimeout)
      closeTimeout = null
    }
    isOpen.value = true
  }
}

const handleMouseLeave = () => {
  if (props.hover) {
    closeTimeout = setTimeout(() => {
      isOpen.value = false
    }, 150) // Small delay to allow moving to the menu
  }
}

const handleMenuMouseEnter = () => {
  if (props.hover && closeTimeout) {
    clearTimeout(closeTimeout)
    closeTimeout = null
  }
}

const handleMenuMouseLeave = () => {
  if (props.hover) {
    isOpen.value = false
  }
}
</script>

<template>
  <div 
    class="relative inline-block"
    :class="{ 'w-full': variant === 'field' || variant === 'transparent' }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Trigger Button -->
    <button
      ref="triggerRef"
      type="button"
      :class="triggerClasses"
      :disabled="disabled"
      @click="toggle"
    >
      <div class="flex items-center gap-2">
        <component 
          v-if="icon"
          :is="icon"
          :class="iconClasses"
          aria-hidden="true"
        />
        <span v-if="label">{{ label }}</span>
      </div>
      <ChevronDownIcon
        v-if="!hover"
        :class="[
          iconClasses,
          'transition-transform duration-200',
          isOpen && 'rotate-180'
        ]"
      />
    </button>

    <!-- Dropdown Content (Teleported to body) -->
    <Teleport to="body">
      <div
        v-show="isOpen"
        ref="contentRef"
        :style="[floatingStyles, { zIndex: 50 }]"
        class="min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
        role="menu"
        @mouseenter="handleMenuMouseEnter"
        @mouseleave="handleMenuMouseLeave"
      >
        <!-- Default Slot -->
        <slot>
          <!-- Options List -->
          <template v-if="options?.length">
            <template v-for="(option, index) in options" :key="option.id">
              <!-- Divider -->
              <div
                v-if="option.divider"
                class="my-1 h-px bg-muted"
                role="separator"
              />

              <!-- Option -->
              <button
                v-else
                type="button"
                role="menuitem"
                class="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
                :class="{ 'bg-accent text-accent-foreground': modelValue === option.id }"
                :disabled="option.disabled"
                @click="handleSelect(option)"
              >
                <component
                  v-if="showIcons && option.icon"
                  :is="option.icon"
                  class="mr-2 h-4 w-4"
                  aria-hidden="true"
                />
                {{ option.label }}
              </button>
            </template>
          </template>
        </slot>
      </div>
    </Teleport>
  </div>
</template>