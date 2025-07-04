import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import apiRequest from "../../../../utils/apiRequest";
import DateFormat from "../../../../utils/DateFormat";
import PageTitle from "../../Helpers/PageTitle";
import Layout from "../../Partials/Layout";
import CommentBlog from "./CommentBlog";
import { useRouter } from "next/router";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import ServeLangItem from "../../Helpers/ServeLangItem";
export default function Blog({ details }) {
  const router = useRouter();
  const blog = details && details.blog;
  const [rsComments, setRsComments] = useState(
    details &&
      details.activeComments.data.map((v) => {
        return {
          id: v.blog_id,
          author: v.name,
          comments: v.comment,
          review: null,
          replys: [],
        };
      })
  );
  const fetchComments = async (slug) => {
    await apiRequest
      .blogDetails(slug)
      .then((res) => {
        const dataIsExists =
          res.data &&
          res.data.activeComments &&
          res.data.activeComments.data.length > 0;
        if (dataIsExists) {
          const newComment = res.data.activeComments.data.map((v) => {
            return {
              id: v.blog_id,
              author: v.name,
              comments: v.comment,
              review: null,
              replys: [],
            };
          });
          setRsComments(newComment);
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [email, setEmail] = useState("");
  const subscribehandler = () => {
    apiRequest
      .subscribeRequest({ email: email })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          toast.error(err.response.data.message);
        }
        console.error(err);
        toast.error(err.response && err.response.data.message);
      });
  };
  const [searchKey, setSearchkey] = useState(null);
  const searchHandler = () => {
    if (searchKey !== "") {
      router.push({
        pathname: "/blog-search",
        query: { searchKey: searchKey },
      });
    } else {
      return false;
    }
  };
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="blog-page-wrapper w-full">
        <div className="title-area mb-[60px]">
          <PageTitle
            title="Blog Details"
            breadcrumb={[
              { name: ServeLangItem()?.home, path: "/" },
              { name: ServeLangItem()?.blogs, path: "/blogs" },
              {
                name: details && details.blog.slug,
                path: `/blogs/blog?slug=${details && details.blog.slug}`,
              },
            ]}
          />
        </div>
        <div className="content-area w-full">
          <div className="container-x mx-auto">
            <div className="blog-article lg:flex lg:space-x-[30px] rtl:space-x-reverse mb-7">
              <div className="flex-1">
                <div className="img w-full h-[457px] relative">
                  <Image
                    layout="fill"
                    src={`${
                      process.env.NEXT_PUBLIC_BASE_URL + details.blog.image
                    }`}
                    alt="blog"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="blog pt-[24px]">
                  <div className="short-data flex space-x-9 rtl:space-x-reverse items-center mb-3">
                    <div className="flex space-x-1.5 rtl:space-x-reverse items-center">
                      <span>
                        <svg
                          width="12"
                          height="15"
                          viewBox="0 0 12 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1.761 14.9996C1.55973 14.9336 1.35152 14.8896 1.16065 14.7978C0.397206 14.4272 -0.02963 13.6273 0.00160193 12.743C0.0397743 11.6936 0.275749 10.7103 0.765049 9.7966C1.42439 8.56373 2.36829 7.65741 3.59327 7.07767C3.67309 7.04098 3.7529 7.00428 3.85007 6.95658C2.68061 5.9512 2.17396 4.67062 2.43422 3.10017C2.58691 2.18285 3.03804 1.42698 3.72514 0.847238C5.24163 -0.42967 7.34458 -0.216852 8.60773 1.1738C9.36424 2.00673 9.70779 3.01211 9.61757 4.16426C9.52734 5.31642 9.01375 6.23374 8.14619 6.94924C8.33359 7.04098 8.50363 7.11436 8.6702 7.20609C10.1485 8.006 11.1618 9.24254 11.6997 10.9011C11.9253 11.5945 12.0328 12.3137 11.9912 13.0476C11.9357 14.0163 11.2243 14.8235 10.3151 14.9703C10.2908 14.974 10.2665 14.9886 10.2387 14.9996C7.41051 14.9996 4.58575 14.9996 1.761 14.9996ZM6.00507 13.8475C7.30293 13.8475 8.60079 13.8401 9.89518 13.8512C10.5684 13.8548 10.9571 13.3338 10.9015 12.7577C10.8807 12.5486 10.8773 12.3394 10.846 12.1303C10.6309 10.6185 9.92294 9.41133 8.72225 8.5784C7.17106 7.50331 5.50883 7.3602 3.84313 8.23349C2.05944 9.16916 1.15718 10.7506 1.09125 12.8568C1.08778 13.0072 1.12595 13.1723 1.18494 13.3044C1.36193 13.6934 1.68466 13.8438 2.08026 13.8438C3.392 13.8475 4.70027 13.8475 6.00507 13.8475ZM5.99119 6.53462C7.38969 6.54195 8.53833 5.33843 8.54527 3.85238C8.55221 2.37733 7.41745 1.16647 6.00507 1.15179C4.62046 1.13344 3.45794 2.35531 3.45099 3.8377C3.44405 5.31275 4.58922 6.52728 5.99119 6.53462Z" />
                        </svg>
                      </span>
                      <span className="text-base text-qgraytwo capitalize">
                        {ServeLangItem()?.By_Admin}
                      </span>
                    </div>
                    <div className="flex space-x-1.5 rtl:space-x-reverse items-center">
                      <span>
                        <svg
                          width="16"
                          height="15"
                          viewBox="0 0 16 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M3.73636 12.2092C3.29706 12.1112 2.89189 11.9493 2.52936 11.698C1.55268 11.0206 1.02382 10.0834 1.01102 8.89479C0.989696 7.06292 0.993961 5.23105 1.00676 3.39919C1.02382 1.68235 2.23934 0.297797 3.94108 0.0379278C4.11168 0.0123668 4.29081 0.00384653 4.46567 0.00384653C7.15688 0.00384653 9.8481 -0.000413627 12.5393 0.00384653C14.2069 0.00810668 15.5717 1.10723 15.9172 2.73034C15.9684 2.97317 15.9897 3.22452 15.9897 3.47587C15.994 5.25236 15.9982 7.0331 15.994 8.80958C15.9897 10.5136 14.8637 11.8939 13.2047 12.2134C12.9701 12.2603 12.7312 12.2688 12.4924 12.2688C11.2939 12.2731 10.0997 12.2731 8.90127 12.2688C8.77332 12.2688 8.66669 12.2986 8.56007 12.3711C7.33175 13.1933 6.10343 14.0112 4.87511 14.8334C4.71731 14.9399 4.55097 15.0166 4.35478 14.9953C3.98799 14.957 3.74489 14.6843 3.74062 14.3009C3.73636 13.6747 3.74062 13.0442 3.74062 12.4179C3.73636 12.354 3.73636 12.2901 3.73636 12.2092ZM5.09262 13.0442C5.16939 12.9973 5.21631 12.9632 5.26322 12.9334C6.1802 12.3242 7.09717 11.715 8.00988 11.0973C8.20607 10.9652 8.40226 10.9098 8.63684 10.9098C9.94193 10.9141 11.2428 10.9141 12.5478 10.9098C13.742 10.9056 14.6334 10.0109 14.6334 8.81384C14.6334 7.02458 14.6334 5.23531 14.6334 3.44605C14.6334 2.26173 13.7378 1.36284 12.5521 1.36284C9.85663 1.36284 7.15688 1.36284 4.46141 1.36284C3.27147 1.36284 2.37582 2.26173 2.37582 3.45457C2.37582 5.23957 2.37582 7.02032 2.37582 8.80532C2.37582 9.9726 3.2075 10.8459 4.37611 10.9056C4.84952 10.9311 5.09262 11.1825 5.09689 11.6554C5.09262 12.1069 5.09262 12.5543 5.09262 13.0442Z" />
                          <path d="M8.48317 5.45638C7.13543 5.45638 5.79196 5.45638 4.44422 5.45638C3.93668 5.45638 3.60401 4.99628 3.77461 4.54044C3.87697 4.26353 4.09022 4.12295 4.38024 4.09313C4.43142 4.08887 4.48687 4.08887 4.53805 4.08887C7.17808 4.08887 9.81385 4.08887 12.4539 4.08887C12.569 4.08887 12.6885 4.09739 12.7994 4.13147C13.115 4.22945 13.2984 4.5447 13.2514 4.88552C13.2088 5.19651 12.9273 5.44786 12.5946 5.45212C12.2108 5.46064 11.8269 5.45212 11.4473 5.45212C10.4621 5.45638 9.47265 5.45638 8.48317 5.45638Z" />
                          <path d="M8.48349 8.17895C7.58784 8.17895 6.69646 8.18321 5.80507 8.17895C5.32739 8.17469 5.01178 7.78701 5.11841 7.3397C5.18238 7.05853 5.42975 6.84552 5.71977 6.82848C5.76242 6.82422 5.80507 6.82422 5.84772 6.82422C7.6177 6.82422 9.39194 6.82422 11.1619 6.82422C11.5586 6.82422 11.8272 7.02871 11.8955 7.37378C11.9765 7.78275 11.6822 8.16617 11.2643 8.17895C10.8889 8.19173 10.5094 8.18321 10.1298 8.18321C9.5796 8.17895 9.03368 8.17895 8.48349 8.17895Z" />
                        </svg>
                      </span>
                      <span className="text-base text-qgraytwo">
                        {details.activeComments.data.length}{" "}
                        {ServeLangItem()?.Comments}
                      </span>
                    </div>
                  </div>
                  <div className="details">
                    <h1 className="text-[22px] text-qblack font-semibold line-clamp-2 mb-1 capitalize">
                      {details.blog.title}
                    </h1>
                    <div
                      className="mb-10 text-qgraytwo"
                      dangerouslySetInnerHTML={{
                        __html: details.blog.description,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="extra-content w-full">
                  <div className="w-full h-[1px] bg-[#DCDCDC]"></div>

                  <div className="comment-area w-full mt-8">
                    <div className="w-full sm:flex justify-between items-center mb-8">
                      <div className="tags flex space-x-5 rtl:space-x-reverse items-center">
                        <span className="text-2xl text-qblack">Share:</span>
                        <div className="flex space-x-2.5 rtl:space-x-reverse items-center">
                          <FacebookShareButton
                            url={`${
                              typeof window !== "undefined" &&
                              window.location.origin &&
                              window.location.origin +
                                "/blogs/blog?slug=" +
                                details.blog.slug
                            }`}
                            quotes={details.blog.title}
                          >
                            <span className="text-base cursor-pointer text-[#101010] ">
                              <svg
                                width="35"
                                height="35"
                                viewBox="0 0 35 35"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="fill-current"
                              >
                                <path d="M34.5284 17.2744C34.5284 26.7975 26.799 34.5175 17.2642 34.5175C7.72946 34.5175 0 26.7975 0 17.2744C0 7.75127 7.72946 0.03125 17.2642 0.03125C26.799 0.03125 34.5284 7.75127 34.5284 17.2744Z" />
                                <path
                                  d="M20.7181 16.9846H18.6418V25H15.4961V16.9846H14V14.1677H15.4961V12.3448C15.4961 11.0412 16.0837 9 18.6698 9L21 9.01027V11.7446H19.3093C19.032 11.7446 18.6421 11.8906 18.6421 12.5124V14.1703H20.9929L20.7181 16.9846Z"
                                  fill="#222222"
                                />
                              </svg>
                            </span>
                          </FacebookShareButton>
                          <TwitterShareButton
                            url={`${
                              typeof window !== "undefined" &&
                              window.location.origin &&
                              window.location.origin +
                                "/blogs/blog?slug=" +
                                details.blog.slug
                            }`}
                            title={details.blog.title}
                          >
                            <span className="text-base cursor-pointer text-[#101010] ">
                              <svg
                                width="35"
                                height="35"
                                viewBox="0 0 35 35"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="fill-current"
                              >
                                <path d="M34.7433 17.2744C34.7433 26.7975 27.0138 34.5175 17.4791 34.5175C7.9443 34.5175 0.214844 26.7975 0.214844 17.2744C0.214844 7.75127 7.9443 0.03125 17.4791 0.03125C27.0138 0.03125 34.7433 7.75127 34.7433 17.2744Z" />
                                <path
                                  d="M25 13.4206C24.4483 13.6615 23.8548 13.8243 23.2324 13.8971C23.8679 13.5223 24.3555 12.9292 24.5857 12.2214C23.9911 12.5687 23.3322 12.8206 22.6315 12.9563C22.0701 12.3678 21.2703 12 20.3847 12C18.6854 12 17.3072 13.3567 17.3072 15.0294C17.3072 15.2669 17.3345 15.498 17.3873 15.7199C14.8297 15.5936 12.562 14.3876 11.044 12.5542C10.7792 13.0015 10.6272 13.5223 10.6272 14.0774C10.6272 15.1282 11.1709 16.0558 11.9962 16.5989C11.492 16.5833 11.0172 16.4471 10.6025 16.2196C10.6022 16.2325 10.6022 16.2454 10.6022 16.258C10.6022 17.7258 11.6635 18.9501 13.071 19.2282C12.813 19.2978 12.5406 19.3347 12.2604 19.3347C12.0616 19.3347 11.8691 19.3159 11.6814 19.2807C12.0729 20.4839 13.2092 21.3598 14.5561 21.3845C13.5027 22.1971 12.1759 22.6813 10.7337 22.6813C10.4859 22.6813 10.2403 22.667 10 22.6388C11.3612 23.4987 12.9792 24 14.717 24C20.3775 24 23.4731 19.3839 23.4731 15.3803C23.4731 15.249 23.4701 15.1182 23.4642 14.9885C24.0659 14.5615 24.5876 14.0281 25 13.4206Z"
                                  fill="#222222"
                                />
                              </svg>
                            </span>
                          </TwitterShareButton>
                        </div>
                      </div>
                    </div>
                    <div>
                      <CommentBlog
                        comments={rsComments}
                        blog={blog && blog}
                        fetchComments={fetchComments}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-[370px] w-full">
                <div
                  data-aos="fade-up"
                  className="search-widget w-full p-[30px] bg-white mb-[30px]"
                >
                  <h1 className="text-[22px] text-qblack font-bold mb-5">
                    {ServeLangItem()?.Search}
                  </h1>
                  <div className="w-full h-[1px] bg-[#DCDCDC] mb-5"></div>
                  <div className="w-full h-[60px] relative">
                    <input
                      value={searchKey}
                      onKeyDown={(e) => e.key === "Enter" && searchHandler()}
                      onChange={(e) => setSearchkey(e.target.value)}
                      type="text"
                      placeholder="Search"
                      className="w-full h-full bg-qyellowlow/10 focus:outline-none focus:ring-0 pl-5 pr-16 placeholder:text-qgraytwo"
                    />
                    <span className="absolute right-5 top-[17px] text-[#101010]">
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-current"
                      >
                        <path d="M0 9.59954C0.0526938 9.17184 0.105388 8.74414 0.184428 8.34317C0.526938 6.44524 1.34369 4.81463 2.60834 3.39787C4.08377 1.74052 5.92805 0.644534 8.0885 0.216832C10.6178 -0.291064 13.0154 0.0831754 15.2549 1.44648C17.7842 2.99689 19.3913 5.24233 19.9973 8.15605C20.5242 10.6421 20.129 13.0212 18.9171 15.2666C18.68 15.6943 18.68 15.6943 19.0225 16.0418C20.7877 17.8328 22.553 19.6238 24.3182 21.4148C24.8978 22.0029 25.1349 22.6712 24.9242 23.4731C24.529 24.9968 22.6583 25.5582 21.4727 24.3285C20.4715 23.286 19.4704 22.2969 18.4428 21.2544C17.6261 20.4257 16.8357 19.6238 16.0189 18.7951C15.9662 18.7417 15.9135 18.6882 15.8872 18.6615C15.2549 18.9823 14.6752 19.3565 14.0429 19.6238C11.3292 20.7733 8.58909 20.7465 5.90171 19.5169C3.873 18.5813 2.34487 17.1111 1.26465 15.1597C0.579632 13.9033 0.158081 12.5667 0.0526938 11.1232C0.0526938 11.043 0.0263469 10.9628 0 10.8826C0 10.4817 0 10.0272 0 9.59954ZM3.26702 10.2678C3.26702 14.0904 6.34961 17.1913 10.1172 17.1913C13.8848 17.1645 16.9147 14.0904 16.9411 10.2678C16.9411 6.47197 13.8585 3.3444 10.1172 3.3444C6.32326 3.3444 3.26702 6.44524 3.26702 10.2678Z" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div
                  data-aos="fade-up"
                  className="latest-post-widget w-full bg-white p-[30px] mb-[30px]"
                >
                  <h1 className="text-[22px] text-qblack font-bold mb-5">
                    {ServeLangItem()?.Latest_Post}
                  </h1>
                  <div className="w-full h-[1px] bg-[#DCDCDC] mb-5"></div>
                  <ul className="flex flex-col space-y-5">
                    {details.popularPosts.length > 0 &&
                      details.popularPosts.map((post) => (
                        <li
                          key={post.blog_id}
                          className="flex space-x-5 rtl:space-x-reverse"
                        >
                          <div className="w-[85px] h-[92px]  overflow-hidden rounded relative">
                            <Image
                              layout="fill"
                              src={`${
                                process.env.NEXT_PUBLIC_BASE_URL +
                                post.blog.image
                              }`}
                              alt="blog"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 h-full flex flex-col justify-between">
                            <Link
                              href={`/blogs/blog?slug=${post.blog.slug}`}
                              passHref
                              legacyBehavior
                            >
                              <a rel="noopener noreferrer">
                                <p className="text-[18px] text-qblack leading-7 cursor-pointer mb-3">
                                  {post.blog.title}
                                </p>
                              </a>
                            </Link>
                            <div className="flex space-x-3 rtl:space-x-reverse items-center">
                              <span className="text-[#101010]">
                                <svg
                                  width="14"
                                  height="13"
                                  viewBox="0 0 14 13"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="fill-current"
                                >
                                  <path d="M0 2.81801C0.0698925 2.59859 0.108016 2.36327 0.212854 2.15974C0.571847 1.44423 1.16593 1.06263 1.9697 1.01811C2.19526 1.00539 2.424 1.01493 2.66544 1.01493C2.66544 0.852747 2.66544 0.700105 2.66544 0.550643C2.66544 0.229459 2.87512 0.00367645 3.17058 0.000496408C3.46603 0.000496408 3.67571 0.226279 3.67889 0.547463C3.67889 0.700105 3.67889 0.849567 3.67889 1.00857C4.44135 1.00857 5.1911 1.00857 5.9631 1.00857C5.9631 0.840027 5.95674 0.668305 5.9631 0.496583C5.97581 0.146778 6.30621 -0.0821846 6.63343 0.0291168C6.83358 0.0958976 6.97018 0.28034 6.97654 0.499763C6.98289 0.665125 6.97654 0.830487 6.97654 1.00539C7.74536 1.00539 8.50782 1.00539 9.28617 1.00539C9.28617 0.836847 9.27981 0.665125 9.28617 0.493402C9.30523 0.0958976 9.72776 -0.129885 10.0613 0.0799974C10.217 0.178579 10.2933 0.32168 10.2996 0.502943C10.3028 0.668305 10.2996 0.830487 10.2996 1.01493C10.4489 1.01493 10.5919 1.01811 10.7317 1.01493C11.0494 1.00857 11.3639 1.03083 11.6657 1.14531C12.4218 1.42515 12.9682 2.15974 12.9809 2.96747C12.9968 3.95647 12.9873 4.94864 12.9841 5.93763C12.9841 6.23019 12.7586 6.44962 12.479 6.44962C12.1931 6.44962 11.9738 6.22701 11.9738 5.92809C11.9707 4.98998 11.9738 4.04869 11.9738 3.11057C11.9738 2.67491 11.7959 2.34101 11.3988 2.14384C11.2845 2.0866 11.151 2.05162 11.0239 2.04526C10.7889 2.02936 10.5506 2.04208 10.2996 2.04208C10.2996 2.19472 10.2996 2.34737 10.2996 2.49683C10.2964 2.82755 10.0868 3.05651 9.78494 3.05333C9.48949 3.05015 9.28617 2.82437 9.28299 2.50001C9.28299 2.35373 9.28299 2.20426 9.28299 2.04844C8.51417 2.04844 7.75171 2.04844 6.97336 2.04844C6.97336 2.18836 6.97336 2.32511 6.97336 2.46503C6.97336 2.82119 6.77639 3.05333 6.46823 3.05333C6.16007 3.05651 5.95992 2.82437 5.95674 2.46821C5.95674 2.32829 5.95674 2.19154 5.95674 2.04526C5.19428 2.04526 4.44453 2.04526 3.67253 2.04526C3.67253 2.2138 3.67888 2.38553 3.67253 2.55407C3.65982 2.90387 3.32942 3.13284 3.00538 3.02471C2.80205 2.95793 2.66544 2.77031 2.66227 2.54135C2.65909 2.37917 2.66227 2.2138 2.66227 2.02618C2.36364 2.04208 2.07136 2.023 1.79497 2.07706C1.34066 2.15338 1.04203 2.55089 1.01662 3.02471C1.01344 3.05969 1.01662 3.09149 1.01662 3.12648C1.01662 5.71503 1.01662 8.30676 1.01662 10.8953C1.01662 11.3342 1.18817 11.6808 1.59164 11.8716C1.74731 11.9447 1.93157 11.9765 2.1063 11.9797C3.35484 11.9892 4.60019 11.9861 5.84873 11.9829C6.01393 11.9829 6.16007 12.0179 6.27761 12.1387C6.52224 12.3868 6.44599 12.8002 6.13148 12.9496C6.09335 12.9687 6.05523 12.9846 6.01711 13.0005C4.6129 13.0005 3.2087 13.0005 1.8045 13.0005C1.78543 12.9941 1.76637 12.9814 1.74731 12.9782C1.0325 12.8638 0.514663 12.479 0.203324 11.8302C0.108016 11.6331 0.0698925 11.4105 0.00317693 11.1974C0 8.40534 0 5.61327 0 2.81801Z" />
                                  <path d="M9.6676 13.0009C9.3785 12.9278 9.07987 12.8833 8.8003 12.7815C7.48188 12.2981 6.64952 10.8385 6.89414 9.45837C7.11018 8.24042 7.80592 7.39771 8.97821 7.01928C10.1823 6.62814 11.2688 6.91434 12.1456 7.82701C12.9525 8.66972 13.194 9.69688 12.8541 10.8099C12.4919 11.996 11.6595 12.7116 10.4364 12.9532C10.3506 12.9691 10.2617 12.985 10.1759 13.0009C10.0044 13.0009 9.83598 13.0009 9.6676 13.0009ZM11.9741 9.92584C11.9741 8.79374 11.0432 7.86835 9.91541 7.87153C8.78759 7.87471 7.86946 8.79692 7.86628 9.92266C7.86311 11.0548 8.78759 11.9833 9.91858 11.9833C11.0496 11.9865 11.9772 11.0579 11.9741 9.92584Z" />
                                  <path d="M3.67754 5.334C3.67754 5.61385 3.44562 5.84281 3.16605 5.83963C2.88648 5.83645 2.66092 5.6043 2.6641 5.32446C2.66727 5.05098 2.89601 4.8252 3.16923 4.8252C3.4488 4.8252 3.67754 5.05416 3.67754 5.334Z" />
                                  <path d="M5.38258 5.83941C5.10301 5.84259 4.87427 5.61045 4.87109 5.33378C4.87109 5.05394 5.10301 4.82498 5.3794 4.82816C5.65262 4.83134 5.87818 5.05394 5.88453 5.32742C5.89089 5.60409 5.66215 5.83941 5.38258 5.83941Z" />
                                  <path d="M8.0916 5.33696C8.0916 5.61681 7.85968 5.84577 7.58011 5.84259C7.30054 5.83941 7.07498 5.60727 7.07816 5.32742C7.08451 5.05394 7.31007 4.82816 7.58329 4.82816C7.86604 4.82498 8.09478 5.05712 8.0916 5.33696Z" />
                                  <path d="M9.79737 5.83868C9.5178 5.83868 9.28906 5.60972 9.28906 5.32988C9.28906 5.05003 9.52098 4.82107 9.80055 4.82425C10.0738 4.82743 10.2993 5.05321 10.3025 5.3267C10.3057 5.60654 10.0769 5.83868 9.79737 5.83868Z" />
                                  <path d="M3.16615 7.03519C3.44572 7.03201 3.67763 7.26097 3.67763 7.54082C3.67763 7.82066 3.44889 8.04962 3.16932 8.04962C2.89611 8.04962 2.66737 7.82384 2.66419 7.55036C2.65784 7.27051 2.88658 7.03837 3.16615 7.03519Z" />
                                  <path d="M5.38331 8.04937C5.10374 8.05255 4.875 7.82041 4.875 7.54374C4.875 7.2639 5.10692 7.03494 5.38649 7.03812C5.6597 7.0413 5.88526 7.2639 5.88844 7.53738C5.89162 7.81405 5.66288 8.04619 5.38331 8.04937Z" />
                                  <path d="M3.6778 9.76057C3.67144 10.0404 3.43635 10.263 3.15678 10.2567C2.87721 10.2503 2.65483 10.0118 2.66436 9.73195C2.67389 9.45846 2.9058 9.23904 3.17902 9.24222C3.45541 9.24858 3.68415 9.4839 3.6778 9.76057Z" />
                                  <path d="M5.3794 10.2596C5.09983 10.2596 4.87109 10.0306 4.87109 9.75078C4.87109 9.47093 5.10301 9.24197 5.38258 9.24515C5.6558 9.24833 5.88136 9.47411 5.88453 9.7476C5.88771 10.0274 5.65897 10.2564 5.3794 10.2596Z" />
                                  <path d="M10.4276 9.42294C10.5292 9.42294 10.6087 9.41976 10.6881 9.42294C10.9613 9.44202 11.1678 9.66462 11.1646 9.93492C11.1614 10.1989 10.9549 10.4215 10.6849 10.431C10.418 10.4405 10.1512 10.4405 9.88749 10.431C9.63016 10.4215 9.42366 10.2148 9.4173 9.954C9.40777 9.59148 9.40777 9.22577 9.4173 8.86325C9.42366 8.58659 9.64922 8.37988 9.91926 8.37988C10.1893 8.37988 10.4117 8.58977 10.4244 8.86325C10.4339 9.04451 10.4276 9.22577 10.4276 9.42294Z" />
                                </svg>
                              </span>
                              <span className="text-sm text-qgraytwo">
                                {DateFormat(post.created_at)}
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
                <div
                  data-aos="fade-up"
                  className="categories-widget w-full bg-white p-[30px] mb-[30px]"
                >
                  <h1 className="text-[22px] text-qblack font-bold mb-5">
                    {ServeLangItem()?.Categories}
                  </h1>
                  <div className="w-full h-[1px] bg-[#DCDCDC] mb-5"></div>
                  <ul className="flex flex-col space-y-5">
                    {details.categories.length > 0 &&
                      details.categories.map((category) => (
                        <li
                          key={category.id}
                          className="flex justify-between items-center group"
                        >
                          <Link
                            href={`/category-by-blogs?category=${category.slug}`}
                            passhref
                          >
                            {/* <a>
                              <span className="text-base text-qgraytwo group-hover:text-[#101010] cursor-pointer">
                                {category.name}
                              </span>
                            </a> */}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
                <div
                  data-aos="fade-up"
                  className="w-full h-[358px]"
                  style={{
                    background: `url(/assets/images/new-letter.jpg) no-repeat`,
                    backgroundSize: "cover",
                  }}
                >
                  <div className="w-full h-full p-[30px] bg-black bg-opacity-75 flex flex-col justify-between">
                    <div>
                      <h1 className="text-[22px] text-white font-bold mb-5">
                        {ServeLangItem()?.Our_Newsletter}
                      </h1>
                      <div className="w-full h-[1px] bg-[#615B9C] mb-5"></div>
                      <p className="text-base text-white leading-[26px] line-clamp-2">
                        {
                          ServeLangItem()
                            ?.Follow_our_newsletter_to_stay_updated_about_us
                        }
                        .
                      </p>
                    </div>
                    <div>
                      <div className="w-full mb-3.5">
                        <input
                          onChange={(e) => setEmail(e.target.value.trim())}
                          value={email}
                          type="text"
                          className="w-full h-[60px] bg-[#ECEAEC] pl-5 rtl:pr-5 focus:outline-none focus:ring-0 placeholder:text-[#9A9A9A]"
                          placeholder="Enter Your Email Address"
                        />
                      </div>
                      <button
                        onClick={subscribehandler}
                        type="button"
                        className="w-full h-[60px]"
                      >
                        <span
                          className="yellow-btn w-full h-full"
                          style={{ fontSize: "18px" }}
                        >
                          {ServeLangItem()?.Subscribe}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
