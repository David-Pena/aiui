import type { Meta, StoryObj } from '@storybook/vue3';
import { 
  ChevronDownIcon,
  UserIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
  DocumentDuplicateIcon
} from '@heroicons/vue/24/outline';
import UDropdown from '../../components/base/UDropdown.vue';

const meta = {
  title: 'Base/UDropdown',
  component: UDropdown,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'ghost']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end']
    },
    hover: { control: 'boolean' },
    up: { control: 'boolean' },
    showIcons: { control: 'boolean' },
    disabled: { control: 'boolean' }
  }
} satisfies Meta<typeof UDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { id: 'profile', label: 'Profile', icon: UserIcon },
  { id: 'settings', label: 'Settings', icon: CogIcon },
  { id: 'divider1', divider: true },
  { id: 'logout', label: 'Logout', icon: ArrowRightOnRectangleIcon }
];

export const Default: Story = {
  args: {
    label: 'Menu',
    options: defaultOptions
  }
};

export const IconButton: Story = {
  args: {
    icon: EllipsisVerticalIcon,
    variant: 'ghost',
    options: [
      { id: 'edit', label: 'Edit', icon: PencilIcon },
      { id: 'duplicate', label: 'Duplicate', icon: DocumentDuplicateIcon },
      { id: 'divider', divider: true },
      { id: 'delete', label: 'Delete', icon: TrashIcon }
    ]
  }
};

export const Hoverable: Story = {
  args: {
    label: 'Hover Me',
    hover: true,
    options: defaultOptions
  }
};

export const CustomAlignment: Story = {
  args: {
    label: 'Align End',
    align: 'end',
    options: defaultOptions
  }
};

export const Dropup: Story = {
  args: {
    label: 'Drop Up',
    up: true,
    options: defaultOptions
  }
};

export const WithoutIcons: Story = {
  args: {
    label: 'No Icons',
    showIcons: false,
    options: defaultOptions
  }
};

export const CustomContent: Story = {
  args: {
    label: 'Custom Content'
  },
  render: (args) => ({
    components: { UDropdown },
    setup() {
      return { args };
    },
    template: `
      <UDropdown v-bind="args">
        <div class="p-2 min-w-[200px]">
          <h3 class="font-medium mb-2">Custom Dropdown</h3>
          <p class="text-sm text-muted-foreground">
            This is a custom dropdown content with any HTML you want.
          </p>
        </div>
      </UDropdown>
    `
  })
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
    options: defaultOptions
  }
};

export const WithDisabledOptions: Story = {
  args: {
    label: 'Menu',
    options: [
      { id: 'active', label: 'Active Option', icon: UserIcon },
      { id: 'disabled', label: 'Disabled Option', icon: CogIcon, disabled: true },
      { id: 'divider', divider: true },
      { id: 'another', label: 'Another Option', icon: DocumentDuplicateIcon }
    ]
  }
};