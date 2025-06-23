import React from "react";
import Image from "next/image";
import Link from "next/link";

function CategorySection({ sectionTitle, categories }) {
  return (
    <div data-aos="fade-up" className="category-section-wrapper w-full">
      <div className="container-x mx-auto pb-[60px]">
        <div>
          {/*<div className="section-title flex justify-between items-center mb-5">*/}
          {/*    <div>*/}
          {/*        <h1 className="sm:text-3xl text-xl font-600 text-qblacktext">*/}
          {/*            {sectionTitle}*/}
          {/*        </h1>*/}
          {/*    </div>*/}
          {/*</div>*/}
          <div className="mb-3">
            <h6 className="border-s-[10px] border-l-[#db4444] pl-1 mb-1">Category</h6>
            <h1 className="text-2xl font-semibold">Browse By Category</h1>
          </div>
          <div className="w-full grid xl:grid-cols-8 md:grid-cols-4 grid-cols-2 gap-5">
            {categories?.slice(0, 8).map((item, i) => (
              <Link
                key={i}
                href={{ pathname: "/products", query: { category: item.slug } }}
                passHref
                legacyBehavior
              >
                <a
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between border border-30[#101010] p-5 text-center transition hover:bg-[#db4444] h-[130px]"
                >
                  <div className="flex justify-center items-center">
                    <Image
                      src={process.env.NEXT_PUBLIC_BASE_URL + item.image}
                      alt={item.name}
                      width={35}
                      height={35}
                      className="mx-auto transition-transform group-hover:scale-110"
                    />
                  </div>
                  <p className="text-sm text-gray-800 group-hover:text-white transition mt-auto mb-0">
                    {item.name}
                  </p>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategorySection;
