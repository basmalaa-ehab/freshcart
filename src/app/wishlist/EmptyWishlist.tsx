"use client";

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { FaArrowRight, FaRegHeart } from 'react-icons/fa';
import { IoMdHeartEmpty } from 'react-icons/io';

export default function EmptyWishlist() {
  const { data: session, status } = useSession();
  const showSignInButton = status === 'unauthenticated' || !session;

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 pt-6">
      <div className="max-w-md text-center">
        <div className="relative mb-8">
          <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center mx-auto">
            <span className="text-5xl text-gray-300">
              <FaRegHeart />
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-5">
            Your wishlist is empty
          </h2>
          <p className="text-gray-500 mb-8 font-medium leading-relaxed text-wrap">
            Browse products and save your favorites here. Sign in to sync your wishlist across devices.
          </p>

          <div className="flex flex-col items-center justify-center gap-4">
            <Link
              href="/"
className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors">            
              Browse Products
              <FaArrowRight />
            </Link>





            {showSignInButton ? (
              <Link
                href="/Login"
className="inline-flex   items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors">                Sign In
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
