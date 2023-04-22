const sg = require('sendgrid')(process.env.HCAG_SENDGRID_API_KEY)

module.exports = ({name, email, message}) => {
  const request = sg.emptyRequest()

  request.method = 'POST'
  request.path = '/v3/mail/send'
  request.body = {
    personalizations: [
      {
        to: [
          {
            email:
              email === 'bmealhouse@gmail.com'
                ? email
                : 'hillcityagchurch@gmail.com',
          },
        ],
        subject: 'Message from https://www.hillcitymnag.church',
      },
    ],
    from: {
      email: 'noreply@bmealhouse.dev',
      name, // : 'Hill City AOG',
    },
    replyTo: {
      email,
      name,
    },
    content: [
      {
        type: 'text/plain',
        value: `
Name: ${name}
Email: ${email}

${message}`,
      },
    ],
  }

  // eslint-disable-next-line new-cap
  return sg.API(request)
}
