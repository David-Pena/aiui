import type { Meta, StoryObj } from '@storybook/vue3';
import { 
  ArrowRightIcon, 
  PlusIcon, 
  ArrowLeftIcon 
} from '@heroicons/vue/24/outline';
import UButton from '../../components/base/UButton.vue';

const meta = {
  title: 'Base/UButton',
  component: UButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    type: {
      control: 'select',
      options: ['button', 'submit']
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right']
    }
  }
} satisfies Meta<typeof UButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    default: 'Primary Button'
  },
  render: (args) => ({
    components: { UButton },
    setup() {
      return { args };
    },
    template: '<UButton v-bind="args">{{ args.default }}</UButton>'
  })
};

export const WithLeftIcon: Story = {
  args: {
    variant: 'primary',
    default: 'Continue',
    icon: ArrowRightIcon,
    iconPosition: 'left'
  },
  render: (args) => ({
    components: { UButton },
    setup() {
      return { args };
    },
    template: '<UButton v-bind="args">{{ args.default }}</UButton>'
  })
};

export const WithRightIcon: Story = {
  args: {
    variant: 'primary',
    default: 'Next',
    icon: ArrowRightIcon,
    iconPosition: 'right'
  },
  render: (args) => ({
    components: { UButton },
    setup() {
      return { args };
    },
    template: '<UButton v-bind="args">{{ args.default }}</UButton>'
  })
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    default: 'Secondary Button'
  },
  render: (args) => ({
    components: { UButton },
    setup() {
      return { args };
    },
    template: '<UButton v-bind="args">{{ args.default }}</UButton>'
  })
};

export const Loading: Story = {
  args: {
    loading: true,
    default: 'Loading'
  },
  render: (args) => ({
    components: { UButton },
    setup() {
      return { args };
    },
    template: '<UButton v-bind="args">{{ args.default }}</UButton>'
  })
};

export const Disabled: Story = {
  args: {
    disabled: true,
    default: 'Disabled'
  },
  render: (args) => ({
    components: { UButton },
    setup() {
      return { args };
    },
    template: '<UButton v-bind="args">{{ args.default }}</UButton>'
  })
};