import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {useEffect, useRef, useState} from "react";
import { toast } from "react-toastify";
import isMultivendor from "../../../Middleware/isMultivendor";
import auth from "../../../utils/auth";
import InputCom from "../Helpers/InputCom";
import PageTitle from "../Helpers/PageTitle";
import {useSelector} from "react-redux";
import ServeLangItem from "../Helpers/ServeLangItem";
function BecomeSaller() {
  const router = useRouter();
  const [logoImg, setLogoImg] = useState(null);
  const [coverImg, setCoverImg] = useState(null);
  const [checked, setCheck] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [shopName, setName] = useState("");
  const [shopAddress, setAddress] = useState("");
  const [errors, setErrors] = useState(null);
  let [uploadProgress, setProgress] = useState(0);
  const [uploadLogo, setUploadLogo] = useState(null);
  const [uploadCoverImg, setUploadCoverImg] = useState(null);
  const [defaultCover, setDefaultCover] = useState(null);
  const [defaultLogo, setLogo] = useState(null);
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  useEffect(() => {
    if (!defaultCover || !defaultLogo) {
      if (websiteSetup) {
        setDefaultCover(
            websiteSetup.payload?.image_content.become_seller_banner
        );
        setLogo(websiteSetup.payload?.image_content.become_seller_avatar);
      }
    }
  }, [defaultCover, defaultLogo, websiteSetup]);
  // logo img
  const logoImgInput = useRef(null);
  const browseLogoImg = () => {
    logoImgInput.current.click();
  };
  const logoImgChangHandler = (e) => {
    if (e.target.value !== "") {
      const imgReader = new FileReader();
      imgReader.onload = (event) => {
        setLogoImg(event.target.result);
      };
      imgReader.readAsDataURL(e.target.files[0]);
      setUploadLogo(e.target.files[0]);
    }
  };
  // profile img
  // const profileImgInput = useRef(null);
  // const browseProfileImg = () => {
  //   profileImgInput.current.click();
  // };
  // const profileImgChangHandler = (e) => {
  //   if (e.target.value !== "") {
  //     const imgReader = new FileReader();
  //     imgReader.onload = (event) => {
  //       setProfileImg(event.target.result);
  //     };
  //     imgReader.readAsDataURL(e.target.files[0]);
  //   }
  // };
  // cover img
  const coverImgInput = useRef(null);
  const browseCoverImg = () => {
    coverImgInput.current.click();
  };
  const coverImgChangHandler = (e) => {
    if (e.target.value !== "") {
      const imgReader = new FileReader();
      imgReader.onload = (event) => {
        setCoverImg(event.target.result);
      };
      imgReader.readAsDataURL(e.target.files[0]);
      setUploadCoverImg(e.target.files[0]);
    }
  };
  const rememberMe = () => {
    setCheck(!checked);
  };
  const sellerReq = async () => {
    if (auth()) {
      const formData = new FormData();
      formData.append("banner_image", uploadCoverImg);
      formData.append("shop_name", shopName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("address", shopAddress);
      formData.append("open_at", "10.00AM");
      formData.append("closed_at", "10.00PM");
      formData.append("agree_terms_condition", checked);
      formData.append("logo", uploadLogo);
      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          let percent = Math.floor((loaded * 100) / total);
          setProgress(percent);
        },
      };
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_BASE_URL}api/user/seller-request?token=${
            auth().access_token
          }`,
          formData,
          options
        )
        .then((res) => {
          toast.success(
            "Congratulation Your seller request successfully delivered"
          );

          // apiRequest.logout(auth.access_token);
          // localStorage.removeItem("auth");
          // dispatch(fetchWishlist());
          // dispatch(fetchCart());
          router.push("/");
        })
        .catch((err) => {
          setErrors(err.response && err.response.data.errors);
          if(err.response && err.response.data.notification){
            toast.error(
                err.response.data.notification
            );
          }
        });
    } else {
      router.push("/login");
      toast.warn("Please Login First");
    }
  };
  return (
    <div className="become-saller-wrapper w-full">
      <div className="title mb-10">
        <PageTitle
          title="Seller Application"
          breadcrumb={[
            { name: ServeLangItem()?.home, path: "/" },
            { name: ServeLangItem()?.Become_seller, path: "/become-seller" },
          ]}
        />
      </div>
      <div className="content-wrapper w-full mb-10">
        <div className="container-x mx-auto">
          <div className="w-full bg-white sm:p-[30px] p-3">
            <div className="flex xl:flex-row flex-col-reverse xl:space-x-11">
              <div className="xl:w-[824px]">
                <div className="title w-full mb-4">
                  <h1 className="text-[22px] font-semibold text-qblack mb-1">
                    {ServeLangItem()?.Seller_Information}</h1>
                  <p className="text-[15px] text-qgraytwo">
                    {ServeLangItem()?.Fill_the_form_below_or_write_us_We_will_help_you_as_soon_as_possible}
                  </p>
                </div>
                <div className="input-area">
                  {/*<div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">*/}
                  {/*  <InputCom*/}
                  {/*    placeholder="Demo Name"*/}
                  {/*    label="Frist Name*"*/}
                  {/*    name="fname"*/}
                  {/*    type="text"*/}
                  {/*    inputClasses="h-[50px]"*/}
                  {/*  />*/}

                  {/*  <InputCom*/}
                  {/*    placeholder="Demo Name"*/}
                  {/*    label="Last Name*"*/}
                  {/*    name="lname"*/}
                  {/*    type="text"*/}
                  {/*    inputClasses="h-[50px]"*/}
                  {/*  />*/}
                  {/*</div>*/}
                  <div className="mb-5">
                    <InputCom
                      placeholder={ServeLangItem()?.Email}
                      label={ServeLangItem()?.Email_Address+"*"}
                      name="email"
                      type="email"
                      inputClasses="h-[50px]"
                      value={email}
                      inputHandler={(e) => setEmail(e.target.value)}
                      error={!!(errors && Object.hasOwn(errors, "email"))}
                    />
                    {errors && Object.hasOwn(errors, "email") ? (
                      <span className="text-sm mt-1 text-qred">
                        {errors.email[0]}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="mb-5">
                    <InputCom
                      placeholder="0213 *********"
                      label={ServeLangItem()?.phone+"*"}
                      name="phone"
                      type="text"
                      inputClasses="h-[50px]"
                      value={phone}
                      inputHandler={(e) => setPhone(e.target.value)}
                      error={!!(errors && Object.hasOwn(errors, "phone"))}
                    />
                    {errors && Object.hasOwn(errors, "phone") ? (
                      <span className="text-sm mt-1 text-qred">
                        {errors.phone[0]}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>

                  {/*<div className="input-item mb-5">*/}
                  {/*  <h6 className="input-label text-qgray capitalize text-[13px] font-normal block mb-2 ">*/}
                  {/*    Country**/}
                  {/*  </h6>*/}
                  {/*  <div className="w-full h-[50px] border border-[#EDEDED] px-5 flex justify-between items-center mb-2">*/}
                  {/*    <span className="text-[13px] text-qgraytwo">*/}
                  {/*      Select Country*/}
                  {/*    </span>*/}
                  {/*    <span>*/}
                  {/*      <svg*/}
                  {/*        width="11"*/}
                  {/*        height="7"*/}
                  {/*        viewBox="0 0 11 7"*/}
                  {/*        fill="none"*/}
                  {/*        xmlns="http://www.w3.org/2000/svg"*/}
                  {/*      >*/}
                  {/*        <path*/}
                  {/*          d="M5.4 6.8L0 1.4L1.4 0L5.4 4L9.4 0L10.8 1.4L5.4 6.8Z"*/}
                  {/*          fill="#222222"*/}
                  {/*        />*/}
                  {/*      </svg>*/}
                  {/*    </span>*/}
                  {/*  </div>*/}
                  {/*</div>*/}

                  {/*<div className="input-item mb-5">*/}
                  {/*  <InputCom*/}
                  {/*    placeholder="Your address Here"*/}
                  {/*    label="Address*"*/}
                  {/*    name="address"*/}
                  {/*    type="text"*/}
                  {/*    inputClasses="h-[50px]"*/}
                  {/*  />*/}
                  {/*</div>*/}
                </div>

                {/* ============================================================== */}
                <div className="title w-full mt-10 mb-4">
                  <h1 className="text-[22px] font-semibold text-qblack mb-1">
                    {ServeLangItem()?.Shop_Information}
                  </h1>
                  <p className="text-[15px] text-qgraytwo">
                    {ServeLangItem()?.Fill_the_form_below_or_write_us_We_will_help_you_as_soon_as_possible}
                  </p>
                </div>
                <div className="input-area">
                  <div className="mb-5">
                    <InputCom
                      placeholder={ServeLangItem()?.Name}
                      label={ServeLangItem()?.Shop_Name+"*"}
                      name="shopname"
                      type="text"
                      inputClasses="h-[50px]"
                      value={shopName}
                      inputHandler={(e) => setName(e.target.value)}
                      error={!!(errors && Object.hasOwn(errors, "shop_name"))}
                    />
                    {errors && Object.hasOwn(errors, "shop_name") ? (
                      <span className="text-sm mt-1 text-qred">
                        {errors.shop_name[0]}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="mb-5">
                    <InputCom
                      placeholder={ServeLangItem()?.Your_address_Here}
                      label={ServeLangItem()?.Address}
                      name="shopaddress"
                      type="text"
                      inputClasses="h-[50px]"
                      value={shopAddress}
                      inputHandler={(e) => setAddress(e.target.value)}
                      error={!!(errors && Object.hasOwn(errors, "address"))}
                    />
                    {errors && Object.hasOwn(errors, "address") ? (
                      <span className="text-sm mt-1 text-qred">
                        {errors.address[0]}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  {/*<div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-[30px]">*/}
                  {/*  <InputCom*/}
                  {/*    placeholder="* * * * * *"*/}
                  {/*    label="Password*"*/}
                  {/*    name="password"*/}
                  {/*    type="password"*/}
                  {/*    inputClasses="h-[50px]"*/}
                  {/*  />*/}

                  {/*  <InputCom*/}
                  {/*    placeholder="* * * * * *"*/}
                  {/*    label="Re-enter Password*"*/}
                  {/*    name="repassword"*/}
                  {/*    type="password"*/}
                  {/*    inputClasses="h-[50px]"*/}
                  {/*  />*/}
                  {/*</div>*/}
                  <div className="remember-checkbox flex items-center space-x-2.5 mb-5">
                    <button
                      onClick={rememberMe}
                      type="button"
                      className="w-5 h-5 text-qblack flex justify-center items-center border border-light-gray"
                    >
                      {checked && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                    <Link href="/seller-terms-condition">
                      <span className="text-base text-black cursor-pointer">
                        {ServeLangItem()?.I_agree_all_terms_and_condition_in_ecoShop}
                      </span>
                    </Link>
                  </div>

                  <div className="signin-area mb-3">
                    <div className="flex justify-center">
                      <button
                        onClick={sellerReq}
                        disabled={
                          email &&
                          checked &&
                          coverImg &&
                          logoImg &&
                          phone &&
                          shopName &&
                          shopAddress &&
                          logoImg &&
                          coverImg
                            ? false
                            : true
                        }
                        type="button"
                        className="black-btn disabled:bg-opacity-50 disabled:cursor-not-allowed  text-sm text-white w-[490px] h-[50px] font-semibold flex justify-center bg-purple items-center"
                      >
                        <span>{ServeLangItem()?.Create_Seller_Account}</span>
                      </button>
                    </div>
                  </div>

                  <div className="signup-area flex justify-center">
                    <p className="text-sm text-qgraytwo font-normal">
                      {ServeLangItem()?.Already_have_an_Account}?
                      <Link href="/login" className="ml-2 text-qblack">
                        {ServeLangItem()?.Log_In}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-1 mb-10 xl:mb-0">
                {/*<div className="update-profile w-full mb-9">*/}
                {/*  <h1 className="text-xl tracking-wide font-bold text-qblack flex items-center mb-2">*/}
                {/*    Update Profile*/}
                {/*    <span className="ml-1">*/}
                {/*      <svg*/}
                {/*        width="20"*/}
                {/*        height="20"*/}
                {/*        viewBox="0 0 20 20"*/}
                {/*        fill="none"*/}
                {/*        xmlns="http://www.w3.org/2000/svg"*/}
                {/*      >*/}
                {/*        <path*/}
                {/*          d="M10 0C4.47457 0 0 4.47791 0 10C0 15.5221 4.47791 20 10 20C15.5221 20 20 15.5221 20 10C19.9967 4.48126 15.5221 0.00669344 10 0ZM10 16.67C9.53815 16.67 9.16667 16.2985 9.16667 15.8367C9.16667 15.3748 9.53815 15.0033 10 15.0033C10.4618 15.0033 10.8333 15.3748 10.8333 15.8367C10.8333 16.2952 10.4618 16.67 10 16.67ZM11.6098 10.425C11.1078 10.7396 10.8132 11.2952 10.8333 11.8842V12.5033C10.8333 12.9652 10.4618 13.3367 10 13.3367C9.53815 13.3367 9.16667 12.9652 9.16667 12.5033V11.8842C9.14324 10.6861 9.76907 9.56827 10.8032 8.96586C11.4357 8.61781 11.7704 7.90161 11.6366 7.19545C11.5027 6.52276 10.9772 5.99732 10.3046 5.8668C9.40094 5.69946 8.5308 6.29853 8.36346 7.20214C8.34673 7.30254 8.33668 7.40295 8.33668 7.50335C8.33668 7.96519 7.9652 8.33668 7.50335 8.33668C7.0415 8.33668 6.67002 7.96519 6.67002 7.50335C6.67002 5.66265 8.16265 4.17001 10.0067 4.17001C11.8474 4.17001 13.34 5.66265 13.34 7.50669C13.3333 8.71821 12.674 9.83601 11.6098 10.425Z"*/}
                {/*          fill="#374557"*/}
                {/*          fillOpacity="0.6"*/}
                {/*        />*/}
                {/*      </svg>*/}
                {/*    </span>*/}
                {/*  </h1>*/}
                {/*  <p className="text-sm text-qgraytwo mb-5">*/}
                {/*    Profile of at least Size*/}
                {/*    <span className="ml-1 text-qblack">300x300</span>. Gifs*/}
                {/*    work too.*/}
                {/*    <span className="ml-1 text-qblack">Max 5mb</span>.*/}
                {/*  </p>*/}
                {/*  <div className="flex xl:justify-center justify-start">*/}
                {/*    <div className="relative">*/}
                {/*      <img*/}
                {/*        src={*/}
                {/*          profileImg ||*/}
                {/*          `/assets/images/edit-profileimg.jpg`*/}
                {/*        }*/}
                {/*        alt=""*/}
                {/*        className="sm:w-[198px] sm:h-[198px] w-[199px] h-[199px] rounded-full overflow-hidden object-cover"*/}
                {/*      />*/}
                {/*      <input*/}
                {/*        ref={profileImgInput}*/}
                {/*        onChange={(e) => profileImgChangHandler(e)}*/}
                {/*        type="file"*/}
                {/*        className="hidden"*/}
                {/*      />*/}
                {/*      <div*/}
                {/*        onClick={browseProfileImg}*/}
                {/*        className="w-[32px] h-[32px] absolute bottom-7 sm:right-0 right-[105px]  hover:bg-[#F539F8] bg-[#F539F8] rounded-full cursor-pointer"*/}
                {/*      >*/}
                {/*        <svg*/}
                {/*          width="32"*/}
                {/*          height="32"*/}
                {/*          viewBox="0 0 32 32"*/}
                {/*          fill="none"*/}
                {/*          xmlns="http://www.w3.org/2000/svg"*/}
                {/*        >*/}
                {/*          <path*/}
                {/*            d="M16.5147 11.5C17.7284 12.7137 18.9234 13.9087 20.1296 15.115C19.9798 15.2611 19.8187 15.4109 19.6651 15.5683C17.4699 17.7635 15.271 19.9587 13.0758 22.1539C12.9334 22.2962 12.7948 22.4386 12.6524 22.5735C12.6187 22.6034 12.5663 22.6296 12.5213 22.6296C11.3788 22.6334 10.2362 22.6297 9.09365 22.6334C9.01498 22.6334 9 22.6034 9 22.536C9 21.4009 9 20.2621 9.00375 19.1271C9.00375 19.0746 9.02997 19.0109 9.06368 18.9772C10.4123 17.6249 11.7609 16.2763 13.1095 14.9277C14.2295 13.8076 15.3459 12.6913 16.466 11.5712C16.4884 11.5487 16.4997 11.5187 16.5147 11.5Z"*/}
                {/*            fill="white"*/}
                {/*          />*/}
                {/*          <path*/}
                {/*            d="M20.9499 14.2904C19.7436 13.0842 18.5449 11.8854 17.3499 10.6904C17.5634 10.4694 17.7844 10.2446 18.0054 10.0199C18.2639 9.76139 18.5261 9.50291 18.7884 9.24443C19.118 8.91852 19.5713 8.91852 19.8972 9.24443C20.7251 10.0611 21.5492 10.8815 22.3771 11.6981C22.6993 12.0165 22.7105 12.4698 22.3996 12.792C21.9238 13.2865 21.4443 13.7772 20.9686 14.2717C20.9648 14.2792 20.9536 14.2867 20.9499 14.2904Z"*/}
                {/*            fill="white"*/}
                {/*          />*/}
                {/*        </svg>*/}
                {/*      </div>*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*</div>*/}
                <div className="update-logo w-full mb-9">
                  <h1 className="text-xl tracking-wide font-bold text-qblack mb-2">
                    {ServeLangItem()?.Update_Logo}
                  </h1>
                  <p className="text-sm text-qgraytwo mb-5">
                    {ServeLangItem()?.Profile_of_at_least_Size}
                    <span className="ml-1 text-qblack">300x300</span>. {ServeLangItem()?.Gifs_work_too}.
                    <span className="ml-1 text-qblack">{ServeLangItem()?.Max_5mb}</span>.
                  </p>
                  <div className="flex xl:justify-center justify-start">
                    <div className="relative">
                      <div className="sm:w-[198px] sm:h-[198px] w-[199px] h-[199px] rounded-full overflow-hidden relative">
                        {defaultLogo && (
                            <Image
                                objectFit="cover"
                                layout="fill"
                                src={
                                  logoImg
                                      ? logoImg
                                      : defaultLogo &&
                                      process.env.NEXT_PUBLIC_BASE_URL + defaultLogo
                                }
                                alt=""
                            />
                        )}
                      </div>
                      <input
                        ref={logoImgInput}
                        onChange={(e) => logoImgChangHandler(e)}
                        type="file"
                        className="hidden"
                      />
                      <div
                        onClick={browseLogoImg}
                        className="w-[32px] h-[32px] absolute bottom-7 sm:right-0 right-[105px]  hover:bg-[#F539F8] bg-[#F539F8] rounded-full cursor-pointer"
                      >
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.5147 11.5C17.7284 12.7137 18.9234 13.9087 20.1296 15.115C19.9798 15.2611 19.8187 15.4109 19.6651 15.5683C17.4699 17.7635 15.271 19.9587 13.0758 22.1539C12.9334 22.2962 12.7948 22.4386 12.6524 22.5735C12.6187 22.6034 12.5663 22.6296 12.5213 22.6296C11.3788 22.6334 10.2362 22.6297 9.09365 22.6334C9.01498 22.6334 9 22.6034 9 22.536C9 21.4009 9 20.2621 9.00375 19.1271C9.00375 19.0746 9.02997 19.0109 9.06368 18.9772C10.4123 17.6249 11.7609 16.2763 13.1095 14.9277C14.2295 13.8076 15.3459 12.6913 16.466 11.5712C16.4884 11.5487 16.4997 11.5187 16.5147 11.5Z"
                            fill="white"
                          />
                          <path
                            d="M20.9499 14.2904C19.7436 13.0842 18.5449 11.8854 17.3499 10.6904C17.5634 10.4694 17.7844 10.2446 18.0054 10.0199C18.2639 9.76139 18.5261 9.50291 18.7884 9.24443C19.118 8.91852 19.5713 8.91852 19.8972 9.24443C20.7251 10.0611 21.5492 10.8815 22.3771 11.6981C22.6993 12.0165 22.7105 12.4698 22.3996 12.792C21.9238 13.2865 21.4443 13.7772 20.9686 14.2717C20.9648 14.2792 20.9536 14.2867 20.9499 14.2904Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="update-cover w-full">
                  <h1 className="text-xl tracking-wide font-bold text-qblack mb-2">
                    {ServeLangItem()?.Update_Cover}

                  </h1>
                  <p className="text-sm text-qgraytwo mb-5">
                    {ServeLangItem()?.Cover_of_at_least_Size}
                    <span className="ml-1 text-qblack">1170x920</span>.
                  </p>
                  <div className="flex justify-center">
                    <div className="w-full relative">
                      <div className="w-full h-[120px] rounded-lg overflow-hidden object-cover">
                        {defaultCover && (
                            <Image
                                layout="fill"
                                src={
                                  coverImg
                                      ? coverImg
                                      : defaultCover &&
                                      process.env.NEXT_PUBLIC_BASE_URL +
                                      defaultCover
                                }
                                alt=""
                            />
                        )}
                      </div>

                      <input
                        ref={coverImgInput}
                        onChange={(e) => coverImgChangHandler(e)}
                        type="file"
                        className="hidden"
                      />
                      <div
                        onClick={browseCoverImg}
                        className="w-[32px] h-[32px] absolute -bottom-4 right-4 bg-[#F539F8] hover:bg-[#F539F8] rounded-full cursor-pointer"
                      >
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.5147 11.5C17.7284 12.7137 18.9234 13.9087 20.1296 15.115C19.9798 15.2611 19.8187 15.4109 19.6651 15.5683C17.4699 17.7635 15.271 19.9587 13.0758 22.1539C12.9334 22.2962 12.7948 22.4386 12.6524 22.5735C12.6187 22.6034 12.5663 22.6296 12.5213 22.6296C11.3788 22.6334 10.2362 22.6297 9.09365 22.6334C9.01498 22.6334 9 22.6034 9 22.536C9 21.4009 9 20.2621 9.00375 19.1271C9.00375 19.0746 9.02997 19.0109 9.06368 18.9772C10.4123 17.6249 11.7609 16.2763 13.1095 14.9277C14.2295 13.8076 15.3459 12.6913 16.466 11.5712C16.4884 11.5487 16.4997 11.5187 16.5147 11.5Z"
                            fill="white"
                          />
                          <path
                            d="M20.9499 14.2904C19.7436 13.0842 18.5449 11.8854 17.3499 10.6904C17.5634 10.4694 17.7844 10.2446 18.0054 10.0199C18.2639 9.76139 18.5261 9.50291 18.7884 9.24443C19.118 8.91852 19.5713 8.91852 19.8972 9.24443C20.7251 10.0611 21.5492 10.8815 22.3771 11.6981C22.6993 12.0165 22.7105 12.4698 22.3996 12.792C21.9238 13.2865 21.4443 13.7772 20.9686 14.2717C20.9648 14.2792 20.9536 14.2867 20.9499 14.2904Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="bg-[#101010]"
            style={{ width: `${uploadProgress}%`, height: "2px" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
export default isMultivendor(BecomeSaller);
