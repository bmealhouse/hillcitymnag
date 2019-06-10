const crypto = require('crypto')
const path = require('path')
const {promisify} = require('util')
const exec = promisify(require('child_process').exec)
const fetch = require('node-fetch')

const NOW = path.resolve('./node_modules/.bin/now')

module.exports = {
  checksum(data) {
    const text = JSON.stringify(data)
    const hash = crypto.createHash('sha1')
    hash.update(text)
    return hash.digest('hex')
  },
  async prefetchData(cwd) {
    await exec('node prefetch-data.js', {
      cwd: path.join(cwd, 'www'),
    })
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
}
