const nodeMailer = require("nodemailer");

const sendEmail = async(options) =>{
    const transportar = nodeMailer.createTransport({
        service: process.env.SMPT_SERVICE,
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        secure:true,
        // logger:true,
        // debug:true,
        // secureConnection:false,
        auth:{
            user: process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD,
        },
        // tls:{
        //     rejectUnauthorized:true
        // }
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to:options.email,
        subject: options.subject,
        text:options.message,
    };
    await transportar.sendMail(mailOptions);
}

module.exports = sendEmail