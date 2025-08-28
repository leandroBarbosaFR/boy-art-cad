"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, Mail } from "lucide-react";
import { PortableText } from '@portabletext/react';
import type { ProductPageData, GalleryItem } from '../../lib/types/sanity';

interface ProductPageProps {
  data: ProductPageData;
  productType: 'bornes' | 'cassettes' | 'tableaux';
}

function Carousel({ images }: { images: GalleryItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate how many images to show based on screen size
  const getVisibleCount = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth >= 1024) return 3; // lg breakpoint
    if (window.innerWidth >= 768) return 2;  // md breakpoint
    return 1; // mobile
  };

  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, images.length - visibleCount);

  const prev = useCallback(() => {
    setCurrentIndex(i => Math.max(0, i - 1));
  }, []);

  const next = useCallback(() => {
    setCurrentIndex(i => Math.min(maxIndex, i + 1));
  }, [maxIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  const translateX = -(currentIndex * (100 / visibleCount));

  if (!images || images.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Aucune image disponible dans la galerie
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div className="overflow-hidden">
        <div
          ref={containerRef}
          className="flex transition-transform duration-500 ease-out"
          style={{ 
            transform: `translateX(${translateX}%)`,
            width: `${(images.length / visibleCount) * 100}%`
          }}
        >
          {images.map((item, i) => (
            <div 
              key={i} 
              className="relative group cursor-pointer px-2"
              style={{ width: `${100 / images.length}%` }}
            >
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src={item.image.asset.url}
                  alt={item.image.alt || item.title}
                  width={600}
                  height={400}
                  className="h-[330px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={i < visibleCount}
                />
                
                {/* Overlay avec hover effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  {/* Content overlay */}
                  <div className="relative z-10 p-4 text-white transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 w-full">
                    <div className="mb-3">
                      <h3 className="text-base font-semibold mb-2 line-clamp-1">{item.title}</h3>
                      <p className="text-xs text-gray-200 leading-relaxed line-clamp-3">
                        {item.excerpt || "Description détaillée de ce produit et de ses fonctionnalités principales."}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <a 
                          href="mailto:contact@boyartcad.com"
                          className="p-1.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors inline-flex items-center justify-center"
                          aria-label="Envoyer un email"
                        >
                          <Mail className="h-3 w-3" />
                        </a>
                        <Link
                          href="/contact"
                          className="px-3 py-1.5 bg-white text-black text-xs font-medium rounded-full hover:bg-gray-100 transition-colors whitespace-nowrap inline-flex items-center justify-center"
                        >
                          PRENDRE CONTACT
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls - Outside carousel */}
      <button
        onClick={prev}
        disabled={currentIndex === 0}
        aria-label="Images précédentes"
        className="absolute -left-12 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center rounded-full bg-black/80 backdrop-blur-sm shadow-lg p-3 hover:bg-black/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="h-5 w-5 text-white" />
      </button>
      <button
        onClick={next}
        disabled={currentIndex >= maxIndex}
        aria-label="Images suivantes"
        className="absolute -right-12 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center rounded-full bg-black/80 backdrop-blur-sm shadow-lg p-3 hover:bg-black/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="h-5 w-5 text-white" />
      </button>

      {/* Dots indicator */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === currentIndex ? "w-6 bg-neutral-800" : "w-2 bg-neutral-300 hover:bg-neutral-400"
            }`}
            aria-label={`Aller au groupe ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function ProductPage({ data, productType }: ProductPageProps) {
  const getProductTypeLabel = (type: string) => {
    switch(type) {
      case 'bornes': return 'bornes interactives';
      case 'cassettes': return 'cassettes vintage';
      case 'tableaux': return 'tableaux artistiques';
      default: return type;
    }
  };

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-10">
      {/* Back link */}
      <div className="mb-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-neutral-900"
        >
          <ArrowLeft className="h-4 w-4" /> Retour
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Main image */}
        <div className="overflow-hidden rounded-2xl shadow-lg">
          {data.mainImage ? (
            <Image
              src={data.mainImage.asset.url}
              alt={data.mainImage.alt || data.title}
              width={1200}
              height={800}
              className="h-[420px] w-full object-cover"
              priority
            />
          ) : (
            <div className="h-[420px] w-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Image non disponible</span>
            </div>
          )}
        </div>

        {/* Text content */}
        <div>
          <p className="text-xs uppercase tracking-widest text-neutral-500">
            {data.subtitle || getProductTypeLabel(productType)}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            {data.title}
          </h1>
          
          {data.description && (
            <div className="mt-4 text-neutral-700 leading-relaxed">
              <PortableText 
                value={data.description}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="mb-4 last:mb-0">{children}</p>
                    ),
                  },
                }}
              />
            </div>
          )}

          {/* CTA */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-neutral-900 transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </div>

      {/* Carousel */}
      {data.gallery && data.gallery.length > 0 && (
        <div id="galerie" className="mt-16">
          <h2 className="mb-6 text-2xl font-semibold">Galerie</h2>
          <Carousel images={data.gallery} />
        </div>
      )}
    </section>
  );
}