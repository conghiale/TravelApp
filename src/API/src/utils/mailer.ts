const nodeMailer = require('nodemailer')

export const sendMail = (to, subject, htmlText) => {
    const transport = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'tdq1711@gmail.com',
            pass: 'ovjlqlogfjshaeyr',
        }
    })

    const options = {
        from: 'tdq1711@gmail.com',
        to: to,
        subject: subject,
        html: htmlText
    }
    
    return transport.sendMail(options);
}