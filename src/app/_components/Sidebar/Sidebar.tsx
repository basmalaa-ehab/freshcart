"use client";

import { Button } from "_/components/ui/button";
import { Input } from "_/components/ui/input";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { BsHeadset } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { FaBars } from "react-icons/fa";
import { FaCartShopping, FaRegCircleUser } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { IoClose, IoSearch } from "react-icons/io5";
import { LuHeart } from "react-icons/lu";
import logo from "../../../assets/images/freshcart.svg";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useWishlist } from "_/app/_context/WishlistContext";
import { useCart } from "_/app/_context/CartContext";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
const { data } = useSession();

const userName = data?.user?.name;
const isUserAuthenticated = !!userName;
const { numOfWishlistItems } = useWishlist();
const { numOfCartItems } = useCart();

  return (



    <>
    
      <button
        onClick={() => setOpen(true)}
        className="mr-2  lg:hidden w-9 h-9 rounded-full  hover:bg-green-700 text-white flex items-center justify-center bg-[#16A34A]"
      >
        <FaBars className=""/>
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/40"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 overflow-y-auto h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="">
          <button
            className="flex flex-row justify-between w-full items-center p-4 border-b border-gray-100 bg-gray-50/50"
            onClick={() => setOpen(false)}
          >
            <img
              src={logo.src}
              alt="freshcartlogo"
              className=" h-7 w-auto"
              width={160}
            />
            <span className="text-lg font-bold w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
              <IoClose />
            </span>
          </button>
          <form className="p-4 border-b border-gray-100">
            <div className="relative">
              <Input
                type="text"
                id="input-button-group"
                className="w-full pt-3 pl-4 pb-3.25  py-5 pr-12 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white   focus:outline-none! focus:ring-2! focus:ring-green-500/20! focus:border-green-500!"
                placeholder="Search products..."
              />
              <Button
                type="submit"
                className="   absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-[#16A34A] rounded-[8px] text-white flex items-center justify-center"
              >
                <IoSearch />
              </Button>
            </div>
          </form>
          <nav className="flex flex-col gap-4 mt-5 px-5 font-medium text-base/tight text-[#364153]">
            <Link
              className="hover:text-green-600 hover:bg-green-50 transition-colors gap-3 px-4 py-3 rounded-xl"
              href="/"
            >
              Home
            </Link>
            <Link
              className="hover:text-green-600 hover:bg-green-50 transition-colors gap-3 px-4 py-3 rounded-xl"
              href="/shop"
            >
              Shop
            </Link>
            <Link
              className="hover:text-green-600 hover:bg-green-50 transition-colors gap-3 px-4 py-3 rounded-xl"
              href="/brands"
            >
              Brands
            </Link>
            <Link
              className="hover:text-green-600 hover:bg-green-50 transition-colors gap-3 px-4 py-3  rounded-xl"
              href="/cart"
            >
              Cart
            </Link>
          </nav>
          <div className="mx-4 border-t border-gray-100 mt-5"></div>
          {/* wishlist and cart */}
          <div className="flex flex-col py-0 pl-1 pr-4 px-4">
            <Link
              href="/wishlist"
              className="mt-2 flex justify-between items-center  hover:text-green-600 hover:bg-green-50 transition-colors gap-3   rounded-xl "
            >
              <div className="py-3 px-4 justify-between flex">
                <div className="flex  gap-2 items-center justify-start ">
                  <div className="bg-[#FEF2F2] text-[#FB2C36] w-9 h-9 rounded-[33554400px] flex justify-center items-center ">
                    <LuHeart />
                  </div>
                  <span className="text-[#364153] font-bold text-base ">
                    Wishlist
                  </span>
                </div>
              </div>
              <div className="bg-[#FB2C36] w-7 h-7 rounded-[33554400px] py-1 px-2.5 text-white font-bold text-[10px] flex items-center justify-center">
                {numOfWishlistItems}
              </div>
            </Link>
            <Link
              href="/cart"
              className=" flex justify-between items-center   hover:text-green-500 hover:bg-green-50 transition-colors gap-3   rounded-xl "
            >
              <div className="py-2 px-4 justify-between flex   ">
                <div className="flex  gap-2 items-center justify-start ">
                  <div className="hover:text-green-500 hover:bg-[#F3F4F6] bg-[#F0FDF4] text-lg    lg:text-base rounded-[33554400px]  w-10 h-10 flex items-center justify-center">
                    <FaCartShopping className=" text-[#16A34A] font-bold   stroke-1   text-xl  " />
                  </div>
                  <span className="text-[#364153] font-bold text-base ">
                    Cart
                  </span>
                </div>
              </div>
              <div className="bg-[#16A34A] w-7 h-7 rounded-[33554400px] py-1 px-2.5 text-white font-bold text-[10px] flex items-center justify-center">
                {numOfCartItems}
              </div>
            </Link>
          </div>
          <div className="mx-4 border-t border-gray-100 mt-5 "></div>

          {/* user and signout */}




          <div className="flex flex-col py-2 pl-3 pr-4">
           {
            isUserAuthenticated? <>
             <Link
              href="/profile"
                onClick={() => setOpen(false)}

              className=" flex justify-between items-center   "
            >
              <div className="py-1 mt-2 px-4 justify-between flex hover:text-green-600 hover:bg-green-50 transition-colors gap-3 w-full rounded-xl ">
                <div className="flex  gap-2 items-center justify-start ">
                  <div className=" bg-[#F3F4F6] text-lg    lg:text-base rounded-[33554400px]  w-10 h-10 flex items-center justify-center">
                    <FaRegCircleUser className=" text-[#6A7282] font-bold   stroke-1   text-xl  " />
                  </div>
                  <span className="text-[#364153] font-bold text-base ">
                    {userName}
                  </span>
                </div>
              </div>
            </Link>
            <div
                onClick={() => setOpen(false)}

              className=" flex justify-between items-center  "
            >
              <div className=" py-1 mt-2 px-4  justify-between flex hover:text-green-600 hover:bg-[#FEF2F2] transition-colors gap-3 w-full rounded-xl ">
                <div className="flex  gap-2 items-center justify-start ">
                  <div className="  bg-[#FEF2F2] text-lg    lg:text-base rounded-[33554400px]  w-10 h-10 flex items-center justify-center">
                    <IoIosLogOut className=" text-[#E7000B] font-bold   stroke-1   text-xl  " />
                  </div>
                  <span className="text-red-500 font-semibold  text-base ">
                    <LogOutButton/>
                  </span>
                </div>
              </div>
            </div>
            </>: 
<div className="grid grid-cols-2 gap-3 pt-2">

  <Link
                href="/Login"
                  onClick={() => setOpen(false)}

className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"              >
                
                Sign In
              </Link>
              <Link
                onClick={() => setOpen(false)}

                href="/register"
className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-green-600 text-green-600 font-semibold hover:bg-green-50 transition-colors"              >
                
                Sign Up
              </Link>
</div>

           }
          </div>

















          <div className=" border-t border-gray-100 mt-5">
            <Link
              href="/contact"
              className=" mx-4 mt-3 p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-3 hover:bg-green-50 transition-colors "
            >
              <div className="bg-[#F0FDF4] pl-0.75 rounded-[33554400px] w-10 h-10 flex items-center justify-center font-bold text-base">
                <BsHeadset className="text-[#16A34A] font-bold text-base stroke-1" />
              </div>
              <div className="text-sm font-semibold text-gray-700 pb-2 flex flex-col">
                <span>Need Help?</span>
                <span className="text-xs font-semibold text-green-600">
                  Contact Support
                </span>{" "}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
