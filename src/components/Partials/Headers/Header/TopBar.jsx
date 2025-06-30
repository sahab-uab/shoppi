import Image from "next/image";
import Link from "next/link";
import Arrow from "../../../Helpers/icons/Arrow";
import Selectbox from "../../../Helpers/Selectbox";
// import ThinPeople from "../../../Helpers/icons/ThinPeople";
import auth from "../../../../../utils/auth";
import { useEffect, useState } from "react";
import ServeLangItem from "../../../Helpers/ServeLangItem";
import Multivendor from "../../../Shared/Multivendor";
export default function TopBar({ className, contact, topBarProps }) {
  const {
    allCurrency,
    defaultCurrency,
    handler,
    toggleCurrency,
    toggleHandler,
  } = topBarProps;
  const [auth, setAuth] = useState(null);
  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem("auth")));
  }, []);
  return (
    <>
      <div
        className={`w-full bg-black/10 h-10 border-b border-qgray-border ${
          className || ""
        }`}
      >
        <div className="container-x mx-auto h-full">
          <div className="flex justify-between items-center h-full">
            <div className="topbar-nav">
             
            </div>
            <div className="topbar-dropdowns lg:block hidden">
              <div className="flex ltr:space-x-6 rtl:-space-x-0 items-center">
                <div className="flex ltr:space-x-2 rtl:space-x-0 items-center rtl:ml-2 ltr:ml-0">
                  <span className={`rtl:ml-1 ltr:ml-0`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-phone-icon lucide-phone"
                    >
                      <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
                    </svg>
                  </span>
                  <span className="text-xs text-black font-500 leading-none rtl:ml-2 ltr:ml-0 ">
                    {contact && contact.phone}
                  </span>
                </div>
                <div className="flex ltr:space-x-2 rtl:space-x-0 items-center ">
                  <span className={`rtl:ml-2 ltr:ml-0`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </span>
                  <span className="text-xs text-black font-500 leading-none">
                    {contact && contact.email}
                  </span>
                </div>
                {/*<div className="country-select flex space-x-1 items-center">*/}
                {/*  <div>*/}
                {/*    <Image*/}
                {/*      src={`/assets/images/country-logo-16x16.png`}*/}
                {/*      width="16"*/}
                {/*      height="16"*/}
                {/*      alt="country logo"*/}
                {/*      className="overflow-hidden rounded-full"*/}
                {/*    />*/}
                {/*  </div>*/}
                {/*  <Selectbox*/}
                {/*    className="w-fit"*/}
                {/*    defaultValue="United State"*/}
                {/*    datas={[*/}
                {/*      { id: 1, name: "United State" },*/}
                {/*      { id: 2, name: "Bangladesh" },*/}
                {/*      { id: 3, name: "India" },*/}
                {/*    ]}*/}
                {/*  />*/}
                {/*  <div>*/}
                {/*    <Arrow className="fill-current qblack" />*/}
                {/*  </div>*/}
                {/*</div>*/}
                {/*<div className="currency-select flex space-x-1 items-center">*/}
                {/*  <Selectbox*/}
                {/*    defaultValue="USD"*/}
                {/*    className="w-fit"*/}
                {/*    datas={[*/}
                {/*      { id: 1, name: "USD" },*/}
                {/*      { id: 2, name: "BDT" },*/}
                {/*    ]}*/}
                {/*  />*/}
                {/*  <Arrow className="fill-current qblack" />*/}
                {/*</div>*/}
                {/*<div className="language-select flex space-x-1 items-center">*/}
                {/*  <Selectbox*/}
                {/*    defaultValue="Bangla"*/}
                {/*    className="w-fit"*/}
                {/*    datas={[*/}
                {/*      { id: 1, name: "Bangla" },*/}
                {/*      { id: 2, name: "English" },*/}
                {/*    ]}*/}
                {/*  />*/}
                {/*  <Arrow className="fill-current qblack" />*/}
                {/*</div>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
