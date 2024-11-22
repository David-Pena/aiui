import type { Meta, StoryObj } from '@storybook/vue3';
import { 
  HomeIcon,
  UserIcon,
  CogIcon,
  DocumentIcon,
  PhotoIcon,
  FilmIcon
} from '@heroicons/vue/24/outline';
import UTabs from '../../components/base/UTabs.vue';

const meta = {
  title: 'Base/UTabs',
  component: UTabs,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'boxed', 'rounded', 'underlined', 'pills']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end']
    },
    fullWidth: { control: 'boolean' },
    iconsOnly: { control: 'boolean' },
    divider: { control: 'boolean' }
  }
} satisfies Meta<typeof UTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultTabs = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'profile', label: 'Profile', icon: UserIcon },
  { id: 'settings', label: 'Settings', icon: CogIcon },
  { id: 'disabled', label: 'Disabled', icon: DocumentIcon, disabled: true }
];

export const Default: Story = {
  args: {
    tabs: defaultTabs
  },
  render: (args) => ({
    components: { UTabs },
    setup() {
      return { args };
    },
    template: `
      <UTabs v-bind="args">
        <template v-for="tab in args.tabs" :key="tab.id" #[tab.id]>
          <div class="p-4">Content for {{ tab.label }} tab</div>
        </template>
      </UTabs>
    `
  })
};

export const Boxed: Story = {
  args: {
    tabs: defaultTabs,
    variant: 'boxed'
  }
};

export const Rounded: Story = {
  args: {
    tabs: defaultTabs,
    variant: 'rounded'
  }
};

export const Underlined: Story = {
  args: {
    tabs: defaultTabs,
    variant: 'underlined'
  }
};

export const Pills: Story = {
  args: {
    tabs: defaultTabs,
    variant: 'pills'
  }
};

export const Centered: Story = {
  args: {
    tabs: defaultTabs,
    align: 'center'
  }
};

export const FullWidth: Story = {
  args: {
    tabs: defaultTabs,
    fullWidth: true
  }
};

export const IconsOnly: Story = {
  args: {
    tabs: [
      { id: 'photos', label: 'Photos', icon: PhotoIcon },
      { id: 'videos', label: 'Videos', icon: FilmIcon },
      { id: 'files', label: 'Files', icon: DocumentIcon }
    ],
    iconsOnly: true,
    variant: 'pills'
  }
};

export const Sizes: Story = {
  render: (args) => ({
    components: { UTabs },
    setup() {
      const tabs = [
        { id: 'tab1', label: 'Tab 1', icon: DocumentIcon },
        { id: 'tab2', label: 'Tab 2', icon: PhotoIcon },
        { id: 'tab3', label: 'Tab 3', icon: CogIcon }
      ];
      return { tabs };
    },
    template: `
      <div class="space-y-8">
        <UTabs :tabs="tabs" size="sm" />
        <UTabs :tabs="tabs" size="md" />
        <UTabs :tabs="tabs" size="lg" />
      </div>
    `
  })
};

export const CustomContent: Story = {
  args: {
    tabs: defaultTabs,
    variant: 'boxed'
  },
  render: (args) => ({
    components: { UTabs },
    setup() {
      return { args };
    },
    template: `
      <UTabs v-bind="args">
        <template #home>
          <div class="p-4 space-y-4">
            <h3 class="text-lg font-semibold">Welcome Home</h3>
            <p>This is the home tab content with custom styling.</p>
          </div>
        </template>
        <template #profile>
          <div class="p-4 space-y-4">
            <h3 class="text-lg font-semibold">User Profile</h3>
            <p>This is the profile tab content with custom styling.</p>
          </div>
        </template>
        <template #settings>
          <div class="p-4 space-y-4">
            <h3 class="text-lg font-semibold">Settings</h3>
            <p>This is the settings tab content with custom styling.</p>
          </div>
        </template>
      </UTabs>
    `
  })
};