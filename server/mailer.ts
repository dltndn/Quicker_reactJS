const nodemailer = require("nodemailer");

export default (async () => {
  require('dotenv').config()
  const transporter = nodemailer.createTransport({
    service: "gmail",  
    auth: {
      user: process.env.MAIL_ID, 
      pass: process.env.MAIL_PW, 
    },
  });
  
  const mailOptions = {
    from: process.env.MAIL_ID,
    to: "상대 이메일",
    subject: "이메일 인증",
    html: `<h1>이메일 인증</h1>
            <div>
              테스트
            </div>`,
    text: "인증메일입니다.",
  };
  
  const info = await transporter.sendMail(mailOptions);
  console.log(info);
})()
