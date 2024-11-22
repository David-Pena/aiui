import type { Meta, StoryObj } from '@storybook/vue3';
import { 
  HomeIcon,
  UserIcon,
  Cog6ToothIcon,
  BeakerIcon
} from '@heroicons/vue/24/outline';
import UNavbar from '../../components/base/UNavbar.vue';
import UButton from '../../components/base/UButton.vue';

const meta = {
  title: 'Base/UNavbar',
  component: UNavbar,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'colored']
    },
    layout: {
      control: 'select',
      options: ['simple', 'centered', 'split']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    sticky: { control: 'boolean' },
    transparent: { control: 'boolean' }
  }
} satisfies Meta<typeof UNavbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  { label: 'Home', to: '/', icon: HomeIcon, active: true },
  { label: 'Profile', to: '/profile', icon: UserIcon },
  { label: 'Settings', to: '/settings', icon: Cog6ToothIcon }
];

export const Simple: Story = {
  args: {
    brand: 'Company',
    brandIcon: BeakerIcon,
    items: defaultItems,
    layout: 'simple'
  },
  render: (args) => ({
    components: { UNavbar, UButton },
    setup() {
      return { args };
    },
    template: `
      <UNavbar v-bind="args">
        <template #actions>
          <UButton variant="primary">Sign In</UButton>
        </template>
      </UNavbar>
    `
  })
};

export const Centered: Story = {
  args: {
    brand: 'Company',
    brandIcon: BeakerIcon,
    items: defaultItems,
    layout: 'centered'
  },
  render: (args) => ({
    components: { UNavbar, UButton },
    setup() {
      return { args };
    },
    template: `
      <UNavbar v-bind="args">
        <template #actions>
          <UButton variant="primary">Sign In</UButton>
        </template>
      </UNavbar>
    `
  })
};

export const Colored: Story = {
  args: {
    brand: 'Company',
    brandIcon: BeakerIcon,
    items: defaultItems,
    variant: 'colored'
  },
  render: (args) => ({
    components: { UNavbar, UButton },
    setup() {
      return { args };
    },
    template: `
      <UNavbar v-bind="args">
        <template #actions>
          <UButton variant="secondary">Sign In</UButton>
        </template>
      </UNavbar>
    `
  })
};

export const Bordered: Story = {
  args: {
    brand: 'Company',
    brandIcon: BeakerIcon,
    items: defaultItems,
    variant: 'bordered'
  }
};

export const Transparent: Story = {
  args: {
    brand: 'Company',
    brandIcon: BeakerIcon,
    items: defaultItems,
    transparent: true
  },
  render: (args) => ({
    components: { UNavbar },
    setup() {
      return { args };
    },
    template: `
      <div class="bg-gradient-to-r from-blue-500 to-purple-500 p-8">
        <UNavbar v-bind="args" />
      </div>
    `
  })
};