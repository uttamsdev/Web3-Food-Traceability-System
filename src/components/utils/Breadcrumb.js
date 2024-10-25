import React from 'react'

const Breadcrumb = ({ title, path }) => {
    return (
        <div className=''>
            <h1 className='text-lg md:text-[24px] leading-5 md:leading-[29px] font-semibold text-[#000000]'>{title}</h1>
            <span className='text-xs md:text-base leading-[19px] text-[#898B9A]'>{path}</span>
        </div>
    )
}

export default Breadcrumb