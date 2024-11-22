import type { Meta, StoryObj } from '@storybook/vue3';
import { 
  HomeIcon, 
  UserIcon, 
  CogIcon,
  DocumentIcon,
  FolderIcon,
  MagnifyingGlassIcon
} from '@heroicons/vue/24/outline';
import UPanel from '../../components/base/UPanel.vue';
import UButton from '../../components/base/UButton.vue';
import UInput from '../../components/base/UInput.vue';

const meta = {
  title: 'Base/UPanel',
  component: UPanel,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'ghost']
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg']
    },
    collapsible: { control: 'boolean' },
    divider: { control: 'boolean' },
    asLinks: { control: 'boolean' }
  }
} satisfies Meta<typeof UPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultTabs = [
  { id: 'all', label: 'All', active: true },
  { id: 'documents', label: 'Documents' },
  { id: 'shared', label: 'Shared' }
];

const defaultBlocks = [
  { id: '1', label: 'Home', icon: HomeIcon },
  { id: '2', label: 'Documents', icon: DocumentIcon },
  { id: '3', label: 'Settings', icon: CogIcon, disabled: true }
];

export const Default: Story = {
  args: {
    title: 'Panel Title',
    description: 'Optional description text',
    default: '<div class="space-y-4"><p>Panel content goes here.</p><p>You can add any content you want.</p></div>'
  },
  render: (args) => ({
    components: { UPanel },
    setup() {
      return { args };
    },
    template: '<UPanel v-bind="args" v-html="args.default" />'
  })
};

export const WithTabs: Story = {
  args: {
    title: 'Files',
    tabs: defaultTabs
  },
  render: (args) => ({
    components: { UPanel },
    setup() {
      return { args };
    },
    template: `
      <UPanel v-bind="args">
        <p class="p-4">Content for {{ args.tabs.find(t => t.active)?.label }} tab</p>
      </UPanel>
    `
  })
};

export const WithBlocks: Story = {
  args: {
    blocks: defaultBlocks
  },
  render: (args) => ({
    components: { UPanel },
    setup() {
      return { args };
    },
    template: '<UPanel v-bind="args" />'
  })
};

export const WithSearch: Story = {
  render: (args) => ({
    components: { UPanel, UInput },
    setup() {
      const blocks = [
        { id: '1', type: 'custom', label: 'Search' },
        { id: '2', label: 'All Files', icon: FolderIcon },
        { id: '3', label: 'Documents', icon: DocumentIcon },
        { id: '4', label: 'Images', icon: DocumentIcon }
      ];
      
      return { blocks, MagnifyingGlassIcon };
    },
    template: `
      <UPanel :blocks="blocks">
        <template #block-1>
          <div class="p-4 w-full">
            <UInput 
              placeholder="Search files..." 
              variant="filled"
              :icon="MagnifyingGlassIcon"
            />
          </div>
        </template>
      </UPanel>
    `
  })
};

export const WithCheckboxes: Story = {
  render: (args) => ({
    components: { UPanel },
    setup() {
      const blocks = [
        { id: '1', type: 'checkbox', label: 'Remember me', checked: true },
        { id: '2', type: 'checkbox', label: 'Save credentials' },
        { id: '3', type: 'checkbox', label: 'Offline mode', disabled: true }
      ];
      
      return { blocks };
    },
    template: '<UPanel :blocks="blocks" />'
  })
};

export const AsLinks: Story = {
  args: {
    asLinks: true,
    blocks: [
      { id: '1', label: 'Profile Settings', icon: UserIcon },
      { id: '2', label: 'Security', icon: CogIcon },
      { id: '3', label: 'Documentation', icon: DocumentIcon }
    ]
  }
};

export const Collapsible: Story = {
  args: {
    title: 'Collapsible Panel',
    description: 'Click to toggle content',
    collapsible: true,
    blocks: defaultBlocks
  },
  render: (args) => ({
    components: { UPanel },
    setup() {
      return { args };
    },
    template: '<UPanel v-model="isOpen" v-bind="args" />',
    data() {
      return {
        isOpen: true
      }
    }
  })
};

export const CustomHeader: Story = {
  render: (args) => ({
    components: { UPanel, UButton },
    template: `
      <UPanel>
        <template #header>
          <div class="flex items-center justify-between w-full p-4">
            <div>
              <h3 class="font-medium">Custom Header</h3>
              <p class="text-sm text-muted-foreground">With action button</p>
            </div>
            <UButton variant="outline" size="sm">Action</UButton>
          </div>
        </template>
        <div class="p-4">
          <p>Panel content with custom header.</p>
        </div>
      </UPanel>
    `
  })
};