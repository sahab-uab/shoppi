"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import settings from "../../../utils/settings"
import ShopNowBtn from "../Helpers/Buttons/ShopNowBtn"
import SimpleSlider from "../Helpers/SliderCom"
import FontAwesomeCom from "../Helpers/icons/FontAwesomeCom"

export default function Banner({ className, images = [], sidebarImgOne, sidebarImgTwo, services = [] }) {
  const [isLoaded, setIsLoaded] = useState(false)

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
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <style jsx>{`
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
            <div className="banner-card flex flex-col lg:flex-row lg:space-x-[30px] rtl:space-x-0 mb-[30px]">
              {/* Banner Slider - Left Side, Smaller */}
              <div
                className={`w-full lg:w-[60%] xl:w-[65%] h-[280px] md:h-[320px] lg:h-[350px] mb-4 lg:mb-0 opacity-0 ${
                  isLoaded ? "animate-slide-in-left" : ""
                }`}
              >
                <div className="slider-wrapper w-full h-full rounded-2xl overflow-hidden shadow-lg bg-gray-100 min-h-[280px] md:min-h-[320px] lg:min-h-[350px] transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
                  {images.length > 0 ? (
                    <SimpleSlider settings={settingBanner}>
                      {images.map((item, i) => (
                        <div key={i} className="item w-full h-full group">
                          <div
                            style={{
                              backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL + item.image})`,
                              backgroundSize: "cover",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center",
                            }}
                            className="flex w-full h-full relative items-center rtl:pr-[20px] ltr:pl-[20px] rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-500"
                            onError={(e) => {
                              e.target.style.backgroundImage = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                            }}
                          >
                            <div className={`banner-content p-6 md:p-8 ${isLoaded ? "loaded" : ""}`}>
                              <div
                                className={`inline-block w-[90px] md:w-[110px] shadow h-5 md:h-6 flex items-center justify-center bg-[#101010] rounded-full mb-4 md:mb-6 transform transition-all duration-300 hover:scale-110 ${
                                  isLoaded ? "animate-bounce-in animate-delay-200" : ""
                                }`}
                              >
                                <span className="text-[#fff] uppercase text-[9px] md:text-xs font-semibold">
                                  {item.badge}
                                </span>
                              </div>
                              <div
                                className={`mb-4 md:mb-6 ${isLoaded ? "animate-slide-in-up animate-delay-400" : ""}`}
                              >
                                <p className="text-[18px] md:text-[32px] lg:text-[40px] leading-none text-[#101010] mb-1 md:mb-2 transform transition-all duration-300 hover:translate-x-2">
                                  {item.title_one}
                                </p>
                                <h1 className="text-[18px] md:text-[32px] lg:text-[40px] leading-tight text-[#101010] font-bold max-w-[280px] md:max-w-[350px] transform transition-all duration-300 hover:translate-x-2">
                                  {item.title_two}
                                </h1>
                              </div>
                              <div
                                className={`w-[80px] md:w-[90px] ${isLoaded ? "animate-fade-in-scale animate-delay-600" : ""}`}
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
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl">
                      <div className={`text-center text-white ${isLoaded ? "animate-fade-in-scale" : ""}`}>
                        <h2 className="text-2xl font-bold mb-2">No Banner Images</h2>
                        <p>Please add banner images to display the slider</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side Content - Optional sidebar images */}
              {(sidebarImgOne || sidebarImgTwo) && (
                <div
                  className={`w-full lg:w-[40%] xl:w-[35%] flex flex-col space-y-4 opacity-0 ${
                    isLoaded ? "animate-slide-in-right animate-delay-200" : ""
                  }`}
                >
                  {sidebarImgOne && (
                    <div className="h-[140px] lg:h-[170px] rounded-xl overflow-hidden shadow-md transform transition-all duration-300 hover:shadow-xl hover:scale-105">
                      <div
                        style={{
                          backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL + sidebarImgOne.image})`,
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                        }}
                        className="w-full h-full rounded-xl transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                  )}
                  {sidebarImgTwo && (
                    <div className="h-[140px] lg:h-[170px] rounded-xl overflow-hidden shadow-md transform transition-all duration-300 hover:shadow-xl hover:scale-105">
                      <div
                        style={{
                          backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL + sidebarImgTwo.image})`,
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                        }}
                        className="w-full h-full rounded-xl transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Services Section */}
            <div
              className={`best-services w-full bg-[#dcf5d3] rounded-2xl overflow-x-auto flex flex-row space-x-10 px-6 py-6 lg:px-10 lg:py-8 lg:space-x-0 lg:justify-between lg:items-center lg:h-[110px] lg:overflow-x-visible transform transition-all duration-300 hover:shadow-lg opacity-0 ${
                isLoaded ? "animate-slide-in-up animate-delay-400" : ""
              }`}
            >
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className={`min-w-[200px] flex-shrink-0 transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${
                    isLoaded ? "animate-fade-in-scale" : ""
                  }`}
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <div className="flex space-x-5 rtl:space-x-reverse items-center">
                    <div className="transform transition-all duration-300 hover:rotate-12 hover:scale-110">
                      <span className="w-10 h-10 text-[#101010]">
                        <FontAwesomeCom className="w-8 h-8" icon={service.icon} />
                      </span>
                    </div>
                    <div>
                      <p className="text-black text-[15px] font-medium tracking-wide mb-1 transition-colors duration-300 hover:text-green-700">
                        {service.title}
                      </p>
                      <p className="text-sm text-[#888] line-clamp-1 transition-colors duration-300 hover:text-gray-600">
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
