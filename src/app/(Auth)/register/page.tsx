import React from "react";
import { FaFacebook, FaShieldAlt, FaStar } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import authorImage from "_/assets/images/image.png"
import { RiGoogleFill } from "react-icons/ri";
import RegisterForm from "./RegisterForm";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { nextAuthConfig } from "_/next-auth/nextAuth.Config";
export const metadata = {
  title: {
    default: " Register",
  },
};
export default async function page() {


  
  // 3shan el user mydkhols el registerpage lw mch authenticated 

const res = await getServerSession(nextAuthConfig);

if(res){
  redirect("/")
}
  return (
    <div className="bg-white  py-8">
      <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 p-4">
        <div className="">
          <h1 className="text-4xl font-bold">
            Welcome to
            <span className="text-green-600"> FreshCart</span>
          </h1>
          <p className="text-lg/[28px] md:text-xl/[28px]  font-medium  text-[#364153] pt-2  md:w-120 xl:w-150  text-wrap!  ">
            Join thousands of happy customers who enjoy fresh groceries
            delivered right to their doorstep.
          </p>

          <ul className="*:flex *:items-start *:gap-4 space-y-6 my-8">
            <li>
              <div className="icon size-12 text-lg bg-green-200 text-green-600 rounded-full flex justify-center items-center">
                <FaStar />
              </div>

              <div>
                <h2 className="text-lg font-semibold">Premium Quality</h2>
                <p className="text-[#4A5565] font-medium text-base/[16px] text-wrap md:text-nowrap pt-1">
                  Premium quality products sourced from trusted suppliers.
                </p>
              </div>
            </li>
            <li>
              <div className="icon size-12 text-lg bg-green-200 text-green-600 rounded-full flex justify-center items-center">
                <FaTruckFast />
              </div>

              <div>
                <h2 className="text-lg font-semibold">Fast Delivery</h2>
                <p className="text-[#4A5565] font-medium text-base/[16px] text-wrap md:text-nowrap  pt-1">
                  Same-day delivery available in most areas
                </p>
              </div>
            </li>
            <li>
              <div className="icon size-12 text-lg bg-green-200 text-green-600 rounded-full flex justify-center items-center">
                <FaShieldAlt />
              </div>

              <div>
                <h2 className="text-lg font-semibold">Secure Shopping</h2>
                <p className="text-[#4A5565] font-medium text-base/[16px] text-wrap md:text-nowrap pt-1">
                  Your data and payments are completely secure
                </p>
              </div>
            </li>
          </ul>

          {/* review */}
          <div className="review bg-white shadow-sm p-4 rounded-md">
            <div className="author flex items-center gap-4 mb-4">
              <img
                src={authorImage.src}
                alt="author review image"
              />
              <div>
                <h3>Sarah Johnson
</h3>

<div className="rating *:text-yellow-300 flex">
<FaStar />
<FaStar />
<FaStar />
<FaStar />
<FaStar />

</div>
        
              </div>
            </div>


            <blockquote>
              <p className="italic text-[#4A5565] font-medium  text-base/[24px] ">
                "FreshCart has transformed my shopping experience. The quality of the products is outstanding, and the delivery is always on time. Highly recommend!"


              </p>
            </blockquote>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg px-6 py-10">
<h2 className="text-center text-2xl md:text-3xl font-semibold mb-2">
  Create Your Account

</h2>
<p className="text-center text-[#364153] text-nowrap text-sm md:text-base font-medium">Start your fresh journey with us today


</p>
<div className="register-options flex gap-2 *:grow my-10">
<button type="button" className="cursor-pointer rounded-[8px] px-4 py-2 btn bg-transparent border border-gray-300 hover:bg-gray-100 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"  aria-label="Sign up with Google">
  <span className="me-2 text-red-600"><RiGoogleFill />
</span>
<span>Google</span>
</button>
<button type="button" className="cursor-pointer rounded-[8px] px-4 py-2  btn bg-transparent border border-gray-300 hover:bg-gray-100 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"  aria-label="Sign up with Google">
  <span className="me-2 text-blue-600"><FaFacebook />

</span>
<span>Google</span>
</button>





</div>

<div className="divider relative w-full h-0.5 bg-gray-300/30 my-4 flex items-center before:content-['or'] before:absolute before:top-1/2 before:left-1/2 before:-translate-1/2 before:bg-white before:px-4">
<span className="sr-only">or</span>
</div>


<RegisterForm/>

<div className="border-t pt-10 border-gray-300/30 my-4 text-center text-sm md:text-base">
Already have an account? <Link className="text-green-600 hover:underline font-medium" href={'/login'}>Sign In</Link>


</div>



        </div>
      </div>
    </div>
  );
}
