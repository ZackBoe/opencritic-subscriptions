require('dotenv').config()
const fetch = require('node-fetch');

module.exports = async () => {
  let data = await fetchSubscriptions()
  return data
}

async function fetchSubscriptions() {
  
  const results = await fetch('https://opencritic.com/api/game-sequence')
  .then(function(response) {
    return response.json()
  }).then(async function(subscriptions) {
    
    let data = await Promise.all(subscriptions.map(async sub => {

      let items = await getGames(sub.key)
      sub.items = items
      console.log(`${sub.label} -  ${sub.items.length}`)
      return sub
    }))

    return data
  })
  
  return results
}

async function getGames(key, offset = 0, items) {
  if(!items) items = []
  
  return fetch(`https://opencritic.com/api/game-sequence/games/${key}?skip=${offset}`)
  .then(response => response.json())
  .then(body => {
    items = items.concat(body)
    if(body.length > 0) {
      return getGames(key, offset+20, items)
    } else return items
  })
}
