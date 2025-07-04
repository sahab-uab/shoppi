import { useEffect, useState } from "react";
import settings from "../../../utils/settings";
import SectionStyleFour from "../Helpers/SectionStyleFour";
import SectionStyleOne from "../Helpers/SectionStyleOne";
import SectionStyleThree from "../Helpers/SectionStyleThree";
import SectionStyleTwo from "../Helpers/SectionStyleTwo";
import ViewMoreTitle from "../Helpers/ViewMoreTitle";
import Layout from "../Partials/Layout";
import Ads from "./Ads";
import Banner from "./Banner";
import BestSellers from "./BestSellers";
import BrandSection from "./BrandSection";
import CampaignCountDown from "./CampaignCountDown";
// import ProductsAds from "./ProductsAds";
import TwoColumnAds from "./ProductAds/TwoColumnAds";
import OneColumnAdsOne from "./ProductAds/OneColumnAdsOne";
import OneColumnAdsTwo from "./ProductAds/OneColumnAdsTwo";
import CategorySection from "./CategorySection";
import CombinedCategorySection from "./combined-category-section";
import TopRatedSection from "./top-rated-section";
import BestSellersSection from "./best-sellers-section";
import FeaturedProductsSection from "./featured-products-section";
import NewArrivalsSection from "./new-arrivals-section";

export default function Home({ homepageData }) {
  console.log("homepageData", homepageData);
  const getsectionTitles = homepageData.section_title;
  const [sectionTitles, setSectionTitles] = useState(null);
  useEffect(() => {
    if (!sectionTitles) {
      let tem =
        getsectionTitles &&
        getsectionTitles.map((item, i) => {
          return {
            [item.key]: item.custom ? item.custom : item.default,
          };
        });
      setSectionTitles(Object.assign.apply(Object, tem));
    }
  }, [sectionTitles]);

  const [homepage] = useState(homepageData);
  const { enable_multivendor } = settings();
  const [isMultivendor, setIsMultivendor] = useState(false);
  useEffect(() => {
    if (!isMultivendor) {
      setIsMultivendor(enable_multivendor && parseInt(enable_multivendor));
    }
  }, [isMultivendor]);
  return (
    <>
      <Layout childrenClasses="pt-[12px]">
        <Ads />
        {homepage && homepage.sliders.length > 0 && (
          <Banner
            images={homepage.sliders}
            services={homepage.services}
            sidebarImgOne={
              homepage.sliderBannerOne &&
              parseInt(homepage.sliderBannerOne.status) === 1
                ? homepage.sliderBannerOne
                : null
            }
            sidebarImgTwo={
              homepage.sliderBannerTwo &&
              parseInt(homepage.sliderBannerTwo.status) === 1
                ? homepage.sliderBannerTwo
                : null
            }
            className="banner-wrapper md:mb-[30px] mb-[15px]"
          />
        )}

        {homepage && (
          <CombinedCategorySection
            featuredCategories={homepage.homepage_categories}
            popularCategories={homepage.popularCategories}
            popularProducts={homepage.popularCategoryProducts}
            categoryBackground={
              process.env.NEXT_PUBLIC_BASE_URL +
              homepage.popularCategorySidebarBanner
            }
            sectionTitles={sectionTitles}
          />
        )}
         {homepage && (
          <SectionStyleFour
            products={
              homepage.bestProducts.length > 0 ? homepage.bestProducts : []
            }
            sectionTitle={sectionTitles && sectionTitles.Best_Products}
            seeMoreUrl={`/products?highlight=best_product`}
            className="category-products md:mb-[30px] mb-[15px]"
            services={homepage.services}
            section="flashsale"
          />
        )}

        {homepage && (
          <BrandSection
            brands={homepage.brands.length > 0 ? homepage.brands : []}
            sectionTitle={sectionTitles && sectionTitles.Shop_by_Brand}
            className="brand-section-wrapper md:mb-[30px] mb-[15px]"
          />
        )}

        {homepage && (
          <CampaignCountDown
            className="md:mb-[60px] mb-[15px]"
            flashSaleData={homepage.flashSale}
            downloadData={homepage.flashSaleSidebarBanner}
            lastDate={homepage.flashSale.end_time}
          />
        )}
        {homepage && (
          <TopRatedSection
            products={
              homepage.topRatedProducts.length &&
              homepage.topRatedProducts.length > 0
                ? homepage.topRatedProducts
                : []
            }
            sectionTitle={sectionTitles && sectionTitles.Top_Rated_Products}
            seeMoreUrl={`/products?highlight=top_product`}
          />
        )}

        {homepage && isMultivendor === 1 && (
          <BestSellersSection
            sellers={homepage.sellers.length > 0 ? homepage.sellers : []}
            sectionTitle={sectionTitles && sectionTitles.Best_Seller}
            seeMoreUrl="/sellers"
          />
        )}

        {homepage && (
          <TwoColumnAds
            bannerOne={
              homepage.twoColumnBannerOne &&
              parseInt(homepage.twoColumnBannerOne.status) === 1
                ? homepage.twoColumnBannerOne
                : null
            }
            bannerTwo={
              homepage.twoColumnBannerTwo &&
              parseInt(homepage.twoColumnBannerTwo.status) === 1
                ? homepage.twoColumnBannerTwo
                : null
            }
          />
        )}
        {homepage && (
          <FeaturedProductsSection
            categories={
              homepage.featuredCategories.length > 0
                ? homepage.featuredCategories
                : []
            }
            categoryBackground={
              process.env.NEXT_PUBLIC_BASE_URL +
              homepage.featuredCategorySidebarBanner
            }
            categoryTitle={sectionTitles && sectionTitles.Featured_Products}
            products={
              homepage.featuredCategoryProducts.length > 0
                ? homepage.featuredCategoryProducts
                : []
            }
            sectionTitle={sectionTitles && sectionTitles.Featured_Products}
            seeMoreUrl={`/products?highlight=featured_product`}
            className="category-products md:mb-[30px] mb-[15px]"
          />
        )}
        {homepage && (
          <OneColumnAdsOne
            data={
              homepage.singleBannerOne &&
              parseInt(homepage.singleBannerOne.status) === 1
                ? homepage.singleBannerOne
                : null
            }
          />
        )}
        {homepage && (
          <SectionStyleFour
            products={
              homepage.newArrivalProducts.length > 0
                ? homepage.newArrivalProducts.slice(
                    0,
                    homepage.newArrivalProducts.length > 16
                      ? 16
                      : homepage.newArrivalProducts.length
                  )
                : []
            }
            sectionTitle={sectionTitles && sectionTitles.New_Arrivals}
            seeMoreUrl={`/products?highlight=new_arrival`}
            className="new-products md:mb-[30px] mb-[15px]"
            section="new-arrivals"
          />
        )}
        {homepage && (
          <div className="w-full text-white md:mb-[30px] mb-[15px]">
            <div className="container-x mx-auto">
              <OneColumnAdsTwo
                data={
                  homepage.singleBannerTwo &&
                  parseInt(homepage.singleBannerTwo.status) === 1
                    ? homepage.singleBannerTwo
                    : null
                }
              />
            </div>
          </div>
        )}
        {homepage && (
          <SectionStyleFour
            products={
              homepage.bestProducts.length > 0 ? homepage.bestProducts : []
            }
            sectionTitle={sectionTitles && sectionTitles.Best_Products}
            seeMoreUrl={`/products?highlight=best_product`}
            className="category-products md:mb-[30px] mb-[15px]"
            services={homepage.services}
            section="best-products"
          />
        )}
      </Layout>
    </>
  );
}
