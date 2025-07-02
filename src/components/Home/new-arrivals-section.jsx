"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function NewArrivalsSection({
  products = [],
  sectionTitle,
  seeMoreUrl,
  className,
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  const processedProducts = products.map((item) => ({
    id: item.id,
    title: item.name,
    slug: item.slug,
    image: process.env.NEXT_PUBLIC_BASE_URL + item.thumb_image,
    price: item.price,
    offer_price: item.offer_price,
    review: Number.parseInt(item.averageRating || 0),
    variants: item.active_variants || [],
  }));

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const calculateDiscount = (original, offer) => {
    if (!offer || offer >= original) return 0;
    return Math.round(((original - offer) / original) * 100);
  };

  if (!products.length) return null;

  return (
    <div className={`w-full bg-white py-10 ${className || ""}`}>
      <div className="container-x mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {sectionTitle || "New Arrivals"}
            </h2>
            <p className="text-gray-500 text-sm">
              Discover premium products from world‑renowned brands that deliver
              quality and innovation
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

        {/* Grid with 3 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {processedProducts.map((product, index) => {
            const discount = calculateDiscount(
              product.price,
              product.offer_price
            );
            const finalPrice =
              product.offer_price && product.offer_price < product.price
                ? product.offer_price
                : product.price;

            return (
              <div
                key={product.id}
                className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                {/* Image */}
                <Link
                  href={`/single-product?slug=${product.slug}`}
                  className="flex-shrink-0 w-[80px] h-[80px] relative mr-4"
                >
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    fill
                    style={{ objectFit: "contain" }}
                    className="rounded-md"
                    onError={(e) => {
                      e.target.src = "/placeholder.svg?height=200&width=200";
                    }}
                  />
                </Link>

                {/* Info */}
                <div className="flex flex-col flex-grow min-w-0">
                  <div className="flex items-center justify-between">
                    <Link href={`/single-product?slug=${product.slug}`}>
                      <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 hover:text-green-600 transition">
                        {product.title}
                      </h3>
                    </Link>
                    {discount > 0 && (
                      <span className="ml-2 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                        {discount}% Off
                      </span>
                    )}
                  </div>

                  <div className="flex items-center text-yellow-400 text-xs mt-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>{i < product.review ? "★" : "☆"}</span>
                    ))}
                    <span className="ml-1 text-gray-400">
                      ({product.review.toFixed(1)})
                    </span>
                  </div>

                  <div className="mt-1 text-sm text-gray-900 flex items-center space-x-2">
                    <span className="font-bold text-green-600">
                      ${finalPrice}
                    </span>
                    {product.offer_price &&
                      product.offer_price < product.price && (
                        <>
                          <span className="line-through text-gray-400 text-xs">
                            ${product.price}
                          </span>
                          <span className="text-xs text-green-500">
                            Save $
                            {Math.abs(
                              product.price - product.offer_price
                            ).toFixed(2)}
                          </span>
                        </>
                      )}
                  </div>

                  <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
                    <span className="text-green-600">✓ Free Shipping</span>
                    <span className="text-blue-600">🛡 Warranty</span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="ml-4 text-gray-400 hover:text-gray-800 cursor-pointer">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
