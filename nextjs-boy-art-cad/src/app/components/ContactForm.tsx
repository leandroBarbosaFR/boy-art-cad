'use client'
import React, {useState} from 'react'

import '../styles/contactPage.css'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const [status, setStatus] = useState<null | 'success' | 'error' | 'loading'>(null)
  const [showPopup, setShowPopup] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {name, value} = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log('🚀 Début de soumission du formulaire')
    console.log('📝 Données du formulaire:', formData)

    setStatus('loading')
    setShowPopup(false)

    try {
      console.log('📡 Envoi de la requête à /api/contact...')

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      })

      console.log('📥 Réponse reçue, status:', res.status)

      const result = await res.json()
      console.log('📋 Résultat:', result)

      if (result.success) {
        console.log('✅ Email envoyé avec succès!')
        console.log('📧 Message ID:', result.messageId || 'Non fourni')

        setStatus('success')

        setShowPopup(true)

        // Reset form
        setFormData({name: '', email: '', phone: '', message: ''})

        // Auto-hide popup after 3 seconds
        setTimeout(() => {
          setShowPopup(false)
        }, 3000)
      } else {
        console.error('❌ Erreur du serveur:', result.error)
        console.error('📝 Détails:', result.details || 'Aucun détail')

        setStatus('error')

        setShowPopup(true)

        // Auto-hide error popup after 3 seconds
        setTimeout(() => {
          setShowPopup(false)
        }, 3000)
      }
    } catch (error) {
      console.error('💥 Erreur réseau/catch:', error)

      setStatus('error')

      setShowPopup(true)

      setTimeout(() => {
        setShowPopup(false)
      }, 3000)
    }

    // Reset status after a delay
    setTimeout(() => setStatus(null), 10000)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-full bg-[#f1f0e7] p-4 sm:p-8 rounded-lg shadow-md relative"
      >
        {/* Inline feedback messages */}
        {status === 'success' && (
          <div className="bg-green-100 text-[#1a1a1a] border border-green-300 p-4 rounded-md text-sm text-center">
            Email envoyé avec succès !
          </div>
        )}
        {status === 'error' && (
          <div className="bg-red-100 text-[#1a1a1a] border border-red-300 p-4 rounded-md text-sm text-center">
            Une erreur est survenue. Vérifiez la console pour plus de détails.
          </div>
        )}
        {status === 'loading' && (
          <div className="bg-blue-100 text-[#1a1a1a] border border-blue-300 p-4 rounded-md text-sm text-center">
            Envoi en cours...
          </div>
        )}

        {/* Form fields */}
        <div>
          <label htmlFor="name" className="block font-semibold mb-1 text-[#1a1a1a]">
            Prénom:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={status === 'loading'}
            className="w-full p-2 border text-[#1a1a1a] rounded disabled:opacity-50 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="email" className="text-[#1a1a1a] block font-semibold mb-1">
            Adresse mail:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={status === 'loading'}
            className="w-full p-2 border rounded text-[#1a1a1a] disabled:opacity-50 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-[#1a1a1a] font-semibold mb-1">
            Téléphone:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={status === 'loading'}
            className="w-full p-2 border rounded text-[#1a1a1a] disabled:opacity-50 focus:outline-none"
            placeholder="Optionnel"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-[#1a1a1a] font-semibold mb-1">
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            disabled={status === 'loading'}
            className="w-full p-2 border rounded text-[#1a1a1a] disabled:opacity-50 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full px-4 py-2 bg-[#1a1a1a] text-[#f1f0e7] rounded hover:bg-[#333] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-[#f1f0e7] border-t-transparent rounded-full"></div>
              Envoi en cours...
            </>
          ) : (
            'Envoyer'
          )}
        </button>
      </form>

      {/* Floating toast message */}
      {showPopup && (
        <div className="fixed bottom-6 right-6 bg-white border border-gray-200 shadow-lg px-4 py-3 rounded-md z-50 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {status === 'success' ? (
            <span className="text-green-600 text-xl"></span>
          ) : (
            <span className="text-red-600 text-xl"></span>
          )}
          <span className="text-[#1a1a1a] text-sm">
            {status === 'success' ? 'Message envoyé avec succès.' : 'Une erreur est survenue.'}
          </span>
        </div>
      )}
    </>
  )
}
