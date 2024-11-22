import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { PlusIcon } from '@heroicons/vue/24/outline'
import UIconButton from '../UIconButton.vue'

describe('UIconButton', () => {
  it('renders the icon', () => {
    const wrapper = mount(UIconButton, {
      props: {
        icon: PlusIcon,
        label: 'Add item'
      }
    })
    expect(wrapper.findComponent(PlusIcon).exists()).toBe(true)
  })

  it('applies variant classes correctly', () => {
    const wrapper = mount(UIconButton, {
      props: {
        icon: PlusIcon,
        label: 'Add item',
        variant: 'secondary'
      }
    })
    expect(wrapper.classes()).toContain('bg-secondary')
  })

  it('shows loading spinner when loading prop is true', () => {
    const wrapper = mount(UIconButton, {
      props: {
        icon: PlusIcon,
        label: 'Add item',
        loading: true
      }
    })
    expect(wrapper.find('svg.animate-spin').exists()).toBe(true)
  })

  it('is disabled when disabled prop is true', () => {
    const wrapper = mount(UIconButton, {
      props: {
        icon: PlusIcon,
        label: 'Add item',
        disabled: true
      }
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('applies size classes correctly', () => {
    const wrapper = mount(UIconButton, {
      props: {
        icon: PlusIcon,
        label: 'Add item',
        size: 'lg'
      }
    })
    expect(wrapper.classes()).toContain('h-11')
  })

  it('sets aria-label attribute', () => {
    const wrapper = mount(UIconButton, {
      props: {
        icon: PlusIcon,
        label: 'Add item'
      }
    })
    expect(wrapper.attributes('aria-label')).toBe('Add item')
  })
})