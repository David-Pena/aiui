import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { BellIcon } from '@heroicons/vue/24/outline'
import UAlert from '../UAlert.vue'

describe('UAlert', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(UAlert, {
      slots: {
        default: 'Test alert'
      }
    })
    expect(wrapper.text()).toContain('Test alert')
    expect(wrapper.classes()).toContain('bg-info-light')
  })

  it('applies variant classes correctly', () => {
    const variants = ['success', 'warning', 'info', 'error']
    variants.forEach(variant => {
      const wrapper = mount(UAlert, {
        props: { variant }
      })
      expect(wrapper.classes()).toContain(`bg-${variant}-light`)
    })
  })

  it('renders title when provided', () => {
    const title = 'Alert Title'
    const wrapper = mount(UAlert, {
      props: { title }
    })
    expect(wrapper.find('h3').text()).toBe(title)
  })

  it('shows dismiss button when dismissible is true', () => {
    const wrapper = mount(UAlert, {
      props: {
        dismissible: true
      }
    })
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('emits events when dismissed', async () => {
    const wrapper = mount(UAlert, {
      props: {
        dismissible: true,
        modelValue: true
      }
    })
    
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    expect(wrapper.emitted('dismiss')).toBeTruthy()
  })

  it('respects v-model binding', async () => {
    const wrapper = mount(UAlert, {
      props: {
        modelValue: false
      }
    })
    expect(wrapper.exists()).toBe(false)
  })

  it('renders custom icon when provided', () => {
    const wrapper = mount(UAlert, {
      props: {
        icon: BellIcon
      }
    })
    expect(wrapper.findComponent(BellIcon).exists()).toBe(true)
  })

  it('has correct accessibility attributes', () => {
    const wrapper = mount(UAlert)
    expect(wrapper.attributes('role')).toBe('alert')
  })
})