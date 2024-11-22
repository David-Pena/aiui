import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UTag from '../UTag.vue'

describe('UTag', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(UTag, {
      slots: {
        default: 'Test Tag'
      }
    })
    expect(wrapper.text()).toBe('Test Tag')
    expect(wrapper.classes()).toContain('rounded-full')
  })

  it('applies variant classes correctly', () => {
    const wrapper = mount(UTag, {
      props: {
        variant: 'success'
      }
    })
    expect(wrapper.classes()).toContain('bg-green-100')
    expect(wrapper.classes()).toContain('text-green-800')
  })

  it('applies shape classes correctly', () => {
    const shapes = ['rounded', 'curved', 'outlined', 'elevated']
    shapes.forEach(shape => {
      const wrapper = mount(UTag, {
        props: { shape }
      })
      if (shape === 'curved') {
        expect(wrapper.classes()).toContain('rounded-lg')
      } else if (shape === 'outlined') {
        expect(wrapper.classes()).toContain('border')
      } else if (shape === 'elevated') {
        expect(wrapper.classes()).toContain('shadow-md')
      }
    })
  })

  it('applies size classes correctly', () => {
    const wrapper = mount(UTag, {
      props: {
        size: 'lg'
      }
    })
    expect(wrapper.classes()).toContain('text-base')
  })

  it('handles dismissible functionality', async () => {
    const wrapper = mount(UTag, {
      props: {
        dismissible: true,
        modelValue: true
      }
    })
    
    expect(wrapper.find('button').exists()).toBe(true)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    expect(wrapper.emitted('dismiss')).toBeTruthy()
  })

  it('respects v-model binding', async () => {
    const wrapper = mount(UTag, {
      props: {
        modelValue: false
      }
    })
    expect(wrapper.exists()).toBe(false)
  })

  it('applies outlined variant classes correctly', () => {
    const wrapper = mount(UTag, {
      props: {
        shape: 'outlined',
        variant: 'success'
      }
    })
    expect(wrapper.classes()).toContain('border-green-800')
    expect(wrapper.classes()).toContain('text-green-800')
    expect(wrapper.classes()).toContain('bg-transparent')
  })

  it('applies elevated shape with shadow', () => {
    const wrapper = mount(UTag, {
      props: {
        shape: 'elevated'
      }
    })
    expect(wrapper.classes()).toContain('shadow-md')
  })
})