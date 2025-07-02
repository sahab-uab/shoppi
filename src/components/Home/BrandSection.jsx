"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import "swiper/css"
import "swiper/css/pagination"
import { Autoplay, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

export default function BrandSection({ className, sectionTitle, brands = [] }) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Trigger animations after component mounts
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
        
        @keyframes fadeInScale {
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
        
        .animate-fade-in-scale {
          animation: fadeInScale 0.5s ease-out forwards;
        }
        
        .animate-delay-200 { animation-delay: 0.2s; }
        .animate-delay-400 { animation-delay: 0.4s; }
        
        .brand-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .brand-card:hover {
          transform: translateY(-8px) scale(1.05);
        }
        
        .brand-logo {
          transition: all 0.4s ease;
          filter: grayscale(80%) opacity(0.8);
        }
        
        .brand-card:hover .brand-logo {
          filter: grayscale(0%) opacity(1);
          transform: scale(1.15);
        }

        .swiper-slide {
          height: auto;
        }

        .brand-swiper {
          padding: 20px 0;
          overflow: visible;
        }

        .brand-swiper .swiper-slide {
          transition: all 0.3s ease;
        }
      `}</style>

      <div className={`w-full bg-white py-16 ${className || ""}`}>
        <div className="container-x mx-auto px-4">
          {/* Enhanced Section Header */}
          <div className={`mb-8 opacity-0 ${isLoaded ? "animate-fade-in-up" : ""}`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-6 md:mb-0">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900  bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {sectionTitle || "Shop by Brand"}
                </h2>
                <p className="text-gray-600 text-sm max-w-xl">
                  Discover premium products from world-renowned brands that deliver quality and innovation
                </p>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center space-x-3">
                <button className="brand-prev group w-12 h-12 bg-gray-100 hover:bg-gray-900 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl">
                  <svg
                    className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="brand-next group w-12 h-12 bg-gray-100 hover:bg-gray-900 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-sm hover:shadow-xl">
                  <svg
                    className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Brand Carousel */}
          <div className={`opacity-0 ${isLoaded ? "animate-fade-in-scale animate-delay-200" : ""}`}>
            <Swiper
              spaceBetween={24}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              navigation={{
                prevEl: ".brand-prev",
                nextEl: ".brand-next",
              }}
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
              modules={[Autoplay, Navigation]}
              className="brand-swiper"
            >
              {brands?.map((brand, index) => (
                <SwiperSlide key={brand.id}>
                  <Link
                    href={{
                      pathname: "/products",
                      query: { brand: brand.slug },
                    }}
                  >
                    <div className="brand-card group relative w-full h-[140px] bg-[#FFFAF0] border-2 border-gray-100 hover:border-gray-300 rounded-2xl shadow-sm hover:shadow-2xl flex justify-center items-center cursor-pointer overflow-hidden">
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
                        <div className="absolute bottom-3 left-3 w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-red-500"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 opacity-30"></div>
                      </div>

                      {/* Brand Logo */}
                      <div className="relative z-10 p-6 w-full h-full flex items-center justify-center">
                        <div className="relative w-full h-full max-w-[80px] max-h-[60px]">
                          <Image
                            src={process.env.NEXT_PUBLIC_BASE_URL + brand.logo || "/placeholder.svg"}
                            alt={brand.name}
                            fill
                            style={{ objectFit: "contain" }}
                            className="brand-logo"
                            onError={(e) => {
                              e.target.src = "/placeholder.svg?height=60&width=80"
                            }}
                          />
                        </div>
                      </div>

                      {/* Hover Overlay with Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 rounded-2xl"></div>

                      {/* Brand Name Tooltip */}
                      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none z-20 shadow-lg">
                        <span className="font-medium">Shop {brand.name}</span>
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                      </div>

                      {/* Premium Badge for Featured Brands */}
                      {index < 3 && (
                        <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-sm">
                          ⭐ Featured
                        </div>
                      )}

                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Enhanced Bottom Section */}
          <div className={`mt-12 opacity-0 ${isLoaded ? "animate-fade-in-up animate-delay-400" : ""}`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 md:p-8">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Explore All Brands</h3>
                <p className="text-gray-600">
                  Discover our complete collection of{" "}
                  <span className="font-semibold text-gray-900">{brands.length}+</span> premium brands
                </p>
              </div>

              <div className="flex items-center space-x-4">
                {/* Brand Count Badge */}
                <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
                  <span className="text-sm font-bold text-gray-900">{brands.length}+ Brands</span>
                </div>

                {/* View All Button */}
                <Link href="/brands">
                  <button className="group bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2">
                    <span>View All Brands</span>
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
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
