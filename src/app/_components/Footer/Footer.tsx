import Link from "next/link";
import React from "react";
import { FaEnvelope, FaFacebookF, FaInstagram, FaShieldAlt, FaTruck, FaTwitter, FaYoutube } from "react-icons/fa";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { LuHeadset } from "react-icons/lu";
import freshlogo from "_/assets/images/freshcartfoooter.png" 
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
export default function Footer() {
  return (
   <div>
     <div className="bg-green-50 border-y border-green-100">
      <div className="container mx-auto px-4 py-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
              <FaTruck className="text-green-600 text-lg" />
            </div>
            <div className="">
              <h2 className="font-semibold text-gray-900 text-sm">
                Free Shipping
              </h2>
              <p className="text-gray-500 text-xs">On orders over 500 EGP</p>
            </div>
          </div>




          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
              <FaArrowRotateLeft className="text-green-600 text-lg" />
            </div>
            <div className="">
              <h2 className="font-semibold text-gray-900 text-sm">
                Easy Returns

              </h2>
              <p className="text-gray-500 text-xs">
               14-day return policy
                </p>
            </div>
          </div>














          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
              <FaShieldAlt className="text-green-600 text-lg" />
            </div>
            <div className="">
              <h2 className="font-semibold text-gray-900 text-sm">
                Secure Payment

              </h2>
              <p className="text-gray-500 text-xs">
                100% secure checkout


                </p>
            </div>
          </div>










          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
              <LuHeadset className="text-green-600 text-lg font-medium" />
            </div>
            <div className="">
              <h2 className="font-semibold text-gray-900 text-sm">
               24/7 Support

              </h2>
              <p className="text-gray-500 text-xs">
                Contact us anytime


                </p>
            </div>
          </div>









        </div>
      </div>
    </div>


<footer className="bg-gray-900 text-white"> 

<div className="container mx-auto px-4 py-12">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">



<div className="lg:col-span-4">
<Link href={'z'} className="inline-block mb-6">


<div className="bg-white rounded-lg px-4 py-2 inline-block">
<img src={freshlogo.src} alt="FreshCart Logo" />
</div>

</Link>

<p className="text-gray-400 mb-6 text-sm leading-relaxed">
  FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices with a seamless shopping experience.

</p>

<div className="space-y-3 mb-6 pt-6">


<Link href="tel:+18001234567" className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors text-sm">
<BsFillTelephoneFill className=" text-green-500" />
<span>+1 (800) 123-4567</span>

</Link>


<Link href="mailto:support@freshcart.com" className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors text-sm">
<FaEnvelope
 className=" text-green-500" />
<span> support@freshcart.com </span>

</Link>

<div className="flex items-start gap-3 text-gray-400 text-sm">
<IoLocationSharp className=" text-green-500 mt-0.5" />
<span>123 Commerce Street, New York, NY 10001</span>
</div>




</div>

<div className="flex items-center gap-3">


<Link href={'/'} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition-colors">
<FaFacebookF />


</Link>

<Link href={'/'} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition-colors">
<FaTwitter />


</Link>
<Link href={'/'} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition-colors">
<FaInstagram />


</Link>
<Link href={'/'} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition-colors">
<FaYoutube />


</Link>





</div>






</div>



<div className="lg:col-span-2">
<h3 className="font-semibold text-lg mb-5">
  Shop
</h3>
<ul className="space-y-3">


<li>
<Link className="text-gray-400 hover:text-green-400 transition-colors text-sm" href="/AllProducts">
All Products
</Link>
</li>

<li>
<Link className="text-gray-400 hover:text-green-400 transition-colors text-sm" href="/AllProducts">
Categories
</Link>
</li>

<li>
<Link className="text-gray-400 hover:text-green-400 transition-colors text-sm" href="/AllProducts">
Brands
</Link>
</li>

<li>
<Link className="text-gray-400 hover:text-green-400 transition-colors text-sm" href="/AllProducts">
Electronics

</Link>
</li>

<li>
<Link  className="text-gray-400 hover:text-green-400 transition-colors text-sm" href="/AllProducts">
Women's Fashion

</Link>
</li>







<li>
<Link className="text-gray-400 hover:text-green-400 transition-colors text-sm" href="/AllProducts">
Men's Fashion

</Link>
</li>







</ul>
</div>




<div className="lg:col-span-2">
<h3 className="font-semibold text-lg mb-5">
 Account
</h3>
<ul className="space-y-3">


<li>
<Link className="text-gray-400 hover:text-green-400 transition-colors text-sm" href="/">
My Account

</Link>
</li>

<li>
<Link className="text-gray-400 hover:text-green-400 transition-colors text-sm" href="/AllOrders">
Order History

</Link>
</li>

<li>
<Link className="text-gray-400 hover:text-green-400 transition-colors text-sm" href="/wishlist">
Wishlist
</Link>
</li>

<li>
<Link className="text-gray-400 hover:text-green-400 transition-colors text-sm" href="/cart">
Shopping Cart

</Link>
</li>

<li>
<Link  className="text-gray-400 hover:text-green-400 transition-colors text-sm" href="/Login">
Sign In


</Link>
</li>







<li>
<Link className="text-gray-400 hover:text-green-400 transition-colors text-sm" href="/register">
Create Account


</Link>
</li>







</ul>
</div>




<div className="lg:col-span-2">
<h3 className="font-semibold text-lg mb-5">
Support
</h3>
<ul className="space-y-3">

<li>
<Link className="text-gray-400 hover:text-green-400 transition-colors text-sm" href="/ContactUs">
Contact Us
</Link>
</li>

<li>
<Link className="text-gray-400 hover:text-green-400 transition-colors text-sm" href="/HelpCenter">
Help Center

</Link>
</li>
<li>
<Link className="text-gray-400 hover:text-green-400 transition-colors text-sm" href="/ShippingInfo">
Shipping Info

</Link>
</li>

<li>
<Link  className="text-gray-400 hover:text-green-400 transition-colors text-sm" href="/Returns&Refunds">
Returns & Refunds


</Link>
</li>







<li>
<Link className="text-gray-400 hover:text-green-400 transition-colors text-sm" href="TrackOrder">
Track Order


</Link>
</li>







</ul>
</div>

<div className="lg:col-span-2">
<h3 className="font-semibold text-lg mb-5">
Legal
</h3>
<ul className="space-y-3">

<li>
<Link className="text-gray-400 hover:text-green-400 transition-colors text-sm" href="/PrivacyPolicy">
Privacy Policy
</Link>
</li>

<li>
<Link className="text-gray-400 hover:text-green-400 transition-colors text-sm" href="/TermsofService">
Terms of Service


</Link>
</li>
<li>
<Link className="text-gray-400 hover:text-green-400 transition-colors text-sm" href="/CookiePolicy">
Cookie Policy


</Link>
</li>







</ul>
</div>




</div>
</div>


</footer>







   </div>
  );
}
