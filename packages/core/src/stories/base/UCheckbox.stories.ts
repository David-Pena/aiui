import type { Meta, StoryObj } from '@storybook/vue3';
import UCheckbox from '../../components/base/UCheckbox.vue';

const meta = {
  title: 'Base/UCheckbox',
  component: UCheckbox,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'select',
      options: [true, false, 'indeterminate']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' }
  }
} satisfies Meta<typeof UCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Accept terms'
  }
};

export const WithDescription: Story = {
  args: {
    label: 'Marketing emails',
    description: 'Receive emails about new products, features, and more.'
  }
};

export const Required: Story = {
  args: {
    label: 'Required field',
    required: true
  }
};

export const WithError: Story = {
  args: {
    label: 'Accept terms',
    error: 'You must accept the terms to continue'
  }
};

export const Indeterminate: Story = {
  args: {
    label: 'Select all',
    modelValue: 'indeterminate'
  }
};

export const Disabled: Story = {
  args: {
    label: 'Disabled option',
    disabled: true
  }
};

export const Sizes: Story = {
  render: (args) => ({
    components: { UCheckbox },
    template: `
      <div class="space-y-4">
        <UCheckbox size="sm" label="Small checkbox" />
        <UCheckbox size="md" label="Medium checkbox" />
        <UCheckbox size="lg" label="Large checkbox" />
      </div>
    `
  })
};

export const States: Story = {
  render: (args) => ({
    components: { UCheckbox },
    template: `
      <div class="space-y-4">
        <UCheckbox label="Unchecked" />
        <UCheckbox :modelValue="true" label="Checked" />
        <UCheckbox modelValue="indeterminate" label="Indeterminate" />
        <UCheckbox disabled label="Disabled" />
        <UCheckbox disabled :modelValue="true" label="Disabled checked" />
      </div>
    `
  })
};