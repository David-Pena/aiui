import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { HomeIcon } from '@heroicons/vue/24/outline'
import UTabs from '../UTabs.vue'

describe('UTabs', () => {
  const defaultTabs = [
    { id: 'tab1', label: 'Tab 1' },
    { id: 'tab2', label: 'Tab 2' },
    { id: 'tab3', label: 'Tab 3', disabled: true }
  ]

  it('renders all tabs correctly', () => {
    const wrapper = mount(UTabs, {
      props: {
        tabs: defaultTabs
      }
    })
    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(3)
    expect(buttons[0].text()).toBe('Tab 1')
  })

  it('handles tab selection', async () => {
    const wrapper = mount(UTabs, {
      props: {
        tabs: defaultTabs,
        modelValue: 'tab1'
      }
    })
    
    await wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['tab2'])
    expect(wrapper.emitted('change')?.[0]).toEqual(['tab2'])
  })

  it('respects disabled state', async () => {
    const wrapper = mount(UTabs, {
      props: {
        tabs: defaultTabs
      }
    })
    
    const disabledTab = wrapper.findAll('button')[2]
    expect(disabledTab.attributes('disabled')).toBeDefined()
  })

  it('renders icons when provided', () => {
    const tabs = [
      { id: 'tab1', label: 'Tab 1', icon: HomeIcon }
    ]
    const wrapper = mount(UTabs, {
      props: { tabs }
    })
    expect(wrapper.findComponent(HomeIcon).exists()).toBe(true)
  })

  it('applies variant classes correctly', () => {
    const wrapper = mount(UTabs, {
      props: {
        tabs: defaultTabs,
        variant: 'pills'
      }
    })
    expect(wrapper.find('[role="tablist"]').classes()).toContain('bg-muted')
  })

  it('applies size classes correctly', () => {
    const wrapper = mount(UTabs, {
      props: {
        tabs: defaultTabs,
        size: 'lg'
      }
    })
    expect(wrapper.find('button').classes()).toContain('text-lg')
  })

  it('applies alignment classes correctly', () => {
    const wrapper = mount(UTabs, {
      props: {
        tabs: defaultTabs,
        align: 'center'
      }
    })
    expect(wrapper.find('div').classes()).toContain('justify-center')
  })

  it('handles icons-only mode', () => {
    const tabs = [
      { id: 'tab1', label: 'Tab 1', icon: HomeIcon }
    ]
    const wrapper = mount(UTabs, {
      props: {
        tabs,
        iconsOnly: true
      }
    })
    expect(wrapper.find('button').text()).toBe('')
    expect(wrapper.findComponent(HomeIcon).exists()).toBe(true)
  })

  it('shows tab panels correctly', () => {
    const wrapper = mount(UTabs, {
      props: {
        tabs: defaultTabs,
        modelValue: 'tab1'
      },
      slots: {
        tab1: 'Content for Tab 1',
        tab2: 'Content for Tab 2'
      }
    })
    
    const panels = wrapper.findAll('[role="tabpanel"]')
    expect(panels[0].isVisible()).toBe(true)
    expect(panels[1].isVisible()).toBe(false)
  })
});