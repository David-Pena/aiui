import type { Meta, StoryObj } from '@storybook/vue3';
import UCarousel from '../../components/base/UCarousel.vue';

const meta = {
  title: 'Base/UCarousel',
  component: UCarousel,
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'select',
      options: ['horizontal', 'vertical', 'grid']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full']
    },
    theme: {
      control: 'select',
      options: ['light', 'dark']
    },
    showCaptions: { control: 'boolean' },
    autoplay: { control: 'boolean' },
    autoplayDelay: { control: 'number' },
    pauseOnHover: { control: 'boolean' },
    loop: { control: 'boolean' },
    slidesPerView: { control: 'number' },
    spaceBetween: { control: 'number' }
  }
} satisfies Meta<typeof UCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  {
    id: '1',
    image: 'https://picsum.photos/seed/1/800/400',
    title: 'Mountain Lake',
    description: 'A serene mountain lake surrounded by peaks'
  },
  {
    id: '2',
    image: 'https://picsum.photos/seed/2/800/400',
    title: 'Forest Stream',
    description: 'A peaceful stream flowing through the forest'
  },
  {
    id: '3',
    image: 'https://picsum.photos/seed/3/800/400',
    title: 'Coastal Sunset',
    description: 'Beautiful sunset over the ocean'
  },
  {
    id: '4',
    image: 'https://picsum.photos/seed/4/800/400',
    title: 'Mountain Range',
    description: 'Majestic mountain peaks at sunset'
  }
];

export const Horizontal: Story = {
  args: {
    items: defaultItems,
    layout: 'horizontal'
  }
};

export const HorizontalDark: Story = {
  args: {
    items: defaultItems,
    layout: 'horizontal',
    theme: 'dark'
  }
};

export const Vertical: Story = {
  args: {
    items: defaultItems,
    layout: 'vertical',
    size: 'lg'
  }
};

export const Grid: Story = {
  args: {
    items: defaultItems,
    layout: 'grid',
    slidesPerView: 2,
    spaceBetween: 20,
    size: 'lg'
  }
};

export const WithoutCaptions: Story = {
  args: {
    items: defaultItems,
    showCaptions: false
  }
};

export const Autoplay: Story = {
  args: {
    items: defaultItems,
    autoplay: true,
    autoplayDelay: 2000,
    pauseOnHover: true
  }
};

export const Sizes: Story = {
  render: (args) => ({
    components: { UCarousel },
    setup() {
      return { 
        items: defaultItems,
        sizes: ['sm', 'md', 'lg'] as const
      };
    },
    template: `
      <div class="space-y-8">
        <div v-for="size in sizes" :key="size">
          <h3 class="text-lg font-semibold mb-4">Size: {{ size }}</h3>
          <UCarousel :items="items" :size="size" />
        </div>
      </div>
    `
  })
};