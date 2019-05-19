/* eslint-disable unicorn/filename-case */

let error = null

module.exports = {
  exec(cmd, options, callback) {
    let stdout

    if (cmd.includes('now --token')) {
      stdout = require('./mock-now-url')
    }

    callback(error, {stdout})
  },
  __mockError(err) {
    error = new Error(err)
  },
}
