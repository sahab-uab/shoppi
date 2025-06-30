import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import ServeLangItem from "../../../Helpers/ServeLangItem";
import auth from "../../../../../utils/auth";

export default function TopStickyBar({
  allCurrency,
  defaultCurrency,
  handler,
  toggleCurrency,
  toggleHandler,
}) {
  const [profile, setProfile] = useState(false);
  return (
    <div className="w-full text-xs -mt-14 py-2 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-end items-center gap-6">
        <Link href="/login" className="hover:underline">
          Account
        </Link>
        <Link href="/tracking-order" className="hover:underline">
          Track Order
        </Link>
        {defaultCurrency && (
          <div className="flex items-center space-x-1">
            <span>Currency:</span>
            <button
              onClick={() => toggleHandler(!toggleCurrency)}
              className="px-2 py-1 bg-black/80  rounded-md text-white text-xs "
            >
              {defaultCurrency.currency_icon} {defaultCurrency.currency_code}
            </button>
            {toggleCurrency && (
              <div className="absolute mt-2 bg-white text-black rounded shadow z-50">
                <ul className="text-sm max-h-40 overflow-y-scroll">
                  {allCurrency.map((item, i) => (
                    <li
                      key={i}
                      onClick={() => handler(item)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {item.currency_icon} {item.currency_code}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
     
    </div>
  );
}
