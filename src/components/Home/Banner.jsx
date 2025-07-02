"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import settings from "../../../utils/settings"
import ShopNowBtn from "../Helpers/Buttons/ShopNowBtn"
import SimpleSlider from "../Helpers/SliderCom"
import FontAwesomeCom from "../Helpers/icons/FontAwesomeCom"

export default function Banner({ className, images = [], sidebarImgOne, sidebarImgTwo, services = [] }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [bgImages, setBgImages] = useState([])

  const settingBanner = {
    infinite: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    fade: true,
    pauseOnHover: true,
  }

  const { text_direction } = settings()

  useEffect(() => {
    const getSliderInitElement = document.querySelector(".slider-wrapper .slick-slider.slick-initialized")
    if (getSliderInitElement) {
      getSliderInitElement.setAttribute("dir", `${text_direction}`)
    }
  }, [text_direction])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Preload images and apply fallback if they fail
  useEffect(() => {
    const preloadImages = images.map((item) => {
      return new Promise((resolve) => {
        const img = new Image()
        img.src = process.env.NEXT_PUBLIC_BASE_URL + item.image
        img.onload = () => resolve(`url(${img.src})`)
        img.onerror = () => resolve("linear-gradient(135deg, #667eea 0%, #764ba2 100%)")
      })
    })
    Promise.all(preloadImages).then(setBgImages)
  }, [images])

  return (
    <>
      <style jsx global>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInUp {
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
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
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
        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }
        .animate-slide-in-up {
          animation: slideInUp 0.6s ease-out forwards;
        }
        .animate-fade-in-scale {
          animation: fadeInScale 0.7s ease-out forwards;
        }
        .animate-bounce-in {
          animation: bounceIn 0.8s ease-out forwards;
        }
        .animate-delay-200 {
          animation-delay: 0.2s;
        }
        .animate-delay-400 {
          animation-delay: 0.4s;
        }
        .animate-delay-600 {
          animation-delay: 0.6s;
        }
        .banner-content > * {
          opacity: 0;
        }
        .banner-content.loaded > * {
          opacity: 1;
        }
      `}</style>

      <div className={`w-full ${className || ""}`}>
        <div className="container-x mx-auto">
          <div className="main-wrapper w-full">
            {/* Modified to maintain horizontal layout on all screen sizes */}
            <div className="banner-card grid grid-cols-3 gap-[8px] sm:gap-[12px] md:gap-[15px] mb-[12px]">
              {/* Main Banner - always takes 2 columns */}
              <div className={`col-span-2 opacity-0 ${isLoaded ? "animate-slide-in-left" : ""}`}>
                <div className="slider-wrapper w-full h-[180px] sm:h-[220px] md:h-[280px] lg:h-[350px] overflow-hidden shadow-sm bg-gray-100 min-h-[180px] sm:min-h-[220px] md:min-h-[280px] lg:min-h-[350px] transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
                  {images.length > 0 ? (
                    <SimpleSlider settings={settingBanner}>
                      {images.map((item, i) => (
                        <div key={i} className="item w-full h-full group">
                          <div
                            style={{
                              backgroundImage: bgImages[i],
                              backgroundSize: "cover",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center",
                            }}
                            className="flex w-full h-full relative items-center rtl:pr-[10px] sm:rtl:pr-[15px] md:rtl:pr-[20px] ltr:pl-[10px] sm:ltr:pl-[15px] md:ltr:pl-[20px] bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-500"
                          >
                            <div className={`banner-content p-2 sm:p-4 md:p-6 lg:p-8 ${isLoaded ? "loaded" : ""}`}>
                              <div
                                className={` w-[60px] sm:w-[80px] md:w-[90px] lg:w-[110px] shadow h-3 sm:h-4 md:h-5 lg:h-6 flex items-center justify-center bg-[#101010] mb-2 sm:mb-3 md:mb-4 lg:mb-6 transform transition-all duration-300 hover:scale-110 ${
                                  isLoaded ? "animate-bounce-in animate-delay-200" : ""
                                }`}
                              >
                                <span className="text-[#fff] uppercase text-[6px] sm:text-[8px] md:text-[9px] lg:text-xs font-semibold">
                                  {item.badge}
                                </span>
                              </div>
                              <div
                                className={`mb-2 sm:mb-3 md:mb-4 lg:mb-6 ${isLoaded ? "animate-slide-in-up animate-delay-400" : ""}`}
                              >
                                <p className="text-[12px] sm:text-[16px] md:text-[18px] lg:text-[32px] xl:text-[40px] leading-none text-[#101010] mb-1 transform transition-all duration-300 hover:translate-x-2">
                                  {item.title_one}
                                </p>
                                <h1 className="text-[12px] sm:text-[16px] md:text-[18px] lg:text-[32px] xl:text-[40px] leading-tight text-[#101010] font-bold max-w-[120px] sm:max-w-[200px] md:max-w-[280px] lg:max-w-[350px] transform transition-all duration-300 hover:translate-x-2">
                                  {item.title_two}
                                </h1>
                              </div>
                              <div
                                className={`w-[50px] sm:w-[60px] md:w-[80px] lg:w-[90px] ${isLoaded ? "animate-fade-in-scale animate-delay-600" : ""}`}
                              >
                                <Link
                                  href={{
                                    pathname: "/single-product",
                                    query: { slug: item.product_slug },
                                  }}
                                  passHref
                                  legacyBehavior
                                >
                                  <a
                                    rel="noopener noreferrer"
                                    className="transform transition-all duration-300 hover:scale-105 inline-block"
                                  >
                                    <ShopNowBtn />
                                  </a>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </SimpleSlider>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
                      <div className={`text-center text-white ${isLoaded ? "animate-fade-in-scale" : ""}`}>
                        <h2 className="text-sm sm:text-lg md:text-2xl font-bold mb-1 sm:mb-2">No Banner Images</h2>
                        <p className="text-xs sm:text-sm md:text-base">
                          Please add banner images to display the slider
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar Banners - always takes 1 column */}
              {(sidebarImgOne || sidebarImgTwo) && (
                <div
                  className={`flex flex-col gap-[8px] sm:gap-[12px] md:gap-[15px] opacity-0 ${
                    isLoaded ? "animate-slide-in-right animate-delay-200" : ""
                  }`}
                >
                  {[sidebarImgOne, sidebarImgTwo].map(
                    (img, i) =>
                      img && (
                        <div
                          key={i}
                          className="h-[86px] sm:h-[106px] md:h-[132px] lg:h-[170px] overflow-hidden shadow-md transform transition-all duration-300 hover:shadow-xl hover:scale-105"
                        >
                          <div
                            style={{
                              backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL + img.image})`,
                              backgroundSize: "cover",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center",
                            }}
                            className="w-full h-full transition-transform duration-500 hover:scale-110"
                          />
                        </div>
                      ),
                  )}
                </div>
              )}
            </div>

            {/* Services - Made more mobile-friendly */}
            <div
              className={`best-services w-full overflow-x-auto flex flex-row space-x-4 sm:space-x-6 md:space-x-10 px-2 sm:px-4 md:px-6 lg:px-10 py-3 sm:py-4 md:py-6 lg:py-8 lg:space-x-0 lg:justify-between lg:items-center lg:h-[110px] lg:overflow-x-visible transform transition-all duration-300 hover:shadow-lg opacity-0 ${
                isLoaded ? "animate-slide-in-up animate-delay-400" : ""
              }`}
            >
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className={`min-w-[140px] sm:min-w-[160px] md:min-w-[200px] border-r-2 sm:border-r-3 md:border-r-4 border-[#101010] border-opacity-60 px-2 sm:px-4 md:px-6 py-2 flex-shrink-0 transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${
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
          </div>
        </div>
      </div>
    </>
  )
}
