import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { HomeIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import UBreadcrumb from '../UBreadcrumb.vue'

describe('UBreadcrumb', () => {
  const defaultItems = [
    { label: 'Home', to: '/' },
    { label: 'Documents', to: '/documents' },
    { label: 'Current Page' }
  ]

  it('renders all items correctly', () => {
    const wrapper = mount(UBreadcrumb, {
      props: {
        items: defaultItems
      }
    })
    
    const items = wrapper.findAll('li')
    expect(items).toHaveLength(5) // 3 items + 2 separators
  })

  it('shows home icon when showHome is true', () => {
    const wrapper = mount(UBreadcrumb, {
      props: {
        items: defaultItems,
        showHome: true
      }
    })
    expect(wrapper.findComponent(HomeIcon).exists()).toBe(true)
  })

  it('renders custom separator correctly', () => {
    const wrapper = mount(UBreadcrumb, {
      props: {
        items: defaultItems,
        separator: '/'
      }
    })
    expect(wrapper.text()).toContain('/')
  })

  it('emits navigate event when clickable item is clicked', async () => {
    const wrapper = mount(UBreadcrumb, {
      props: {
        items: defaultItems
      }
    })
    
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('navigate')?.[0]).toEqual([defaultItems[0]])
  })

  it('applies size classes correctly', () => {
    const wrapper = mount(UBreadcrumb, {
      props: {
        items: defaultItems,
        size: 'lg'
      }
    })
    expect(wrapper.find('button').classes()).toContain('text-base')
  })

  it('applies variant classes correctly', () => {
    const wrapper = mount(UBreadcrumb, {
      props: {
        items: defaultItems,
        variant: 'muted'
      }
    })
    expect(wrapper.find('button').classes()).toContain('text-muted-foreground')
  })

  it('renders item icons when provided', () => {
    const items = [
      { label: 'Home', to: '/', icon: HomeIcon }
    ]
    const wrapper = mount(UBreadcrumb, {
      props: { items }
    })
    expect(wrapper.findComponent(HomeIcon).exists()).toBe(true)
  })

  it('marks current page with aria-current', () => {
    const wrapper = mount(UBreadcrumb, {
      props: {
        items: defaultItems
      }
    })
    const lastItem = wrapper.find('span[aria-current="page"]')
    expect(lastItem.exists()).toBe(true)
    expect(lastItem.text()).toBe('Current Page')
  })
})