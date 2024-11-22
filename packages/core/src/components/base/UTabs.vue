<script setup lang="ts">
import { ref, computed } from 'vue'

export interface Tab {
  id: string
  label: string
  icon?: any
  disabled?: boolean
}

const props = withDefaults(defineProps<{
  /**
   * Array of tab items
   */
  tabs: Tab[]
  /**
   * Currently selected tab id
   */
  modelValue?: string
  /**
   * Visual variant of the tabs
   */
  variant?: 'default' | 'boxed' | 'rounded' | 'underlined' | 'pills'
  /**
   * Size of the tabs
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * Alignment of the tabs
   */
  align?: 'start' | 'center' | 'end'
  /**
   * Whether tabs should take full width
   */
  fullWidth?: boolean
  /**
   * Whether to show icons only (no labels)
   */
  iconsOnly?: boolean
  /**
   * Whether to show a divider line
   */
  divider?: boolean
}>(), {
  modelValue: '',
  variant: 'default',
  size: 'md',
  align: 'start',
  fullWidth: false,
  iconsOnly: false,
  divider: true
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'change': [tabId: string]
}>()

const activeTab = computed({
  get: () => props.modelValue || props.tabs[0]?.id || '',
  set: (value: string) => {
    emit('update:modelValue', value)
    emit('change', value)
  }
})

const containerClasses = computed(() => [
  'flex',
  {
    'justify-start': props.align === 'start',
    'justify-center': props.align === 'center',
    'justify-end': props.align === 'end',
    'w-full': props.fullWidth,
    'border-b border-border': props.divider && props.variant !== 'boxed'
  }
])

const listClasses = computed(() => [
  'flex relative',
  {
    'w-full': props.fullWidth,
    'gap-1': props.variant === 'pills',
    'rounded-lg bg-muted p-1': props.variant === 'pills',
    'space-x-2': props.variant !== 'pills' && !props.fullWidth
  }
])

const tabClasses = computed(() => [
  'inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    // Sizes
    'text-sm': props.size === 'sm',
    'text-base': props.size === 'md',
    'text-lg': props.size === 'lg',
    
    // Padding based on size and icons
    'px-2.5 py-1.5': props.size === 'sm' && !props.iconsOnly,
    'px-4 py-2': props.size === 'md' && !props.iconsOnly,
    'px-6 py-3': props.size === 'lg' && !props.iconsOnly,
    'p-2': props.size === 'sm' && props.iconsOnly,
    'p-3': props.size === 'md' && props.iconsOnly,
    'p-4': props.size === 'lg' && props.iconsOnly,

    // Full width
    'flex-1': props.fullWidth,

    // Variants
    'rounded-md': props.variant === 'rounded',
    'rounded-lg': props.variant === 'pills',
    'rounded-none': props.variant === 'underlined',
    'rounded-t-lg': props.variant === 'boxed'
  }
])

const activeTabClasses = computed(() => ({
  'default': 'text-primary hover:text-primary/80',
  'boxed': 'bg-background text-foreground shadow-sm',
  'rounded': 'bg-primary text-primary-foreground',
  'underlined': 'text-foreground border-b-2 border-primary',
  'pills': 'bg-background text-foreground shadow-sm'
})[props.variant])

const inactiveTabClasses = computed(() => ({
  'default': 'text-muted-foreground hover:text-foreground',
  'boxed': 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground',
  'rounded': 'hover:bg-primary/10 hover:text-foreground',
  'underlined': 'text-muted-foreground hover:text-foreground hover:border-b-2 hover:border-muted',
  'pills': 'text-muted-foreground hover:text-foreground'
})[props.variant])

const iconClasses = computed(() => ({
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6'
})[props.size])
</script>

<template>
  <div :class="containerClasses">
    <div :class="listClasses" role="tablist">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        role="tab"
        :aria-selected="activeTab === tab.id"
        :aria-controls="`tabpanel-${tab.id}`"
        :disabled="tab.disabled"
        :class="[
          tabClasses,
          activeTab === tab.id ? activeTabClasses : inactiveTabClasses
        ]"
        @click="activeTab = tab.id"
      >
        <component
          v-if="tab.icon"
          :is="tab.icon"
          :class="[
            iconClasses,
            !iconsOnly && 'mr-2'
          ]"
          aria-hidden="true"
        />
        <span v-if="!iconsOnly">{{ tab.label }}</span>
      </button>
    </div>
  </div>

  <!-- Tab Panels -->
  <div class="mt-2">
    <div
      v-for="tab in tabs"
      :key="tab.id"
      role="tabpanel"
      :id="`tabpanel-${tab.id}`"
      :aria-labelledby="tab.id"
      :class="{ 'hidden': activeTab !== tab.id }"
    >
      <slot :name="tab.id" :tab="tab">
        <slot name="default" :tab="tab" />
      </slot>
    </div>
  </div>
</template>