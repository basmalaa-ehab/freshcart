import React from "react";
import {
  FaClock,
  FaFacebook,
  FaShieldAlt,
  FaStar,
  FaStarAndCrescent,
  FaTruck,
} from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import authorImage from "_/assets/images/image.png";
import { RiGoogleFill } from "react-icons/ri";
import LoginForm from "./LoginForm";
import Link from "next/link";
import { ImLock } from "react-icons/im";
import { HiUserGroup } from "react-icons/hi2";
import loginimage from "@images/Loginphoto.png";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { nextAuthConfig } from "_/next-auth/nextAuth.Config";





export const metadata = {
  title: {
    default: "Fresh Cart | Login",
  },
};

export default async function page() {



  // 3shan el user mydkhols el loginpage lw mch authenticated 
const res = await getServerSession(nextAuthConfig);

if(res){
  redirect("/")
}


  process.env.AUTH_SECRET
  return (
    <div className="bg-white  py-8 ">
      <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 p-4">
        <div className="hidden lg:block">
          <div className="text-center space-y-6">
            <img
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
              src={loginimage.src}
              alt="fresh vegetables and fruits shopping cart illustration, modern clean style, green theme"
            />
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">
                FreshCart - Your One-Stop Shop for Fresh Products
              </h2>
              <p className="text-lg text-gray-600 font-medium" >
                Join thousands of happy customers who trust FreshCart for their
                daily grocery needs
              </p>

              <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 font-medium">
                <div className="flex items-center">

                  <FaTruck className="text-green-600 mr-2"/>
Free Delivery

                </div>
                <div className="flex items-center">

                  <FaShieldAlt  className="text-green-600 mr-2" />

Secure Payment

                </div>
                <div className="flex items-center">

<FaClock   className="text-green-600 mr-2"/>
24/7 Support

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-12">
          <h2 className="text-center text-2xl md:text-3xl font-semibold mb-2 flex flex-col">
            <div>
              <span className="text-green-600 text-3xl font-bold">Fresh</span>
              <span className="text-gray-800">Cart</span>
            </div>
            <span>Welcome Back!</span>
          </h2>
          <p className="text-center text-[#364153] text-wrap md:text-nowrap text-sm md:text-base font-medium">
            Sign in to continue your fresh shopping experience
          </p>
          <div className="space-y-3 mb-6 py-7">
            <button
              type="button"
              className=" cursor-pointer w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-200"
              aria-label="Sign up with Google"
            >
              <span className=" text-sm md:text-base text-nowrap! text-red-600">
                <RiGoogleFill size={20} />
              </span>
              <span className="font-medium text-gray-700">
                Continue with Google
              </span>
            </button>
            <button
              type="button"
              className="cursor-pointer w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-200"
              aria-label="Sign up with Google"
            >
              <span className=" text-blue-600">
                <FaFacebook size={20} />
              </span>
              <span className="font-medium text-gray-700">
                Continue with Facebook
              </span>
            </button>
          </div>
          <div
            className="relative w-full h-0.5 bg-gray-300/30 my-4 flex items-center
before:content-['OR_CONTINUE_WITH_EMAIL']
before:absolute before:top-1/2 before:left-1/2
before:-translate-x-1/2 before:-translate-y-1/2
before:bg-white before:px-5 before:text-sm before:text-gray-500 before:block text-nowrap"
          >
            <span className="sr-only px-4 bg-white text-gray-500 font-semibold text-nowrap">
              OR CONTINUE WITH EMAIL
            </span>
          </div>

          <LoginForm />

          <div className="border-t pt-5 border-gray-300/30  font-medium text-center text-sm md:text-base">
            New to FreshCart?{" "}
            <Link
              className="text-green-600 hover:underline font-semibold"
              href={"/register"}
            >
              Create an account
            </Link>
          </div>

          <div className="flex items-center justify-center space-x-6 mt-6   px-8 py-3 md:p-0 text-nowrap font-medium  text-xs text-gray-500">
            <div className="flex items-center pl-5  ">
              <ImLock />
              SSL Secured
            </div>
            <div className="flex items-center ">
              <HiUserGroup />
              50K+ Users
            </div>
            <div className="flex items-center pr-5">
              <FaStar />
              4.9 Rating
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
