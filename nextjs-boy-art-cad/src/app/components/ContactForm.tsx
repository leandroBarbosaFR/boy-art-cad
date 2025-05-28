'use client'
import React, {useState} from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const [status, setStatus] = useState<null | 'success' | 'error'>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {name, value} = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      })

      const result = await res.json()

      if (result.success) {
        setStatus('success')
        setFormData({name: '', email: '', phone: '', message: ''})
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error('Erreur formulaire:', error)
      setStatus('error')
    }

    setTimeout(() => setStatus(null), 5000)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 w-full bg-[#f1f0e7] p-4 sm:p-8 rounded-lg shadow-md"
    >
      {/* <h1 className="text-3xl text-[#1a1a1a] font-bold mb-6 text-center">Contactez-nous</h1> */}

      {/* Feedback message */}
      {status === 'success' && (
        <div className="bg-green-100 text-[#1a1a1a] border border-green-300 p-4 rounded-md text-sm text-center">
          Merci de nous avoir contactés !
        </div>
      )}
      {status === 'error' && (
        <div className="bg-red-100 text-[#1a1a1a] border border-red-300 p-4 rounded-md text-sm text-center">
          Une erreur est survenue. Veuillez réessayer.
        </div>
      )}

      {/* Form fields */}
      <div>
        <label htmlFor="name" className="block font-semibold mb-1">
          Prénom:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border text-[#1a1a1a] border-gray-300 rounded"
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
          className="w-full p-2 border border-gray-300 rounded"
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
          className="w-full p-2 border border-gray-300 rounded"
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
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-[#1a1a1a] text-[#f1f0e7] rounded hover:bg-[#333] cursor-pointer"
      >
        Envoyer
      </button>
    </form>
  )
}
