const nodemailer = require('nodemailer');

const transporter =  nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.MAIL,
        pass: process.env.SMTP_PASSWORD
    }
});

const sendMail = async (email, subject, content) => {
    try {
        const mailOption = {
            from: process.env.SMTP_MAIL,
            to: email,
            subject: subject,
            html: content
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                return console.log(error);
            }
            console.log('Mail sent', info.messageId)
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { sendMail }