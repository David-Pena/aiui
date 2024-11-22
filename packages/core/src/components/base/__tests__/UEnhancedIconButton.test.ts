import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { PlusIcon } from '@heroicons/vue/24/outline'
import UEnhancedIconButton from '../UEnhancedIconButton.vue'

describe('UEnhancedIconButton', () => {
  it('renders the icon', () => {
    const wrapper = mount(UEnhancedIconButton, {
      props: {
        icon: PlusIcon,
        label: 'Add item'
      }
    })
    expect(wrapper.findComponent(PlusIcon).exists()).toBe(true)
  })

  it('shows tooltip on hover', async () => {
    const wrapper = mount(UEnhancedIconButton, {
      props: {
        icon: PlusIcon,
        label: 'Add item',
        tooltip: 'Add new item'
      }
    })
    
    await wrapper.find('button').trigger('mouseenter')
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(true)
    expect(wrapper.find('[role="tooltip"]').text()).toBe('Add new item')
  })

  it('shows popover on click', async () => {
    const wrapper = mount(UEnhancedIconButton, {
      props: {
        icon: PlusIcon,
        label: 'Add item',
        popover: true
      }
    })
    
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('[role="dialog"]').exists()).toBe(true)
  })

  it('emits click event', async () => {
    const wrapper = mount(UEnhancedIconButton, {
      props: {
        icon: PlusIcon,
        label: 'Add item'
      }
    })
    
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('applies variant classes correctly', () => {
    const wrapper = mount(UEnhancedIconButton, {
      props: {
        icon: PlusIcon,
        label: 'Add item',
        variant: 'secondary'
      }
    })
    expect(wrapper.find('button').classes()).toContain('bg-secondary')
  })

  it('shows loading spinner when loading prop is true', () => {
    const wrapper = mount(UEnhancedIconButton, {
      props: {
        icon: PlusIcon,
        label: 'Add item',
        loading: true
      }
    })
    expect(wrapper.find('svg.animate-spin').exists()).toBe(true)
  })

  it('is disabled when disabled prop is true', () => {
    const wrapper = mount(UEnhancedIconButton, {
      props: {
        icon: PlusIcon,
        label: 'Add item',
        disabled: true
      }
    })
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('applies size classes correctly', () => {
    const wrapper = mount(UEnhancedIconButton, {
      props: {
        icon: PlusIcon,
        label: 'Add item',
        size: 'lg'
      }
    })
    expect(wrapper.find('button').classes()).toContain('h-12')
  })

  it('sets aria-label attribute', () => {
    const wrapper = mount(UEnhancedIconButton, {
      props: {
        icon: PlusIcon,
        label: 'Add item'
      }
    })
    expect(wrapper.find('button').attributes('aria-label')).toBe('Add item')
  })
});