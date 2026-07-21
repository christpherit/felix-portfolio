export const contactNotificationTemplate = ({
  name,
  email,
  subject,
  message,
}) => {
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;background:#f4f7fb;padding:30px;">
      <div style="max-width:650px;margin:auto;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e5e7eb;">

        <div style="background:#0B2545;padding:25px;text-align:center;">
          <h2 style="color:#ffffff;margin:0;">
            📩 New Portfolio Contact
          </h2>
        </div>

        <div style="padding:30px;color:#333;line-height:1.7;">

          <p>Hello Christopher,</p>

          <p>
            You have received a new message from your portfolio contact form.
          </p>

          <table style="width:100%;border-collapse:collapse;margin-top:20px;">
            <tr>
              <td style="padding:10px;font-weight:bold;width:120px;">Name</td>
              <td style="padding:10px;">${name}</td>
            </tr>

            <tr style="background:#f8fafc;">
              <td style="padding:10px;font-weight:bold;">Email</td>
              <td style="padding:10px;">
                <a href="mailto:${email}">${email}</a>
              </td>
            </tr>

            <tr>
              <td style="padding:10px;font-weight:bold;">Subject</td>
              <td style="padding:10px;">${subject}</td>
            </tr>
          </table>

          <div style="margin-top:25px;">
            <h3 style="margin-bottom:10px;">Message</h3>

            <div style="
              background:#f8fafc;
              padding:18px;
              border-left:4px solid #0B2545;
              white-space:pre-wrap;
            ">
${message}
            </div>
          </div>

        </div>

        <div style="background:#f8fafc;padding:18px;text-align:center;color:#666;font-size:13px;">
          Christopher Felix Portfolio • Automated Notification
        </div>

      </div>
    </div>
  `;
};