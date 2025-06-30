import {NextResponse} from 'next/server'
import nodemailer from 'nodemailer'

// Interface pour définir le type d'erreur
interface EmailError {
  code?: string
  message: string
  name?: string
}

export async function POST(req: Request) {
  console.log('=== API Contact Debug ===')

  try {
    const {name, email, phone, message} = await req.json()
    console.log('Données reçues:', {name, email, phone, message})

    // Vérifier les variables d'environnement
    console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'OK' : 'MANQUANT')
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'OK' : 'MANQUANT')
    console.log('EMAIL_TO:', process.env.EMAIL_TO ? 'OK' : 'MANQUANT')

    // Validation des champs requis
    if (!name || !email || !message) {
      console.log('Erreur: Champs manquants')
      return NextResponse.json({success: false, error: 'Champs requis manquants'}, {status: 400})
    }

    console.log('Création du transporteur...')
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Test de connexion
    console.log('Test de connexion Gmail...')
    await transporter.verify()
    console.log('Connexion Gmail OK ✅')

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `Nouveau message de ${name}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Téléphone:</strong> ${phone}</p>` : ''}
        <p><strong>Message:</strong></p>
        <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
          ${message}
        </div>
        <hr>
        <p style="font-size: 12px; color: #666;">
          Envoyé le ${new Date().toLocaleString('fr-FR')}
        </p>
      `,
    }

    console.log("Envoi de l'email...")
    const result = await transporter.sendMail(mailOptions)
    console.log('Email envoyé avec succès ✅', result.messageId)

    return NextResponse.json({success: true, messageId: result.messageId})
  } catch (error) {
    // Type guard pour vérifier si c'est une erreur avec les propriétés attendues
    const emailError = error as EmailError

    console.error('❌ Erreur complète:', error)
    console.error('Code erreur:', emailError.code || 'Non défini')
    console.error('Message erreur:', emailError.message || 'Message non disponible')

    return NextResponse.json(
      {
        success: false,
        error: 'Erreur envoi email',
        details: emailError.message || 'Erreur inconnue',
      },
      {status: 500},
    )
  }
}
