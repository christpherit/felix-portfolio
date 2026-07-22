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
      message: "All inputs must be completed.",
    });
  }

  try {
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    // Respond immediately
    res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      data: contact,
    });

    // Send emails in background
    (async () => {
      try {
        await resend.emails.send({
          from: `Christopher Felix <${process.env.FROM_EMAIL}>`,
          to: process.env.NOTIFICATION_EMAIL,
          subject: `📩 New Portfolio Contact - ${subject}`,
          html: contactNotificationTemplate({
            name,
            email,
            subject,
            message,
          }),
        });

        await resend.emails.send({
          from: `Christopher Felix <${process.env.FROM_EMAIL}>`,
          to: email,
          subject: "Thank you for contacting Christopher Felix",
          html: contactAutoReplyTemplate({
            name,
            subject,
            message,
          }),
        });

        console.log("✅ Emails sent successfully");
      } catch (err) {
        console.error("❌ Resend Error:", err);
      }
    })();
  } catch (error) {
    console.error(error);

    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
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
