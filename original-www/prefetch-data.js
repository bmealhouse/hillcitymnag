const fs = require('fs')
const https = require('https')
const path = require('path')

// fetchEvents()
fetchSermons()

// async function fetchEvents() {
//   const file = path.resolve('./static/events.json')
//   const res = await fetch('https://www.hillcitymnag.church/api/events')
//   const events = await res.json()

//   fs.writeFileSync(file, JSON.stringify(events, undefined, 0))
// }

async function fetchSermons() {
  const file = path.resolve('./static/sermons.json')
  const res = await fetch('https://www.hillcitymnag.church/api/sermons')
  const sermons = await res.json()

  fs.writeFileSync(file, JSON.stringify(sermons, undefined, 0))
}

function fetch(url) {
  return new Promise(resolve => {
    https.get(url, res => {
      let json = ''

      res.on('data', chunk => {
        json += chunk
      })

      res.on('end', () =>
        resolve({
          json: () => JSON.parse(json),
        }),
      )
    })
  })
}
