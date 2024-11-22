import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Bolt UI',
  description: 'A Vue 3 Component Library',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Components', link: '/components/' },
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/guide/' },
          { text: 'Installation', link: '/guide/installation' },
        ],
      },
      {
        text: 'Components',
        items: [
          { text: 'Button', link: '/components/button' },
          { text: 'Input', link: '/components/input' },
          { text: 'Checkbox', link: '/components/checkbox' },
          { text: 'Switch', link: '/components/switch' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/yourusername/ai-ui' },
    ],
  },
  vite: {
    // This ensures proper resolution of your local package
    resolve: {
      dedupe: ['vue'],
    },
  },
});
