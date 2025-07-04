"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Arrow from "../../../Helpers/icons/Arrow"
import FontAwesomeCom from "../../../Helpers/icons/FontAwesomeCom"
import Multivendor from "../../../Shared/Multivendor"
import ServeLangItem from "../../../Helpers/ServeLangItem"

export default function Navbar({ className, topBarProps }) {
  const { allCurrency, defaultCurrency, handler1, toggleCurrency, toggleHandler } = topBarProps

  const { websiteSetup } = useSelector((state) => state.websiteSetup)
  const categoryList = websiteSetup && websiteSetup.payload.productCategories
  const mageMenuList = websiteSetup && websiteSetup.payload.megaMenuCategories
  const megaMenuBanner = websiteSetup && websiteSetup.payload.megaMenuBanner
  const customPages = websiteSetup && websiteSetup.payload.customPages

  const [categoryToggle, setToggle] = useState(false)
  const [subCatHeight, setHeight] = useState(null)

  const handler = () => {
    setToggle(!categoryToggle)
  }

  useEffect(() => {
    const categorySelector = document.querySelector(".category-dropdown")
    setHeight(categorySelector.offsetHeight)
  }, [categoryToggle])

  return (
    <div className={`nav-widget-wrapper w-full bg-[#FCF5E5] h-[60px] relative z-30  ${className || ""}`}>
      <div className="container-x mx-auto h-full ">
        <div className="w-full h-full relative">
          <div className="w-full h-full flex justify-between items-center">
            <div className="category-and-nav flex xl:rtl:space-x-reverse space-x-7 rtl:space-x-reverse space-x-3 items-center">
              <div className="category w-[270px] h-[53px]  px-5 rounded-t-md mt-[6px] relative">
                <button onClick={handler} type="button" className="w-full h-full flex justify-between items-center">
                  <div className="flex rtl:space-x-reverse space-x-3 items-center">
                    <span>
                      <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="14" height="1" />
                        <rect y="8" width="14" height="1" />
                        <rect y="4" width="10" height="1" />
                      </svg>
                    </span>
                    {<span className="text-sm font-600 text-qblacktext">{ServeLangItem()?.All_Categories}</span>}
                  </div>
                  <div>
                    <Arrow width="5.78538" height="1.28564" className="fill-current text-qblacktext" />
                  </div>
                </button>

                {categoryToggle && (
                  <>
                    <div className="fixed top-0 left-0 w-full h-full -z-10" onClick={handler}></div>
                  </>
                )}

                <div
                  style={{
                    boxShadow: " 0px 15px 50px 0px rgba(0, 0, 0, 0.14)",
                  }}
                  className={`category-dropdown w-full absolute left-0 top-[53px]  ${
                    categoryToggle ? "block" : "hidden"
                  }`}
                >
                  <ul className="categories-list relative">
                    {categoryList &&
                      categoryList.map((item) => (
                        <li key={item.id} className="category-item">
                          <Link
                            href={{
                              pathname: "/products",
                              query: { category: item.slug },
                            }}
                            passHref
                            legacyBehavior
                          >
                            <a rel="noopener noreferrer">
                              <div className=" flex justify-between items-center px-5 h-10 transition-all duration-100 ease-out cursor-pointer">
                                <div className="flex items-center rtl:space-x-reverse space-x-6">
                                  <span>
                                    <FontAwesomeCom className="w-4 h-4" icon={item.icon} />
                                  </span>
                                  <span className="text-xs font-400">{item.name}</span>
                                </div>
                                <div>
                                  <span>
                                    <svg
                                      className={`transform rtl:rotate-180 fill-current`}
                                      width="6"
                                      height="9"
                                      viewBox="0 0 6 9"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <rect
                                        x="1.49805"
                                        y="0.818359"
                                        width="5.78538"
                                        height="1.28564"
                                        transform="rotate(45 1.49805 0.818359)"
                                      />
                                      <rect
                                        x="5.58984"
                                        y="4.90918"
                                        width="5.78538"
                                        height="1.28564"
                                        transform="rotate(135 5.58984 4.90918)"
                                      />
                                    </svg>
                                  </span>
                                </div>
                              </div>
                            </a>
                          </Link>

                          <div
                            className={`sub-category-lvl-two absolute ltr:left-[270px] rtl:right-[270px] top-0 z-10 w-[270px] ${
                              item.active_sub_categories.length > 0 ? "bg-white" : ""
                            }`}
                            style={{ maxHeight: "10px" }}
                          >
                            <ul className="">
                              {item.active_sub_categories.length > 0 &&
                                item.active_sub_categories.map((subItem) => (
                                  <li key={subItem.id} className="category-item">
                                    <Link
                                      href={{
                                        pathname: "/products",
                                        query: { sub_category: subItem.slug },
                                      }}
                                      passHref
                                      legacyBehavior
                                    >
                                      <a rel="noopener noreferrer">
                                        <div className=" flex justify-between items-center px-5 h-10 transition-all duration-300 ease-in-out cursor-pointer">
                                          <div>
                                            <span className="text-xs font-400">{subItem.name}</span>
                                          </div>
                                          <div>
                                            <span>
                                              <svg
                                                className={`transform rtl:rotate-180 fill-current`}
                                                width="6"
                                                height="9"
                                                viewBox="0 0 6 9"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <rect
                                                  x="1.49805"
                                                  y="0.818359"
                                                  width="5.78538"
                                                  height="1.28564"
                                                  transform="rotate(45 1.49805 0.818359)"
                                                />
                                                <rect
                                                  x="5.58984"
                                                  y="4.90918"
                                                  width="5.78538"
                                                  height="1.28564"
                                                  transform="rotate(135 5.58984 4.90918)"
                                                />
                                              </svg>
                                            </span>
                                          </div>
                                        </div>
                                      </a>
                                    </Link>

                                    <div
                                      className={`sub-category-lvl-three absolute ltr:left-[270px] rtl:right-[270px] top-0 z-10 w-[270px] ${
                                        subItem.active_child_categories.length > 0 ? "bg-white" : ""
                                      }`}
                                      style={{ height: `${subCatHeight}px` }}
                                    >
                                      <ul className="">
                                        {subItem.active_child_categories.length > 0 &&
                                          subItem.active_child_categories.map((subsubitem) => (
                                            <li key={subsubitem.id} className="category-item">
                                              <Link
                                                href={{
                                                  pathname: "/products",
                                                  query: {
                                                    child_category: subsubitem.slug,
                                                  },
                                                }}
                                                passHref
                                                legacyBehavior
                                              >
                                                <a rel="noopener noreferrer">
                                                  <div className=" flex justify-between items-center px-5 h-10  transition-all duration-100 ease-out cursor-pointer">
                                                    <div>
                                                      <span className="text-xs font-400">{subsubitem.name}</span>
                                                    </div>
                                                  </div>
                                                </a>
                                              </Link>
                                            </li>
                                          ))}
                                      </ul>
                                    </div>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              <div className="nav">
                <ul className="nav-wrapper flex xl:space-x-7 rtl:space-x-reverse space-x-5 items-center">
                  <li>
                    <span className="flex items-center text-sm font-600 cursor-pointer text-qblacktext ">
                      <span>{ServeLangItem()?.Shop}</span>
                      <span className="ml-1.5 ">
                        <Arrow className="fill-current" />
                      </span>
                    </span>
                    <div className="sub-menu w-full absolute left-0 top-[60px]">
                      <div
                        className="mega-menu-wrapper w-full bg-white p-[30px] flex justify-between items-center "
                        style={{
                          minHeight: "295px",
                          boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.14)",
                        }}
                      >
                        <div className="categories-wrapper flex-1 h-full flex justify-around -ml-[70px]">
                          {mageMenuList &&
                            mageMenuList.slice(0, 3).map((megaItem) => (
                              <div key={megaItem.id}>
                                <div className="category">
                                  <h1 className="text-[13px] font-700 text-qblack uppercase mb-[13px]">
                                    {megaItem.category.name}
                                  </h1>
                                </div>
                                <div className="category-items">
                                  <ul className="flex flex-col space-y-2">
                                    {megaItem.sub_categories.length > 0 &&
                                      megaItem.sub_categories.map((subItem) => (
                                        <li key={subItem.id}>
                                          <Link
                                            href={{
                                              pathname: "/products",
                                              query: {
                                                sub_category: subItem.sub_category && subItem.sub_category.slug,
                                              },
                                            }}
                                            passHref
                                            legacyBehavior
                                          >
                                            <a rel="noopener noreferrer">
                                              <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-[#101010] cursor-pointer">
                                                {subItem.sub_category && subItem.sub_category.name}
                                              </span>
                                            </a>
                                          </Link>
                                        </li>
                                      ))}
                                  </ul>
                                </div>
                              </div>
                            ))}
                        </div>

                        {megaMenuBanner && Number.parseInt(megaMenuBanner.status) === 1 && (
                          <div
                            style={{
                              backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL + megaMenuBanner.image})`,
                              backgroundSize: "contain",
                              backgroundRepeat: "no-repeat",
                            }}
                            className="thumbnil w-[348px] h-[235px] relative flex items-center ltr:pl-[40px] rtl:pr-[40px] group"
                          >
                            <div className="flex flex-col justify-between">
                              <div>
                                <div className=" mb-[10px]">
                                  <span className="text-qblack uppercase text-xs font-semibold">
                                    {megaMenuBanner.title_one}
                                  </span>
                                </div>
                                <div className="mb-[30px]">
                                  <h1 className="w-[160px] text-[24px] leading-[32px] text-qblack font-semibold">
                                    {megaMenuBanner.title_two}
                                  </h1>
                                </div>
                              </div>
                              <div className="w-[90px]">
                                <Link
                                  href={{
                                    pathname: "/products",
                                    query: {
                                      category: megaMenuBanner.product_slug,
                                    },
                                  }}
                                  passHref
                                  legacyBehavior
                                >
                                  <a rel="noopener noreferrer">
                                    <div className="cursor-pointer w-full relative  ">
                                      <div className="inline-flex  rtl:space-x-reverse space-x-1.5 items-center relative z-20">
                                        <span className="text-sm text-qblack font-medium leading-[30px]">
                                          {ServeLangItem()?.Shop_Now}
                                        </span>
                                        <span className="leading-[30px]">
                                          <svg
                                            className={`transform rtl:rotate-180 fill-current`}
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
                                      <div className="w-[82px] transition-all duration-100 ease-out  group-hover:h-4 h-[0px] bg-[#101010] absolute left-0 bottom-0 z-10"></div>
                                    </div>
                                  </a>
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>

                  <li>
                    <Link href="/sellers" passHref legacyBehavior>
                      <a rel="noopener noreferrer">
                        <span className="flex items-center text-sm font-600 cursor-pointer text-qblacktext">
                          <span>{ServeLangItem()?.Sellers}</span>
                        </span>
                      </a>
                    </Link>
                  </li>

                  <li>
                    <Link href="/blogs" passHref legacyBehavior>
                      <a rel="noopener noreferrer">
                        <span className="flex items-center text-sm font-600 cursor-pointer text-qblacktext">
                          <span className="capitalize">{ServeLangItem()?.blogs}</span>
                        </span>
                      </a>
                    </Link>
                  </li>

                  <li>
                    <Link href="/about" passHref legacyBehavior>
                      <a rel="noopener noreferrer">
                        <span className="flex items-center text-sm font-600 cursor-pointer text-qblacktext">
                          <span>{ServeLangItem()?.About}</span>
                        </span>
                      </a>
                    </Link>
                  </li>

                  <li>
                    <Link href="/contact" passHref legacyBehavior>
                      <a rel="noopener noreferrer">
                        <span className="flex items-center text-sm font-600 cursor-pointer text-qblacktext">
                          <span>{ServeLangItem()?.Contact}</span>
                        </span>
                      </a>
                    </Link>
                  </li>

                  <li className="relative">
                    <span className="flex items-center text-sm font-600 cursor-pointer text-qblacktext">
                      <span>{ServeLangItem()?.Pages}</span>
                      <span className="ml-1.5 ">
                        <Arrow className="fill-current" />
                      </span>
                    </span>
                    <div className="sub-menu w-[220px] absolute left-0 top-[60px]">
                      <div
                        className="w-full bg-white flex justify-between items-center "
                        style={{
                          boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.14)",
                        }}
                      >
                        <div className="categories-wrapper w-full h-full p-5">
                          <div>
                            <div className="category-items">
                              <ul className="flex flex-col space-y-2">
                                <li>
                                  <Link href="/privacy-policy" passHref legacyBehavior>
                                    <a rel="noopener noreferrer">
                                      <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-[#101010] cursor-pointer">
                                        {ServeLangItem()?.Privacy_Policy}
                                      </span>
                                    </a>
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/terms-condition" passHref legacyBehavior>
                                    <a rel="noopener noreferrer">
                                      <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-[#101010] cursor-pointer">
                                        {ServeLangItem()?.Term_and_Conditions}
                                      </span>
                                    </a>
                                  </Link>
                                </li>
                                {Multivendor() === 1 && (
                                  <li>
                                    <Link href="seller-terms-condition" passHref legacyBehavior>
                                      <a rel="noopener noreferrer">
                                        <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-[#101010] cursor-pointer">
                                          {ServeLangItem()?.Seller_terms_and_conditions}
                                        </span>
                                      </a>
                                    </Link>
                                  </li>
                                )}
                                <li>
                                  <Link href="/faq" passHref legacyBehavior>
                                    <a rel="noopener noreferrer">
                                      <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-[#101010] cursor-pointer">
                                        {ServeLangItem()?.FAQ}
                                      </span>
                                    </a>
                                  </Link>
                                </li>
                                {customPages &&
                                  customPages.length > 0 &&
                                  customPages.map((item, i) => (
                                    <React.Fragment key={i}>
                                      <li>
                                        <Link href={`/pages?custom=${item.slug}`} passHref legacyBehavior>
                                          <a rel="noopener noreferrer">
                                            <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-[#101010] cursor-pointer">
                                              {item.page_name}
                                            </span>
                                          </a>
                                        </Link>
                                      </li>
                                    </React.Fragment>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <Link href="/account" passHref legacyBehavior>
                      <a rel="noopener noreferrer">
                        <span className="flex items-center text-sm font-600 cursor-pointer text-qblacktext">
                          <span>{ServeLangItem()?.Account}</span>
                        </span>
                      </a>
                    </Link>
                  </li>

                  <li>
                    <Link href="/track-order" passHref legacyBehavior>
                      <a rel="noopener noreferrer">
                        <span className="flex items-center text-sm font-600 cursor-pointer text-qblacktext">
                          <span>{ServeLangItem()?.Track_Order || "Track Order"}</span>
                        </span>
                      </a>
                    </Link>
                  </li>

                  {/* Fixed Currency Selector - Now properly aligned */}
                  <li className="relative">
                    {defaultCurrency && (
                      <div className="flex items-center text-sm font-600 cursor-pointer text-qblacktext">
                        <span className="mr-2">Currency:</span>
                        <button
                          onClick={() => toggleHandler(!toggleCurrency)}
                          className="flex items-center px-2 py-1 bg-[#222] hover:bg-[#333] rounded text-white text-xs font-semibold transition-colors duration-200"
                        >
                          <span className="mr-1">{defaultCurrency.currency_icon}</span>
                          <span>{defaultCurrency.currency_code}</span>
                        </button>
                        {toggleCurrency && (
                          <div className="absolute top-full left-0 mt-2 bg-white text-black rounded shadow-lg z-50 border border-gray-200">
                            <ul className="text-sm max-h-40 overflow-y-auto py-1">
                              {allCurrency.map((item, i) => (
                                <li
                                  key={i}
                                  onClick={() => handler1(item)}
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2 transition-colors duration-150"
                                >
                                  <span>{item.currency_icon}</span>
                                  <span>{item.currency_code}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </li>
                </ul>
              </div>
            </div>

            {Multivendor() === 1 && (
              <div className="flex items-center gap-4 rtl:space-x-reverse">
                {/* Become Seller Button */}
                <div className="become-seller-btn">
                  <Link href="/become-seller" passHref legacyBehavior>
                    <a rel="noopener noreferrer">
                      <div className=" w-[161px] h-[40px] flex justify-center items-center cursor-pointer">
                        <div className="flex rtl:space-x-reverse space-x-2 items-center">
                          <span className="text-sm font-600">{ServeLangItem()?.Become_seller}</span>
                          <span className="transform rtl:rotate-180 fill-current ">
                            <svg
                              width="6"
                              height="10"
                              viewBox="0 0 6 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="fill-current"
                            >
                              <rect x="1.08984" width="6.94106" height="1.54246" transform="rotate(45 1.08984 0)" />
                              <rect
                                x="6"
                                y="4.9082"
                                width="6.94106"
                                height="1.54246"
                                transform="rotate(135 6 4.9082)"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
