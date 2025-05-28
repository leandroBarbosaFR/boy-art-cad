import {NextResponse} from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  const {name, email, phone, message} = await req.json()

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: `Nouveau message de ${name}`,
    text: `
    Nom: ${name}
    Email: ${email}
    Téléphone: ${phone}
    Message:
    ${message}
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return NextResponse.json({success: true})
  } catch (err) {
    console.error('Erreur envoi email:', err)
    return NextResponse.json({success: false, error: 'Erreur envoi email'}, {status: 500})
  }
}
