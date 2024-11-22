import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import '@ai-ui/core/style.css'
import UButtonDemo from "../../components/examples/ButtonDemo.vue"

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Register Ai UI components globally
    app.component('UButton', UButtonDemo)
    // Add more components as needed
  }
} satisfies Theme