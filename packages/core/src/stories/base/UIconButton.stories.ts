import type { Meta, StoryObj } from '@storybook/vue3';
import { 
  PlusIcon, 
  TrashIcon,
  PencilIcon,
  HeartIcon 
} from '@heroicons/vue/24/outline';
import UIconButton from '../../components/base/UIconButton.vue';

const meta = {
  title: 'Base/UIconButton',
  component: UIconButton,
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
    }
  }
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    icon: PlusIcon,
    label: 'Add item'
  }
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    icon: HeartIcon,
    label: 'Like'
  }
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    icon: PencilIcon,
    label: 'Edit'
  }
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    icon: TrashIcon,
    label: 'Delete'
  }
};

export const Small: Story = {
  args: {
    size: 'sm',
    icon: PlusIcon,
    label: 'Add item'
  }
};

export const Large: Story = {
  args: {
    size: 'lg',
    icon: PlusIcon,
    label: 'Add item'
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
    label: 'Disabled'
  }
};