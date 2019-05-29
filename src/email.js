const sgMail = require('@sendgrid/mail');

const SENDGRID_API_KEY = "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"

sgMail.setApiKey(SENDGRID_API_KEY);

const msg = {
    to: 'ar907080@gmail.com',
    from: 'ar907080@gmail.com',
    subject: 'First test email',
    text: 'Sending email by sendgrid',
    html: '<strong>Resieving Emails at Spam!</strong>'
}

sgMail.send(msg)
console.log('send it!');
