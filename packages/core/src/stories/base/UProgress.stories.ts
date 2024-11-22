import type { Meta, StoryObj } from '@storybook/vue3';
import UProgress from '../../components/base/UProgress.vue';

const meta = {
  title: 'Base/UProgress',
  component: UProgress,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'number', min: 0, max: 100 },
    max: { control: 'number', min: 1 },
    size: {
      control: 'select',
      options: ['tiny', 'smaller', 'small', 'default']
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'info', 'error']
    },
    showValue: { control: 'boolean' },
    indeterminate: { control: 'boolean' }
  }
} satisfies Meta<typeof UProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 60
  }
};

export const WithValue: Story = {
  args: {
    value: 75,
    showValue: true
  }
};

export const Sizes: Story = {
  render: (args) => ({
    components: { UProgress },
    setup() {
      return { args };
    },
    template: `
      <div class="space-y-4">
        <UProgress v-bind="args" size="tiny" :value="25" />
        <UProgress v-bind="args" size="smaller" :value="50" />
        <UProgress v-bind="args" size="small" :value="75" />
        <UProgress v-bind="args" size="default" :value="100" />
      </div>
    `
  })
};

export const Variants: Story = {
  render: (args) => ({
    components: { UProgress },
    setup() {
      return { args };
    },
    template: `
      <div class="space-y-4">
        <UProgress v-bind="args" variant="default" :value="60" />
        <UProgress v-bind="args" variant="primary" :value="60" />
        <UProgress v-bind="args" variant="success" :value="60" />
        <UProgress v-bind="args" variant="warning" :value="60" />
        <UProgress v-bind="args" variant="info" :value="60" />
        <UProgress v-bind="args" variant="error" :value="60" />
      </div>
    `
  })
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true
  }
};

export const CustomMax: Story = {
  args: {
    value: 750,
    max: 1000,
    showValue: true
  }
};