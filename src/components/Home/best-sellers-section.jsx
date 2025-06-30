"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

export default function BestSellersSection({ sellers = [], sectionTitle, seeMoreUrl }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredSeller, setHoveredSeller] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

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
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.6s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scaleIn 0.5s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        
        .seller-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .seller-card:hover {
          transform: translateY(-12px) scale(1.05);
        }
        
        .seller-logo {
          transition: all 0.5s ease;
        }
        
        .seller-card:hover .seller-logo {
          transform: scale(1.1) rotate(5deg);
        }

        .swiper-pagination-bullet {
          background: #e5e7eb;
          opacity: 1;
          width: 12px;
          height: 12px;
        }

        .swiper-pagination-bullet-active {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          transform: scale(1.2);
        }

        .swiper-button-next,
        .swiper-button-prev {
          color: #374151;
          background: white;
          border-radius: 50%;
          width: 44px;
          height: 44px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: #1f2937;
          color: white;
          transform: scale(1.1);
        }

        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 16px;
          font-weight: bold;
        }
      `}</style>

      <div className="w-full bg-gradient-to-b from-white to-gray-50 py-16">
        <div className="container-x mx-auto px-4">
          {/* Enhanced Header */}
          <div className={`flex justify-between items-center mb-12 opacity-0 ${isLoaded ? "animate-fade-in-up" : ""}`}>
            <div className="flex flex-col space-y-3">
              {/* Badge and Description */}
              <div className="flex items-center space-x-3">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full">
                  <span className="text-sm font-bold text-blue-600 uppercase tracking-wider flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Trusted Sellers
                  </span>
                </div>
              </div>

              {/* Description Text */}
              <div className="ml-7">
                <p className="text-gray-600 text-lg">Shop from our top-rated and most trusted sellers</p>
              </div>
            </div>

            {/* Enhanced View More Button */}
            <Link href={seeMoreUrl || "/sellers"}>
              <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2">
                <span>View All Sellers</span>
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

          {/* Enhanced Sellers Carousel */}
          <div className={`opacity-0 ${isLoaded ? "animate-scale-in stagger-2" : ""}`}>
            <Swiper
              spaceBetween={24}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={true}
              loop={true}
              breakpoints={{
                320: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
                640: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 24,
                },
                1280: {
                  slidesPerView: 6,
                  spaceBetween: 24,
                },
              }}
              modules={[Autoplay, Navigation, Pagination]}
              className="best-sellers-swiper pb-12"
            >
              {sellers?.map((seller, index) => (
                <SwiperSlide key={seller.id}>
                  <Link
                    href={{
                      pathname: "/seller-products",
                      query: { seller: seller.slug },
                    }}
                  >
                    <div
                      className="seller-card group flex flex-col items-center cursor-pointer"
                      onMouseEnter={() => setHoveredSeller(seller.id)}
                      onMouseLeave={() => setHoveredSeller(null)}
                    >
                      {/* Enhanced Seller Card */}
                      <div className="relative w-full max-w-[160px] bg-white rounded-2xl shadow-lg hover:shadow-2xl border-2 border-gray-100 hover:border-blue-200 p-6 transition-all duration-400 overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-5">
                          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
                          <div className="absolute bottom-3 left-3 w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-red-500"></div>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 opacity-30"></div>
                        </div>

                        {/* Seller Logo Container */}
                        <div className="relative z-10 w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center shadow-inner border-2 border-white overflow-hidden">
                          <div className="relative w-16 h-16">
                            <Image
                              src={process.env.NEXT_PUBLIC_BASE_URL + seller.logo || "/placeholder.svg"}
                              alt={seller.shop_name}
                              fill
                              style={{ objectFit: "contain" }}
                              className="seller-logo p-2"
                              onError={(e) => {
                                e.target.src = "/placeholder.svg?height=64&width=64"
                              }}
                            />
                          </div>
                        </div>

                        {/* Seller Name */}
                        <h3 className="text-center text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 min-h-[2.5rem] flex items-center justify-center">
                          {seller.shop_name}
                        </h3>

                        {/* Hover Overlay with Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 rounded-2xl"></div>

                        {/* Premium Badge for Top Sellers */}
                        {index < 3 && (
                          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg z-20">
                            ⭐ Top
                          </div>
                        )}

                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>

                        {/* Bottom Accent Line */}
                        <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-500 rounded-b-2xl"></div>
                      </div>

                      {/* Enhanced Seller Stats */}
                      <div className="mt-4 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className="bg-white rounded-lg shadow-md px-4 py-2 border border-gray-100">
                          <div className="flex items-center justify-center space-x-4 text-xs text-gray-600">
                            <div className="flex items-center">
                              <svg className="w-3 h-3 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="font-medium">Verified</span>
                            </div>
                            <div className="flex items-center">
                              <svg className="w-3 h-3 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="font-medium">4.8+</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Enhanced Bottom Section */}
          <div className={`mt-12 opacity-0 ${isLoaded ? "animate-fade-in-up stagger-4" : ""}`}>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 md:p-8 border border-blue-100">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Why Shop with Our Best Sellers?
                  </h3>
                  <p className="text-gray-600">
                    All our featured sellers are verified, highly-rated, and committed to excellent customer service
                  </p>
                </div>

                <div className="flex items-center space-x-6">
                  {/* Stats */}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{sellers.length}+</div>
                    <div className="text-sm text-gray-600">Trusted Sellers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">4.8+</div>
                    <div className="text-sm text-gray-600">Avg Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">24/7</div>
                    <div className="text-sm text-gray-600">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
