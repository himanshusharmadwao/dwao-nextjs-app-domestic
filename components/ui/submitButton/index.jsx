import React from 'react'

const SubmitButton = ({linkText="", linkType="", className=""}) => {
    return (
        <button type={linkType} className={`mt-10 text-[1.8rem] border border-black rounded-[5px] px-[0.3rem] w-full cursor-pointer ${className}`}>  {linkText}  </button>
    )
}

export default SubmitButton