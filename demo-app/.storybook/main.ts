import { mergeConfig } from 'vite';

export default {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],

  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-storysource",
    "@storybook/addon-mdx-gfm"
  ],

  "staticDirs": [
    '../docs'
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {}
  },

  async viteFinal(config) {
    return mergeConfig(config, {
      server: {
        fs: {
          // idem cf. demo-app/vite.config.ts; apparently some settings (such as this one) are not inherited
          allow: ['..'],
        },
      }
    });
  }
}