const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a reusable nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send welcome email to new users
const sendWelcomeEmail = async (user) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `Welcome to ApnaBazaar!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #4f46e5;">Welcome to ApnaBazaar!</h2>
          <p>Hello ${user.name},</p>
          <p>Thank you for joining ApnaBazaar. We're excited to have you on board!</p>
          ${user.role === 'vendor' ? `
            <p>Your vendor account has been created successfully. You can now:</p>
            <ul>
              <li>Set up your shop profile</li>
              <li>Add products to your inventory</li>
              <li>Start selling to local customers</li>
            </ul>
          ` : `
            <p>Your account has been created successfully. You can now:</p>
            <ul>
              <li>Browse products from local vendors</li>
              <li>Shop from the comfort of your home</li>
              <li>Support local businesses</li>
            </ul>
          `}
          <p>If you have any questions, feel free to contact our support team at ${process.env.SUPPORT_EMAIL}.</p>
          <p>Best regards,<br>The ApnaBazaar Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${user.email}`);
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
};

module.exports = {
  transporter,
  sendWelcomeEmail
}; 