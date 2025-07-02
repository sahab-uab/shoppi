"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSelector } from "react-redux"
import { Mail, Phone, MapPin, ArrowRight, Heart } from "lucide-react"

export default function ModernFooter({ settings, contact }) {
  const { websiteSetup } = useSelector((state) => state.websiteSetup)
  const [isLoaded, setIsLoaded] = useState(false)
  const [email, setEmail] = useState("")

  // State for footer data
  const [firstCol, setFirstCol] = useState(null)
  const [secondCol, setSecondCol] = useState(null)
  const [thirdCol, setThirdCol] = useState(null)
  const [footerContent, setFooterContent] = useState(null)
  const [socialLink, setSocialLink] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 200)
    return () => clearTimeout(timer)
  }, [])

  // Initialize footer data
  useEffect(() => {
    if (websiteSetup?.payload) {
      setFooterContent(websiteSetup.payload.footer)
      setSocialLink(websiteSetup.payload.social_links)
      setFirstCol(websiteSetup.payload.footer_first_col)
      setSecondCol(websiteSetup.payload.footer_second_col)
      setThirdCol(websiteSetup.payload.footer_third_col)
    }
  }, [websiteSetup])

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email)
    setEmail("")
  }

  return (
    <>
      <style jsx global>{`
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
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
      `}</style>

      <footer className="bg-white border-t border-gray-200">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <div className="container-x mx-auto px-4 py-12">
            <div className={`max-w-2xl mx-auto text-center opacity-0 ${isLoaded ? "animate-fade-in-up" : ""}`}>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Stay Updated</h3>
                <p className="text-gray-600">Get the latest offers and updates delivered to your inbox</p>
              </div>

              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 group"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="container-x mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className={`lg:col-span-2 opacity-0 ${isLoaded ? "animate-fade-in-up stagger-1" : ""}`}>
              {/* Logo */}
              <div className="mb-6">
                <Link href="/" className="inline-block">
                  {settings && (
                    <Image
                      width={120}
                      height={40}
                      src={`${process.env.NEXT_PUBLIC_BASE_URL + settings.logo}`}
                      alt="logo"
                      className="h-10 w-auto"
                    />
                  )}
                </Link>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">About Our Store</h4>
                <p className="text-gray-600 leading-relaxed max-w-md">
                  We pride ourselves on delivering quality products and exceptional customer service. Your satisfaction
                  is our top priority.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                {contact?.phone && (
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{contact.phone}</span>
                  </div>
                )}
                {contact?.email && (
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{contact.email}</span>
                  </div>
                )}
                {contact?.address && (
                  <div className="flex items-start space-x-3 text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <span className="text-sm">{contact.address}</span>
                  </div>
                )}
              </div>
            </div>

            {/* First Column */}
            {firstCol && (
              <div className={`opacity-0 ${isLoaded ? "animate-fade-in-up stagger-2" : ""}`}>
                <h5 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                  {firstCol.columnTitle}
                </h5>
                <ul className="space-y-3">
                  {firstCol.col_links?.map((item, i) => (
                    <li key={i}>
                      <Link
                        href={item.link}
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 capitalize"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Second Column */}
            {secondCol && (
              <div className={`opacity-0 ${isLoaded ? "animate-fade-in-up stagger-3" : ""}`}>
                <h5 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                  {secondCol.columnTitle}
                </h5>
                <ul className="space-y-3">
                  {secondCol.col_links?.map((item, i) => (
                    <li key={i}>
                      <Link
                        href={item.link}
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 capitalize"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Third Column */}
            {thirdCol && (
              <div className={`opacity-0 ${isLoaded ? "animate-fade-in-up stagger-4" : ""}`}>
                <h5 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                  {thirdCol.columnTitle}
                </h5>
                <ul className="space-y-3">
                  {thirdCol.col_links?.map((item, i) => (
                    <li key={i}>
                      <Link
                        href={item.link}
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 capitalize"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="container-x mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright & Social */}
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
                <p className="text-sm text-gray-600 flex items-center">
                  {footerContent?.copyright || `© ${new Date().getFullYear()} All rights reserved`}
                  <Heart className="w-3 h-3 text-red-500 mx-1" />
                </p>

                {/* Social Links */}
                {socialLink && socialLink.length > 0 && (
                  <div className="flex items-center space-x-4">
                    {socialLink.map((item, i) => (
                      <a
                        key={i}
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      >
                        <div className="w-5 h-5">
                          {/* You can replace this with your FontAwesome component */}
                          <div className="w-full h-full bg-gray-400 rounded-full"></div>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Payment Methods */}
              {footerContent?.payment_image && (
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 mr-3">We accept:</span>
                  <Image
                    width={200}
                    height={24}
                    src={`${process.env.NEXT_PUBLIC_BASE_URL + footerContent.payment_image}`}
                    alt="payment methods"
                    className="h-6 w-auto "
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
