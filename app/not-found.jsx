import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className='p-4 fixed inset-0 h-screen w-screen flex justify-center items-center flex-col bg-[#e0e0e0] z-[9999]'>
      <h1 className='text-black lg:text-[54px] text-[32px] font-bold text-center'>Page not found</h1>
      <p className='text-[18px] mb-4 text-center'>The page you're searching for is not available.</p>
      <Link prefetch={false}  href="/" className='px-8 py-2 bg-black border-[4px] border-[#a2a2a2] rounded-[40px] text-[14px] text-white'>Back to home</Link>
    </div>
  )
}

export default NotFound