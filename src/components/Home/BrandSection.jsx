import Image from "next/image";
import Link from "next/link";
import DataIteration from "../Helpers/DataIteration";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function BrandSection({ className, sectionTitle, brands = [] }) {
  return (
    <div data-aos="fade-up" className={`w-full ${className || ""}`}>
      <div className="container-x mx-auto">
        <div className="section-title flex justify-between items-center mb-5">
          <div className="mb-3">
            <h6 className="border-s-[10px] border-l-[#db4444] pl-1 mb-1">
              Brand
            </h6>
            <h1 className="sm:text-3xl text-xl font-semibold text-qblacktext">
              {sectionTitle}
            </h1>
          </div>
        </div>

        <Swiper
          spaceBetween={20}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 6,
              spaceBetween: 30,
            },
          }}
          modules={[Autoplay]}
          className="brand-swiper"
        >
          {brands?.map((brand) => (
            <SwiperSlide key={brand.id}>
              <Link
                href={{
                  pathname: "/products",
                  query: { brand: brand.slug },
                }}
              >
                <div className="w-full h-[130px] bg-white border border-gray-200 flex justify-center items-center relative cursor-pointer rounded hover:shadow-md transition">
                  <Image
                    src={process.env.NEXT_PUBLIC_BASE_URL + brand.logo}
                    alt={brand.name}
                    fill
                    style={{ objectFit: "scale-down" }}
                  />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
