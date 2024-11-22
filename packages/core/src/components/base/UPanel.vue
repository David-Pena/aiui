<script setup lang="ts">
import { computed } from 'vue'
import { ChevronUpIcon } from '@heroicons/vue/24/outline'

export interface PanelTab {
  id: string
  label: string
  active?: boolean
}

export interface PanelBlock {
  id: string
  label: string
  icon?: any
  type?: 'link' | 'checkbox' | 'button' | 'custom'
  checked?: boolean
  active?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<{
  /**
   * The title of the panel
   */
  title?: string
  /**
   * The description text below the title
   */
  description?: string
  /**
   * Whether the panel is collapsible
   */
  collapsible?: boolean
  /**
   * Whether the panel is collapsed (only works with collapsible)
   */
  modelValue?: boolean
  /**
   * The visual variant of the panel
   */
  variant?: 'default' | 'bordered' | 'ghost'
  /**
   * The padding size of the panel
   */
  padding?: 'none' | 'sm' | 'md' | 'lg'
  /**
   * Whether to show a divider between header and content
   */
  divider?: boolean
  /**
   * Array of tabs for the panel
   */
  tabs?: PanelTab[]
  /**
   * Array of blocks for the panel
   */
  blocks?: PanelBlock[]
  /**
   * Whether to show the panel blocks as links
   */
  asLinks?: boolean
}>(), {
  collapsible: false,
  modelValue: true,
  variant: 'default',
  padding: 'md',
  divider: false,
  asLinks: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'tab-click': [tab: PanelTab]
  'block-click': [block: PanelBlock]
  'checkbox-change': [block: PanelBlock, checked: boolean]
}>()

const toggle = () => {
  if (props.collapsible) {
    emit('update:modelValue', !props.modelValue)
  }
}

const handleTabClick = (tab: PanelTab) => {
  emit('tab-click', tab)
}

const handleBlockClick = (block: PanelBlock) => {
  if (!block.disabled) {
    emit('block-click', block)
  }
}

const handleCheckboxChange = (block: PanelBlock, event: Event) => {
  const checked = (event.target as HTMLInputElement).checked
  emit('checkbox-change', block, checked)
}

const containerClasses = computed(() => [
  'rounded-lg overflow-hidden',
  {
    'bg-card text-card-foreground shadow-sm': props.variant === 'default',
    'border border-border': props.variant === 'bordered',
    'bg-transparent': props.variant === 'ghost'
  }
])

const headerClasses = computed(() => [
  'flex items-center justify-between',
  {
    'cursor-pointer select-none': props.collapsible,
    'p-3': props.padding === 'sm',
    'p-4': props.padding === 'md',
    'p-6': props.padding === 'lg',
    'p-0': props.padding === 'none'
  }
])

const contentClasses = computed(() => [
  {
    'p-3': props.padding === 'sm',
    'p-4': props.padding === 'md',
    'p-6': props.padding === 'lg',
    'p-0': props.padding === 'none',
    'border-t': props.divider && props.variant !== 'ghost'
  }
])

const blockClasses = computed(() => [
  'flex items-center px-4 py-3 hover:bg-accent/50 transition-colors',
  'border-b border-border last:border-b-0',
  {
    'cursor-pointer': !props.asLinks,
    'text-primary hover:text-primary-foreground': props.asLinks
  }
])
</script>

<template>
  <div :class="containerClasses">
    <!-- Panel Header -->
    <div 
      v-if="title || description || $slots.header"
      :class="[headerClasses, 'border-b border-border']"
      @click="toggle"
    >
      <div class="space-y-1">
        <slot name="header">
          <h3 v-if="title" class="font-medium">
            {{ title }}
          </h3>
          <p 
            v-if="description"
            class="text-sm text-muted-foreground"
          >
            {{ description }}
          </p>
        </slot>
      </div>
      
      <ChevronUpIcon
        v-if="collapsible"
        class="h-5 w-5 transform transition-transform duration-200"
        :class="{ 'rotate-180': !modelValue }"
        aria-hidden="true"
      />
    </div>

    <!-- Panel Tabs -->
    <div 
      v-if="tabs?.length"
      class="flex border-b border-border"
    >
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="px-4 py-2 -mb-px text-sm font-medium transition-colors"
        :class="[
          tab.active 
            ? 'border-b-2 border-primary text-primary-foreground' 
            : 'text-muted-foreground hover:text-foreground'
        ]"
        @click="handleTabClick(tab)"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Panel Content -->
    <div v-show="!collapsible || modelValue">
      <!-- Default Content Slot -->
      <div
        v-if="$slots.default"
        :class="contentClasses"
      >
        <slot />
      </div>

      <!-- Panel Blocks -->
      <template v-if="blocks?.length">
        <template v-for="block in blocks" :key="block.id">
          <!-- Custom Block -->
          <template v-if="block.type === 'custom'">
            <slot :name="`block-${block.id}`">
              <div :class="blockClasses">{{ block.label }}</div>
            </slot>
          </template>

          <!-- Regular Block -->
          <component
            v-else
            :is="asLinks ? 'a' : 'div'"
            :class="[
              blockClasses,
              block.active && 'bg-accent',
              block.disabled && 'opacity-50 cursor-not-allowed'
            ]"
            :href="asLinks ? '#' : undefined"
            @click="handleBlockClick(block)"
          >
            <!-- Checkbox -->
            <template v-if="block.type === 'checkbox'">
              <label class="flex items-center space-x-2 cursor-pointer w-full">
                <input
                  type="checkbox"
                  :checked="block.checked"
                  :disabled="block.disabled"
                  class="rounded border-input"
                  @change="e => handleCheckboxChange(block, e)"
                  @click.stop
                >
                <span>{{ block.label }}</span>
              </label>
            </template>

            <!-- Icon + Label -->
            <template v-else>
              <component 
                v-if="block.icon"
                :is="block.icon"
                class="h-5 w-5 mr-3 text-muted-foreground"
              />
              {{ block.label }}
            </template>
          </component>
        </template>
      </template>
    </div>
  </div>
</template>