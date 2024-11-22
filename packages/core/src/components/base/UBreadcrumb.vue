<script setup lang="ts">
import { computed } from 'vue'
import { ChevronRightIcon, HomeIcon } from '@heroicons/vue/24/outline'

export interface BreadcrumbItem {
  label: string
  to?: string
  icon?: any
}

const props = withDefaults(defineProps<{
  items: BreadcrumbItem[]
  separator?: string | any
  showHome?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'muted'
}>(), {
  separator: ChevronRightIcon,
  showHome: false,
  size: 'md',
  variant: 'default'
})

const emit = defineEmits<{
  navigate: [item: BreadcrumbItem]
}>()

const handleClick = (item: BreadcrumbItem) => {
  if (item.to) {
    emit('navigate', item)
  }
}

const sizeClasses = computed(() => ({
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base'
})[props.size])

const variantClasses = computed(() => ({
  default: 'text-foreground hover:text-primary',
  muted: 'text-muted-foreground hover:text-foreground'
})[props.variant])

const separatorClasses = computed(() => ({
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5'
})[props.size])

const iconClasses = computed(() => ({
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5'
})[props.size])
</script>

<template>
  <nav aria-label="Breadcrumb">
    <ol class="flex items-center space-x-2">
      <!-- Home Icon -->
      <li v-if="showHome" class="flex items-center">
        <HomeIcon 
          :class="[iconClasses, variantClasses]"
          aria-hidden="true"
        />
      </li>

      <!-- Breadcrumb Items -->
      <template v-for="(item, index) in items" :key="index">
        <!-- Separator -->
        <li 
          v-if="index > 0 || (index === 0 && showHome)" 
          class="flex items-center text-muted-foreground"
          aria-hidden="true"
        >
          <component
            :is="typeof separator === 'string' ? undefined : separator"
            v-if="typeof separator !== 'string'"
            :class="separatorClasses"
          />
          <span v-else class="mx-2">{{ separator }}</span>
        </li>

        <!-- Item -->
        <li class="flex items-center">
          <component
            :is="item.to ? 'button' : 'span'"
            :class="[
              sizeClasses,
              'flex items-center gap-1.5',
              item.to ? [
                variantClasses,
                'transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                'rounded-sm'
              ] : 'text-muted-foreground'
            ]"
            :aria-current="index === items.length - 1 ? 'page' : undefined"
            @click="item.to && handleClick(item)"
          >
            <component 
              v-if="item.icon"
              :is="item.icon"
              :class="iconClasses"
              aria-hidden="true"
            />
            {{ item.label }}
          </component>
        </li>
      </template>
    </ol>
  </nav>
</template>