import React from 'react'

const Breadcrumb = ({ title, path }) => {
    return (
        <div>
            <h1 className='text-lg md:text-[24px] leading-5 md:leading-[29px] font-bold text-[#000000]'>{title}</h1>
            <span className='text-xs md:text-base leading-[19px] text-[#898B9A]'>{path}</span>
        </div>
    )
}

export default Breadcrumb