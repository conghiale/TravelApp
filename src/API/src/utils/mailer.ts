const nodeMailer = require('nodemailer')
require('dotenv').config();

export const sendMail = (to, subject, htmlText) => {
    const transport = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.PWD_EMAIL,
        },
        tls: {
            rejectUnauthorized: false,
        }
    })

    const options = {
        from: process.env.USER_EMAIL,
        to: to,
        subject: subject,
        html: htmlText
    }
    
    return transport.sendMail(options);
}