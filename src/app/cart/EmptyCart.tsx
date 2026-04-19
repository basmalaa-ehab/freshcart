import React from 'react'
import { FaArrowRight, FaBoxOpen } from 'react-icons/fa'
import  Link  from 'next/link';

export default function 
() {
  return (
     <div  className="min-h-[60vh] flex items-center justify-center px-4 pt-6">
       <div className="max-w-md text-center">
    <div className="relative mb-8">
    <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
    <span className="text-5xl text-gray-300"><FaBoxOpen />
    </span>
    </div>
    <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-5">Your cart is empty
    </h2>
    <p className="text-gray-500 mb-8 font-medium leading-relaxed text-wrap">Looks like you haven't added anything to your cart yet. <br/>
    Start exploring our products!
    
    </p>
    <Link href="/" className="inline-flex items-center gap-2 bg-green-600 text-white py-3.5 px-8 rounded-xl font-semibold hover:bg-green-700 transition-all shadow-lg active:scale-[0.98]">
    Start Shopping
    <FaArrowRight />
    
    </Link>
    </div>
        </div>
      </div>
  )
}
