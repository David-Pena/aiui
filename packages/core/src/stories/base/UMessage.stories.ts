import type { Meta, StoryObj } from '@storybook/vue3';
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon
} from '@heroicons/vue/24/outline';
import UMessage from '../../components/base/UMessage.vue';

const meta = {
  title: 'Base/UMessage',
  component: UMessage,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'info', 'error']
    },
    dismissible: { control: 'boolean' },
    modelValue: { control: 'boolean' }
  }
} satisfies Meta<typeof UMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    default: 'This is a default message'
  },
  render: (args) => ({
    components: { UMessage },
    setup() {
      return { args };
    },
    template: '<UMessage v-bind="args">{{ args.default }}</UMessage>'
  })
};

export const Success: Story = {
  args: {
    variant: 'success',
    icon: CheckCircleIcon,
    default: 'Your changes have been saved successfully.'
  },
  render: (args) => ({
    components: { UMessage },
    setup() {
      return { args };
    },
    template: '<UMessage v-bind="args">{{ args.default }}</UMessage>'
  })
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    icon: ExclamationTriangleIcon,
    default: 'Please review your information before continuing.'
  },
  render: (args) => ({
    components: { UMessage },
    setup() {
      return { args };
    },
    template: '<UMessage v-bind="args">{{ args.default }}</UMessage>'
  })
};

export const Info: Story = {
  args: {
    variant: 'info',
    icon: InformationCircleIcon,
    default: 'This feature is currently in beta.'
  },
  render: (args) => ({
    components: { UMessage },
    setup() {
      return { args };
    },
    template: '<UMessage v-bind="args">{{ args.default }}</UMessage>'
  })
};

export const Error: Story = {
  args: {
    variant: 'error',
    icon: XCircleIcon,
    default: 'An error occurred while processing your request.'
  },
  render: (args) => ({
    components: { UMessage },
    setup() {
      return { args };
    },
    template: '<UMessage v-bind="args">{{ args.default }}</UMessage>'
  })
};

export const Dismissible: Story = {
  args: {
    dismissible: true,
    default: 'This message can be dismissed'
  },
  render: (args) => ({
    components: { UMessage },
    setup() {
      return { args };
    },
    template: '<UMessage v-model="visible" v-bind="args">{{ args.default }}</UMessage>',
    data() {
      return {
        visible: true
      }
    }
  })
};

export const CustomContent: Story = {
  args: {
    variant: 'info',
    icon: InformationCircleIcon,
    dismissible: true
  },
  render: (args) => ({
    components: { UMessage },
    setup() {
      return { args };
    },
    template: `
      <UMessage v-bind="args">
        <h4 class="font-medium mb-1">Update Available</h4>
        <p class="text-sm">A new software update is available. Would you like to install it now?</p>
      </UMessage>
    `
  })
};