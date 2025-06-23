import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Facebook from "../../../Helpers/icons/Facebook";
import Instagram from "../../../Helpers/icons/Instagram";
import Youtube from "../../../Helpers/icons/Youtube";
import FontAwesomeCom from "../../../Helpers/icons/FontAwesomeCom";

export default function Footer({ settings }) {
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  const [firstCol, setFirstCol] = useState(null);
  const [secondCol, setSecondCol] = useState(null);
  const [thirdCol, setThirdCol] = useState(null);
  const [footerContent, setFooterContent] = useState(null);
  const [socialLink, setSocialLink] = useState(null);

  useEffect(() => {
    if (!footerContent) {
      setFooterContent(
        websiteSetup && websiteSetup.payload && websiteSetup.payload.footer
      );
    }
  });

  useEffect(() => {
    if (!socialLink) {
      setSocialLink(
        websiteSetup &&
          websiteSetup.payload &&
          websiteSetup.payload.social_links
      );
    }
  });

  useEffect(() => {
    if (!firstCol) {
      setFirstCol(
        websiteSetup &&
          websiteSetup.payload &&
          websiteSetup.payload.footer_first_col
      );
    }
  });
  useEffect(() => {
    if (!secondCol) {
      setSecondCol(
        websiteSetup &&
          websiteSetup.payload &&
          websiteSetup.payload.footer_second_col
      );
    }
  });
  useEffect(() => {
    if (!thirdCol) {
      setThirdCol(
        websiteSetup &&
          websiteSetup.payload &&
          websiteSetup.payload.footer_third_col
      );
    }
  });

  return (
    <>
      <footer className="bg-black text-white">
        <div className="container-x block mx-auto pt-[56px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Exclusive Section */}
            <div className="lg:col-span-1">
              {/* logo area */}
              <div className="mb-[40px]">
                <Link href="/" passHref legacyBehavior>
                  <a>
                    {settings && (
                      <Image
                        width="153"
                        height="44"
                        objectFit="scale-down"
                        src={`${
                          process.env.NEXT_PUBLIC_BASE_URL + settings.logo
                        }`}
                        alt="logo"
                      />
                    )}
                  </a>
                </Link>
              </div>
              <h4 className="text-lg mb-4 font-bold">About Us</h4>
              <p className="text-gray-300 mb-4">
                We know there are a lot of three developers our but we pride
                into a firm in the industry.
              </p>
            </div>

            {/* Account Section */}
            <div className="lg:col-span-1">
              {firstCol && (
                <>
                  <div className="mb-5">
                    <h6 className="text-[18] font-500 text-white">
                      {firstCol.columnTitle}
                    </h6>
                  </div>
                  <div>
                    <ul className="flex flex-col space-y-4 ">
                      {firstCol.col_links.length > 0 &&
                        firstCol.col_links.map((item, i) => (
                          <li key={i}>
                            <Link href={item.link} passHref legacyBehavior>
                              <a rel="noopener noreferrer">
                                <span className="text-[#cacaca] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                                  {item.title}
                                </span>
                              </a>
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </>
              )}
            </div>

            {/* General Link Section */}
            <div className="lg:col-span-1">
              {secondCol && (
                <>
                  <div className="mb-5">
                    <h6 className="text-[18] font-500 text-white">
                      {secondCol.columnTitle}
                    </h6>
                  </div>
                  <div>
                    <ul className="flex flex-col space-y-4 ">
                      {secondCol.col_links.length > 0 &&
                        secondCol.col_links.map((item, i) => (
                          <li key={i}>
                            <Link href={item.link} passHref legacyBehavior>
                              <a rel="noopener noreferrer">
                                <span className="text-[#cacaca] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                                  {item.title}
                                </span>
                              </a>
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </>
              )}
            </div>

            {/* Helpful Section */}
            <div className="lg:col-span-1">
              {thirdCol && (
                <>
                  <div className="mb-5">
                    <h6 className="text-[18] font-500 text-white">
                      {thirdCol.columnTitle}
                    </h6>
                  </div>
                  <div>
                    <ul className="flex flex-col space-y-4 ">
                      {thirdCol.col_links.length > 0 &&
                        thirdCol.col_links.map((item, i) => (
                          <li key={i}>
                            <Link href={item.link} passHref legacyBehavior>
                              <a rel="noopener noreferrer">
                                <span className="text-[#cacaca] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                                  {item.title}
                                </span>
                              </a>
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </>
              )}
            </div>

            {/* Bottom part */}
          </div>

          <div
            className="bottom-bar lg:h-[82px] flex lg:flex-row flex-col-reverse
         justify-between items-center"
          >
            <div className="flex rtl:space-x-reverse lg:space-x-5 space-x-2.5 justify-between items-center mb-3">
              <div className="flex rtl:space-x-reverse space-x-5 items-center">
                {socialLink &&
                  socialLink.length > 0 &&
                  socialLink.map((item, i) => (
                    <a
                      key={i}
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FontAwesomeCom
                        className="w-4 h-4 text-qgray"
                        icon={item.icon}
                      />
                    </a>
                  ))}
              </div>
              <span className="sm:text-base text-[10px] text-[#cacaca]">
                {footerContent && footerContent.copyright
                  ? footerContent.copyright
                  : ""}
              </span>
            </div>
            {footerContent && footerContent.payment_image ? (
              <div className="mt-2 lg:mt-0">
                <Link href="#" passHref legacyBehavior>
                  <a>
                    <Image
                      width="318"
                      height="28"
                      src={`${
                        process.env.NEXT_PUBLIC_BASE_URL +
                        footerContent.payment_image
                      }`}
                      alt="payment-getways"
                    />
                  </a>
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </footer>
    </>
  );
}
