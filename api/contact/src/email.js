const sg = require('sendgrid')(process.env.HCAG_SENDGRID_API_KEY)

module.exports = data => {
  const request = sg.emptyRequest()

  request.method = 'POST'
  request.path = '/v3/mail/send'
  request.body = {
    personalizations: [
      {
        to: [{email: 'hillcityagchurch@gmail.com'}],
        subject: 'Message from https://hillcitymnag.church',
      },
    ],
    from: {
      name: data.name,
      email: data.email,
    },
    content: [
      {
        type: 'text/plain',
        value: data.message,
      },
    ],
  }

  // eslint-disable-next-line new-cap
  return sg.API(request)
}
