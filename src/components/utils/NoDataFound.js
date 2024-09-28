'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import NoDataImg from '../../assets/noDataImage.png'
import Image from 'next/image'

const NoDataFound = () => {
    const router = useRouter();
    return (
        <div className='flex justify-center'>
            <div className='flex flex-col mt-10'>
                <Image className='mx-auto' src={NoDataImg} alt='' />
                <div class=" mx-auto px-4 md:px-8 flex items-center gap-4">
                    <div class="flex flex-col items-center justify-center sm:items-start">
                        <h1 class="text-3xl font-bold text-pink-600 mb-5 mx-auto">No Data Found</h1>
                        <p class="text-gray-txt mb-5 text-[#131D26] w-[350px] text-center">There is no data available right now. You can check later when it is added or reload.</p>
                        <span onClick={() => router.back()} href="" class="bg-pink-600 cursor-pointer hover:bg-secondary text-white mx-auto font-semibold px-4 py-2 rounded-full inline-block">Go back</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoDataFound