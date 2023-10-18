import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email, verificationToken) => {
  // create nodemailer transport
  const transporter = nodemailer.createTransport({
    //configure email service
    service: 'gmail',
    auth: {
      user: 'testingnodejs7@gmail.com',
      pass: 'teezexdecbnopaan',
    },
  });

  // compose email message
  const mailOptions = {
    from: 'amazon.com',
    to: email,
    subject: 'Email verification',
    text: `please click the following link to verify your email : https://react-native-amazon-clone-server.onrender.com/api/v1/auth/verify/${verificationToken}`,
  };

  await transporter.sendMail(mailOptions);
};
