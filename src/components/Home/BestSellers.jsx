import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function BestSellers({ className, sallers = [] }) {
  return (
    <div className={`w-full ${className || ""}`}>
      <Swiper
        loop={true}
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
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        modules={[Autoplay]}
        className="best-sellers-swiper"
      >
        {sallers.map((saller) => (
          <SwiperSlide key={saller.id}>
            <Link
              href={{
                pathname: "/seller-products",
                query: { seller: saller.slug },
              }}
              passHref
              legacyBehavior
            >
              <a
                rel="noopener noreferrer"
                className="group flex flex-col items-center"
              >
                <div className="w-[130px] h-[130px] bg-white border border-gray-200 flex justify-center items-center rounded-full overflow-hidden relative cursor-pointer hover:shadow-md transition">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_URL + saller.logo}`}
                    alt={saller.slug}
                    fill
                    style={{ objectFit: "scale-down" }}
                  />
                </div>
                <p className="text-sm text-center mt-3 group-hover:text-red-500 transition">
                  {saller.shop_name}
                </p>
              </a>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
