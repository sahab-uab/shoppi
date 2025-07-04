import React from "react";
import Link from "next/link";
import ShopNowBtn from "../../Helpers/Buttons/ShopNowBtn";
import ServeLangItem from "../../Helpers/ServeLangItem";

function TwoColumnAds({ bannerOne, bannerTwo }) {
  if (bannerOne || bannerTwo) {
    return (
      <>
        <div
          className={`-mt-6 two-column-ads-section md:mb-[60px] lg:h-[295px] h-[200px] mb-[30px] w-full`}
        >
          <div className="container-x mx-auto h-full">
            <div
              className={`sm:flex xl:space-x-[10px] md:space-x-4 rtl:space-x-reverse items-center w-full h-full  overflow-hidden`}
            >
              {bannerOne && (
                <div data-aos="fade-right" className={`h-full sm:w-1/2 w-full`}>
                  <div
                    style={{
                      backgroundImage: `url(${
                        process.env.NEXT_PUBLIC_BASE_URL + bannerOne.image
                      })`,
                      backgroundSize: `cover`,
                      backgroundRepeat: `no-repeat`,
                    }}
                    className="w-full  shadow-sm rounded-lg h-full relative ltr:pl-[50px] rtl:pr-[50px] py-[35px] flex flex-col justify-between group"
                  >
                    <div>
                      <div className="lg:mb-[22px] mb-2.5">
                        <span className="text-black uppercase text-xs font-semibold">
                          {bannerOne.badge}
                        </span>
                      </div>
                      <div className="lg:mb-[30px] mb-2.5">
                        <p className="lg:text-[30px] text-[20px] leading-none text-black font-semibold lg:mb-3">
                          {bannerOne.title_one}
                        </p>
                        <h1 className="lg:text-[30px] text-[20px] lg:leading-[40px] text-black font-semibold">
                          {bannerOne.title_two}
                        </h1>
                      </div>
                    </div>
                    <div>
                      <div className="w-[95px]">
                        <Link
                          href={{
                            pathname: "/products",
                            query: { category: bannerOne.product_slug },
                          }}
                          passHref
                          legacyBehavior
                        >
                          <a rel="noopener noreferrer">
                            <ShopNowBtn />
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {bannerTwo && (
                <div data-aos="fade-left" className={`h-full sm:w-1/2 w-full`}>
                  <div
                    style={{
                      backgroundImage: `url(${
                        process.env.NEXT_PUBLIC_BASE_URL + bannerTwo.image
                      })`,
                      backgroundSize: `cover`,
                      backgroundRepeat: `no-repeat`,
                    }}
                    className="w-full h-full shadow-md rounded-2xl relative bg-blue-100  ltr:pl-[50px] rtl:pr-[50px] py-[35px] flex flex-col justify-between group"
                  >
                    <div>
                      <div className="lg:mb-[22px] mb-2.5">
                        <span className="text-black uppercase text-xs font-semibold">
                          {bannerTwo.badge}
                        </span>
                      </div>
                      <div className="lg:mb-[30px] mb-2.5">
                        <p className="lg:text-[30px] leading-none text-black font-semibold lg:mb-3">
                          {bannerTwo.title_one}
                        </p>
                        <h1 className="lg:text-[30px] text-[20px] lg:leading-[40px] text-black font-semibold">
                          {bannerTwo.title_two}
                        </h1>
                      </div>
                    </div>
                    <div>
                      <div className="w-[90px]">
                        <Link
                          href={{
                            pathname: "/products",
                            query: { category: bannerTwo.product_slug },
                          }}
                          passHref
                          legacyBehavior
                        >
                          <a rel="noopener noreferrer">
                            <div className="cursor-pointer w-full relative  ">
                              <div className="inline-flex  space-x-1.5 rtl:space-x-reverse items-center relative z-20">
                                <span className="text-sm text-black group-hover:text-white duration-300 leading-[30px]">
                                  {ServeLangItem()?.Shop_Now}
                                </span>
                                <span className="leading-[30px]">
                                  <svg
                                    className={`transform rtl:rotate-180 text-black group-hover:text-white duration-300 fill-current`}
                                    width="7"
                                    height="11"
                                    viewBox="0 0 7 11"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <rect
                                      x="2.08984"
                                      y="0.636719"
                                      width="6.94219"
                                      height="1.54271"
                                      transform="rotate(45 2.08984 0.636719)"
                                    />
                                    <rect
                                      x="7"
                                      y="5.54492"
                                      width="6.94219"
                                      height="1.54271"
                                      transform="rotate(135 7 5.54492)"
                                    />
                                  </svg>
                                </span>
                              </div>
                              <div className="w-[95px] transition-all duration-300 ease-in-out group-hover:h-7 h-[1px] bg-black/40 absolute -left-2 bottom-0 z-10"></div>
                            </div>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default TwoColumnAds;
