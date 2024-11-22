import type { Meta, StoryObj } from '@storybook/vue3';
import { 
  CreditCardIcon,
  UserIcon,
  BellIcon,
  LockClosedIcon
} from '@heroicons/vue/24/outline';
import UAccordion from '../../components/base/UAccordion.vue';

const meta = {
  title: 'Base/UAccordion',
  component: UAccordion,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'ghost']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    multiple: { control: 'boolean' },
    dividers: { control: 'boolean' },
    showIcons: { control: 'boolean' }
  }
} satisfies Meta<typeof UAccordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  {
    id: 'item-1',
    title: 'Account',
    content: 'Manage your account settings and preferences.',
    icon: UserIcon
  },
  {
    id: 'item-2',
    title: 'Notifications',
    content: 'Choose what notifications you receive.',
    icon: BellIcon
  },
  {
    id: 'item-3',
    title: 'Security',
    content: 'Update your security preferences.',
    icon: LockClosedIcon
  },
  {
    id: 'item-4',
    title: 'Billing',
    content: 'Manage billing and payment information.',
    icon: CreditCardIcon
  }
];

export const Default: Story = {
  args: {
    items: defaultItems
  }
};

export const Multiple: Story = {
  args: {
    items: defaultItems,
    multiple: true
  }
};

export const Bordered: Story = {
  args: {
    items: defaultItems,
    variant: 'bordered'
  }
};

export const Ghost: Story = {
  args: {
    items: defaultItems,
    variant: 'ghost'
  }
};

export const WithoutIcons: Story = {
  args: {
    items: defaultItems,
    showIcons: false
  }
};

export const WithoutDividers: Story = {
  args: {
    items: defaultItems,
    dividers: false
  }
};

export const CustomContent: Story = {
  args: {
    items: defaultItems
  },
  render: (args) => ({
    components: { UAccordion },
    setup() {
      return { args };
    },
    template: `
      <UAccordion v-bind="args">
        <template #item-1>
          <div class="space-y-4">
            <h4 class="font-medium">Custom Account Content</h4>
            <p>This is a custom content section with more complex layout.</p>
            <div class="flex gap-4">
              <button class="px-4 py-2 bg-primary text-white rounded-md">
                Edit Profile
              </button>
              <button class="px-4 py-2 border rounded-md">
                View Settings
              </button>
            </div>
          </div>
        </template>
      </UAccordion>
    `
  })
};

export const Sizes: Story = {
  render: (args) => ({
    components: { UAccordion },
    setup() {
      const items = defaultItems.slice(0, 2);
      return { items };
    },
    template: `
      <div class="space-y-8">
        <UAccordion :items="items" size="sm" />
        <UAccordion :items="items" size="md" />
        <UAccordion :items="items" size="lg" />
      </div>
    `
  })
};