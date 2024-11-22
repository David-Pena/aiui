<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFloating, autoUpdate, offset, flip, shift } from '@floating-ui/vue'
import { onClickOutside } from '@vueuse/core'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/vue/24/outline'
import Fuse from 'fuse.js'

export interface ComboboxOption {
  value: string
  label: string
  description?: string
  icon?: any
  disabled?: boolean
}

const props = withDefaults(defineProps<{
  options: ComboboxOption[]
  modelValue?: string
  placeholder?: string
  label?: string
  disabled?: boolean
  error?: string
  showIcons?: boolean
  searchable?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'filled' | 'underlined'
}>(), {
  disabled: false,
  showIcons: true,
  searchable: true,
  size: 'md',
  variant: 'default'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'change': [option: ComboboxOption]
}>()

// State
const isOpen = ref(false)
const search = ref('')
const triggerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)

// Floating UI setup
const {
  floatingStyles
} = useFloating(triggerRef, contentRef, {
  placement: 'bottom-start',
  middleware: [
    offset(4),
    flip(),
    shift({ padding: 8 })
  ],
  whileElementsMounted: autoUpdate
})

// Click outside handling
onClickOutside(contentRef, () => {
  isOpen.value = false
})

// Computed
const selectedOption = computed(() => 
  props.options.find(option => option.value === props.modelValue)
)

const filteredOptions = computed(() => {
  if (!search.value) return props.options

  const fuse = new Fuse(props.options, {
    keys: ['label', 'description'],
    threshold: 0.3
  })

  return fuse.search(search.value).map(result => result.item)
})

const triggerClasses = computed(() => [
  'flex w-full items-center justify-between rounded-md ring-offset-background',
  'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  'disabled:cursor-not-allowed disabled:opacity-50',
  {
    'border border-input bg-background': props.variant === 'default',
    'border-0 bg-secondary/50': props.variant === 'filled',
    'border-0 border-b border-input bg-transparent rounded-none': props.variant === 'underlined',
    'h-9 px-3': props.size === 'sm',
    'h-10 px-4': props.size === 'md',
    'h-11 px-5': props.size === 'lg',
    'border-red-500': props.error
  }
])

const optionClasses = computed(() => [
  'relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5',
  'hover:bg-accent hover:text-accent-foreground',
  'focus:bg-accent focus:text-accent-foreground',
  'disabled:pointer-events-none disabled:opacity-50',
  {
    'text-sm': props.size === 'sm',
    'text-base': props.size === 'md',
    'text-lg': props.size === 'lg'
  }
])

// Methods
const handleSelect = (option: ComboboxOption) => {
  if (!option.disabled) {
    emit('update:modelValue', option.value)
    emit('change', option)
    isOpen.value = false
    search.value = ''
  }
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    isOpen.value = !isOpen.value
  } else if (e.key === 'Escape') {
    isOpen.value = false
  }
}
</script>

<template>
  <div class="relative">
    <!-- Label -->
    <label 
      v-if="label"
      class="mb-2 block text-sm font-medium text-foreground"
    >
      {{ label }}
    </label>

    <!-- Trigger Button -->
    <button
      ref="triggerRef"
      type="button"
      role="combobox"
      :aria-expanded="isOpen"
      :aria-controls="isOpen ? 'combobox-content' : undefined"
      :disabled="disabled"
      :class="triggerClasses"
      @click="isOpen = !isOpen"
      @keydown="handleKeyDown"
    >
      <div class="flex items-center gap-2">
        <component
          v-if="showIcons && selectedOption?.icon"
          :is="selectedOption.icon"
          class="h-4 w-4"
          aria-hidden="true"
        />
        <span v-if="selectedOption" class="text-sm">
          {{ selectedOption.label }}
        </span>
        <span v-else class="text-sm text-muted-foreground">
          {{ placeholder }}
        </span>
      </div>
      <ChevronUpDownIcon
        class="h-4 w-4 opacity-50"
        aria-hidden="true"
      />
    </button>

    <!-- Error Message -->
    <p 
      v-if="error"
      class="mt-1 text-sm text-red-500"
    >
      {{ error }}
    </p>

    <!-- Dropdown Content -->
    <div
      v-show="isOpen"
      ref="contentRef"
      id="combobox-content"
      :style="[floatingStyles, { zIndex: 50 }]"
      class="absolute min-w-[8rem] w-full overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
    >
      <!-- Search Input -->
      <input
        v-if="searchable"
        v-model="search"
        type="text"
        class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        placeholder="Search..."
        @click.stop
      >

      <!-- Options List -->
      <div class="mt-1 max-h-[300px] overflow-y-auto">
        <template v-for="option in filteredOptions" :key="option.value">
          <button
            type="button"
            :class="[
              optionClasses,
              modelValue === option.value && 'bg-accent text-accent-foreground'
            ]"
            :disabled="option.disabled"
            @click="handleSelect(option)"
          >
            <div class="flex items-center w-full">
              <div class="flex items-center gap-2 flex-1">
                <component
                  v-if="showIcons && option.icon"
                  :is="option.icon"
                  class="h-4 w-4 flex-shrink-0"
                  aria-hidden="true"
                />
                <div class="flex flex-col">
                  <span>{{ option.label }}</span>
                  <span 
                    v-if="option.description"
                    class="text-xs text-muted-foreground"
                  >
                    {{ option.description }}
                  </span>
                </div>
              </div>
              <CheckIcon
                v-if="modelValue === option.value"
                class="h-4 w-4 flex-shrink-0"
                aria-hidden="true"
              />
            </div>
          </button>
        </template>
      </div>
    </div>
  </div>
</template>