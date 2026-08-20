import dotenv from "dotenv"
import nodemailer from "nodemailer";
dotenv.config();
const sendOTPMail = async (to, otp) => {


    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GOOGLE_PASSCODE,
      },
    });


    await transporter.sendMail({
      from: process.env.GMAIL_USERNAME,
      to,
      subject: "OTP for Reset Password",
      html: `<p>Your OTP for Password reset is <b>${otp}</b> .It expires in 5 minutes</p>`,
    });
};

export default sendOTPMail;