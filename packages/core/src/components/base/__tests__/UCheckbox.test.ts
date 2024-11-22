import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { CheckIcon, MinusIcon } from '@heroicons/vue/24/outline'
import UCheckbox from '../UCheckbox.vue'

describe('UCheckbox', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(UCheckbox)
    expect(wrapper.find('[role="checkbox"]').exists()).toBe(true)
  })

  it('renders label when provided', () => {
    const label = 'Test Label'
    const wrapper = mount(UCheckbox, {
      props: { label }
    })
    expect(wrapper.text()).toContain(label)
  })

  it('shows required indicator when required prop is true', () => {
    const wrapper = mount(UCheckbox, {
      props: {
        label: 'Test',
        required: true
      }
    })
    expect(wrapper.find('.text-red-500').exists()).toBe(true)
  })

  it('emits update:modelValue when clicked', async () => {
    const wrapper = mount(UCheckbox)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('shows check icon when checked', () => {
    const wrapper = mount(UCheckbox, {
      props: {
        modelValue: true
      }
    })
    expect(wrapper.findComponent(CheckIcon).exists()).toBe(true)
  })

  it('shows minus icon when indeterminate', () => {
    const wrapper = mount(UCheckbox, {
      props: {
        modelValue: 'indeterminate'
      }
    })
    expect(wrapper.findComponent(MinusIcon).exists()).toBe(true)
  })

  it('applies disabled state correctly', () => {
    const wrapper = mount(UCheckbox, {
      props: {
        disabled: true
      }
    })
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('shows error message when provided', () => {
    const error = 'Error message'
    const wrapper = mount(UCheckbox, {
      props: { error }
    })
    expect(wrapper.text()).toContain(error)
  })

  it('applies size classes correctly', () => {
    const wrapper = mount(UCheckbox, {
      props: {
        size: 'lg'
      }
    })
    expect(wrapper.find('button').classes()).toContain('h-6')
  })

  it('renders description when provided', () => {
    const description = 'Test description'
    const wrapper = mount(UCheckbox, {
      props: { description }
    })
    expect(wrapper.text()).toContain(description)
  })
});