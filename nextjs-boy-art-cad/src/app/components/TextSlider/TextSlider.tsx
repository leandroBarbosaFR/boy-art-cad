import React, {useState, useEffect} from 'react'

interface TextSliderProps {
  text: string
}

const TextSlider = ({text}: TextSliderProps) => {
  // Extraire toutes les valeurs entre [[...]]
  const matches = text?.match(/\[\[(.*?)\]\]/g) || []
  const values = matches.map((m) => m.replace(/\[\[|\]\]/g, '').trim())

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (values.length <= 1) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % values.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [values.length])

  // Texte fixe avant la première [[
  const prefix = text.split('[[', 1)[0] || ''

  // ✅ Conditions de rendu
  if (values.length === 0) return <>{text}</>

  return (
    <span>
      {prefix}
      <span style={{fontWeight: 'bold'}}>{values[currentIndex]}</span>
    </span>
  )
}

export default TextSlider
