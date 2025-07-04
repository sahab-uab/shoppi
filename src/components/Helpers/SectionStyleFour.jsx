"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import ShopNowBtn from "../Helpers/Buttons/ShopNowBtn"
import SimpleSlider from "../Helpers/SliderCom"
import FontAwesomeCom from "../Helpers/icons/FontAwesomeCom"


export default function SectionStyleFour({ className, sectionTitle, seeMoreUrl, products = [], section ,services = [] }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredProduct, setHoveredProduct] = useState(null)

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
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const calculateDiscount = (originalPrice, offerPrice) => {
    if (!offerPrice || offerPrice >= originalPrice) return 0
    return Math.round(((originalPrice - offerPrice) / originalPrice) * 100)
  }

  // Split products into columns
  const getColumnProducts = (columnIndex) => {
    const itemsPerColumn = Math.ceil(processedProducts.length / 3)
    const startIndex = columnIndex * itemsPerColumn
    const endIndex = Math.min(startIndex + itemsPerColumn, processedProducts.length)
    return processedProducts.slice(startIndex, endIndex)
  }

  if (!products.length) return null

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
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
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
        .product-row {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .product-row:hover {
          transform: translateX(8px) scale(1.02);
        }
        .product-image {
          transition: all 0.4s ease;
        }
        .product-row:hover .product-image {
          transform: scale(1.1) rotate(2deg);
        }
      `}</style>

      <div className={`w-full bg-gradient-to-b from-white to-gray-50 py-8 ${className || ""}`}>
        <div className="container-x mx-auto px-4">
          {/* Header - Reduced margin */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{ section == "flashsale" ? "Flash Sale" : sectionTitle}</h2>
              <p className="text-gray-500 text-sm">
                Discover premium products from world‑renowned brands that deliver quality and innovation
              </p>
            </div>
            {seeMoreUrl && (
              <Link href={seeMoreUrl}>
                <button className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-5 py-2 rounded-lg font-semibold hover:opacity-90 transition">
                  See More →
                </button>
              </Link>
            )}
          </div>

          {/* Product Grid - Reduced gaps */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
            {/* Column 1 */}
            <div className={`space-y-2.5 opacity-0 ${isLoaded ? "animate-slide-in-left stagger-1" : ""}`}>
              {getColumnProducts(0).map((product, index) => (
                <ProductRowCard
                  key={product.id}
                  product={product}
                  index={index}
                  isHovered={hoveredProduct === product.id}
                  onHover={setHoveredProduct}
                  calculateDiscount={calculateDiscount}
                />
              ))}
            </div>

            {/* Column 2 */}
            <div className={`space-y-2.5 opacity-0 ${isLoaded ? "animate-fade-in-up stagger-2" : ""}`}>
              {getColumnProducts(1).map((product, index) => (
                <ProductRowCard
                  key={product.id}
                  product={product}
                  index={index}
                  isHovered={hoveredProduct === product.id}
                  onHover={setHoveredProduct}
                  calculateDiscount={calculateDiscount}
                />
              ))}
            </div>

            {/* Column 3 */}
            <div className={`space-y-2.5 opacity-0 ${isLoaded ? "animate-slide-in-right stagger-3" : ""}`}>
              {getColumnProducts(2).map((product, index) => (
                <ProductRowCard
                  key={product.id}
                  product={product}
                  index={index}
                  isHovered={hoveredProduct === product.id}
                  onHover={setHoveredProduct}
                  calculateDiscount={calculateDiscount}
                />
              ))}
            </div>
          </div>



          {/* Services - Made more mobile-friendly */}
          {section == "best-products" && (
            <div
              className={` ml-2best-services w-full overflow-x-auto flex flex-row space-x-4 sm:space-x-6 md:space-x-10 px-2 sm:px-4 md:px-6 lg:px-10 py-3 sm:py-4 md:py-6 lg:py-8 lg:space-x-0 lg:justify-between lg:items-center lg:h-[110px] lg:overflow-x-visible transform transition-all duration-300 hover:shadow-lg opacity-0 ${
                isLoaded ? "animate-slide-in-up animate-delay-400" : ""
              }`}
            >
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className={`min-w-[140px] sm:min-w-[160px] md:min-w-[200px] border-r-2 md:border-r-1 border-[#101010] border-opacity-30 px-2 sm:px-4 md:px-6 py-2 flex-shrink-0 transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${
                    isLoaded ? "animate-fade-in-scale" : ""
                  }`}
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <div className="flex space-x-2 sm:space-x-3 md:space-x-5 rtl:space-x-reverse items-center">
                    <div className="transform transition-all duration-300 hover:rotate-12 hover:scale-110">
                      <span className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#101010]">
                        <FontAwesomeCom className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" icon={service.icon} />
                      </span>
                    </div>
                    <div>
                      <p className="text-black text-[11px] sm:text-[13px] md:text-[15px] font-medium tracking-wide mb-1 transition-colors duration-300 hover:text-green-700">
                        {service.title}
                      </p>
                      <p className="text-[10px] sm:text-xs md:text-sm text-[#888] line-clamp-1 transition-colors duration-300 hover:text-gray-600">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Bottom Stats Section - Reduced margin */}
          {section == "best-products" && (
            <div className={`mt-8  opacity-0 ${isLoaded ? "animate-fade-in-up stagger-4" : ""}`}>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-100">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-3 md:mb-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                        />
                      </svg>
                      Why Choose Our Best Products?
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Handpicked selection based on customer reviews, quality, and popularity
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    {/* Stats */}
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-900">{processedProducts.length}+</div>
                      <div className="text-xs text-gray-600">Best Products</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-green-600">4.8+</div>
                      <div className="text-xs text-gray-600">Avg Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-900">50%</div>
                      <div className="text-xs text-gray-600">Avg Savings</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

// Enhanced Product Row Card Component - Reduced padding
function ProductRowCard({ product, index, isHovered, onHover, calculateDiscount }) {
  return (
    <div
      className="product-row group relative border-black/15 shadow-sm bg-white rounded-xl hover:shadow-lg border hover:border-blue-200 p-3 cursor-pointer overflow-hidden"
      onMouseEnter={() => onHover(product.id)}
      onMouseLeave={() => onHover(null)}
    >
      <Link href={`/single-product?slug=${product.slug}`}>
        {/* Discount Badge */}
        {product.offer_price && product.offer_price < product.price && (
          <div className="absolute top-[4px] right-1 z-10">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
              {calculateDiscount(product.price, product.offer_price)}% OFF
            </div>
          </div>
        )}

        <div className="flex items-center space-x-3">
          {/* Enhanced Product Image - Slightly smaller */}
          <div className="relative w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden flex-shrink-0">
            {/* Product Image */}
            <div className="w-full h-full p-1.5 flex items-center justify-center">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                fill
                style={{ objectFit: "contain" }}
                className="product-image"
                onError={(e) => {
                  e.target.src = "/placeholder.svg?height=64&width=64"
                }}
              />
            </div>
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
          </div>

          {/* Enhanced Product Details - Reduced spacing */}
          <div className="flex-grow min-w-0">
            {/* Star Rating */}
            <div className="flex items-center mb-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-3 h-3 ${
                    i < product.review ? "text-yellow-400" : "text-gray-300"
                  } transition-colors duration-200`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-1 text-xs text-gray-500">({product.review}.0)</span>
            </div>

            {/* Product Title */}
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1 text-sm mb-1.5 leading-tight">
              {product.title}
            </h3>

            {/* Enhanced Price Section */}
            <div className="flex items-center space-x-2 mb-1.5">
              {product.offer_price && product.offer_price < product.price ? (
                <>
                  <span className="text-base font-bold text-red-500">${product.offer_price}</span>
                  <span className="text-sm text-gray-500 line-through">${product.price}</span>
                  <span className="text-xs text-green-600 font-medium bg-green-50 px-1.5 py-0.5 rounded-full">
                    Save ${(product.price - product.offer_price).toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-base font-bold text-gray-900">${product.price}</span>
              )}
            </div>

            {/* Product Features */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center text-xs text-gray-600">
                <svg className="w-3 h-3 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Free Shipping
              </div>
              <div className="flex items-center text-xs text-gray-600">
                <svg className="w-3 h-3 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

          {/* Action Arrow */}
          <div className="flex-shrink-0">
            <svg
              className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transform transition-all duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-500 rounded-b-xl"></div>

        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
      </Link>
    </div>
  )
}
