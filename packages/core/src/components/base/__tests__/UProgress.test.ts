import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UProgress from '../UProgress.vue'

describe('UProgress', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(UProgress, {
      props: {
        value: 50
      }
    })
    expect(wrapper.find('[role="progressbar"]').exists()).toBe(true)
  })

  it('calculates width percentage correctly', () => {
    const wrapper = mount(UProgress, {
      props: {
        value: 75,
        max: 100
      }
    })
    const progressBar = wrapper.find('[role="progressbar"] > div')
    expect(progressBar.attributes('style')).toContain('width: 75%')
  })

  it('applies size classes correctly', () => {
    const sizes = ['tiny', 'smaller', 'small', 'default']
    const heightClasses = ['h-0.5', 'h-1', 'h-2', 'h-3']

    sizes.forEach((size, index) => {
      const wrapper = mount(UProgress, {
        props: {
          value: 50,
          size
        }
      })
      expect(wrapper.find('[role="progressbar"]').classes()).toContain(heightClasses[index])
    })
  })

  it('applies variant classes correctly', () => {
    const wrapper = mount(UProgress, {
      props: {
        value: 50,
        variant: 'success'
      }
    })
    const progressBar = wrapper.find('[role="progressbar"] > div')
    expect(progressBar.classes()).toContain('bg-success')
  })

  it('shows value when showValue is true', () => {
    const wrapper = mount(UProgress, {
      props: {
        value: 75,
        showValue: true
      }
    })
    expect(wrapper.text()).toContain('75%')
  })

  it('handles indeterminate state', () => {
    const wrapper = mount(UProgress, {
      props: {
        indeterminate: true
      }
    })
    const progressBar = wrapper.find('[role="progressbar"] > div')
    expect(progressBar.classes()).toContain('animate-indeterminate')
  })

  it('sets correct ARIA attributes', () => {
    const wrapper = mount(UProgress, {
      props: {
        value: 50,
        max: 100
      }
    })
    const progressbar = wrapper.find('[role="progressbar"]')
    expect(progressbar.attributes('aria-valuemin')).toBe('0')
    expect(progressbar.attributes('aria-valuemax')).toBe('100')
    expect(progressbar.attributes('aria-valuenow')).toBe('50')
    expect(progressbar.attributes('aria-valuetext')).toBe('50%')
  })

  it('handles custom max values', () => {
    const wrapper = mount(UProgress, {
      props: {
        value: 750,
        max: 1000,
        showValue: true
      }
    })
    expect(wrapper.text()).toContain('75%')
  })
})