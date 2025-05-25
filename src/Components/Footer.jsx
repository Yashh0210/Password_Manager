import React from 'react'

function Footer() {
  return (
    <div className='fixed bottom-0 flex flex-col bg-slate-800 w-full text-white items-center py-2 px-4 z-10'>
      <div className="logo font-bold text-lg sm:text-xl md:text-2xl text-center">
        <span className='text-green-600'>&lt;</span>
        Pass
        <span className='text-green-600'>OP/&gt;</span>
      </div>
      <div className='flex items-center justify-center gap-1 text-xs sm:text-sm md:text-base text-center flex-wrap'>
        <span>Created with</span>
        <span className='text-red-500 text-base sm:text-lg'>❤️</span>
        <span>by</span>
        <span className='font-semibold'>Yash</span>
      </div>
    </div>
  )
}

export default Footer