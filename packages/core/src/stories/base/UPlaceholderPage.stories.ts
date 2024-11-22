import type { Meta, StoryObj } from '@storybook/vue3';
import { PlusIcon } from '@heroicons/vue/24/outline';
import UPlaceholderPage from '../../components/base/UPlaceholderPage.vue';
import UButton from '../../components/base/UButton.vue';

const meta = {
  title: 'Base/UPlaceholderPage',
  component: UPlaceholderPage,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    align: {
      control: 'select',
      options: ['center', 'left']
    }
  }
} satisfies Meta<typeof UPlaceholderPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'No items found',
    subtitle: 'Get started by creating your first item'
  },
  render: (args) => ({
    components: { UPlaceholderPage, UButton },
    setup() {
      return { args };
    },
    template: `
      <UPlaceholderPage v-bind="args">
        <template #action>
          <UButton variant="primary" :icon="PlusIcon">
            Create Item
          </UButton>
        </template>
      </UPlaceholderPage>
    `,
    data() {
      return {
        PlusIcon
      }
    }
  })
};

export const CustomImage: Story = {
  args: {
    title: 'No results found',
    subtitle: 'Try adjusting your search or filters'
  },
  render: (args) => ({
    components: { UPlaceholderPage },
    setup() {
      return { args };
    },
    template: `
      <UPlaceholderPage v-bind="args">
        <template #image>
          <img 
            src="https://via.placeholder.com/200" 
            alt="No results" 
            class="w-48 h-48 object-cover rounded-lg"
          />
        </template>
      </UPlaceholderPage>
    `
  })
};

export const LeftAligned: Story = {
  args: {
    title: 'Your inbox is empty',
    subtitle: 'Messages you receive will appear here',
    align: 'left'
  }
};

export const NoSubtitle: Story = {
  args: {
    title: 'No notifications'
  }
};

export const WithCustomAction: Story = {
  args: {
    title: 'No projects yet',
    subtitle: 'Create a project to get started with your team'
  },
  render: (args) => ({
    components: { UPlaceholderPage, UButton },
    setup() {
      return { args };
    },
    template: `
      <UPlaceholderPage v-bind="args">
        <template #action>
          <div class="flex gap-4">
            <UButton variant="primary" :icon="PlusIcon">Create Project</UButton>
            <UButton variant="outline">Import Project</UButton>
          </div>
        </template>
      </UPlaceholderPage>
    `,
    data() {
      return {
        PlusIcon
      }
    }
  })
};