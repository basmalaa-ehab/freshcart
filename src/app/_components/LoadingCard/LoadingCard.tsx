import React from 'react'

export default function LoadingCard() {
  return (
    <div ><div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 place-items-center mb-3 mx-auto px-6 ">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-lg p-4 text-center shadow-sm justify-center"
        >
          <div className="animate-pulse">
            <div className="h-20 w-20 mx-auto mb-3 rounded-full bg-gray-300"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto"></div>
          </div>
        </div>
      ))}
    </div></div>
  )
}
