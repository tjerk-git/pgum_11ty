const CleanCSS = require("clean-css");
const Terser = require("terser");

module.exports = function (eleventyConfig) {
  // Minify CSS
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // Minify JS
  eleventyConfig.addNunjucksAsyncFilter("jsmin", async function (code, callback) {
    try {
      const minified = await Terser.minify(code);
      callback(null, minified.code);
    } catch (err) {
      console.error("Terser error: ", err);
      callback(null, code);
    }
  });

  // Pass through files
  eleventyConfig.addPassthroughCopy({"images": "images"});
  
  // Process and minify CSS and JS files
  eleventyConfig.addTemplateFormats("css");
  eleventyConfig.addTemplateFormats("js");
  
  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: async function(inputContent) {
      return async () => {
        return new CleanCSS({}).minify(inputContent).styles;
      };
    }
  });
  
  eleventyConfig.addExtension("js", {
    outputFileExtension: "js",
    compile: async function(inputContent) {
      return async () => {
        const minified = await Terser.minify(inputContent);
        return minified.code;
      };
    }
  });
};