export const contactAutoReplyTemplate = ({
  name,
  subject,
  message,
}) => `
<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">
<title>Thank You</title>
</head>

<body style="margin:0;background:#f5f5f5;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="20">

<tr>
<td align="center">

<table width="600"
style="background:#ffffff;border-radius:10px;padding:35px;">

<tr>

<td>

<h2 style="color:#2563eb;margin-top:0;">
Thank You for Contacting Me!
</h2>

<p>
Hi <strong>${name}</strong>,
</p>

<p>
Thank you for reaching out through my portfolio.
</p>

<p>
I have successfully received your message and will respond as soon as possible.
</p>

<hr>

<h3>Your Message</h3>

<p>
<strong>Subject:</strong><br>
${subject}
</p>

<p>
<strong>Message:</strong><br>
${message}
</p>

<hr>

<p>
You can always visit my portfolio here:
</p>

<p>

<a
href="https://christopherfelix-portfolio.netlify.app"
style="
background:#2563eb;
color:white;
padding:12px 20px;
text-decoration:none;
border-radius:6px;
display:inline-block;
">

Visit Portfolio

</a>

</p>

<br>

<p>

Regards,

<br><br>

<strong>Christopher Felix</strong>

<br>

Full Stack Developer

</p>

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>
`;