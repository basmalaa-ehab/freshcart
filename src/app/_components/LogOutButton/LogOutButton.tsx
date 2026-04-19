"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosLogOut } from "react-icons/io";

export default function LogOutButton() {
   const router = useRouter()
  async function handleLogout() {
    // await signOut({
    //   redirect: false,
    // });
    await signOut({ callbackUrl: "/Login" })
// router.push('/Login')
  }
  return (
    <button
      onClick={handleLogout} 
      className="cursor-pointer"
    >
    
      Sign Out
    </button>
  );
}
