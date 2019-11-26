require('dotenv').config()
const fetch = require('node-fetch');

// module.exports = async function() {
//   let data = await fetchSubscriptions()
//   // let data = [{"xbox-game-pass-ultimate":{"name":"Xbox Game Pass Ultimate","items":[]},"xbox-game-pass-xbox":{"name":"Xbox Game Pass (Xbox)","items":[]},"xbox-game-pass-pc":{"name":"Xbox Game Pass (PC)","items":[]},"origin-access-basic-pc":{"name":"Origin Access Basic (PC)","items":[]},"origin-access-premier-pc":{"name":"Origin Access Premier (PC)","items":[]},"ea-access-xbox":{"name":"EA Access (Xbox)","items":[]},"ea-access-ps4":{"name":"EA Access (PS4)","items":[]},"ps-now":{"name":"PS Now","items":[]},"uplay-plus":{"name":"Uplay+","items":[]}}]
//   return data;
// };



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
