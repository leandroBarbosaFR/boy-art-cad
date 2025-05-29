'use client'

import React, {useEffect, useState} from 'react'
import {PortableText} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'
import {client} from '@/sanity/client'
import {X} from 'lucide-react'

const COOKIES_QUERY = `*[_type == "cookies"][0]{ _id, title, body }`

export default function CookieModal() {
  interface CookiesModalData {
    title: string
    body: PortableTextBlock[]
  }

  const [cookies, setCookies] = useState<CookiesModalData | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem('cookiesAccepted')
    if (!accepted) {
      setShowModal(true)
    }

    async function fetchCookies() {
      const data = await client.fetch(COOKIES_QUERY)
      setCookies(data)
    }
    fetchCookies()
  }, [])

  function handleAcceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true')
    setShowModal(false)
  }

  function handleClose() {
    setShowModal(false)
  }

  if (!showModal || !cookies) return null

  return (
    <div className="fixed top-4 right-4 z-[9999]" style={{background: 'transparent'}}>
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4 shadow-lg text-center relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 cursor-pointer"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        <h1 className="text-xl font-bold mb-4">{cookies.title}</h1>
        <div className="text-sm mb-4">
          <PortableText value={cookies.body} />
        </div>
        <button
          className="bg-[#1a1a1a] cursor-pointer text-white px-4 py-2 rounded hover:bg-[#1a1a1aec] transition"
          onClick={handleAcceptCookies}
        >
          Accepter et continuer
        </button>
      </div>
    </div>
  )
}
