
import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(
    request: VercelRequest,
    response: VercelResponse
) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, subject, message, website } = request.body;

    // Honeypot check
    if (website) {
        return response.status(200).json({ success: true }); // Silent fail for bots
    }

    if (!email || !message || !subject) {
        return response.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // Default to Gmail, user can change if needed
            port: 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: `"${name}" <${process.env.SMTP_USER}>`, // Gmail often overrides this to authenticated user
            to: 'support@wb-partners.pl', // Target email
            replyTo: email,
            subject: `[Formularz WWW] ${subject}`,
            text: `
Od: ${name} (${email})
Temat: ${subject}

Wiadomość:
${message}
      `,
            html: `
        <h3>Nowa wiadomość z formularza kontaktowego</h3>
        <p><strong>Od:</strong> ${name} (<a href="mailto:${email}">${email}</a>)</p>
        <p><strong>Temat:</strong> ${subject}</p>
        <hr />
        <p style="white-space: pre-wrap;">${message}</p>
      `,
        });

        return response.status(200).json({ success: true });
    } catch (error) {
        console.error('Email error:', error);
        return response.status(500).json({ error: 'Failed to send email' });
    }
}
