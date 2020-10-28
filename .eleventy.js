require('dotenv').config();
const pluginSvelte = require("@oliverjam/eleventy-plugin-svelte");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginSvelte);
  return {
    dir: {
      input: 'src',
    }
  }
}