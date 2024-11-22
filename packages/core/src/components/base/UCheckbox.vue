<script setup lang="ts">
import { computed } from 'vue'
import { CheckIcon, MinusIcon } from '@heroicons/vue/24/outline'

const props = withDefaults(defineProps<{
  modelValue?: boolean | 'indeterminate'
  label?: string
  description?: string
  disabled?: boolean
  required?: boolean
  error?: string
  size?: 'sm' | 'md' | 'lg'
}>(), {
  modelValue: false,
  disabled: false,
  required: false,
  size: 'md'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'change': [value: boolean]
}>()

const toggle = () => {
  if (!props.disabled) {
    const newValue = props.modelValue === 'indeterminate' ? true : !props.modelValue
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }
}

const checkboxClasses = computed(() => [
  'relative flex items-center justify-center shrink-0 rounded-sm border ring-offset-background transition-colors',
  'focus-visible:outline-none focus-visible:ring-2 focus:ring-primary focus:ring-offset-2',
  'disabled:cursor-not-allowed disabled:opacity-50',
  props.error ? 'border-red-500' : 'border-input',
  props.modelValue === true ? 'bg-primary border-primary' : 'bg-background',
  props.modelValue === 'indeterminate' ? 'bg-primary border-primary' : '',
  {
    'h-4 w-4': props.size === 'sm',
    'h-5 w-5': props.size === 'md',
    'h-6 w-6': props.size === 'lg'
  }
])

const labelClasses = computed(() => [
  'text-foreground font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  {
    'text-sm': props.size === 'sm',
    'text-base': props.size === 'md',
    'text-lg': props.size === 'lg'
  }
])

const iconClasses = computed(() => ({
  sm: 'h-3 w-3',
  md: 'h-3.5 w-3.5',
  lg: 'h-4 w-4'
})[props.size])
</script>

<template>
  <div class="relative flex items-start">
    <div class="flex items-center">
      <button
        type="button"
        role="checkbox"
        :aria-checked="modelValue === 'indeterminate' ? 'mixed' : modelValue"
        :aria-required="required"
        :disabled="disabled"
        :class="checkboxClasses"
        @click="toggle"
      >
        <CheckIcon 
          v-if="modelValue === true"
          :class="[iconClasses, 'text-white']"
          aria-hidden="true"
        />
        <MinusIcon
          v-else-if="modelValue === 'indeterminate'"
          :class="[iconClasses, 'text-white']"
          aria-hidden="true"
        />
      </button>
    </div>

    <div v-if="label || description" class="ml-3">
      <label
        v-if="label"
        :class="labelClasses"
        @click="toggle"
      >
        {{ label }}
        <span v-if="required" class="text-red-500">*</span>
      </label>
      <p 
        v-if="description"
        class="text-muted-foreground"
        :class="{
          'text-xs': size === 'sm',
          'text-sm': size === 'md',
          'text-base': size === 'lg'
        }"
      >
        {{ description }}
      </p>
    </div>

    <p 
      v-if="error"
      class="absolute -bottom-5 left-0 text-sm text-red-500"
    >
      {{ error }}
    </p>
  </div>
</template>