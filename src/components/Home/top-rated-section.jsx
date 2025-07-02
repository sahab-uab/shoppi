"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function TopRatedSection({
  products = [],
  sectionTitle,
  seeMoreUrl,
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Process products data
  const processedProducts = products.map((item) => ({
    id: item.id,
    title: item.name,
    slug: item.slug,
    image: process.env.NEXT_PUBLIC_BASE_URL + item.thumb_image,
    price: item.price,
    offer_price: item.offer_price,
    review: Number.parseInt(item.averageRating || 0),
    variants: item.active_variants,
  }));

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const calculateDiscount = (originalPrice, offerPrice) => {
    if (!offerPrice || offerPrice >= originalPrice) return 0;
    return Math.round(((originalPrice - offerPrice) / originalPrice) * 100);
  };

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

        .product-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .product-card:hover {
          transform: translateY(-8px) scale(1.02);
        }

        .product-image {
          transition: all 0.5s ease;
        }

        .product-card:hover .product-image {
          transform: scale(1.1);
        }
      `}</style>

      <div className="w-full bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="container-x mx-auto px-4">
          {/* Enhanced Section Header */}
          <div className="flex flex-col md:flex-row md:items-center mb-4 md:justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900  bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {sectionTitle || "Shop by Brand"}
              </h2>
              <p className="text-gray-600 text-sm max-w-xl">
                Discover premium products from world-renowned brands that
                deliver quality and innovation
              </p>
            </div>

            {/* Enhanced View More Button */}
            <Link href={seeMoreUrl || "/products"}>
              <button className="group bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2">
                <span>View More</span>
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

          {/* Enhanced Product Grid - More Compact */}
          <div className="grid lg:grid-cols-2 gap-6">
            {processedProducts.slice(0, 4).map((product, index) => (
              <div
                key={product.id}
                className={`product-card group bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-100 hover:border-gray-200 overflow-hidden opacity-0 ${
                  isLoaded ? `animate-scale-in stagger-${index + 1}` : ""
                }`}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="flex flex-col md:flex-row h-full">
                  {/* Compact Product Image Section */}
                  <div className="relative md:w-2/5 h-48 md:h-auto bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    {/* Discount Badge */}
                    {product.offer_price &&
                      product.offer_price < product.price && (
                        <div className="absolute top-4 left-4 z-10">
                          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                            
                            {calculateDiscount(
                              product.price,
                              product.offer_price
                            )}
                            % Off
                          </div>
                        </div>
                      )}

                    {/* Top Rated Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center">
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {product.review}.0
                      </div>
                    </div>

                    {/* Product Image */}
                    <div className="relative w-full h-full p-6 flex items-center justify-center">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        fill
                        style={{ objectFit: "contain" }}
                        className="product-image"
                        onError={(e) => {
                          e.target.src =
                            "/placeholder.svg?height=200&width=200";
                        }}
                      />
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Compact Product Details Section */}
                  <div className="md:w-3/5 p-4 flex flex-col justify-between">
                    <div>
                      {/* Star Rating - Smaller */}
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < product.review
                                ? "text-yellow-400"
                                : "text-gray-300"
                            } transition-colors duration-200`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-2 text-xs text-gray-600 font-medium">
                          ({product.review}.0)
                        </span>
                      </div>

                      {/* Product Title - Smaller */}
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-300 line-clamp-2">
                        {product.title}
                      </h3>

                      {/* Price Section - Compact */}
                      <div className="flex items-center space-x-2 mb-3">
                        {product.offer_price &&
                        product.offer_price < product.price ? (
                          <>
                            <span className="text-2xl font-bold text-red-500">
                              ${product.offer_price}
                            </span>
                            <span className="text-lg text-gray-500 line-through">
                              ${product.price}
                            </span>
                            <span className="text-sm text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full">
                              Save $
                              {(product.price - product.offer_price).toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="text-2xl font-bold text-gray-900">
                            ${product.price}
                          </span>
                        )}
                      </div>

                      {/* Product Features */}
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <svg
                            className="w-4 h-4 mr-1 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
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

                    {/* Compact Action Buttons */}
                    <div className="flex flex-col space-y-2">

                      <div className="flex space-x-2">
                        <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 px-3 rounded-md font-medium transition-all duration-300 flex items-center justify-center text-xs">
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
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
                          <svg
                            className="w-3 h-3 mr-1"
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
                          Quick View
                        </button>
                      </div>
                      <Link href={`/single-product?slug=${product.slug}`}>
                        <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-sm">
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
          <div
            className={`mt-12 text-center opacity-0 ${
              isLoaded ? "animate-fade-in-up stagger-4" : ""
            }`}
          >
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
              <p className="text-gray-700 text-lg">
                ⭐ These products have an average rating of{" "}
                <span className="font-bold text-orange-600">
                  {(
                    processedProducts.reduce((acc, p) => acc + p.review, 0) /
                    processedProducts.length
                  ).toFixed(1)}
                </span>{" "}
                stars from thousands of satisfied customers
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
