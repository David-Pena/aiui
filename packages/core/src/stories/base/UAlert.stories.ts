import type { Meta, StoryObj } from '@storybook/vue3';
import { BellIcon } from '@heroicons/vue/24/outline';
import UAlert from '../../components/base/UAlert.vue';

const meta = {
  title: 'Base/UAlert',
  component: UAlert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'warning', 'info', 'error']
    },
    title: { control: 'text' },
    dismissible: { control: 'boolean' },
    modelValue: { control: 'boolean' }
  }
} satisfies Meta<typeof UAlert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    default: 'Your changes have been saved successfully.'
  },
  render: (args) => ({
    components: { UAlert },
    setup() {
      return { args };
    },
    template: '<UAlert v-bind="args">{{ args.default }}</UAlert>'
  })
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    default: 'Please review your information before continuing.'
  },
  render: (args) => ({
    components: { UAlert },
    setup() {
      return { args };
    },
    template: '<UAlert v-bind="args">{{ args.default }}</UAlert>'
  })
};

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    default: 'This feature is currently in beta testing.'
  },
  render: (args) => ({
    components: { UAlert },
    setup() {
      return { args };
    },
    template: '<UAlert v-bind="args">{{ args.default }}</UAlert>'
  })
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    default: 'An error occurred while processing your request.'
  },
  render: (args) => ({
    components: { UAlert },
    setup() {
      return { args };
    },
    template: '<UAlert v-bind="args">{{ args.default }}</UAlert>'
  })
};

export const Dismissible: Story = {
  args: {
    variant: 'info',
    dismissible: true,
    default: 'This alert can be dismissed.'
  },
  render: (args) => ({
    components: { UAlert },
    setup() {
      return { args };
    },
    template: '<UAlert v-model="visible" v-bind="args">{{ args.default }}</UAlert>',
    data() {
      return {
        visible: true
      }
    }
  })
};

export const CustomIcon: Story = {
  args: {
    variant: 'info',
    icon: BellIcon,
    title: 'Custom Icon',
    default: 'This alert uses a custom icon.'
  },
  render: (args) => ({
    components: { UAlert },
    setup() {
      return { args };
    },
    template: '<UAlert v-bind="args">{{ args.default }}</UAlert>'
  })
};

export const WithoutTitle: Story = {
  args: {
    variant: 'success',
    default: 'This is an alert without a title.'
  },
  render: (args) => ({
    components: { UAlert },
    setup() {
      return { args };
    },
    template: '<UAlert v-bind="args">{{ args.default }}</UAlert>'
  })
};

export const WithCustomContent: Story = {
  args: {
    variant: 'info',
    title: 'Custom Content'
  },
  render: (args) => ({
    components: { UAlert },
    setup() {
      return { args };
    },
    template: `
      <UAlert v-bind="args">
        <div class="space-y-2">
          <p>This alert contains custom content with:</p>
          <ul class="list-disc list-inside">
            <li>Multiple paragraphs</li>
            <li>List items</li>
            <li>And more...</li>
          </ul>
        </div>
      </UAlert>
    `
  })
};