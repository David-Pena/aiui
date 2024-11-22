<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { useMotion } from '@vueuse/motion'

export interface AccordionItem {
  id: string
  title: string
  content?: string
  icon?: any
  disabled?: boolean
}

const props = withDefaults(defineProps<{
  /**
   * Array of accordion items
   */
  items: AccordionItem[]
  /**
   * Whether multiple items can be expanded at once
   */
  multiple?: boolean
  /**
   * Visual variant of the accordion
   */
  variant?: 'default' | 'bordered' | 'ghost'
  /**
   * Size of the accordion items
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * Whether to show dividers between items
   */
  dividers?: boolean
  /**
   * Whether to show icons in the accordion items
   */
  showIcons?: boolean
  /**
   * Currently expanded item IDs
   */
  modelValue?: string[]
}>(), {
  multiple: false,
  variant: 'default',
  size: 'md',
  dividers: true,
  showIcons: true,
  modelValue: () => []
})

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
  'change': [itemId: string, isExpanded: boolean]
}>()

const expandedItems = ref<string[]>(props.modelValue)

const toggleItem = (itemId: string) => {
  const item = props.items.find(i => i.id === itemId)
  if (item?.disabled) return

  let newExpanded: string[]
  if (props.multiple) {
    newExpanded = expandedItems.value.includes(itemId)
      ? expandedItems.value.filter(id => id !== itemId)
      : [...expandedItems.value, itemId]
  } else {
    newExpanded = expandedItems.value.includes(itemId) ? [] : [itemId]
  }

  expandedItems.value = newExpanded
  emit('update:modelValue', newExpanded)
  emit('change', itemId, newExpanded.includes(itemId))
}

const containerClasses = computed(() => [
  'divide-y divide-border',
  {
    'border border-border rounded-lg': props.variant === 'bordered',
    'bg-card': props.variant === 'default',
    'bg-transparent': props.variant === 'ghost',
    'divide-y-0': !props.dividers
  }
])

const triggerClasses = computed(() => [
  'flex w-full items-center justify-between py-4 text-sm font-medium transition-all hover:underline',
  {
    'px-4': props.variant !== 'ghost',
    'h-12': props.size === 'sm',
    'h-14': props.size === 'md',
    'h-16': props.size === 'lg',
    'opacity-50 cursor-not-allowed hover:no-underline': false
  }
])

const contentClasses = computed(() => [
  'overflow-hidden',
  {
    'px-4': props.variant !== 'ghost',
    'pb-4': true
  }
])

// Animation setup for content
const setupContentMotion = (el: HTMLElement) => {
  const { motion } = useMotion(el, {
    initial: {
      height: '0px',
      opacity: 0
    },
    enter: {
      height: 'auto',
      opacity: 1,
      transition: {
        height: {
          duration: 300
        },
        opacity: {
          duration: 300,
          delay: 100
        }
      }
    },
    leave: {
      height: '0px',
      opacity: 0,
      transition: {
        height: {
          duration: 300
        },
        opacity: {
          duration: 200
        }
      }
    }
  })

  return motion
}
</script>

<template>
  <div :class="containerClasses">
    <div
      v-for="item in items"
      :key="item.id"
      class="relative"
    >
      <h3>
        <button
          type="button"
          :class="triggerClasses"
          :disabled="item.disabled"
          :aria-expanded="expandedItems.includes(item.id)"
          :aria-controls="`accordion-${item.id}`"
          @click="toggleItem(item.id)"
        >
          <div class="flex items-center gap-3">
            <component
              v-if="showIcons && item.icon"
              :is="item.icon"
              class="h-5 w-5"
              aria-hidden="true"
            />
            {{ item.title }}
          </div>
          <ChevronDownIcon
            class="h-5 w-5 transition-transform duration-200"
            :class="{ 'rotate-180': expandedItems.includes(item.id) }"
            aria-hidden="true"
          />
        </button>
      </h3>
      <div
        v-show="expandedItems.includes(item.id)"
        :id="`accordion-${item.id}`"
        :class="contentClasses"
        role="region"
        :aria-labelledby="`accordion-trigger-${item.id}`"
      >
        <slot :name="item.id" :item="item">
          <div class="text-sm text-muted-foreground">
            {{ item.content }}
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>