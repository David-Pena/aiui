import type { Meta, StoryObj } from '@storybook/vue3';
import { 
  UserIcon,
  CogIcon,
  KeyIcon,
  BellIcon,
  DocumentIcon
} from '@heroicons/vue/24/outline';
import UCombobox from '../../components/base/UCombobox.vue';

const meta = {
  title: 'Base/UCombobox',
  component: UCombobox,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'underlined']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    disabled: { control: 'boolean' },
    searchable: { control: 'boolean' },
    showIcons: { control: 'boolean' },
    placeholder: { control: 'text' },
    label: { control: 'text' },
    error: { control: 'text' }
  }
} satisfies Meta<typeof UCombobox>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { value: 'profile', label: 'Profile Settings', icon: UserIcon },
  { value: 'security', label: 'Security', description: 'Password and authentication', icon: KeyIcon },
  { value: 'notifications', label: 'Notifications', icon: BellIcon },
  { value: 'preferences', label: 'Preferences', icon: CogIcon, disabled: true },
  { value: 'documents', label: 'Documents', icon: DocumentIcon }
];

export const Default: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Select an option'
  }
};

export const WithLabel: Story = {
  args: {
    options: defaultOptions,
    label: 'Settings',
    placeholder: 'Select a setting'
  }
};

export const Filled: Story = {
  args: {
    options: defaultOptions,
    variant: 'filled',
    placeholder: 'Select an option'
  }
};

export const Underlined: Story = {
  args: {
    options: defaultOptions,
    variant: 'underlined',
    placeholder: 'Select an option'
  }
};

export const WithoutIcons: Story = {
  args: {
    options: defaultOptions,
    showIcons: false,
    placeholder: 'Select an option'
  }
};

export const NonSearchable: Story = {
  args: {
    options: defaultOptions,
    searchable: false,
    placeholder: 'Select an option'
  }
};

export const WithError: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Select an option',
    error: 'Please select an option'
  }
};

export const Disabled: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Select an option',
    disabled: true
  }
};

export const Sizes: Story = {
  render: (args) => ({
    components: { UCombobox },
    setup() {
      return { defaultOptions };
    },
    template: `
      <div class="space-y-4">
        <UCombobox
          :options="defaultOptions"
          size="sm"
          placeholder="Small combobox"
        />
        <UCombobox
          :options="defaultOptions"
          size="md"
          placeholder="Medium combobox"
        />
        <UCombobox
          :options="defaultOptions"
          size="lg"
          placeholder="Large combobox"
        />
      </div>
    `
  })
};