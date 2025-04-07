const moment = require("moment");

module.exports = function (eleventyConfig) {
  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy("bundle.css");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("app.js");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("robots.txt");

  // Date formatting filters for blog
  eleventyConfig.addFilter("fromNow", (date) => {
    return moment(date).fromNow();
  });
  
  eleventyConfig.addFilter("readableDate", (date) => {
    return moment(date).format("MMMM D, YYYY");
  });
  
  eleventyConfig.addFilter("dateIso", (date) => {
    return moment(date).toISOString();
  });

  // Collections
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("posts/*.md");
  });
  
  eleventyConfig.addCollection("blog", function (collectionApi) {
    return collectionApi.getFilteredByGlob("blog/*.md");
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
    },
  };
};
