import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { UserIcon } from '@heroicons/vue/24/outline'
import UCombobox from '../UCombobox.vue'

describe('UCombobox', () => {
  const defaultOptions = [
    { value: '1', label: 'Option 1', icon: UserIcon },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3', disabled: true }
  ]

  it('renders correctly with default props', () => {
    const wrapper = mount(UCombobox, {
      props: {
        options: defaultOptions
      }
    })
    expect(wrapper.find('[role="combobox"]').exists()).toBe(true)
  })

  it('shows placeholder when no option is selected', () => {
    const placeholder = 'Select an option'
    const wrapper = mount(UCombobox, {
      props: {
        options: defaultOptions,
        placeholder
      }
    })
    expect(wrapper.text()).toContain(placeholder)
  })

  it('shows selected option label', () => {
    const wrapper = mount(UCombobox, {
      props: {
        options: defaultOptions,
        modelValue: '1'
      }
    })
    expect(wrapper.text()).toContain('Option 1')
  })

  it('opens dropdown when clicked', async () => {
    const wrapper = mount(UCombobox, {
      props: {
        options: defaultOptions
      }
    })
    
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('#combobox-content').isVisible()).toBe(true)
  })

  it('filters options when searching', async () => {
    const wrapper = mount(UCombobox, {
      props: {
        options: defaultOptions,
        searchable: true
      }
    })
    
    await wrapper.find('button').trigger('click')
    await wrapper.find('input').setValue('Option 1')
    
    const options = wrapper.findAll('button').slice(1) // Skip trigger button
    expect(options).toHaveLength(1)
    expect(options[0].text()).toContain('Option 1')
  })

  it('emits events when option is selected', async () => {
    const wrapper = mount(UCombobox, {
      props: {
        options: defaultOptions
      }
    })
    
    await wrapper.find('button').trigger('click')
    await wrapper.findAll('button')[1].trigger('click')
    
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['1'])
    expect(wrapper.emitted('change')?.[0]).toEqual([defaultOptions[0]])
  })

  it('respects disabled state', () => {
    const wrapper = mount(UCombobox, {
      props: {
        options: defaultOptions,
        disabled: true
      }
    })
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('shows icons when showIcons is true', () => {
    const wrapper = mount(UCombobox, {
      props: {
        options: defaultOptions,
        modelValue: '1',
        showIcons: true
      }
    })
    expect(wrapper.findComponent(UserIcon).exists()).toBe(true)
  })

  it('applies variant classes correctly', () => {
    const wrapper = mount(UCombobox, {
      props: {
        options: defaultOptions,
        variant: 'filled'
      }
    })
    expect(wrapper.find('button').classes()).toContain('bg-secondary/50')
  })

  it('shows error message when provided', () => {
    const error = 'Error message'
    const wrapper = mount(UCombobox, {
      props: {
        options: defaultOptions,
        error
      }
    })
    expect(wrapper.text()).toContain(error)
  })

  it('handles keyboard navigation', async () => {
    const wrapper = mount(UCombobox, {
      props: {
        options: defaultOptions
      }
    })
    
    await wrapper.find('button').trigger('keydown', { key: 'Enter' })
    expect(wrapper.find('#combobox-content').isVisible()).toBe(true)
    
    await wrapper.find('button').trigger('keydown', { key: 'Escape' })
    expect(wrapper.find('#combobox-content').isVisible()).toBe(false)
  })
});