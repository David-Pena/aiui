<script setup lang="ts">
import { ref, computed } from 'vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

export interface NavItem {
  label: string
  to?: string
  icon?: any
  active?: boolean
}

const props = withDefaults(defineProps<{
  brand?: string
  brandIcon?: any
  items?: NavItem[]
  variant?: 'default' | 'bordered' | 'colored'
  layout?: 'simple' | 'centered' | 'split'
  sticky?: boolean
  transparent?: boolean
  size?: 'sm' | 'md' | 'lg'
}>(), {
  variant: 'default',
  layout: 'simple',
  sticky: false,
  transparent: false,
  size: 'md'
})

const emit = defineEmits<{
  navigate: [item: NavItem]
}>()

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const handleClick = (item: NavItem) => {
  if (item.to) {
    emit('navigate', item)
  }
}

const containerClasses = computed(() => [
  'w-full',
  props.sticky && 'sticky top-0 z-50',
  props.variant === 'default' && 'bg-background',
  props.variant === 'bordered' && 'bg-background border-b',
  props.variant === 'colored' && 'bg-primary text-primary-foreground',
  props.transparent && 'bg-transparent'
])

const sizeClasses = computed(() => ({
  sm: 'h-12',
  md: 'h-16',
  lg: 'h-20'
})[props.size])

const layoutClasses = computed(() => ({
  simple: 'justify-between',
  centered: 'justify-center',
  split: 'justify-between'
})[props.layout])

const navItemClasses = computed(() => [
  'px-4 py-2 rounded-md transition-colors duration-200',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  props.variant === 'colored' 
    ? 'hover:bg-primary-foreground/10 focus-visible:bg-primary-foreground/10'
    : 'hover:bg-accent hover:text-accent-foreground'
])
</script>

<template>
  <div :class="containerClasses">
    <div 
      class="mx-auto px-4 sm:px-6 lg:px-8"
      :class="[sizeClasses, 'flex items-center']"
    >
      <!-- Mobile menu button -->
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-md p-2 lg:hidden"
        :class="variant === 'colored' ? 'hover:bg-primary-foreground/10' : 'hover:bg-accent'"
        @click="toggleMenu"
      >
        <span class="sr-only">Open main menu</span>
        <Bars3Icon v-if="!isOpen" class="h-6 w-6" />
        <XMarkIcon v-else class="h-6 w-6" />
      </button>

      <!-- Brand -->
      <div 
        :class="[
          'flex items-center gap-2',
          layout === 'centered' ? 'absolute left-4' : 'flex-shrink-0'
        ]"
      >
        <component 
          v-if="brandIcon"
          :is="brandIcon"
          class="h-8 w-8"
          aria-hidden="true"
        />
        <span v-if="brand" class="text-lg font-semibold">{{ brand }}</span>
      </div>

      <!-- Desktop navigation -->
      <nav 
        :class="[
          'hidden lg:flex items-center gap-1',
          layout === 'centered' ? 'mx-auto' : 'ml-8'
        ]"
      >
        <button
          v-for="item in items"
          :key="item.label"
          :class="[
            navItemClasses,
            item.active && (
              variant === 'colored'
                ? 'bg-primary-foreground/10'
                : 'bg-accent text-accent-foreground'
            )
          ]"
          @click="handleClick(item)"
        >
          <span class="flex items-center gap-2">
            <component 
              v-if="item.icon"
              :is="item.icon"
              class="h-5 w-5"
              aria-hidden="true"
            />
            {{ item.label }}
          </span>
        </button>
      </nav>

      <!-- Actions slot -->
      <div 
        :class="[
          'hidden lg:flex items-center gap-4',
          layout === 'centered' ? 'absolute right-4' : 'ml-auto'
        ]"
      >
        <slot name="actions" />
      </div>
    </div>

    <!-- Mobile menu -->
    <div
      v-show="isOpen"
      class="lg:hidden"
      :class="[
        variant === 'default' && 'bg-background',
        variant === 'bordered' && 'bg-background border-b',
        variant === 'colored' && 'bg-primary'
      ]"
    >
      <div class="space-y-1 px-4 pb-4">
        <button
          v-for="item in items"
          :key="item.label"
          :class="[
            navItemClasses,
            'w-full text-left',
            item.active && (
              variant === 'colored'
                ? 'bg-primary-foreground/10'
                : 'bg-accent text-accent-foreground'
            )
          ]"
          @click="handleClick(item)"
        >
          <span class="flex items-center gap-2">
            <component 
              v-if="item.icon"
              :is="item.icon"
              class="h-5 w-5"
              aria-hidden="true"
            />
            {{ item.label }}
          </span>
        </button>
      </div>
      <div class="px-4 pb-4">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>