const user = require("../models/users");
const transporter=require('../mail/transport')
const jwt = require('jsonwebtoken')

module.exports = {
  register: async (req, res, next) => {
    try {
      const { email } = req.body;
      const latestOtp = await user
        .findOne({ email: email })
        .sort({ createdAt: -1 });
      if  (latestOtp && Date.now() - latestOtp.createdAt < 60000) {
        return res
          .status(429)
          .json({
            error: "Please wait at least 1 minute before generating a new OTP",
          });}

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      console.log(otp);
      transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "OTP verification",
        text: `Your OTP: ${otp}`
        
      })
      const newUser = new user({ email, otp });
      await newUser.save();
      res.json({ message: 'OTP generated and sent successfully' });
    } catch (error) {
        console.log(error);
        next();
    }
  },
  login:async (req, res,next) => {
    try {
        const {email,otp}=req.body;
        const latestOtp=await user.findOne({ email}).sort({createdAt:-1})

        if (latestOtp& latestOtp. blockedUntil && latestOtp. blockedUntil>new Date()){
            res.status(403).json({ error: 'Account blocked. Please try again later.' });
        }
        if ( latestOtp || latestOtp.otp !== otp) {
           latestOtp.wrongAttempts += 1;
            if  (latestOtp.wrongAttempts >= 2) {
             latestOtp.blockedUntil = new Date(Date.now() + 3600000); 
            }
            await latestOtp.save();
            return res.status(401).json({ error: 'Invalid OTP' });
          }const otpExpiration = 5 * 60 * 1000; 
          if (Date.now() - latestOtp.createdAt > otpExpiration) {
            return res.status(401).json({ error: 'OTP expired' });
          }
          await latestOtp.deleteOne();
          const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });
          res.json({ token });

    } catch (error) {
        console.log(error);
    }

  }
};
