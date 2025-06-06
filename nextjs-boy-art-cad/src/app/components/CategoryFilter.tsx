'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronDown, Filter, X } from 'lucide-react'

interface Category {
  _id: string
  title: string
  slug: { current: string }
}

interface CategoryFilterProps {
  categories: Category[]
  currentCategory?: string | null
}

export default function CategoryFilter({ categories, currentCategory }: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleCategoryChange = (categorySlug: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (categorySlug) {
      params.set('category', categorySlug)
    } else {
      params.delete('category')
    }
    
    const queryString = params.toString()
    const url = queryString ? `/collection?${queryString}` : '/collection'
    
    router.push(url)
    setIsOpen(false)
  }

  const currentCategoryTitle = currentCategory 
    ? categories.find(cat => cat.slug.current === currentCategory)?.title 
    : null

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-transparent border border-gray-300 rounded-lg transition-colors min-w-[200px] justify-between"
      >
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-500" />
          <span className="text-sm font-medium">
            {currentCategoryTitle || 'Toutes les catégories'}
          </span>
        </div>
        <ChevronDown 
          size={16} 
          className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-transparent border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {/* All categories option */}
          <button
            onClick={() => handleCategoryChange(null)}
            className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 flex items-center justify-between ${
              !currentCategory ? 'bg-blue-50 text-[#353229] font-medium' : 'text-[#353229]'
            }`}
          >
            <span>Toutes les catégories</span>
            {!currentCategory && <X size={16} className="text-[#353229]" />}
          </button>

          {/* Individual categories */}
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => handleCategoryChange(category.slug.current)}
              className={`w-full px-4 py-3 text-left hover:bg-[#363229bd]-50 transition-colors flex items-center justify-between ${
                currentCategory === category.slug.current 
                  ? 'bg-[#363229bd]-50 text-[#353229] font-medium' 
                  : 'text-[#353229]'
              }`}
            >
              <span>{category.title}</span>
              {currentCategory === category.slug.current && (
                <X size={16} className="text-[#353229]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}