<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay, Grid } from 'swiper/modules'
import { ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/grid'

export interface CarouselItem {
  id: string
  image: string
  title?: string
  description?: string
}

const props = withDefaults(defineProps<{
  /**
   * Array of carousel items
   */
  items: CarouselItem[]
  /**
   * Layout variant of the carousel
   */
  layout?: 'horizontal' | 'vertical' | 'grid'
  /**
   * Size of the carousel
   */
  size?: 'sm' | 'md' | 'lg' | 'full'
  /**
   * Whether to show captions
   */
  showCaptions?: boolean
  /**
   * Whether to enable autoplay
   */
  autoplay?: boolean
  /**
   * Autoplay delay in milliseconds
   */
  autoplayDelay?: number
  /**
   * Whether to pause on hover
   */
  pauseOnHover?: boolean
  /**
   * Whether to enable loop
   */
  loop?: boolean
  /**
   * Number of slides per view (for grid layout)
   */
  slidesPerView?: number
  /**
   * Space between slides
   */
  spaceBetween?: number
  /**
   * Theme variant
   */
  theme?: 'light' | 'dark'
}>(), {
  layout: 'horizontal',
  size: 'md',
  showCaptions: true,
  autoplay: false,
  autoplayDelay: 3000,
  pauseOnHover: true,
  loop: true,
  slidesPerView: 1,
  spaceBetween: 20,
  theme: 'light'
})

const emit = defineEmits<{
  'slide-change': [index: number]
}>()

const swiperRef = ref()
const isPaused = ref(false)

const containerClasses = computed(() => [
  'relative rounded-lg overflow-hidden',
  {
    'h-48': props.size === 'sm',
    'h-64': props.size === 'md',
    'h-96': props.size === 'lg',
    'h-screen': props.size === 'full',
    'bg-gray-100 dark:bg-gray-900': props.theme === 'light',
    'bg-gray-900 dark:bg-gray-100': props.theme === 'dark'
  }
])

const navigationClasses = computed(() => [
  'absolute z-10 flex items-center justify-center',
  'w-10 h-10 rounded-full',
  props.theme === 'light' 
    ? 'bg-white/90 text-gray-800 hover:bg-white shadow-lg backdrop-blur-sm'
    : 'bg-gray-900/90 text-white hover:bg-gray-900 shadow-lg backdrop-blur-sm',
  'transition-all duration-200 ease-in-out transform hover:scale-110',
  'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
  'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100'
])

const swiperOptions = computed(() => ({
  modules: [Navigation, Pagination, Autoplay, Grid],
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    type: 'bullets',
  },
  loop: props.loop,
  spaceBetween: props.spaceBetween,
  direction: props.layout === 'vertical' ? 'vertical' : 'horizontal',
  slidesPerView: props.layout === 'grid' ? props.slidesPerView : 1,
  grid: props.layout === 'grid' ? {
    rows: 2,
    fill: 'row'
  } : undefined,
  autoplay: props.autoplay ? {
    delay: props.autoplayDelay,
    disableOnInteraction: false,
    pauseOnMouseEnter: props.pauseOnHover
  } : false,
  on: {
    slideChange: () => {
      emit('slide-change', swiperRef.value?.swiper?.activeIndex || 0)
    }
  }
}))

const handleMouseEnter = () => {
  if (props.autoplay && props.pauseOnHover && swiperRef.value?.swiper?.autoplay) {
    isPaused.value = true
    swiperRef.value.swiper.autoplay.stop()
  }
}

const handleMouseLeave = () => {
  if (props.autoplay && props.pauseOnHover && isPaused.value && swiperRef.value?.swiper?.autoplay) {
    isPaused.value = false
    swiperRef.value.swiper.autoplay.start()
  }
}

onMounted(() => {
  if (props.autoplay && swiperRef.value?.swiper?.autoplay) {
    swiperRef.value.swiper.autoplay.start()
  }
})

onBeforeUnmount(() => {
  if (props.autoplay && swiperRef.value?.swiper?.autoplay) {
    swiperRef.value.swiper.autoplay.stop()
  }
})
</script>

<template>
  <div 
    :class="containerClasses"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <Swiper
      ref="swiperRef"
      v-bind="swiperOptions"
      :class="[
        'h-full w-full',
        layout === 'vertical' ? 'swiper-vertical' : ''
      ]"
    >
      <SwiperSlide
        v-for="item in items"
        :key="item.id"
        class="relative"
      >
        <img
          :src="item.image"
          :alt="item.title"
          :class="[
            'object-cover',
            layout === 'grid' ? 'h-64 w-full' : 'h-full w-full'
          ]"
        >
        
        <!-- Caption -->
        <div
          v-if="showCaptions && (item.title || item.description)"
          class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white backdrop-blur-sm"
        >
          <h3 v-if="item.title" class="text-lg font-semibold">
            {{ item.title }}
          </h3>
          <p v-if="item.description" class="mt-1 text-sm">
            {{ item.description }}
          </p>
        </div>
      </SwiperSlide>

      <!-- Navigation -->
      <template v-if="layout === 'vertical'">
        <button
          type="button"
          class="swiper-button-prev"
          :class="[
            navigationClasses,
            'left-1/2 -translate-x-1/2 top-4'
          ]"
        >
          <ChevronUpIcon class="h-6 w-6" />
        </button>
        <button
          type="button"
          class="swiper-button-next"
          :class="[
            navigationClasses,
            'left-1/2 -translate-x-1/2 bottom-4'
          ]"
        >
          <ChevronDownIcon class="h-6 w-6" />
        </button>
      </template>
      <template v-else>
        <button
          type="button"
          class="swiper-button-prev"
          :class="[
            navigationClasses,
            'left-4 top-1/2 -translate-y-1/2'
          ]"
        >
          <ChevronLeftIcon class="h-6 w-6" />
        </button>
        <button
          type="button"
          class="swiper-button-next"
          :class="[
            navigationClasses,
            'right-4 top-1/2 -translate-y-1/2'
          ]"
        >
          <ChevronRightIcon class="h-6 w-6" />
        </button>
      </template>

      <!-- Pagination -->
      <div
        class="swiper-pagination"
        :class="{
          'bottom-4': layout !== 'vertical',
          'right-4': layout === 'vertical'
        }"
      />
    </Swiper>
  </div>
</template>

<style scoped>
.swiper-vertical {
  height: 100%;
}

.swiper :deep(.swiper-pagination-bullet) {
  @apply bg-white/70 transition-all duration-200;
}

.swiper :deep(.swiper-pagination-bullet-active) {
  @apply bg-white scale-125;
}

/* Hide default navigation buttons */
.swiper :deep(.swiper-button-prev),
.swiper :deep(.swiper-button-next) {
  @apply hidden;
}

/* Custom navigation styles */
.swiper-button-prev,
.swiper-button-next {
  @apply flex items-center justify-center;
}

.swiper-button-disabled {
  @apply opacity-40 cursor-not-allowed hover:scale-100;
}

/* Vertical pagination */
.swiper-vertical :deep(.swiper-pagination-bullets) {
  @apply right-4 transform -translate-y-1/2;
}
</style>