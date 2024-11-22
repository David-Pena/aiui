import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { UserIcon } from '@heroicons/vue/24/outline'
import UAccordion from '../UAccordion.vue'

describe('UAccordion', () => {
  const defaultItems = [
    { id: '1', title: 'Item 1', content: 'Content 1' },
    { id: '2', title: 'Item 2', content: 'Content 2', icon: UserIcon },
    { id: '3', title: 'Item 3', content: 'Content 3', disabled: true }
  ]

  it('renders all items correctly', () => {
    const wrapper = mount(UAccordion, {
      props: {
        items: defaultItems
      }
    })
    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(3)
    expect(buttons[0].text()).toContain('Item 1')
  })

  it('handles single item expansion', async () => {
    const wrapper = mount(UAccordion, {
      props: {
        items: defaultItems
      }
    })
    
    await wrapper.findAll('button')[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['1']])
    
    await wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([['2']])
  })

  it('handles multiple item expansion when multiple prop is true', async () => {
    const wrapper = mount(UAccordion, {
      props: {
        items: defaultItems,
        multiple: true
      }
    })
    
    await wrapper.findAll('button')[0].trigger('click')
    await wrapper.findAll('button')[1].trigger('click')
    
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([['1', '2']])
  })

  it('respects disabled state', async () => {
    const wrapper = mount(UAccordion, {
      props: {
        items: defaultItems
      }
    })
    
    const disabledButton = wrapper.findAll('button')[2]
    expect(disabledButton.attributes('disabled')).toBeDefined()
  })

  it('applies variant classes correctly', () => {
    const wrapper = mount(UAccordion, {
      props: {
        items: defaultItems,
        variant: 'bordered'
      }
    })
    expect(wrapper.classes()).toContain('border')
  })

  it('shows icons when showIcons is true', () => {
    const wrapper = mount(UAccordion, {
      props: {
        items: defaultItems,
        showIcons: true
      }
    })
    expect(wrapper.findComponent(UserIcon).exists()).toBe(true)
  })

  it('applies size classes correctly', () => {
    const wrapper = mount(UAccordion, {
      props: {
        items: defaultItems,
        size: 'lg'
      }
    })
    expect(wrapper.find('button').classes()).toContain('h-16')
  })

  it('emits change event when item is toggled', async () => {
    const wrapper = mount(UAccordion, {
      props: {
        items: defaultItems
      }
    })
    
    await wrapper.findAll('button')[0].trigger('click')
    expect(wrapper.emitted('change')?.[0]).toEqual(['1', true])
  })
})