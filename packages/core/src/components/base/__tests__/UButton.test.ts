import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { PlusIcon } from '@heroicons/vue/24/outline'
import UButton from '../UButton.vue'

describe('UButton', () => {
  it('renders slot content', () => {
    const wrapper = mount(UButton, {
      slots: {
        default: 'Click me'
      }
    })
    expect(wrapper.text()).toBe('Click me')
  })

  it('applies variant classes correctly', () => {
    const wrapper = mount(UButton, {
      props: {
        variant: 'secondary'
      }
    })
    expect(wrapper.classes()).toContain('bg-secondary')
  })

  it('shows loading spinner when loading prop is true', () => {
    const wrapper = mount(UButton, {
      props: {
        loading: true
      }
    })
    expect(wrapper.find('svg.animate-spin').exists()).toBe(true)
  })

  it('is disabled when disabled prop is true', () => {
    const wrapper = mount(UButton, {
      props: {
        disabled: true
      }
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('renders left icon correctly', () => {
    const wrapper = mount(UButton, {
      props: {
        icon: PlusIcon,
        iconPosition: 'left'
      },
      slots: {
        default: 'Add Item'
      }
    })
    expect(wrapper.findComponent(PlusIcon).exists()).toBe(true)
  })

  it('renders right icon correctly', () => {
    const wrapper = mount(UButton, {
      props: {
        icon: PlusIcon,
        iconPosition: 'right'
      },
      slots: {
        default: 'Add Item'
      }
    })
    expect(wrapper.findComponent(PlusIcon).exists()).toBe(true)
  })

  it('applies size classes correctly', () => {
    const wrapper = mount(UButton, {
      props: {
        size: 'lg'
      }
    })
    expect(wrapper.classes()).toContain('h-11')
  })
})