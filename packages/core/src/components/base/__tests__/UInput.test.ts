import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { MagnifyingGlassIcon, EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
import UInput from '../UInput.vue'

describe('UInput', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(UInput)
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('input').attributes('type')).toBe('text')
  })

  it('applies variant classes correctly', () => {
    const wrapper = mount(UInput, {
      props: {
        variant: 'filled'
      }
    })
    expect(wrapper.find('input').classes()).toContain('bg-secondary/50')
  })

  it('shows error message when error prop is provided', () => {
    const errorMessage = 'This field is required'
    const wrapper = mount(UInput, {
      props: {
        error: errorMessage
      }
    })
    expect(wrapper.text()).toContain(errorMessage)
  })

  it('emits update:modelValue event on input', async () => {
    const wrapper = mount(UInput)
    await wrapper.find('input').setValue('test value')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['test value'])
  })

  it('renders label correctly', () => {
    const label = 'Test Label'
    const wrapper = mount(UInput, {
      props: {
        label
      }
    })
    expect(wrapper.find('label').text()).toBe(label)
  })

  it('applies floating label classes correctly', () => {
    const wrapper = mount(UInput, {
      props: {
        label: 'Test Label',
        variant: 'floating'
      }
    })
    expect(wrapper.find('label').classes()).toContain('pointer-events-none')
  })

  it('handles floating label state with value', async () => {
    const wrapper = mount(UInput, {
      props: {
        label: 'Test Label',
        variant: 'floating',
        modelValue: 'test'
      }
    })
    expect(wrapper.find('label').classes()).toContain('scale-75')
  })

  it('renders left icon correctly', () => {
    const wrapper = mount(UInput, {
      props: {
        icon: MagnifyingGlassIcon,
        iconPosition: 'left'
      }
    })
    expect(wrapper.findComponent(MagnifyingGlassIcon).exists()).toBe(true)
  })

  it('renders right icon correctly', () => {
    const wrapper = mount(UInput, {
      props: {
        icon: MagnifyingGlassIcon,
        iconPosition: 'right'
      }
    })
    expect(wrapper.findComponent(MagnifyingGlassIcon).exists()).toBe(true)
  })

  describe('Password Input', () => {
    it('toggles password visibility', async () => {
      const wrapper = mount(UInput, {
        props: {
          type: 'password',
          modelValue: 'secretpassword'
        }
      })
      
      expect(wrapper.find('input').attributes('type')).toBe('password')
      await wrapper.find('button').trigger('click')
      expect(wrapper.find('input').attributes('type')).toBe('text')
    })

    it('maintains input value when toggling password visibility', async () => {
      const password = 'secretpassword'
      const wrapper = mount(UInput, {
        props: {
          type: 'password',
          modelValue: password
        }
      })

      expect(wrapper.find('input').element.value).toBe(password)
      await wrapper.find('button').trigger('click')
      expect(wrapper.find('input').element.value).toBe(password)
    })
  })

  it('applies disabled state correctly', () => {
    const wrapper = mount(UInput, {
      props: {
        disabled: true
      }
    })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('applies error state classes correctly', () => {
    const wrapper = mount(UInput, {
      props: {
        error: 'Error message'
      }
    })
    expect(wrapper.find('input').classes()).toContain('border-red-500')
  })
});