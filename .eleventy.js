require('dotenv').config();
const fetch = require('node-fetch')
const cleanCSS = require('clean-css')

// dayjs.extend(require('dayjs/plugin/advancedFormat'))
// dayjs.extend(require('dayjs/plugin/calendar'))


module.exports = function(config) {

  

  config.addFilter('cssmin', code => {
    return new cleanCSS({}).minify(code).styles;
  });

  config.addFilter('timestamp', time => {
    return dayjs(time)
  })

  config.addFilter('timestampUnix', time => {
    return dayjs.unix(time)
  })

  config.addFilter('absoluteDay', time => {
    return dayjs(time).format('dddd, MMM D')
  })

  config.addFilter('absolute', time => {
    return dayjs(time).format('MMM D, YYYY')
  })


  // let nunjucksEnvironment = new Nunjucks.Environment(
  //   new Nunjucks.FileSystemLoader(["src/site/_templates"]), // we need to pass in our includes dir here
  //   { 
  //     lstripBlocks: true,
  //     trimBlocks: true,
  //     autoescape: false
  //    });

  // nunjucksEnvironment.addGlobal('testFunction', function(what){
  //   console.log(what)
  // });
  // eleventyConfig.setLibrary("njk", nunjucksEnvironment);

  config.addPassthroughCopy('src/css');
  config.addPassthroughCopy('netlify.toml', '')
  config.addPassthroughCopy('_redirects', '')
  config.setUseGitIgnore(false);

  return {
    dir: {
      input: 'src',
      output: 'dist'
    },
    htmlTemplateEngine: "njk",
  }

}