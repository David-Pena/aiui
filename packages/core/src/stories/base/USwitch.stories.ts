import type { Meta, StoryObj } from '@storybook/vue3';
import { ref, computed } from 'vue';
import { BellIcon, BellSlashIcon } from '@heroicons/vue/24/outline';
import USwitch from '../../components/base/USwitch.vue';

const meta = {
  title: 'Base/USwitch',
  component: USwitch,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'info', 'error']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    iconPosition: {
      control: 'select',
      options: ['left', 'right']
    }
  }
} satisfies Meta<typeof USwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { USwitch },
    setup() {
      const enabled = ref(false);
      return { args, enabled };
    },
    template: '<USwitch v-model="enabled" v-bind="args" />'
  })
};

export const WithLabel: Story = {
  args: {
    label: 'Notifications',
    description: 'Receive notifications when someone mentions you'
  },
  render: (args) => ({
    components: { USwitch },
    setup() {
      const enabled = ref(false);
      return { args, enabled };
    },
    template: '<USwitch v-model="enabled" v-bind="args" />'
  })
};

export const WithIcon: Story = {
  args: {
    label: 'Notifications',
    icon: BellIcon,
    iconPosition: 'left'
  },
  render: (args) => ({
    components: { USwitch },
    setup() {
      const enabled = ref(false);
      return { args, enabled, BellIcon };
    },
    template: '<USwitch v-model="enabled" v-bind="args" />'
  })
};

export const Variants: Story = {
  render: (args) => ({
    components: { USwitch },
    setup() {
      const switches = ref({
        default: true,
        primary: true,
        success: true,
        warning: true,
        info: true,
        error: true
      });
      return { args, switches };
    },
    template: `
      <div class="space-y-4">
        <USwitch v-model="switches.default" variant="default" label="Default Variant" />
        <USwitch v-model="switches.primary" variant="primary" label="Primary Variant" />
        <USwitch v-model="switches.success" variant="success" label="Success Variant" />
        <USwitch v-model="switches.warning" variant="warning" label="Warning Variant" />
        <USwitch v-model="switches.info" variant="info" label="Info Variant" />
        <USwitch v-model="switches.error" variant="error" label="Error Variant" />
      </div>
    `
  })
};

export const Sizes: Story = {
  render: (args) => ({
    components: { USwitch },
    setup() {
      const enabled = ref({
        sm: false,
        md: false,
        lg: false
      });
      return { args, enabled };
    },
    template: `
      <div class="space-y-4">
        <USwitch v-model="enabled.sm" size="sm" label="Small Size" />
        <USwitch v-model="enabled.md" size="md" label="Medium Size" />
        <USwitch v-model="enabled.lg" size="lg" label="Large Size" />
      </div>
    `
  })
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Notifications',
    description: 'This switch is currently disabled'
  },
  render: (args) => ({
    components: { USwitch },
    setup() {
      const enabled = ref(false);
      return { args, enabled };
    },
    template: '<USwitch v-model="enabled" v-bind="args" />'
  })
};

export const WithDynamicIcon: Story = {
  args: {
    label: 'Notifications'
  },
  render: (args) => ({
    components: { USwitch },
    setup() {
      const enabled = ref(false);
      return { 
        args, 
        enabled,
        icon: computed(() => enabled.value ? BellIcon : BellSlashIcon)
      };
    },
    template: '<USwitch v-model="enabled" :icon="icon" v-bind="args" />'
  })
};