import React from "react";
import ServeLangItem from "../ServeLangItem";

function ShopNowBtn() {
  return (
    <div className="cursor-pointer w-full relative ">
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
      <div className="w-[95px] transition-all duration-300 ease-in-out group-hover:h-7 h-[1px] bg-[#101010] absolute -left-2 bottom-0 z-10"></div>
    </div>
  );
}

export default ShopNowBtn;
