import type { Meta, StoryObj } from '@storybook/vue3';
import UBoltKudos from '../../components/base/UBoltKudos.vue';

const meta = {
  title: 'Base/UBoltKudos',
  component: UBoltKudos,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['minimal', 'modern', 'elegant', 'playful', 'compact']
    },
    theme: {
      control: 'select',
      options: ['light', 'dark', 'primary', 'colored']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    animate: { control: 'boolean' },
    tagline: { control: 'text' },
    showYear: { control: 'boolean' },
    url: { control: 'text' },
    iconOnly: { control: 'boolean' }
  }
} satisfies Meta<typeof UBoltKudos>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Modern: Story = {
  args: {
    variant: 'modern',
    theme: 'light'
  }
};

export const Elegant: Story = {
  args: {
    variant: 'elegant',
    theme: 'dark'
  }
};

export const Playful: Story = {
  args: {
    variant: 'playful',
    theme: 'colored'
  }
};

export const Minimal: Story = {
  args: {
    variant: 'minimal',
    theme: 'light'
  }
};

export const Compact: Story = {
  args: {
    variant: 'compact',
    theme: 'primary'
  }
};

export const WithLink: Story = {
  args: {
    variant: 'modern',
    theme: 'primary',
    url: 'https://bolt.new'
  }
};

export const IconOnly: Story = {
  args: {
    variant: 'modern',
    theme: 'light',
    iconOnly: true
  }
};

export const WithYear: Story = {
  args: {
    variant: 'elegant',
    theme: 'dark',
    showYear: true
  }
};