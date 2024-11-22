import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { BeakerIcon, HomeIcon } from '@heroicons/vue/24/outline'
import UNavbar from '../UNavbar.vue'

describe('UNavbar', () => {
  const defaultItems = [
    { label: 'Home', to: '/', icon: HomeIcon, active: true },
    { label: 'Profile', to: '/profile' }
  ]

  it('renders brand correctly', () => {
    const wrapper = mount(UNavbar, {
      props: {
        brand: 'Company',
        brandIcon: BeakerIcon
      }
    })
    expect(wrapper.text()).toContain('Company')
    expect(wrapper.findComponent(BeakerIcon).exists()).toBe(true)
  })

  it('renders navigation items', () => {
    const wrapper = mount(UNavbar, {
      props: {
        items: defaultItems
      }
    })
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBeGreaterThan(0)
    expect(buttons[1].text()).toContain('Home')
  })

  it('emits navigate event when item is clicked', async () => {
    const wrapper = mount(UNavbar, {
      props: {
        items: defaultItems
      }
    })
    await wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.emitted('navigate')?.[0]).toEqual([defaultItems[0]])
  })

  it('applies variant classes correctly', () => {
    const wrapper = mount(UNavbar, {
      props: {
        variant: 'colored'
      }
    })
    expect(wrapper.classes()).toContain('bg-primary')
  })

  it('applies layout classes correctly', () => {
    const wrapper = mount(UNavbar, {
      props: {
        layout: 'centered'
      }
    })
    expect(wrapper.find('nav').classes()).toContain('mx-auto')
  })

  it('toggles mobile menu', async () => {
    const wrapper = mount(UNavbar, {
      props: {
        items: defaultItems
      }
    })
    const menuButton = wrapper.findAll('button')[0]
    expect(wrapper.find('.lg\\:hidden').isVisible()).toBe(false)
    
    await menuButton.trigger('click')
    expect(wrapper.find('.lg\\:hidden').isVisible()).toBe(true)
  })

  it('renders action slot content', () => {
    const wrapper = mount(UNavbar, {
      slots: {
        actions: '<button>Sign In</button>'
      }
    })
    expect(wrapper.text()).toContain('Sign In')
  })

  it('applies sticky class when sticky prop is true', () => {
    const wrapper = mount(UNavbar, {
      props: {
        sticky: true
      }
    })
    expect(wrapper.classes()).toContain('sticky')
  })

  it('applies size classes correctly', () => {
    const wrapper = mount(UNavbar, {
      props: {
        size: 'lg'
      }
    })
    expect(wrapper.find('div').classes()).toContain('h-20')
  })
})