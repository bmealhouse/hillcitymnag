const jestDiff = require('jest-diff')
const Raven = require('raven')
const {fetchJson, checksum} = require('./utils')

// const EVENTS_WEBSITE = 'https://www.hillcitymnag.church/static/events.json'
// const EVENTS_API = 'https://www.hillcitymnag.church/api/events'
const SERMONS_WEBSITE = 'https://www.hillcitymnag.church/static/sermons.json'
const SERMONS_API = 'https://www.hillcitymnag.church/api/sermons'

module.exports = async req => {
  console.log('> fetchJson()')
  const [prevSermons, nextSermons] = await Promise.all([
    fetchJson(SERMONS_WEBSITE),
    fetchJson(SERMONS_API),
    // fetchJson(EVENTS_WEBSITE),
    // fetchJson(EVENTS_API),
  ]).catch(error => {
    console.error(error)
  })

  console.log('> checksum(sermons)')
  const sermonsHaveChanged = checksum(prevSermons) !== checksum(nextSermons)
  // const eventsHaveChanged = checksum(prevEvents) !== checksum(nextEvents)

  if (sermonsHaveChanged) {
    console.log('--- SERMONS CHANGED ---')
    Raven.captureMessage('Detected sermon changes', {
      extra: {diff: jestDiff(prevSermons, nextSermons, {expand: true})},
      level: 'info',
      req,
    })
  }

  // if (eventsHaveChanged) {
  //   Raven.captureMessage('Detected event changes', {
  //     extra: {diff: jestDiff(prevEvents, nextEvents, {expand: true})},
  //     level: 'info',
  //     req,
  //   })
  // }

  return sermonsHaveChanged // || eventsHaveChanged
}
