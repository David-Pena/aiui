import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ChevronUpIcon } from '@heroicons/vue/24/outline'
import UPanel from '../UPanel.vue'

describe('UPanel', () => {
  it('renders title and description correctly', () => {
    const wrapper = mount(UPanel, {
      props: {
        title: 'Test Title',
        description: 'Test Description'
      }
    })
    expect(wrapper.text()).toContain('Test Title')
    expect(wrapper.text()).toContain('Test Description')
  })

  it('renders slot content', () => {
    const wrapper = mount(UPanel, {
      slots: {
        default: '<div>Test Content</div>'
      }
    })
    expect(wrapper.text()).toContain('Test Content')
  })

  it('handles collapsible state', async () => {
    const wrapper = mount(UPanel, {
      props: {
        collapsible: true,
        modelValue: true,
        title: 'Collapsible Panel'
      },
      slots: {
        default: '<div>Collapsible Content</div>'
      }
    })
    
    expect(wrapper.findComponent(ChevronUpIcon).exists()).toBe(true)
    expect(wrapper.find('div').isVisible()).toBe(true)
    
    await wrapper.find('.cursor-pointer').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  it('applies variant classes correctly', () => {
    const variants = {
      default: 'bg-card',
      bordered: 'border-border',
      ghost: 'bg-transparent'
    }

    Object.entries(variants).forEach(([variant, className]) => {
      const wrapper = mount(UPanel, {
        props: { variant }
      })
      expect(wrapper.classes()).toContain(className)
    })
  })

  it('applies padding classes correctly', () => {
    const wrapper = mount(UPanel, {
      props: {
        padding: 'lg',
        title: 'Test'
      }
    })
    expect(wrapper.find('.p-6').exists()).toBe(true)
  })

  it('shows divider when enabled', () => {
    const wrapper = mount(UPanel, {
      props: {
        divider: true,
        title: 'Test'
      }
    })
    expect(wrapper.find('.border-t').exists()).toBe(true)
  })

  it('renders custom header slot', () => {
    const wrapper = mount(UPanel, {
      slots: {
        header: '<div class="custom-header">Custom Header</div>'
      }
    })
    expect(wrapper.find('.custom-header').exists()).toBe(true)
  })

  it('does not render header section when no title/description/header slot', () => {
    const wrapper = mount(UPanel)
    expect(wrapper.find('.items-center').exists()).toBe(false)
  })
})