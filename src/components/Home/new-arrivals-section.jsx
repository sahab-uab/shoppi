"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

export default function NewArrivalsSection({ products = [], sectionTitle, seeMoreUrl, className }) {
  const [isLoaded, setIsLoaded] = useState(false)

  // Process products data
  const processedProducts = products.map((item) => ({
    id: item.id,
    title: item.name,
    slug: item.slug,
    image: process.env.NEXT_PUBLIC_BASE_URL + item.thumb_image,
    price: item.price,
    offer_price: item.offer_price,
    review: Number.parseInt(item.averageRating || 0),
    variants: item.active_variants || [],
  }))

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 200)
    return () => clearTimeout(timer)
  }, [])

  const calculateDiscount = (originalPrice, offerPrice) => {
    if (!offerPrice || offerPrice >= originalPrice) return 0
    return Math.round(((originalPrice - offerPrice) / originalPrice) * 100)
  }

  if (!products.length) return null

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        
        .product-card {
          transition: all 0.3s ease;
        }
        
        .product-card:hover {
          transform: translateY(-4px);
        }
      `}</style>

      <div className={`w-full bg-white py-12 ${className || ""}`}>
        <div className="container-x mx-auto px-4">
          {/* Simple Header */}
          <div className={`flex justify-between items-start mb-8 opacity-0 ${isLoaded ? "animate-fade-in-up" : ""}`}>
            <div>
              {/* Simple Badge */}
              <div className="flex items-center mb-3">
                <div className="w-1 h-6 bg-green-500 rounded-full mr-3"></div>
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium uppercase tracking-wide">
                  Just Arrived
                </span>
              </div>

              {/* Title and Description */}
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{sectionTitle || "New Arrivals"}</h2>
              <p className="text-gray-600">Fresh products just added to our collection</p>
            </div>

            {/* Simple View More Button */}
            <Link href={seeMoreUrl || "/products"}>
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
                <span>View More</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </Link>
          </div>

          {/* Simple Product Grid */}
          <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
            {processedProducts.map((product, index) => (
              <div
                key={product.id}
                className={`product-card bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md overflow-hidden opacity-0 flex flex-col h-full ${
                  isLoaded ? `animate-fade-in-up stagger-${(index % 5) + 1}` : ""
                }`}
              >
                {/* Product Image - Clickable */}
                <Link href={`/single-product?slug=${product.slug}`}>
                  <div className="relative aspect-square bg-gray-50 overflow-hidden cursor-pointer">
                    {/* Simple Discount Badge */}
                    {product.offer_price && product.offer_price < product.price && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                          -{calculateDiscount(product.price, product.offer_price)}%
                        </span>
                      </div>
                    )}

                    {/* Simple New Badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-sm font-medium">New</span>
                    </div>

                    {/* Product Image */}
                    <div className="w-full h-full p-4 flex items-center justify-center">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        fill
                        style={{ objectFit: "contain" }}
                        className="transition-transform duration-300 hover:scale-105"
                        onError={(e) => {
                          e.target.src = "/placeholder.svg?height=200&width=200"
                        }}
                      />
                    </div>
                  </div>
                </Link>

                {/* Product Details */}
                <div className="p-4 flex flex-col flex-grow">
                  {/* Simple Star Rating */}
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < product.review ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Product Title - Clickable */}
                  <Link href={`/single-product?slug=${product.slug}`}>
                    <h3 className="font-medium text-gray-900 mb-3 line-clamp-2 text-sm leading-relaxed hover:text-green-600 transition-colors cursor-pointer">
                      {product.title}
                    </h3>
                  </Link>

                  {/* Simple Price */}
                  <div className="mb-4">
                    {product.offer_price && product.offer_price < product.price ? (
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-lg font-bold text-green-600">${product.offer_price}</span>
                        <span className="text-sm text-gray-500 line-through">${product.price}</span>
                      </div>
                    ) : (
                      <span className="text-lg font-bold text-gray-900">${product.price}</span>
                    )}

                    {product.offer_price && product.offer_price < product.price && (
                      <p className="text-sm text-red-500">Save ${(product.price - product.offer_price).toFixed(2)}</p>
                    )}
                  </div>

                  {/* Spacer to push button to bottom */}
                  <div className="flex-grow"></div>

                  {/* Simple Add to Cart Button - Not wrapped in Link */}
                  <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 mt-auto">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                      />
                    </svg>
                    <span>Add To Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
