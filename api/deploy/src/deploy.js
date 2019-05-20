const path = require('path')
const {promisify} = require('util')
const download = require('download')
const Raven = require('raven')
const rimraf = promisify(require('rimraf'))
const {fetchData, now} = require('./utils')

const DEPLOY_DIR = path.resolve('/tmp')

module.exports = async (owner, repo) => {
  const url = `https://github.com/${owner}/${repo}/archive/master.tar.gz`

  // console.log(`Downloading ${url}`)
  await download(url, DEPLOY_DIR, {extract: true})

  const cwd = path.join(DEPLOY_DIR, `${repo}-master`)
  const zeitToken = process.env.HCAG_ZEIT_TOKEN

  try {
    // console.log(`Deploying ${owner}/${repo}`)
    await fetchData(cwd)
    await now(zeitToken, cwd)
    // const url = await now(zeitToken, cwd)
    // await verifyDeployment(url)
    // await aliasDeployment(zeitToken, cwd)
    Raven.captureMessage(`Deployed ${owner}/${repo}`, {level: 'info'})
  } finally {
    await rimraf(cwd)
  }
}
