"use client"
import React, { useContext } from 'react'
import BtnSecondary from './BtnSecondary'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import { Web3Context } from '@/context/Web3Context';


const DeleteMsg = ({ setOpen, approveUser, wallet }) => {
    const { approveLoading } = useContext(Web3Context);
    const handleApprove = () => {
        approveUser(wallet);
        if (approveLoading === true) {
            setOpen(false)
        }
    }
    return (
        <div>
            <div className='flex items-center gap-3'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#235ef4" class="size-9">
                    <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
                </svg>


                <div>
                    <h1 className='mb-1 text-lg text-primary font-semibold'>Approve?</h1>
                    <p className='text-sm text-subTitleColor'>Are you sure you want to approve this user?</p>
                </div>
            </div>

            <div className='mt-8 flex gap-4 justify-end'>
                <BtnSecondary btnFunction={() => setOpen(false)} btnClass="md:px-6 md:py-1.5 font-normal ">Cancel</BtnSecondary>
                <button onClick={handleApprove} className="text-white text-sm md:text-base leading-4 md:leading-[26px] px-6  py-2 rounded  text-center md:px-6 md:py-1.5 font-normal bg-[#235ef4] " >{approveLoading ? <span className='flex items-center gap-2'> <Spin indicator={<LoadingOutlined spin />} />Approving</span> : <span>Approve</span>}</button>
            </div>
        </div>
    )
}

export default DeleteMsg