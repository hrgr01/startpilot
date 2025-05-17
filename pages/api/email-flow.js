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
      replyTo: "support@startpilot.org",
      subject: "🚀 Din AI-startup är redo!",
      html: `
        <h1>Hej entreprenör 👋</h1>
        <p>Din AI-idé <strong>"${idea}"</strong> är nu bearbetad.</p>
        <p>Klicka nedan för att komma till din unika dashboard:</p>
        <p><a href="https://startpilot.org/dashboard" style="background:#000;color:#fff;padding:10px 20px;text-decoration:none;border-radius:5px">🌟 Öppna din AI-dashboard</a></p>
        <br>
        <p>Vi hörs!<br><strong>Startpilot-teamet</strong></p>
      `
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("E-postfel:", error);
    return res.status(500).json({ error: "Misslyckades att skicka e-post." });
  }
}
