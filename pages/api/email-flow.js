// /pages/api/email-flow.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  const { email, idea } = req.body;

  if (!email || !idea) {
    return res.status(400).json({ error: "Email och idé krävs." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const mailOptions = {
      from: `Startpilot <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Din AI-startupplan är redo!",
      html: `
        <h1>Hej!</h1>
        <p>Din AI-idé <strong>\"${idea}\"</strong> har behandlats.</p>
        <p>Logga in på din dashboard för att se din pitch, produkt, video och annonser!</p>
        <p><a href="https://startpilot.org/dashboard">👉 Gå till dashboard</a></p>
        <p>Hälsningar,<br>Startpilot-teamet</p>
      `
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("E-postfel:", error);
    return res.status(500).json({ error: "Misslyckades att skicka e-post." });
  }
}
