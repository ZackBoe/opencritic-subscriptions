require('dotenv').config()
const dayjs = require('dayjs')

module.exports = async function() {

  return {
    'title': 'OpenCritic Subscriptions Single Pages',
    'description': `List all games in a subscription on a single page.`,
    'build': dayjs(Date.now()).format('dddd, MMM D YYYY')
  }

}