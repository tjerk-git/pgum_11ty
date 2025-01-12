module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("bundle.css");
  eleventyConfig.addPassthroughCopy("app.js");
  eleventyConfig.addPassthroughCopy("js/profile-canvas.js");
  eleventyConfig.addPassthroughCopy({"images": "images"});
};