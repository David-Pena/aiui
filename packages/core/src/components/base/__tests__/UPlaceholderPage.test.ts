import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UPlaceholderPage from '../UPlaceholderPage.vue'

describe('UPlaceholderPage', () => {
  it('renders title correctly', () => {
    const title = 'Test Title'
    const wrapper = mount(UPlaceholderPage, {
      props: { title }
    })
    expect(wrapper.find('h3').text()).toBe(title)
  })

  it('renders subtitle when provided', () => {
    const subtitle = 'Test Subtitle'
    const wrapper = mount(UPlaceholderPage, {
      props: {
        title: 'Title',
        subtitle
      }
    })
    expect(wrapper.find('p').text()).toBe(subtitle)
  })

  it('does not render subtitle when not provided', () => {
    const wrapper = mount(UPlaceholderPage, {
      props: {
        title: 'Title'
      }
    })
    expect(wrapper.find('p').exists()).toBe(false)
  })

  it('renders default image placeholder when no image slot is provided', () => {
    const wrapper = mount(UPlaceholderPage, {
      props: {
        title: 'Title'
      }
    })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders custom image when image slot is provided', () => {
    const wrapper = mount(UPlaceholderPage, {
      props: {
        title: 'Title'
      },
      slots: {
        image: '<img src="test.jpg" alt="Test" />'
      }
    })
    expect(wrapper.find('img').exists()).toBe(true)
  })

  it('renders action slot content when provided', () => {
    const wrapper = mount(UPlaceholderPage, {
      props: {
        title: 'Title'
      },
      slots: {
        action: '<button>Test Action</button>'
      }
    })
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('applies correct alignment classes', () => {
    const wrapper = mount(UPlaceholderPage, {
      props: {
        title: 'Title',
        align: 'left'
      }
    })
    expect(wrapper.classes()).toContain('items-start')
    expect(wrapper.classes()).toContain('text-left')
  })

  it('applies center alignment by default', () => {
    const wrapper = mount(UPlaceholderPage, {
      props: {
        title: 'Title'
      }
    })
    expect(wrapper.classes()).toContain('items-center')
    expect(wrapper.classes()).toContain('text-center')
  })
})