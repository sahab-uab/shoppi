import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import ServeLangItem from "../ServeLangItem";
import LoginContext from "../../Contexts/LoginContext";
import auth from "../../../../utils/auth";
import { HiOutlineSearch } from "react-icons/hi"; // Tailwind-friendly icon

export default function SearchBox({ className }) {
  const router = useRouter();
  const loginPopupBoard = useContext(LoginContext);
  const [searchKey, setSearchkey] = useState("");

  useEffect(() => {
    if (router && router.route === "/search") {
      setSearchkey(router.query?.search || "");
    }
    return () => setSearchkey("");
  }, [router]);

  const searchHandler = () => {
    if (!auth()) return loginPopupBoard.handlerPopup(true);

    if (searchKey.trim() !== "") {
      router.push({
        pathname: "/search",
        query: { search: searchKey },
      });
    }
  };

  return (
    <div className={`w-full -mt-2  py-6 flex justify-center ${className || ""}`}>
      <div className="w-full max-w-xl relative">
        <div className="relative w-full">
          <input
            type="text"
            placeholder={ServeLangItem()?.Search_products + "..."}
            className="w-full rounded-full pl-5 pr-10 py-3 text-sm text-black placeholder-gray-400 shadow-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={searchKey}
            onChange={(e) => setSearchkey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchHandler()}
          />
          <button
            onClick={searchHandler}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
          >
            {/* Replace with icon or SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
              />
            </svg>
          </button>
        </div>

        {/* <button
          onClick={searchHandler}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
        >
          <HiOutlineSearch size={20} />
        </button> */}
      </div>
    </div>
  );
}
