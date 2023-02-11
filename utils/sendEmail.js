const nodemailer = require("nodemailer");

const sendEmail = async (options) => {

    //   let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure:true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
        
        
        // service: 'gmail', // or your own SMTP 
        // providerauth: {user: 'htarek47@gmail.com'}, // user -> important
        // pass: '54455454' // pass -> important (do not use password)
    });

    // send mail with defined transport object
    let message = {
        from: `Charity App <htarek47@gmail.com>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    };
    const info = await transporter.sendMail(message);

    console.log("Message sent: %s", info.messageId);

};



module.exports = sendEmail;