import { defineConfig, transformWithEsbuild } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // because some lib was accessing "global"
    nodePolyfills({
      protocolImports: true,
    }),
    // JSX in .js files, part 1
    // Because there is JSX syntax in .js files. Cf. https://stackoverflow.com/a/76726872/306143. The "accepted" answer of the question didn't work
    {
      name: 'treat-js-files-as-jsx',
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) return null

        // Use the exposed transform from vite, instead of directly
        // transforming with esbuild
        return transformWithEsbuild(code, id, {
          loader: 'tsx',
          jsx: 'automatic',
        })
      },
    },
    react({
      // In foundation, we needed this. But here, this is not OK, because there are a lot of files which don't import React.
      // Actually this is the recommended way to go, and there is an issue in foundation.
      // cf. https://github.com/vitejs/vite/issues/6215#issuecomment-1076980852
      // jsxRuntime: "classic",
      babel: {
        parserOpts: {
          // I didn't know the difference between "decorators" and "decorators-legacy". Hence I have initially chosen "decorators"
          // However, I got the error: Using the export keyword between a decorator and a class is not allowed. Please use `export @dec class` instead.
          // and cf. https://stackoverflow.com/a/54516632/306143, w/ decorators-legacy it worked
          plugins: ['decorators-legacy']
        }
      }
    })
  ],
  // This section is not honored by storybook. See main.js for corresponding configs
  server: {
    port: 3000,
    open: true,
    fs: {
      // Allow serving files from one level up to the project root
      // To avoid: The request url ".../node_modules/semantic-ui-css/themes/default/assets/fonts/icons.ttf" is outside of Vite serving allow list.
      allow: ['..'],
    },
  },
  resolve: {
    alias: {
      // duplicated in tsconfig.json
      "@famiprog-foundation/react-gantt": "/../src",
      // W/ this line, we use foundation as a linked dir. To switch to "use as lib", comment this, and add in package.json, in dependencies:
      // "@crispico/foundation-react": "link:../../foundation-jhipster-gwt/foundation-react/dist/foundation-react",
      // For the "storybook" script, I think "yarn docs" needs to be removed. There seems to be a dependency issue, which I didn't look into
      "@crispico/foundation-react": "/../../foundation-jhipster-gwt/foundation-react/src/foundation-react"
    }
  },
  // JSX in .js files, part 2
  optimizeDeps: {
    // This exclude was needed because working with fixed-data-table-2 as a yarn link (for development purpose) was not working.
    // Because of some caching the modifications made in fixed-data-table-2, were not seen when starting the storybook script
    exclude: ["fixed-data-table-2"],
    force: true,
    esbuildOptions: {
      loader: {
        '.js': 'tsx',
      },
    },
  }
})

// I don't understand why here it doesn't work. But in foundation (both w/ vite and CRA) it works
// process.env.BROWSER = "chrome"