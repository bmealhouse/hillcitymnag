const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.HCAG_SENDGRID_API_KEY)

module.exports = async ({name, email, message}) => {
  await sgMail.send({
    to: email === 'bmealhouse@gmail.com' ? email : 'hillcityagchurch@gmail.com',
    from: `${name} <noreply@bmealhouse.dev>`,
    replyTo: `${name} <${email.trim()}>`,
    subject: 'Message from https://www.hillcitymnag.church',
    text: `
Name: ${name}
Email: ${email}

${message}`,
  })
}
