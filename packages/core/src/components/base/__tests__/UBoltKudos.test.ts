import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { BoltIcon, HeartIcon, FireIcon, SparklesIcon, RocketLaunchIcon } from '@heroicons/vue/24/outline'
import UBoltKudos from '../UBoltKudos.vue'

describe('UBoltKudos', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(UBoltKudos)
    expect(wrapper.findComponent(BoltIcon).exists()).toBe(true)
    expect(wrapper.text()).toContain('You\'re using Bolt.new!')
  })

  it('applies variant classes correctly', () => {
    const variants = ['default', 'love', 'fire', 'magic', 'rocket']
    const icons = [BoltIcon, HeartIcon, FireIcon, SparklesIcon, RocketLaunchIcon]
    
    variants.forEach((variant, index) => {
      const wrapper = mount(UBoltKudos, {
        props: { variant }
      })
      expect(wrapper.findComponent(icons[index]).exists()).toBe(true)
    })
  })

  it('applies size classes correctly', () => {
    const wrapper = mount(UBoltKudos, {
      props: {
        size: 'lg'
      }
    })
    expect(wrapper.find('div').classes()).toContain('p-6')
  })

  it('shows custom message when provided', () => {
    const message = 'Custom kudos message'
    const wrapper = mount(UBoltKudos, {
      props: { message }
    })
    expect(wrapper.text()).toContain(message)
  })

  it('applies animation classes when animate is true', () => {
    const wrapper = mount(UBoltKudos, {
      props: {
        animate: true,
        variant: 'default'
      }
    })
    expect(wrapper.find('svg').classes()).toContain('animate-bolt')
  })

  it('does not apply animation classes when animate is false', () => {
    const wrapper = mount(UBoltKudos, {
      props: {
        animate: false,
        variant: 'default'
      }
    })
    expect(wrapper.find('svg').classes()).not.toContain('animate-bolt')
  })

  it('renders background effects for specific variants', () => {
    const wrapper = mount(UBoltKudos, {
      props: {
        variant: 'magic',
        animate: true
      }
    })
    expect(wrapper.find('.sparkles').exists()).toBe(true)
  })
});