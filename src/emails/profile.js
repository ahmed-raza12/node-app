const sgMail = require('@sendgrid/mail');

const sgGrid_API = process.env.SENDGRID_API_KEY

sgMail.setApiKey(sgGrid_API);

const sendWelcomeMail = (name) => {
  const mailContent = {
    from: 'ar907080@gmail.com',
    to: 'ar907080@gmail.com',
    subject: 'Welcome to Profile-wishlist-app',
    text: `Hi ${name} Welcome to Profile-wishlist-app`,
    // html: '<strong>Resieving Emails at Spam!</strong>'
}
sgMail.send(mailContent)
}

const sendGoodByeMail = (name, email) => {
    const mailContent = {
      from: 'ar907080@gmail.com',
      to: 'ar907080@gmail.com',
      subject: `Bye ${email} from Profile-wishlist-app`,
      text: `Good Bye ${name} Welcome to Profile-wishlist-app`,
      // html: '<strong>Resieving Emails at Spam!</strong>'
  }
  sgMail.send(mailContent)
  }
module.exports = {
    sendWelcomeMail,
    sendGoodByeMail
}