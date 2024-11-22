import type { Meta, StoryObj } from '@storybook/vue3';
import UCard from '../../components/base/UCard.vue';

const meta = {
  title: 'Base/UCard',
  component: UCard,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered']
    }
  }
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    default: '<div class="p-6"><h3 class="text-lg font-semibold">Card Title</h3><p class="mt-2">Card content goes here.</p></div>'
  },
  render: (args) => ({
    components: { UCard },
    setup() {
      return { args };
    },
    template: '<Card v-bind="args" v-html="args.default" />'
  })
};

export const Bordered: Story = {
  args: {
    variant: 'bordered',
    default: '<div class="p-6"><h3 class="text-lg font-semibold">Bordered Card</h3><p class="mt-2">This card has a border.</p></div>'
  },
  render: (args) => ({
    components: { UCard },
    setup() {
      return { args };
    },
    template: '<Card v-bind="args" v-html="args.default" />'
  })
};