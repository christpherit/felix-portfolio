import Contact from '../models/Contact.js';
import nodemailer from 'nodemailer';
import { contactAutoReplyTemplate } from '../templates/contactAutoReplyTemplate.js';
import { contactNotificationTemplate } from '../templates/contactNotificationMailTemplate.js';


// @desc    Submit contact message (and dispatch notification)
// @route   POST /api/contacts
// @access  Public

export const createContact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: 'All inputs must be completed.',
    });
  }

  try {
    // Save contact
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    // Configure transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    // Notification email (to you)
    const notificationMail = {
      from: `"Christopher Felix" <${process.env.EMAIL_USER}>`,
      to: process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER,
      subject: `📩 New Portfolio Contact - ${subject}`,
      html: contactNotificationTemplate({
        name,
        email,
        subject,
        message,
      }),
    };

    // Auto reply email (to sender)
    const autoReplyMail = {
      from: `"Christopher Felix" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thank you for contacting Christopher Felix',
      html: contactAutoReplyTemplate({
        name,
        subject,
        message,
      }),
    };

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        await transporter.verify();
        console.log("SMTP connection successful");
        // Send notification to yourself
        await transporter.sendMail(notificationMail);

        // Send thank-you email to sender
        await transporter.sendMail(autoReplyMail);

        console.log('Notification and auto-reply emails sent successfully.');
      } catch (mailError) {
        console.error('Email sending failed:', mailError);
      }
    } else {
      console.log('Email credentials are not configured.');
    }

    return res.status(201).json({
      success: true,
      message: 'Message sent successfully.',
      data: contact,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// export const createContact = async (req, res) => {
//   const { name, email, subject, message } = req.body;

//   if (!name || !email || !subject || !message) {
//     return res.status(400).json({ success: false, message: 'All inputs must be completed.' });
//   }

//   try {
//     const contact = await Contact.create({ name, email, subject, message });

//     // Configure Nodemailer dynamic transporter
//     const transporter = nodemailer.createTransport({
//       service: process.env.EMAIL_SERVICE || 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: email,
//       to: process.env.NOTIFICATION_EMAIL || 'felixittech@gmail.com',
//       subject: `[Portfolio Inbox] ${subject}`,
//       text: `From: ${name} <${email}>\n\nInquiry details:\n${message}`,
//     };

//     // Dispatch email if environment credentials are set
//     if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.error('Nodemailer pipeline failure:', error);
//         } else {
//           console.log('Email dispatched successfully:', info.response);
//         }
//       });
//     } else {
//       console.log('--- [MOCK NOTIFICATION EMAIL DISPATCHED] ---');
//       console.log(`To: ${mailOptions.to}`);
//       console.log(`Subject: ${mailOptions.subject}`);
//       console.log(`Content:\n${mailOptions.text}`);
//       console.log('-------------------------------------------');
//     }

//     res.status(201).json({ success: true, data: contact });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// @desc    Get all inbox messages
// @route   GET /api/contacts
// @access  Private
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Mark message as read
// @route   PUT /api/contacts/:id
// @access  Private
export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: req.body.isRead },
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Message record not found.' });
    }
    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete message
// @route   DELETE /api/contacts/:id
// @access  Private
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Message record not found.' });
    }
    res.json({ success: true, message: 'Inquiry record deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
