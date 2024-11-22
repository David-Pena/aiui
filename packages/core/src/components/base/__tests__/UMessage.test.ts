import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import UMessage from '../UMessage.vue'

describe('UMessage', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(UMessage, {
      slots: {
        default: 'Test Message'
      }
    })
    expect(wrapper.text()).toBe('Test Message')
    expect(wrapper.classes()).toContain('bg-gray-100')
  })

  it('applies variant classes correctly', () => {
    const variants = {
      success: 'bg-green-50',
      warning: 'bg-yellow-50',
      info: 'bg-blue-50',
      danger: 'bg-red-50'
    }

    Object.entries(variants).forEach(([variant, className]) => {
      const wrapper = mount(UMessage, {
        props: { variant }
      })
      expect(wrapper.classes()).toContain(className)
    })
  })

  it('shows dismiss button when dismissible is true', () => {
    const wrapper = mount(UMessage, {
      props: {
        dismissible: true
      }
    })
    expect(wrapper.findComponent(XMarkIcon).exists()).toBe(true)
  })

  it('emits events when dismissed', async () => {
    const wrapper = mount(UMessage, {
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
    const wrapper = mount(UMessage, {
      props: {
        modelValue: false
      }
    })
    expect(wrapper.exists()).toBe(false)
  })

  it('renders custom icon when provided', () => {
    const TestIcon = {
      template: '<svg>test icon</svg>'
    }
    const wrapper = mount(UMessage, {
      props: {
        icon: TestIcon
      }
    })
    expect(wrapper.findComponent(TestIcon).exists()).toBe(true)
  })

  it('renders custom icon slot when provided', () => {
    const wrapper = mount(UMessage, {
      slots: {
        icon: '<div class="custom-icon">Custom Icon</div>'
      }
    })
    expect(wrapper.find('.custom-icon').exists()).toBe(true)
  })

  it('has correct accessibility attributes', () => {
    const wrapper = mount(UMessage)
    expect(wrapper.attributes('role')).toBe('alert')
  })
})