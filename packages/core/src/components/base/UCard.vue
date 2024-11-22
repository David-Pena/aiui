<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'default' | 'bordered'
}>(), {
  variant: 'default'
})
</script>

<template>
  <div
    class="rounded-lg bg-card text-card-foreground shadow-sm"
    :class="{ 'border border-border': variant === 'bordered' }"
  >
    <slot />
  </div>
</template>