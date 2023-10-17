// doesn't work w/ package.json -> type: module
// if we do more works here, let's try to convert it to ES module (w/ export)
module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-storysource"
  ],
  "staticDirs": [
    '../docs'
  ],
  // The following error appeared when TAD added a dependency the lib "trace-mapping"
  // ERROR in /home/poweruser/git/foundation-jhipster-gwt/foundation-react/node_modules/@jridgewell/trace-mapping/dist/trace-mapping.mjs 379:48-54
  // Can't import the named export 'decode' from non EcmaScript module (only default export is available)
  // First reflex: google search => https://github.com/storybookjs/storybook/issues/16690#issuecomment-971579785
  // Applied, works => no questions asked :)
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    })
    return config
  }
}