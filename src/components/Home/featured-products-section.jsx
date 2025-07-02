"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

export default function FeaturedProductsSection({
  categories = [],
  products = [],
  categoryBackground,
  categoryTitle,
  sectionTitle,
  seeMoreUrl,
  className,
}) {
  const [selectedId, setSelectedId] = useState(categories.length > 0 ? categories[0].category_id : null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Process products data
  const processedProducts = products.map((item) => ({
    id: item.id,
    category_id: item.category_id,
    title: item.name,
    slug: item.slug,
    image: process.env.NEXT_PUBLIC_BASE_URL + item.thumb_image,
    price: item.price,
    offer_price: item.offer_price,
    review: Number.parseInt(item.averageRating || 0),
    variants: item.active_variants || [],
  }))

  // Filter products by selected category
  const filteredProducts = processedProducts.filter((item) => item.category_id === selectedId)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const categoryHandler = (id) => {
    if (id === selectedId) return
    setIsLoading(true)
    setTimeout(() => {
      setSelectedId(id)
      setTimeout(() => {
        setIsLoading(false)
      }, 300)
    }, 200)
  }

  const calculateDiscount = (originalPrice, offerPrice) => {
    if (!offerPrice || offerPrice >= originalPrice) return 0
    return Math.round(((originalPrice - offerPrice) / originalPrice) * 100)
  }

  if (!categories.length || !products.length) return null

  return (
    <>
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.6s ease-out forwards;
        }
        .animate-slide-in-right {
          animation: slideInRight 0.6s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.5s ease-out forwards;
        }
        .stagger-1 {
          animation-delay: 0.1s;
        }
        .stagger-2 {
          animation-delay: 0.2s;
        }
        .stagger-3 {
          animation-delay: 0.3s;
        }
        .stagger-4 {
          animation-delay: 0.4s;
        }
        .stagger-5 {
          animation-delay: 0.5s;
        }
        .product-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .product-card:hover {
          transform: translateY(-4px) scale(1.02);
        }
        .category-item {
          transition: all 0.3s ease;
        }
        .category-item:hover {
          transform: translateX(4px);
        }
        
        @media (max-width: 768px) {
          .product-card:hover {
            transform: translateY(-2px);
          }
          .category-item:hover {
            transform: translateX(2px);
          }
        }
      `}</style>

      <div className={`w-full bg-gradient-to-b from-white to-gray-50 py-8 sm:py-12 lg:py-16 ${className || ""}`}>
        <div className="container-x mx-auto px-4">
          {/* Enhanced Header */}
          <div className="flex flex-col md:flex-row md:items-center mb-4 md:justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {sectionTitle || "Featured Products"}
              </h2>
              <p className="text-gray-600 text-sm max-w-xl">
                Discover premium products from world‑renowned brands that deliver quality and innovation
              </p>
            </div>
            <Link href={seeMoreUrl || "/products"}>
              <button className="group bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2 text-sm sm:text-base">
                <span>View more</span>
                <svg
                  className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </Link>
          </div>

          {/* Main Content Grid - Mobile Optimized */}
          <div className="grid grid-cols-1 xl:grid-cols-6 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Enhanced Category Sidebar - Mobile Optimized */}
            <div
              className={`xl:col-span-1 lg:col-span-1 opacity-0 ${isLoaded ? "animate-slide-in-left stagger-1" : ""}`}
            >
              <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden h-fit">
                {/* Sidebar Header - Mobile Optimized */}
                <div className="relative h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-gray-500 to-gray-900 overflow-hidden">
                  {categoryBackground && (
                    <Image
                      src={categoryBackground || "/placeholder.svg"}
                      alt="Category Background"
                      fill
                      style={{ objectFit: "cover" }}
                      className="opacity-30"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
                    <h3 className="text-white font-bold text-base sm:text-lg mb-1 sm:mb-2">
                      {categoryTitle || "Categories"}
                    </h3>
                    <p className="text-white/80 text-xs sm:text-sm">Browse by category</p>
                  </div>
                </div>

                {/* Category List - Mobile Optimized */}
                <div className="p-3 sm:p-4">
                  <div className="space-y-2">
                    {categories.map((category, index) => (
                      <button
                        key={category.category_id}
                        onClick={() => categoryHandler(category.category_id)}
                        disabled={isLoading}
                        className={`category-item w-full border text-left px-3 sm:px-4 py-2 sm:py-3 rounded-xl transition-all duration-300 flex items-center justify-between group ${
                          selectedId === category.category_id
                            ? "bg-black/70 text-white shadow-lg"
                            : "text-gray-700 hover:bg-gray-50 hover:text-purple-600"
                        }`}
                      >
                        {/* LEFT SIDE: Number + Name */}
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          {/* Numbered Badge */}
                          <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-bold text-xs group-hover:bg-gray-300">
                            {index + 1}
                          </div>
                          {/* Category Name */}
                          <span className="font-medium text-xs sm:text-sm">{category.name}</span>
                        </div>

                        {/* RIGHT SIDE: Arrow Icon */}
                        <svg
                          className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 ${
                            selectedId === category.category_id
                              ? "text-white transform rotate-90"
                              : "text-gray-400 group-hover:text-purple-500 group-hover:translate-x-1"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    ))}
                  </div>

                  {/* Shop Now Button - Mobile Optimized */}
                  <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100">
                    <Link href={seeMoreUrl || "/products"}>
                      <button className="w-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center space-x-2 text-xs sm:text-sm">
                        <span>Shop Now</span>
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Products Grid - Mobile 2 Columns */}
            <div className="xl:col-span-5 lg:col-span-3">
              {isLoading ? (
                // Loading State - Mobile 2 Columns
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-md p-3 sm:p-6 animate-pulse">
                      <div className="w-full h-32 sm:h-48 bg-gray-200 rounded-lg mb-2 sm:mb-4"></div>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-6 sm:h-8 bg-gray-200 rounded w-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredProducts.length > 0 ? (
                // Products Grid - Mobile 2 Columns, Desktop 3 Columns
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {filteredProducts.slice(0, 6).map((product, index) => (
                    <div
                      key={product.id}
                      className={`product-card group bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-purple-200 overflow-hidden opacity-0 ${
                        isLoaded && !isLoading ? `animate-scale-in stagger-${index + 2}` : ""
                      }`}
                    >
                      {/* Product Image - Mobile Optimized */}
                      <div className="relative h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                        {/* Discount Badge - Mobile Optimized */}
                        {product.offer_price && product.offer_price < product.price && (
                          <div className="absolute top-1 left-1 sm:top-2 sm:left-2 lg:top-3 lg:left-3 z-10">
                            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 lg:px-3 lg:py-1 rounded-full text-xs font-bold shadow-lg">
                              {calculateDiscount(product.price, product.offer_price)}% Off
                            </div>
                          </div>
                        )}

                        {/* Featured Badge - Mobile Optimized */}
                        <div className="absolute top-1 right-1 sm:top-2 sm:right-2 lg:top-3 lg:right-3 z-10">
                          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 lg:px-3 lg:py-1 rounded-full text-xs font-bold shadow-lg flex items-center">
                            <svg
                              className="w-2 h-2 sm:w-3 sm:h-3 mr-0.5 sm:mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                            <span className="hidden sm:inline">Featured</span>
                          </div>
                        </div>

                        {/* Product Image */}
                        <div className="relative w-full h-full p-2 sm:p-3 lg:p-4 flex items-center justify-center">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.title}
                            fill
                            style={{ objectFit: "contain" }}
                            className="transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => {
                              e.target.src = "/placeholder.svg?height=200&width=200"
                            }}
                          />
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Product Details - Mobile Optimized */}
                      <div className="p-2 sm:p-3 lg:p-4">
                        {/* Star Rating - Mobile Optimized */}
                        <div className="flex items-center mb-1 sm:mb-2">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                i < product.review ? "text-yellow-400" : "text-gray-300"
                              } transition-colors duration-200`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-600 hidden sm:inline">
                            ({product.review}.0)
                          </span>
                        </div>

                        {/* Product Title - Mobile Optimized */}
                        <h3 className="font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2 text-xs sm:text-sm lg:text-base leading-tight">
                          {product.title}
                        </h3>

                        {/* Price - Mobile Optimized */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-2 sm:mb-4">
                          {product.offer_price && product.offer_price < product.price ? (
                            <>
                              <span className="text-base sm:text-lg lg:text-xl font-bold text-red-500">
                                ${product.offer_price}
                              </span>
                              <span className="text-xs sm:text-sm text-gray-500 line-through">${product.price}</span>
                            </>
                          ) : (
                            <span className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                              ${product.price}
                            </span>
                          )}
                        </div>

                        {/* Action Button - Mobile Optimized */}
                        <Link href={`/single-product?slug=${product.slug}`}>
                          <button className="w-full bg-gray-900 hover:bg-gray-800 active:bg-gray-700 text-white py-1.5 sm:py-2 px-2 sm:px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg text-xs sm:text-sm">
                            Add To Cart
                          </button>
                        </Link>
                      </div>

                      {/* Bottom Accent */}
                      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-500"></div>
                    </div>
                  ))}
                </div>
              ) : (
                // No Products State - Mobile Optimized
                <div className="text-center py-8 sm:py-12">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v4.01"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    No products available in this category at the moment.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
