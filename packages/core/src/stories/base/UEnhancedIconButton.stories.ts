import type { Meta, StoryObj } from '@storybook/vue3';
import { 
  PlusIcon, 
  TrashIcon,
  PencilIcon,
  HeartIcon,
  EllipsisHorizontalIcon
} from '@heroicons/vue/24/outline';
import UEnhancedIconButton from '../../components/base/UEnhancedIconButton.vue';

const meta = {
  title: 'Base/UEnhancedIconButton',
  component: UEnhancedIconButton,
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
    tooltipPosition: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left']
    },
    popoverPosition: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left']
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    popover: { control: 'boolean' }
  }
} satisfies Meta<typeof UEnhancedIconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithTooltip: Story = {
  args: {
    variant: 'primary',
    icon: PlusIcon,
    label: 'Add item',
    tooltip: 'Add new item'
  }
};

export const WithPopover: Story = {
  args: {
    variant: 'ghost',
    icon: EllipsisHorizontalIcon,
    label: 'More options',
    popover: true
  },
  render: (args) => ({
    components: { UEnhancedIconButton },
    setup() {
      return { args };
    },
    template: `
      <UEnhancedIconButton v-bind="args">
        <template #popover>
          <div class="space-y-2">
            <button class="w-full text-left px-2 py-1 rounded hover:bg-gray-100">Edit</button>
            <button class="w-full text-left px-2 py-1 rounded hover:bg-gray-100">Delete</button>
            <button class="w-full text-left px-2 py-1 rounded hover:bg-gray-100">Share</button>
          </div>
        </template>
      </UEnhancedIconButton>
    `
  })
};

export const WithTooltipAndPopover: Story = {
  args: {
    variant: 'outline',
    icon: EllipsisHorizontalIcon,
    label: 'More options',
    tooltip: 'More actions',
    popover: true
  },
  render: (args) => ({
    components: { UEnhancedIconButton },
    setup() {
      return { args };
    },
    template: `
      <UEnhancedIconButton v-bind="args">
        <template #popover>
          <div class="space-y-2">
            <button class="w-full text-left px-2 py-1 rounded hover:bg-gray-100">Edit</button>
            <button class="w-full text-left px-2 py-1 rounded hover:bg-gray-100">Delete</button>
          </div>
        </template>
      </UEnhancedIconButton>
    `
  })
};

export const CustomPositions: Story = {
  args: {
    variant: 'primary',
    icon: HeartIcon,
    label: 'Like',
    tooltip: 'Like this item',
    tooltipPosition: 'right',
    popover: true,
    popoverPosition: 'right'
  }
};

export const Loading: Story = {
  args: {
    loading: true,
    icon: PlusIcon,
    label: 'Loading'
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    icon: PlusIcon,
    label: 'Disabled',
    tooltip: 'This action is disabled'
  }
};