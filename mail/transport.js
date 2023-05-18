const nodemailer = require('nodemailer')
const email=process.env.EMAIL
const password=process.env.PASS

const transporter=nodemailer.createTransport({
    host: "smtp.gmail.com",
    port:587,
    secure: true,
    service : 'Gmail',
    
    auth: {
      user: email,
      pass: password,
    }
})


module.exports=transporter;