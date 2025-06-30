'use client'
import React, {useState} from 'react'
import '../styles/embedSection.css'

interface EmbedSectionProps {
  data: {
    title?: string
    embed?: string
  }
}

export default function EmbedSection({data}: EmbedSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const {title, embed} = data

  if (!embed) return null

  // Convert different URL formats to embeddable URLs
  const getEmbedUrl = (url: string): string => {
    // YouTube URLs
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0]
      return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`
    }

    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0]
      return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`
    }

    // Vimeo URLs
    if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0]
      return `https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0&app_id=58479`
    }

    // Direct video files (mp4, webm, etc.)
    if (url.match(/\.(mp4|webm|ogg|mov)(\?.*)?$/i)) {
      return url
    }

    // For other URLs, assume they're already embeddable
    return url
  }

  const embedUrl = getEmbedUrl(embed)
  const isDirectVideo = embedUrl.match(/\.(mp4|webm|ogg|mov)(\?.*)?$/i)

  const handleLoad = () => {
    setIsLoaded(true)
  }

  return (
    <section className="embed-section">
      <div className="embed-container">
        {title && (
          <div className="embed-header">
            <h2 className="embed-title">{title}</h2>
          </div>
        )}

        <div className="embed-wrapper">
          <div className={`embed-content ${isLoaded ? 'loaded' : ''}`}>
            {isDirectVideo ? (
              // Direct video file
              <video controls preload="metadata" className="embed-video" onLoadedData={handleLoad}>
                <source src={embedUrl} type="video/mp4" />
                <p>Votre navigateur ne supporte pas les vidéos HTML5.</p>
              </video>
            ) : (
              // Iframe for YouTube, Vimeo, etc.
              <iframe
                src={embedUrl}
                title={title || 'Contenu intégré'}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="embed-iframe"
                onLoad={handleLoad}
              />
            )}

            {/* Loading placeholder */}
            {!isLoaded && (
              <div className="embed-loading">
                <div className="embed-spinner"></div>
                <p>Chargement du contenu...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
