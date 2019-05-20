const crypto = require('crypto')
const path = require('path')
const {promisify} = require('util')
const exec = promisify(require('child_process').exec)
const fetch = require('node-fetch')

const NOW = path.resolve('./node_modules/.bin/now')
const TIMEOUT = process.env.NODE_ENV === 'test' ? 0 : 30000

module.exports = {
  async aliasDeployment(zeitToken, cwd) {
    // console.log('Aliasing for production')
    await exec(`${NOW} alias --token ${zeitToken}`, {cwd})
  },
  checksum(data) {
    const text = JSON.stringify(data)
    const hash = crypto.createHash('sha1')
    hash.update(text)
    return hash.digest('hex')
  },
  async fetchData(cwd) {
    await exec('node fetch-data.js', {cwd})
  },
  async fetchJson(url) {
    const res = await fetch(url)
    return res.json()
  },
  async now(zeitToken, cwd) {
    const {stdout} = await exec(
      `${NOW} --target production --token ${zeitToken}`,
      {cwd},
    )
    return stdout
  },
  verifyDeployment(url) {
    return new Promise((resolve, reject) => {
      let attempt = 1

      async function verify() {
        // console.log('  ...attempting to verify deployment')

        if (attempt > 10) {
          return reject(new Error('Could not verify deployment'))
        }

        const res = await fetch(url)
        const html = await res.text()

        if (html.includes('Hill City Assembly of God Church')) {
          return resolve()
        }

        attempt += 1
        setTimeout(verify, TIMEOUT)
      }

      verify()
    })
  },
}
