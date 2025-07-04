"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

export default function TopRatedSection({ products = [], sectionTitle, seeMoreUrl }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredProduct, setHoveredProduct] = useState(null)

  // Additional demo products to add after existing products
  const additionalDemoProducts = [
    {
      id: 101,
      name: "Premium Wireless Headphones",
      slug: "premium-wireless-headphones",
      // Remove thumb_image to trigger Unsplash fallback
      price: 299.99,
      offer_price: 199.99,
      averageRating: 5,
    },
    {
      id: 102,
      name: "Smart Fitness Watch",
      slug: "smart-fitness-watch",
      // Remove thumb_image to trigger Unsplash fallback
      price: 399.99,
      offer_price: 299.99,
      averageRating: 4,
    },
    {
      id: 103,
      name: "Professional Camera Lens",
      slug: "professional-camera-lens",
      // Remove thumb_image to trigger Unsplash fallback
      price: 899.99,
      offer_price: null,
      averageRating: 5,
    },
    {
      id: 104,
      name: "Gaming Mechanical Keyboard",
      slug: "gaming-mechanical-keyboard",
      // Remove thumb_image to trigger Unsplash fallback
      price: 159.99,
      offer_price: 129.99,
      averageRating: 4,
    },
    {
      id: 105,
      name: "4K Ultra HD Monitor",
      slug: "4k-ultra-hd-monitor",
      // Remove thumb_image to trigger Unsplash fallback
      price: 599.99,
      offer_price: 449.99,
      averageRating: 5,
    },
    {
      id: 106,
      name: "Wireless Charging Pad",
      slug: "wireless-charging-pad",
      // Remove thumb_image to trigger Unsplash fallback
      price: 49.99,
      offer_price: 29.99,
      averageRating: 4,
    },
    {
      id: 107,
      name: "Bluetooth Speaker Pro",
      slug: "bluetooth-speaker-pro",
      // Remove thumb_image to trigger Unsplash fallback
      price: 199.99,
      offer_price: 149.99,
      averageRating: 5,
    },
    {
      id: 108,
      name: "Smart Home Hub",
      slug: "smart-home-hub",
      // Remove thumb_image to trigger Unsplash fallback
      price: 129.99,
      offer_price: null,
      averageRating: 4,
    },
    {
      id: 109,
      name: "Ergonomic Office Chair",
      slug: "ergonomic-office-chair",
      // Remove thumb_image to trigger Unsplash fallback
      price: 449.99,
      offer_price: 349.99,
      averageRating: 5,
    },
    {
      id: 110,
      name: "Portable SSD Drive",
      slug: "portable-ssd-drive",
      // Remove thumb_image to trigger Unsplash fallback
      price: 199.99,
      offer_price: 159.99,
      averageRating: 4,
    },
  ]

  // Combine existing products with additional demo products
  const allProducts = [...products, ...additionalDemoProducts]

  // Process products data - keep existing products and add demo products
  const processedProducts = allProducts.map((item, index) => ({
    id: item.id,
    title: item.name,
    slug: item.slug,
    image: item.thumb_image?.startsWith("/placeholder")
      ? item.thumb_image
      : item.thumb_image
        ? process.env.NEXT_PUBLIC_BASE_URL + item.thumb_image
        : `https://picsum.photos/300/300?random=${item.id || index}`,
    price: item.price,
    offer_price: item.offer_price,
    review: Number.parseInt(item.averageRating || 0),
    variants: item.active_variants,
  }))

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const calculateDiscount = (originalPrice, offerPrice) => {
    if (!offerPrice || offerPrice >= originalPrice) return 0
    return Math.round(((originalPrice - offerPrice) / originalPrice) * 100)
  }

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
        .stagger-5 { animation-delay: 0.5s; }
        .stagger-6 { animation-delay: 0.6s; }
        .stagger-7 { animation-delay: 0.7s; }
        .stagger-8 { animation-delay: 0.8s; }
        .stagger-9 { animation-delay: 0.9s; }
        .stagger-10 { animation-delay: 1.0s; }
        .stagger-11 { animation-delay: 1.1s; }
        .stagger-12 { animation-delay: 1.2s; }
        .stagger-13 { animation-delay: 1.3s; }
        .stagger-14 { animation-delay: 1.4s; }
        .product-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .product-card:hover {
          transform: translateY(-4px) scale(1.02);
        }
        .product-image {
          transition: all 0.5s ease;
        }
        .product-card:hover .product-image {
          transform: scale(1.1);
        }
        
        @media (max-width: 768px) {
          .product-card:hover {
            transform: translateY(-2px);
          }
        }
      `}</style>

      <div className="w-full bg-gradient-to-b from-gray-50 to-white py-6 sm:py-6 lg:py-8">
        <div className="container-x mx-auto px-4">
          {/* Enhanced Section Header */}
          <div className="flex flex-col md:flex-row md:items-center mb-4 md:justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {sectionTitle || "Top Rated Products"}
              </h2>
              <p className="text-gray-600 text-sm max-w-xl">
                Discover premium products from world-renowned brands that deliver quality and innovation
              </p>
            </div>

            {/* Enhanced View More Button */}
            <Link href={seeMoreUrl || "/products"}>
              <button className="group bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2 text-sm sm:text-base">
                <span>View More</span>
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

          {/* Mobile-Optimized Product Grid - 2 Columns on Mobile */}
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
            {processedProducts.slice(0, 14).map((product, index) => (
              <div
                key={product.id}
                className={`product-card group bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-xl border border-gray-100 hover:border-gray-200 overflow-hidden opacity-0 ${
                  isLoaded ? `animate-scale-in stagger-${Math.min(index + 1, 14)}` : ""
                }`}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Mobile: Column Layout, Desktop: Row Layout */}
                <div className="flex flex-col lg:flex-row h-full">
                  {/* Product Image Section - Mobile Optimized */}
                  <div className="relative w-full lg:w-2/5 h-32 sm:h-40 lg:h-auto bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    {/* Discount Badge - Mobile Optimized */}
                    {product.offer_price && product.offer_price < product.price && (
                      <div className="absolute top-1 left-1 sm:top-2 sm:left-2 lg:top-4 lg:left-4 z-10">
                        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 lg:px-3 lg:py-1 rounded-full text-xs font-bold shadow-lg">
                          {calculateDiscount(product.price, product.offer_price)}% Off
                        </div>
                      </div>
                    )}

                    {/* Top Rated Badge - Mobile Optimized */}
                    <div className="absolute top-1 right-1 sm:top-2 sm:right-2 lg:top-4 lg:right-4 z-10">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 lg:px-3 lg:py-1 rounded-full text-xs font-bold shadow-lg flex items-center">
                        <svg className="w-2 h-2 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="hidden sm:inline">{product.review}.0</span>
                        <span className="sm:hidden">{product.review}</span>
                      </div>
                    </div>

                    {/* Product Image */}
                    <div className="relative w-full h-full p-2 sm:p-4 lg:p-6 flex items-center justify-center">
                      {console.log(product.image)}
                      <Image
                        src={product.image || `https://picsum.photos/300/300?random=${product.id}`}
                        alt={product.title}
                        fill
                        style={{ objectFit: "contain" }}
                        className="product-image"
                        onError={(e) => {
                          e.target.src = `https://picsum.photos/300/300?random=${Math.floor(Math.random() * 1000)}`
                        }}
                      />
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Product Details Section - Mobile Optimized */}
                  <div className="w-full lg:w-3/5 p-2 sm:p-3 lg:p-4 flex flex-col justify-between">
                    <div>
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
                        <span className="ml-1 sm:ml-2 text-xs text-gray-600 font-medium hidden sm:inline">
                          ({product.review}.0)
                        </span>
                      </div>

                      {/* Product Title - Mobile Optimized */}
                      <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-gray-700 transition-colors duration-300 line-clamp-2 leading-tight">
                        {product.title}
                      </h3>

                      {/* Price Section - Mobile Optimized */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-2 sm:mb-3">
                        {product.offer_price && product.offer_price < product.price ? (
                          <>
                            <span className="text-lg sm:text-xl lg:text-2xl font-bold text-red-500">
                              ${product.offer_price}
                            </span>
                            <span className="text-sm sm:text-base lg:text-lg text-gray-500 line-through">
                              ${product.price}
                            </span>
                            <span className="text-xs sm:text-sm text-green-600 font-semibold bg-green-50 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full mt-1 sm:mt-0 self-start">
                              Save ${(product.price - product.offer_price).toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                            ${product.price}
                          </span>
                        )}
                      </div>

                      {/* Product Features - Hidden on Mobile, Visible on SM+ */}
                      <div className="hidden sm:flex items-center space-x-4 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <svg
                            className="w-4 h-4 mr-1 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Free Shipping
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <svg
                            className="w-4 h-4 mr-1 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Warranty
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons - Mobile Optimized */}
                    <div className="flex flex-col space-y-1 sm:space-y-2">
                      {/* Quick Action Buttons - Hidden on Mobile, Visible on SM+ */}
                      <div className="hidden sm:flex space-x-2">
                        <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 px-3 rounded-md font-medium transition-all duration-300 flex items-center justify-center text-xs">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                          Wishlist
                        </button>
                        <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 px-3 rounded-md font-medium transition-all duration-300 flex items-center justify-center text-xs">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                          Quick View
                        </button>
                      </div>

                      {/* Main CTA Button */}
                      <Link href={`/single-product?slug=${product.slug}`}>
                        <button className="w-full bg-gray-900 hover:bg-gray-800 active:bg-gray-700 text-white py-2 sm:py-2 px-3 sm:px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg text-xs sm:text-sm">
                          Add To Cart
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Bottom Shine Effect */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-orange-400 to-red-500 group-hover:w-full transition-all duration-500"></div>
              </div>
            ))}
          </div>

          {/* Bottom Stats Section */}
          <div className={`mt-8 sm:mt-12 text-center opacity-0 ${isLoaded ? "animate-fade-in-up stagger-4" : ""}`}>
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-orange-200">
              <p className="text-gray-700 text-sm sm:text-base lg:text-lg">
                ⭐ These products have an average rating of{" "}
                <span className="font-bold text-orange-600">
                  {(processedProducts.reduce((acc, p) => acc + p.review, 0) / processedProducts.length).toFixed(1)}
                </span>{" "}
                stars from thousands of satisfied customers
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
