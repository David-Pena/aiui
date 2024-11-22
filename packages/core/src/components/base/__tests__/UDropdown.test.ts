import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { UserIcon } from '@heroicons/vue/24/outline'
import UDropdown from '../UDropdown.vue'

describe('UDropdown', () => {
  const defaultOptions = [
    { id: '1', label: 'Option 1', icon: UserIcon },
    { id: '2', label: 'Option 2' },
    { id: 'divider', divider: true },
    { id: '3', label: 'Option 3', disabled: true }
  ]

  it('renders trigger button correctly', () => {
    const wrapper = mount(UDropdown, {
      props: {
        label: 'Menu'
      }
    })
    expect(wrapper.find('button').text()).toContain('Menu')
  })

  it('toggles dropdown on click', async () => {
    const wrapper = mount(UDropdown, {
      props: {
        options: defaultOptions
      }
    })
    
    expect(wrapper.find('[role="menu"]').isVisible()).toBe(false)
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('[role="menu"]').isVisible()).toBe(true)
  })

  it('shows dropdown on hover when hover prop is true', async () => {
    const wrapper = mount(UDropdown, {
      props: {
        hover: true,
        options: defaultOptions
      }
    })
    
    await wrapper.trigger('mouseenter')
    expect(wrapper.find('[role="menu"]').isVisible()).toBe(true)
    
    await wrapper.trigger('mouseleave')
    expect(wrapper.find('[role="menu"]').isVisible()).toBe(false)
  })

  it('emits events when option is selected', async () => {
    const wrapper = mount(UDropdown, {
      props: {
        options: defaultOptions
      }
    })
    
    await wrapper.find('button').trigger('click')
    await wrapper.findAll('[role="menuitem"]')[0].trigger('click')
    
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['1'])
    expect(wrapper.emitted('select')?.[0]).toEqual([defaultOptions[0]])
  })

  it('respects disabled state', () => {
    const wrapper = mount(UDropdown, {
      props: {
        disabled: true,
        options: defaultOptions
      }
    })
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('renders icons when showIcons is true', () => {
    const wrapper = mount(UDropdown, {
      props: {
        options: defaultOptions,
        showIcons: true
      }
    })
    expect(wrapper.findComponent(UserIcon).exists()).toBe(true)
  })

  it('applies variant classes correctly', () => {
    const wrapper = mount(UDropdown, {
      props: {
        variant: 'outline',
        label: 'Menu'
      }
    })
    expect(wrapper.find('button').classes()).toContain('border')
  })

  it('applies size classes correctly', () => {
    const wrapper = mount(UDropdown, {
      props: {
        size: 'lg',
        label: 'Menu'
      }
    })
    expect(wrapper.find('button').classes()).toContain('h-11')
  })

  it('renders custom content through default slot', () => {
    const wrapper = mount(UDropdown, {
      slots: {
        default: '<div class="custom-content">Custom Content</div>'
      }
    })
    
    wrapper.find('button').trigger('click')
    expect(wrapper.find('.custom-content').exists()).toBe(true)
  })
});