import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import UCarousel from '../UCarousel.vue'

describe('UCarousel', () => {
  const defaultItems = [
    {
      id: '1',
      image: 'test1.jpg',
      title: 'Test 1',
      description: 'Description 1'
    },
    {
      id: '2',
      image: 'test2.jpg',
      title: 'Test 2',
      description: 'Description 2'
    }
  ]

  it('renders all slides correctly', () => {
    const wrapper = mount(UCarousel, {
      props: {
        items: defaultItems
      }
    })
    expect(wrapper.findAll('.swiper-slide')).toHaveLength(defaultItems.length)
  })

  it('shows captions when showCaptions is true', () => {
    const wrapper = mount(UCarousel, {
      props: {
        items: defaultItems,
        showCaptions: true
      }
    })
    expect(wrapper.find('h3').text()).toBe('Test 1')
    expect(wrapper.find('p').text()).toBe('Description 1')
  })

  it('hides captions when showCaptions is false', () => {
    const wrapper = mount(UCarousel, {
      props: {
        items: defaultItems,
        showCaptions: false
      }
    })
    expect(wrapper.find('h3').exists()).toBe(false)
    expect(wrapper.find('p').exists()).toBe(false)
  })

  it('shows navigation buttons when navigationPosition is not none', () => {
    const wrapper = mount(UCarousel, {
      props: {
        items: defaultItems,
        navigationPosition: 'inside'
      }
    })
    expect(wrapper.find('.swiper-button-prev').exists()).toBe(true)
    expect(wrapper.find('.swiper-button-next').exists()).toBe(true)
  })

  it('hides navigation buttons when navigationPosition is none', () => {
    const wrapper = mount(UCarousel, {
      props: {
        items: defaultItems,
        navigationPosition: 'none'
      }
    })
    expect(wrapper.find('.swiper-button-prev').exists()).toBe(false)
    expect(wrapper.find('.swiper-button-next').exists()).toBe(false)
  })

  it('shows pagination when paginationStyle is not none', () => {
    const wrapper = mount(UCarousel, {
      props: {
        items: defaultItems,
        paginationStyle: 'bullets'
      }
    })
    expect(wrapper.find('.swiper-pagination').exists()).toBe(true)
  })

  it('applies size classes correctly', () => {
    const wrapper = mount(UCarousel, {
      props: {
        items: defaultItems,
        size: 'lg'
      }
    })
    expect(wrapper.classes()).toContain('h-96')
  })

  it('handles mouse enter/leave for autoplay pause', async () => {
    const wrapper = mount(UCarousel, {
      props: {
        items: defaultItems,
        autoplay: true,
        pauseOnHover: true
      }
    })
    
    await wrapper.trigger('mouseenter')
    expect(wrapper.vm.isPaused).toBe(true)
    
    await wrapper.trigger('mouseleave')
    expect(wrapper.vm.isPaused).toBe(false)
  })
});