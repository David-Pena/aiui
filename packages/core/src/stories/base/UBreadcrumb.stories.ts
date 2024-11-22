import type { Meta, StoryObj } from '@storybook/vue3';
import { 
  ChevronRightIcon, 
  HomeIcon,
  FolderIcon,
  DocumentIcon
} from '@heroicons/vue/24/outline';
import UBreadcrumb from '../../components/base/UBreadcrumb.vue';

const meta = {
  title: 'Base/UBreadcrumb',
  component: UBreadcrumb,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    variant: {
      control: 'select',
      options: ['default', 'muted']
    },
    showHome: { control: 'boolean' }
  }
} satisfies Meta<typeof UBreadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', to: '/' },
      { label: 'Documents', to: '/documents' },
      { label: 'Current Page' }
    ]
  }
};

export const WithIcons: Story = {
  args: {
    items: [
      { label: 'Home', to: '/', icon: HomeIcon },
      { label: 'Documents', to: '/documents', icon: FolderIcon },
      { label: 'Report.pdf', icon: DocumentIcon }
    ]
  }
};

export const WithHomeIcon: Story = {
  args: {
    showHome: true,
    items: [
      { label: 'Documents', to: '/documents' },
      { label: 'Projects', to: '/documents/projects' },
      { label: 'Current Project' }
    ]
  }
};

export const CustomSeparator: Story = {
  args: {
    separator: '/',
    items: [
      { label: 'Home', to: '/' },
      { label: 'Category', to: '/category' },
      { label: 'Subcategory' }
    ]
  }
};

export const Sizes: Story = {
  render: (args) => ({
    components: { UBreadcrumb },
    setup() {
      const items = [
        { label: 'Home', to: '/' },
        { label: 'Products', to: '/products' },
        { label: 'Categories' }
      ];
      return { items };
    },
    template: `
      <div class="space-y-4">
        <UBreadcrumb :items="items" size="sm" />
        <UBreadcrumb :items="items" size="md" />
        <UBreadcrumb :items="items" size="lg" />
      </div>
    `
  })
};

export const Variants: Story = {
  render: (args) => ({
    components: { UBreadcrumb },
    setup() {
      const items = [
        { label: 'Home', to: '/' },
        { label: 'Products', to: '/products' },
        { label: 'Categories' }
      ];
      return { items };
    },
    template: `
      <div class="space-y-4">
        <UBreadcrumb :items="items" variant="default" />
        <UBreadcrumb :items="items" variant="muted" />
      </div>
    `
  })
};