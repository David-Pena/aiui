import type { Meta, StoryObj } from '@storybook/vue3';
import { MagnifyingGlassIcon, EnvelopeIcon } from '@heroicons/vue/24/outline';
import UInput from '../../components/base/UInput.vue';

const meta = {
  title: 'Base/UInput',
  component: UInput,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'date']
    },
    variant: {
      control: 'select',
      options: ['default', 'filled', 'underlined', 'floating']
    },
    placeholder: { control: 'text' },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    iconPosition: {
      control: 'select',
      options: ['left', 'right']
    }
  }
} satisfies Meta<typeof UInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...'
  }
};

export const WithLabel: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email'
  }
};

export const FloatingLabel: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    variant: 'floating'
  }
};

export const WithLeftIcon: Story = {
  args: {
    placeholder: 'Search...',
    icon: MagnifyingGlassIcon,
    iconPosition: 'left'
  }
};

export const WithRightIcon: Story = {
  args: {
    placeholder: 'Search...',
    icon: MagnifyingGlassIcon,
    iconPosition: 'right'
  }
};

export const FilledVariant: Story = {
  args: {
    placeholder: 'Filled input',
    variant: 'filled',
    icon: EnvelopeIcon
  }
};

export const UnderlinedVariant: Story = {
  args: {
    placeholder: 'Underlined input',
    variant: 'underlined'
  }
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password'
  }
};

export const WithError: Story = {
  args: {
    placeholder: 'Enter text...',
    error: 'This field is required'
  }
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true
  }
};

export const DateInput: Story = {
  args: {
    type: 'date',
    label: 'Select Date',
    variant: 'floating'
  }
};

export const FloatingLabelWithIcon: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    variant: 'floating',
    icon: EnvelopeIcon,
    iconPosition: 'left'
  }
};

export const AllVariants: Story = {
  render: (args) => ({
    components: { UInput },
    setup() {
      return { EnvelopeIcon };
    },
    template: `
      <div class="space-y-4">
        <UInput
          label="Default Input"
          placeholder="Default variant"
          :icon="EnvelopeIcon"
        />
        <UInput
          label="Filled Input"
          placeholder="Filled variant"
          variant="filled"
          :icon="EnvelopeIcon"
        />
        <UInput
          label="Underlined Input"
          placeholder="Underlined variant"
          variant="underlined"
          :icon="EnvelopeIcon"
        />
        <UInput
          label="Floating Label"
          placeholder="Floating label variant"
          variant="floating"
          :icon="EnvelopeIcon"
        />
      </div>
    `
  })
};