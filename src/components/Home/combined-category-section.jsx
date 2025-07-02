"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

function CombinedCategorySection({
  featuredCategories,
  popularCategories,
  popularProducts,
  categoryBackground,
  sectionTitles,
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    popularCategories?.length > 0 ? popularCategories[0].category_id : null,
  )

  // Process products data with proper image URLs
  const processedProducts =
    popularProducts?.map((item) => ({
      id: item.id,
      category_id: item.category_id,
      name: item.name,
      slug: item.slug,
      thumb_image: process.env.NEXT_PUBLIC_BASE_URL + item.thumb_image,
      price: item.price,
      offer_price: item.offer_price,
      averageRating: Number.parseInt(item.averageRating || 0),
    })) || []

  // Filter products based on selected category
  const filteredProducts = processedProducts.filter((product) => product.category_id === selectedCategoryId).slice(0, 3)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
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
        .animate-bounce-in {
          animation: bounceIn 0.6s ease-out forwards;
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
        .stagger-6 {
          animation-delay: 0.6s;
        }
        .stagger-7 {
          animation-delay: 0.7s;
        }
        .stagger-8 {
          animation-delay: 0.8s;
        }
      `}</style>

      <div className="w-full bg-gray-50 pt-[50px]">
        <div className="container-x mx-auto px-4">
          {/* Main Grid Layout - Fixed responsive behavior */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Featured Categories - Left Side */}
            <div className={`lg:col-span-8 opacity-0 ${isLoaded ? "animate-slide-in-left" : ""}`}>
              {/* Featured Categories Header */}
              <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mx-4">
                  {/* Left: Heading and Description */}
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 md:mb-0">Browse Categories</h2>
                    <p className="text-gray-500 text-sm">Discover products across our most popular categories</p>
                  </div>
                  {/* Right: View All Categories Button */}
                  <div className="text-left md:text-right">
                    <Link href="/categories">
                      <button className="group inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-300">
                        <span className="text-sm font-medium mr-2">View All Categories</span>
                        <svg
                          className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
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

              {/* Featured Categories Grid */}
              <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-4 grid-cols-2 gap-4 mb-6">
                {featuredCategories?.slice(0, 8).map((item, i) => (
                  <Link
                    key={i}
                    href={{
                      pathname: "/products",
                      query: { category: item.slug },
                    }}
                    passHref
                    legacyBehavior
                  >
                    <a rel="noopener noreferrer">
                      <div
                        className={`group relative overflow-hidden bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.08)] hover:shadow-md border border-gray-100 transition-all duration-300 transform hover:scale-105 cursor-pointer h-[120px] opacity-0 ${
                          isLoaded ? `animate-bounce-in stagger-${i + 1}` : ""
                        }`}
                      >
                        <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 text-center">
                          {/* Icon Container */}
                          <div className="mb-2 transform transition-all duration-300 group-hover:scale-110">
                            <div className="w-10 h-10 bg-gray-100 group-hover:bg-gray-200 rounded-lg flex items-center justify-center shadow-sm transition-all duration-300">
                              <Image
                                src={item.image ? process.env.NEXT_PUBLIC_BASE_URL + item.image : "/placeholder.svg"}
                                alt={item.name}
                                width={42}
                                height={42}
                                className="transition-all duration-300 group-hover:scale-110"
                                onError={(e) => {
                                  e.target.src = "/placeholder.svg?height=24&width=24"
                                }}
                              />
                            </div>
                          </div>
                          {/* Category Name */}
                          <h3 className="text-gray-900 mt-2 font-medium text-xs leading-tight group-hover:text-gray-700 transition-colors duration-300">
                            {item.name}
                          </h3>
                        </div>
                        {/* Hover Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            </div>

            {/* Popular Categories - Right Side - Fixed mobile layout */}
            <div className={`lg:col-span-4 w-full opacity-0 ${isLoaded ? "animate-slide-in-right stagger-2" : ""}`}>
              {/* Header */}
              <div className="mb-6 mt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <h2 className="text-xl font-bold text-gray-900">Trending Now</h2>
                  </div>
                  <Link
                    href="/products?highlight=popular_category"
                    className="text-xs text-gray-500 hover:text-gray-700 transition-colors duration-300"
                  >
                    View More →
                  </Link>
                </div>
                <p className="text-gray-500 text-sm">Discover our Trending Now products</p>
              </div>

              {/* Category Buttons - Fixed mobile grid */}
              <div className="w-full px-4">
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {popularCategories?.slice(0, 3).map((category, index) => (
                    <button
                      key={category.category_id}
                      onClick={() => setSelectedCategoryId(category.category_id)}
                      className={`w-full px-2 sm:px-3 py-3 sm:py-4 rounded-lg text-xs sm:text-sm font-semibold text-center transition-all duration-300 border shadow-sm hover:shadow-md hover:-translate-y-1 transform ${
                        selectedCategoryId === category.category_id
                          ? "bg-gray-900 text-white shadow-lg"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {/* Numbered Badge */}
                      <div className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-bold text-xs group-hover:bg-gray-300">
                        {index + 1}
                      </div>
                      {/* Category Name - Responsive text */}
                      <span className="block text-xs sm:text-sm leading-tight">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Product List - Fixed container width */}
              <div className="w-full space-y-3 mt-3 px-4">
                {filteredProducts.map((product, index) => (
                  <Link
                    key={product.id}
                    href={{
                      pathname: "/single-product",
                      query: { slug: product.slug },
                    }}
                    passHref
                  >
                    <div
                      className="group bg-white mb-3 rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 relative overflow-hidden w-full"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        opacity: isLoaded ? 1 : 0,
                        transform: isLoaded ? "translateY(0)" : "translateY(10px)",
                      }}
                    >
                      {/* Subtle Background Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Sale Badge */}
                      {product.offer_price && product.offer_price < product.price && (
                        <div className="absolute -top-1 -right-1 z-10">
                          <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-sm">
                            {Math.round(((product.price - product.offer_price) / product.price) * 100)}% OFF
                          </div>
                        </div>
                      )}

                      <div className="flex items-center space-x-3 sm:space-x-4 relative z-10">
                        {/* Enhanced Product Image */}
                        <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                          <Image
                            src={product.thumb_image || "/placeholder.svg"}
                            alt={product.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              e.target.src = "/placeholder.svg?height=64&width=64"
                            }}
                          />
                          {/* Image Overlay */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 rounded-xl"></div>
                          {/* Quick View Icon */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white/90 rounded-full flex items-center justify-center shadow-sm">
                              <svg
                                className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-700"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Enhanced Product Info */}
                        <div className="flex-1 min-w-0">
                          {/* Product Name with Better Typography */}
                          <h3 className="text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-300 truncate mb-1 leading-tight">
                            {product.name}
                          </h3>

                          {/* Enhanced Price Section */}
                          <div className="flex items-center space-x-1 sm:space-x-2 mb-1 sm:mb-2">
                            {product.offer_price && product.offer_price < product.price ? (
                              <>
                                <span className="text-sm sm:text-base font-bold text-gray-900">
                                  ${product.offer_price}
                                </span>
                                <span className="text-xs text-gray-500 line-through font-medium">${product.price}</span>
                                <span className="text-xs text-green-600 font-semibold bg-green-50 px-1.5 sm:px-2 py-0.5 rounded-full">
                                  Save ${(product.price - product.offer_price).toFixed(2)}
                                </span>
                              </>
                            ) : (
                              <span className="text-sm sm:text-base font-bold text-gray-900">${product.price}</span>
                            )}
                          </div>

                          {/* Enhanced Rating with Review Count */}
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-colors duration-200 ${
                                    i < (product.averageRating || 0) ? "text-yellow-400" : "text-gray-300"
                                  }`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-xs text-gray-500 font-medium">({product.averageRating || 0}.0)</span>
                            {/* Stock Status */}
                            <div className="flex items-center">
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full mr-1"></div>
                              <span className="text-xs text-green-600 font-medium">In Stock</span>
                            </div>
                          </div>
                        </div>

                        {/* Enhanced Action Area */}
                        <div className="flex flex-col items-center space-y-2">
                          {/* Main Arrow */}
                          <div className="opacity-60 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-gray-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Border Animation */}
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-900 to-gray-600 group-hover:w-full transition-all duration-500"></div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CombinedCategorySection
