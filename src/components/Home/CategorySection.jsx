"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

function CategorySection({ sectionTitle, categories }) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Trigger animations after component mounts
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
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-fade-in-scale {
          animation: fadeInScale 0.5s ease-out forwards;
        }
        
        .animate-slide-in-bottom {
          animation: slideInFromBottom 0.7s ease-out forwards;
        }
        
        .animate-bounce-in {
          animation: bounceIn 0.6s ease-out forwards;
        }
        
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .category-card {
          opacity: 0;
          transform: translateY(20px);
        }
        
        .category-card.loaded {
          opacity: 1;
          transform: translateY(0);
        }
        
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        .stagger-6 { animation-delay: 0.6s; }
        .stagger-7 { animation-delay: 0.7s; }
        .stagger-8 { animation-delay: 0.8s; }
      `}</style>

      <div className="category-section-wrapper w-full bg-gray-50 py-12">
        <div className="container-x mx-auto px-4">
          <div>
            {/* Clean Section Header */}
            <div className={`mb-10 text-center opacity-0 ${isLoaded ? "animate-fade-in-up" : ""}`}>
              <div className="relative inline-block">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 transform transition-all duration-300 hover:text-gray-700">
                  Featured Categories
                </h2>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-gray-900 rounded-full"></div>
              </div>
              <p
                className={`text-gray-600 text-base mt-4 max-w-xl mx-auto opacity-0 ${isLoaded ? "animate-slide-in-bottom stagger-2" : ""}`}
              >
                Discover amazing products across our most popular categories
              </p>
            </div>

            {/* Compact Categories Grid */}
            <div className="w-full grid xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-4 mb-10">
              {categories?.slice(0, 8).map((item, i) => (
                <Link key={i} href={{ pathname: "/products", query: { category: item.slug } }} passHref legacyBehavior>
                  <a rel="noopener noreferrer">
                    <div
                      className={`category-card group relative overflow-hidden bg-white rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300 transform hover:rotate-1 hover:scale-102 cursor-pointer h-[140px] ${
                        isLoaded ? `animate-bounce-in stagger-${i + 1}` : ""
                      }`}
                    >
                      {/* Content */}
                      <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 text-center">
                        {/* Icon Container */}
                        <div className="mb-3 transform transition-all duration-300 group-hover:animate-pulse">
                          <div className="w-12 h-12 bg-gray-100 group-hover:bg-gray-200 rounded-xl flex items-center justify-center shadow-sm transition-all duration-300 border border-gray-200 group-hover:border-gray-300">
                            <Image
                              src={process.env.NEXT_PUBLIC_BASE_URL + item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={28}
                              height={28}
                              className="transition-all duration-300 group-hover:scale-110 filter drop-shadow-sm"
                              onError={(e) => {
                                e.target.src = "/placeholder.svg?height=28&width=28"
                              }}
                            />
                          </div>
                        </div>

                        {/* Category Name */}
                        <h3 className="text-gray-900 font-semibold text-sm mb-1 transform transition-all duration-300 group-hover:text-gray-700 leading-tight">
                          {item.name}
                        </h3>

                        {/* Subtle Indicator */}
                        <div className="w-4 h-0.5 bg-gray-300 group-hover:bg-gray-900 transition-all duration-300 rounded-full"></div>
                      </div>

                      {/* Subtle Background Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>

            {/* Clean View All Button */}
            {categories && categories.length > 8 && (
              <div className={`text-center opacity-0 ${isLoaded ? "animate-fade-in-scale stagger-8" : ""}`}>
                <button className="group relative inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-gray-900 hover:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 overflow-hidden">
                  <span className="relative z-10 flex items-center">
                    View All Categories
                    <svg
                      className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default CategorySection
