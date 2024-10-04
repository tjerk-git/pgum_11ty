
const moment = require('moment');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("bundle.css");
  eleventyConfig.addPassthroughCopy("app.js");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addFilter('timeAgo', function (date) {
    if (!date) return '';
    return moment(date).fromNow();
  });
};