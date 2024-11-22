import type { Meta, StoryObj } from '@storybook/vue3';
import UTag from '../../components/base/UTag.vue';

const meta = {
  title: 'Base/UTag',
  component: UTag,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger']
    },
    shape: {
      control: 'select',
      options: ['rounded', 'curved', 'outlined', 'elevated']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    dismissible: { control: 'boolean' },
    modelValue: { control: 'boolean' }
  }
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Rounded: Story = {
  args: {
    shape: 'rounded',
    default: 'Rounded Tag'
  },
  render: (args) => ({
    components: { UTag },
    setup() {
      return { args };
    },
    template: '<UTag v-bind="args">{{ args.default }}</UTag>'
  })
};

export const Curved: Story = {
  args: {
    shape: 'curved',
    default: 'Curved Tag'
  },
  render: (args) => ({
    components: { UTag },
    setup() {
      return { args };
    },
    template: '<UTag v-bind="args">{{ args.default }}</UTag>'
  })
};

export const Outlined: Story = {
  args: {
    shape: 'outlined',
    default: 'Outlined Tag'
  },
  render: (args) => ({
    components: { UTag },
    setup() {
      return { args };
    },
    template: '<UTag v-bind="args">{{ args.default }}</UTag>'
  })
};

export const Elevated: Story = {
  args: {
    shape: 'elevated',
    default: 'Elevated Tag'
  },
  render: (args) => ({
    components: { UTag },
    setup() {
      return { args };
    },
    template: '<UTag v-bind="args">{{ args.default }}</UTag>'
  })
};

export const Success: Story = {
  args: {
    variant: 'success',
    default: 'Success Tag'
  },
  render: (args) => ({
    components: { UTag },
    setup() {
      return { args };
    },
    template: '<UTag v-bind="args">{{ args.default }}</UTag>'
  })
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    default: 'Warning Tag'
  },
  render: (args) => ({
    components: { UTag },
    setup() {
      return { args };
    },
    template: '<UTag v-bind="args">{{ args.default }}</UTag>'
  })
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    default: 'Danger Tag'
  },
  render: (args) => ({
    components: { UTag },
    setup() {
      return { args };
    },
    template: '<UTag v-bind="args">{{ args.default }}</UTag>'
  })
};

export const Dismissible: Story = {
  args: {
    dismissible: true,
    default: 'Dismissible Tag'
  },
  render: (args) => ({
    components: { UTag },
    setup() {
      return { args };
    },
    template: '<UTag v-model="visible" v-bind="args">{{ args.default }}</UTag>',
    data() {
      return {
        visible: true
      }
    }
  })
};

export const OutlinedSuccess: Story = {
  args: {
    shape: 'outlined',
    variant: 'success',
    default: 'Outlined Success'
  },
  render: (args) => ({
    components: { UTag },
    setup() {
      return { args };
    },
    template: '<UTag v-bind="args">{{ args.default }}</UTag>'
  })
};

export const ElevatedDanger: Story = {
  args: {
    shape: 'elevated',
    variant: 'danger',
    default: 'Elevated Danger'
  },
  render: (args) => ({
    components: { UTag },
    setup() {
      return { args };
    },
    template: '<UTag v-bind="args">{{ args.default }}</UTag>'
  })
};