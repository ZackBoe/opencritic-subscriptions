require('dotenv').config();
const cleanCSS = require('clean-css')

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