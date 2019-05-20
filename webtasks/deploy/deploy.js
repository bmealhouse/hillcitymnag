const fetch = require('node-fetch')

module.exports = async function(context, cb) {
  try {
    const res = await fetch('https://www.hillcitymnag.church/api/deploy', {
      method: 'POST',
      headers: {
        'HCAG-DEPLOYMENT-TOKEN': context.secrets.HCAG_DEPLOYMENT_TOKEN,
      },
    })
    if (res.status >= 400) {
      console.log(`${res.status}: ${res.statusText}`)
    }
  } catch (error) {
    console.log(`Error: ${error}`)
  }

  cb(null)
}
