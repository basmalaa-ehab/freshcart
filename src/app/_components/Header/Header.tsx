import { nextAuthConfig } from "_/next-auth/nextAuth.Config";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import { BsTelephoneFill } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { FaGift, FaTruckMoving } from "react-icons/fa";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { IoIosLogOut } from "react-icons/io";
import LogOutButton from "../LogOutButton/LogOutButton";

export default async function Header() {
  const res = await getServerSession(nextAuthConfig);

  const userName = res?.user?.name;
  const isUserAuthenticated = !!userName;

  return (
    
    <div className="hidden lg:flex bg-white py-2  justify-between border-b border-[#F3F4F6] px-7 items-center">
        
      <div className="flex flex-row justify-between gap-4.5 items-center">
        <div className="flex flex-row gap-2 items-center">
          <span className="text-[#16A34A] text-xs pl-[0.75] pt-[0.75]">
            <FaTruckMoving />
          </span>
          <p className="font-medium text-sm/[20px] text-[#6A7282]">
            Free Shipping on Orders 500 EGP
          </p>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <span className="text-[#16A34A] text-xs pl-[0.75] pt-[0.75]">
            <FaGift />
          </span>
          <p className="font-medium text-sm/[20px] text-[#6A7282]">
            New Arrivals Daily{" "}
          </p>
        </div>{" "}
      </div>

      <div className="justify-between flex gap-4.5 items-center">
        <div>
          <a
            href="tel:+1 (800) 123-4567"
            className="hover:text-green-600 font-medium text-[#6A7282] text-sm/[20px] flex flex-row items-center gap-1"
          >
            <span>
              <BsTelephoneFill />
            </span>
            <span>+1 (800) 123-4567</span>
          </a>
        </div>

        <div>
          <a
            href="mailto:support@freshcart.com"
            className="hover:text-green-600 font-medium text-[#6A7282] text-sm/[20px] flex flex-row items-center gap-1"
          >
            <HiOutlineEnvelope />
            support@freshcart.com
          </a>
        </div>
        <div className="w-px h-5 bg-gray-300 "></div>

        <div className="flex flex-row justify-between items-center gap-5">
          {isUserAuthenticated ? (
            <>
              <Link
                href="/profile"
                className="font-medium text-sm/[20px] text-[#4A5565] flex justify-center items-center hover:text-green-600 gap-1"
              >
                <span>
                  <CiUser />
                </span>
                {userName}
              </Link>
  <Link
     
      href="/"
      className="font-medium text-sm/[20px] text-[#4A5565] flex justify-center items-center hover:text-red-600 gap-1"
    >
      <span>
        <IoIosLogOut />
      </span>
      <LogOutButton/>
    </Link>            </>
          ) : (
            <>
              <Link
                href="/Login"
                className="font-medium text-sm/[20px] text-[#4A5565] flex justify-center items-center hover:text-green-600 gap-1"
              >
                <span>
                  <CiUser />
                </span>
                Sign In
              </Link>
              <Link
                href="/Register"
                className="font-medium text-sm/[20px] text-[#4A5565] flex justify-center items-center hover:text-green-600 gap-1"
              >
                <span>
                  <IoIosLogOut />
                </span>
                Sign Up
              </Link>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
