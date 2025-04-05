const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a nodemailer transporter for Brevo
const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false, // TLS
  auth: {
    user: '8554aa001@smtp-brevo.com', // Your Brevo SMTP login
    pass: process.env.BREVO_SMTP_PASSWORD // Store your Master Password in .env file
  }
});

// Verify connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP connection verification failed:', error);
  } else {
    console.log('Brevo SMTP server is ready to take messages');
  }
});

// Route to handle support ticket submissions
router.post('/ticket', async (req, res) => {
  try {
    const { name, email, subject, category, message, isVendorRequest } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    // Create email content
    const mailOptions = {
      from: process.env.FROM_EMAIL || '8554aa001@smtp-brevo.com', // Can be any email you want it to appear from
      to: process.env.SUPPORT_EMAIL || 'your-support-email@example.com',
      subject: `Support Request: ${subject}`,
      html: `
        <h2>New Support Request</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Category:</strong> ${category || 'Not specified'}</p>
        <p><strong>Is Vendor Request:</strong> ${isVendorRequest ? 'Yes' : 'No'}</p>
        <div style="margin: 20px 0; padding: 15px; border-left: 4px solid #3949ab; background-color: #f5f5f5;">
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>
        <p><em>This email was sent from the ApnaBazaar support form.</em></p>
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Support email sent:', info.messageId);
    
    // Auto-reply to the user
    const autoReplyOptions = {
      from: process.env.FROM_EMAIL || 'shivampathak2k3@gmail.com',
      to: email,
      subject: `We've received your message: ${subject}`,
      html: `
        <h2>Thank you for contacting ApnaBazaar Support</h2>
        <p>Hello ${name},</p>
        <p>We've received your support request and will get back to you within 24-48 hours.</p>
        <p><strong>Your request details:</strong></p>
        <ul>
          <li><strong>Subject:</strong> ${subject}</li>
          <li><strong>Category:</strong> ${category || 'Not specified'}</li>
          ${isVendorRequest ? '<li><strong>Vendor Request:</strong> Yes</li>' : ''}
        </ul>
        <p>Please do not reply to this email. If you need to provide additional information, please submit a new support request.</p>
        <p>Best regards,<br>The ApnaBazaar Support Team</p>
      `
    };

    const replyInfo = await transporter.sendMail(autoReplyOptions);
    console.log('Auto-reply sent:', replyInfo.messageId);

    res.status(200).json({ success: true, message: 'Support request submitted successfully' });
  } catch (error) {
    console.error('Error sending support email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to submit support request',
      error: error.message 
    });
  }
});

module.exports = router;