<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  subtitle?: string
  align?: 'center' | 'left'
}>(), {
  align: 'center'
})
</script>

<template>
  <div 
    class="min-h-[400px] w-full flex flex-col items-center justify-center p-6"
    :class="{ 
      'items-center text-center': align === 'center',
      'items-start text-left': align === 'left' 
    }"
  >
    <!-- Image Slot -->
    <div class="mb-6">
      <slot name="image">
        <div class="w-48 h-48 bg-muted/30 rounded-full flex items-center justify-center">
          <svg 
            class="w-24 h-24 text-muted-foreground/50" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="1.5" 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </slot>
    </div>

    <!-- Content -->
    <div class="space-y-2 max-w-[600px]">
      <h3 class="text-2xl font-semibold tracking-tight">{{ title }}</h3>
      <p 
        v-if="subtitle" 
        class="text-muted-foreground"
      >
        {{ subtitle }}
      </p>
    </div>

    <!-- Action Slot -->
    <div class="mt-6">
      <slot name="action" />
    </div>
  </div>
</template>