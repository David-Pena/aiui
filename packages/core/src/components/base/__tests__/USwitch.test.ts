import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { BellIcon } from '@heroicons/vue/24/outline'
import USwitch from '../USwitch.vue'

describe('USwitch', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(USwitch, {
      props: {
        modelValue: false
      }
    })
    expect(wrapper.find('button[role="switch"]').exists()).toBe(true)
  })

  it('emits update:modelValue when clicked', async () => {
    const wrapper = mount(USwitch, {
      props: {
        modelValue: false
      }
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('applies variant classes correctly', () => {
    const wrapper = mount(USwitch, {
      props: {
        modelValue: true,
        variant: 'success'
      }
    })
    expect(wrapper.find('button').classes()).toContain('bg-success')
  })

  it('renders label when provided', () => {
    const label = 'Test Label'
    const wrapper = mount(USwitch, {
      props: {
        modelValue: false,
        label
      }
    })
    expect(wrapper.text()).toContain(label)
  })

  it('renders description when provided', () => {
    const description = 'Test Description'
    const wrapper = mount(USwitch, {
      props: {
        modelValue: false,
        description
      }
    })
    expect(wrapper.text()).toContain(description)
  })

  it('renders icon when provided', () => {
    const wrapper = mount(USwitch, {
      props: {
        modelValue: false,
        icon: BellIcon
      }
    })
    expect(wrapper.findComponent(BellIcon).exists()).toBe(true)
  })

  it('applies size classes correctly', () => {
    const wrapper = mount(USwitch, {
      props: {
        modelValue: false,
        size: 'lg'
      }
    })
    expect(wrapper.find('button').classes()).toContain('h-7')
  })

  it('is disabled when disabled prop is true', () => {
    const wrapper = mount(USwitch, {
      props: {
        modelValue: false,
        disabled: true
      }
    })
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('does not emit events when disabled', async () => {
    const wrapper = mount(USwitch, {
      props: {
        modelValue: false,
        disabled: true
      }
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('has correct ARIA attributes', () => {
    const wrapper = mount(USwitch, {
      props: {
        modelValue: true
      }
    })
    const button = wrapper.find('button')
    expect(button.attributes('role')).toBe('switch')
    expect(button.attributes('aria-checked')).toBe('true')
  })
})