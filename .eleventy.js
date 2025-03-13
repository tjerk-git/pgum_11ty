module.exports = function(eleventyConfig) {
    // Passthrough copy for static assets
    eleventyConfig.addPassthroughCopy("bundle.css");
    eleventyConfig.addPassthroughCopy("images");
    eleventyConfig.addPassthroughCopy("app.js");
    eleventyConfig.addPassthroughCopy("js");

    return {
        dir: {
            input: ".",
            output: "_site",
            includes: "_includes"
        }
    };
};