<script setup lang="ts">
import { computed } from 'vue'
import { SparklesIcon, BoltIcon, HeartIcon, FireIcon, RocketLaunchIcon } from '@heroicons/vue/24/outline'

const props = withDefaults(defineProps<{
  /**
   * Visual variant of the component
   */
  variant?: 'minimal' | 'modern' | 'elegant' | 'playful' | 'compact'
  /**
   * Color theme of the component
   */
  theme?: 'light' | 'dark' | 'primary' | 'colored'
  /**
   * Size of the component
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * Whether to show animations
   */
  animate?: boolean
  /**
   * Custom tagline to show
   */
  tagline?: string
  /**
   * Whether to show the year
   */
  showYear?: boolean
  /**
   * URL to link to
   */
  url?: string
  /**
   * Whether to show the full logo or just the icon
   */
  iconOnly?: boolean
}>(), {
  variant: 'modern',
  theme: 'light',
  size: 'md',
  animate: true,
  showYear: false,
  iconOnly: false
})

const currentYear = new Date().getFullYear()

const containerClasses = computed(() => [
  'inline-flex items-center gap-2 font-medium transition-all duration-200',
  // Base styles per variant
  {
    // Minimal: Clean and simple
    'rounded px-2 py-1': props.variant === 'minimal',
    
    // Modern: Sleek with subtle shadow
    'rounded-lg px-3 py-2 shadow-sm': props.variant === 'modern',
    
    // Elegant: Bordered with refined look
    'rounded-md border px-4 py-2': props.variant === 'elegant',
    
    // Playful: Fun and energetic
    'rounded-full px-4 py-2 shadow-md': props.variant === 'playful',
    
    // Compact: Space-efficient
    'rounded-md px-2 py-1': props.variant === 'compact'
  },
  // Theme colors
  {
    // Light theme
    'bg-white text-gray-800 border-gray-200': props.theme === 'light',
    'hover:bg-gray-50': props.theme === 'light' && props.variant !== 'minimal',
    
    // Dark theme
    'bg-gray-900 text-white border-gray-800': props.theme === 'dark',
    'hover:bg-gray-800': props.theme === 'dark' && props.variant !== 'minimal',
    
    // Primary theme
    'bg-primary text-primary-foreground border-primary/20': props.theme === 'primary',
    'hover:bg-primary/90': props.theme === 'primary' && props.variant !== 'minimal',
    
    // Colored theme (gradient)
    'bg-gradient-to-r from-primary via-secondary to-accent border-transparent': 
      props.theme === 'colored',
    'text-primary-foreground': props.theme === 'colored' && props.variant !== 'playful',
    'text-gray-800': props.theme === 'colored' && props.variant === 'playful',
    'hover:opacity-90': props.theme === 'colored' && props.variant !== 'minimal'
  },
  // Size
  {
    'text-xs': props.size === 'sm',
    'text-sm': props.size === 'md',
    'text-base': props.size === 'lg'
  }
])

const logoClasses = computed(() => [
  'flex items-center gap-1.5',
  {
    'scale-90': props.size === 'sm',
    'scale-100': props.size === 'md',
    'scale-110': props.size === 'lg'
  }
])

const iconClasses = computed(() => [
  'transition-transform',
  {
    'h-4 w-4': props.size === 'sm',
    'h-5 w-5': props.size === 'md',
    'h-6 w-6': props.size === 'lg'
  }
])

const taglines = {
  minimal: 'Built with⚡️',
  modern: 'Powered by ⚡️',
  elegant: 'Crafted with ⚡️',
  playful: 'Made with ⚡️',
  compact: 'Built with ⚡️'
}

const displayTagline = computed(() => props.tagline || taglines[props.variant])

// Animated background for 'colored' theme
const backgroundEffects = computed(() => props.animate && props.theme === 'colored')

const WrapperComponent = computed(() => props.url ? 'a' : 'div')
</script>

<template>
  <component
    :is="WrapperComponent"
    :href="url"
    :target="url ? '_blank' : undefined"
    :rel="url ? 'noopener noreferrer' : undefined"
    :class="[
      containerClasses,
      url && 'hover:no-underline cursor-pointer'
    ]"
  >
    <!-- Animated Background for Colored Theme -->
    <div 
      v-if="backgroundEffects"
      class="absolute inset-0 overflow-hidden rounded-inherit"
      aria-hidden="true"
    >
      <div class="sparkles opacity-25" />
    </div>

    <!-- Logo -->
    <div :class="logoClasses">
      <BoltIcon 
        :class="[
          iconClasses,
          animate && 'animate-bolt'
        ]"
      />
      <span v-if="!iconOnly" class="font-semibold tracking-wide">
        Bolt.new
      </span>
    </div>

    <!-- Separator -->
    <span 
      v-if="!iconOnly && variant !== 'minimal' && variant !== 'compact'"
      class="mx-1 opacity-40"
      aria-hidden="true"
    >
      •
    </span>

    <!-- Tagline -->
    <span 
      v-if="!iconOnly"
      :class="[
        'opacity-85',
        variant === 'minimal' && 'text-muted-foreground'
      ]"
    >
      {{ displayTagline }}
      <span 
        v-if="showYear"
        class="opacity-75 ml-1"
      >
        {{ currentYear }}
      </span>
    </span>

    <!-- Decorative Elements for Playful Variant -->
    <div 
      v-if="variant === 'playful' && animate"
      class="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-current opacity-75 animate-ping"
      aria-hidden="true"
    />
  </component>
</template>

<style scoped>
.sparkles {
  background-image: 
    radial-gradient(circle, currentColor 1px, transparent 1px),
    radial-gradient(circle, currentColor 1px, transparent 1px);
  background-size: 24px 24px;
  background-position: 0 0, 12px 12px;
  animation: sparkle 4s linear infinite;
}

@keyframes sparkle {
  0% {
    background-position: 0 0, 12px 12px;
    opacity: 0.3;
  }
  25% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.6;
  }
  100% {
    background-position: 24px 24px, 36px 36px;
    opacity: 0.3;
  }
}

@keyframes bolt {
  0%, 100% {
    transform: scale(1) rotate(0deg);
    filter: brightness(1);
  }
  25% {
    transform: scale(1.2) rotate(-5deg);
    filter: brightness(1.3);
  }
  50% {
    transform: scale(1.1) rotate(5deg);
    filter: brightness(1.2);
  }
  75% {
    transform: scale(1.15) rotate(-3deg);
    filter: brightness(1.25);
  }
}

.animate-bolt {
  animation: bolt 2s ease-in-out infinite;
  transform-origin: center;
}

.rounded-inherit {
  border-radius: inherit;
}
</style>