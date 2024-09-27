'use client'
import Dropdown from '@/components/utils/CustomDropdown'
import { Web3Context } from '@/context/Web3Context'
import { LoadingOutlined } from '@ant-design/icons';

import { Input, Spin } from 'antd'
import React, { useContext, useState } from 'react'

const SignUp = () => {
    const { isActive, signupLoading, registerUser, currentAccount } = useContext(Web3Context)
    const [dropdownValues, setDropdownValues] = useState({});

    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentAccount && name?.length > 0 && dropdownValues?.user_type?.value) {
            registerUser(name, dropdownValues?.user_type?.value);
        } else {
            alert("Your Wallet is not connected");
        }
    }

    console.log('isActive', isActive)
    return (
        <form onSubmit={handleSubmit} className='flex items-center justify-center h-screen bg-[rgba(167,161,158,0.05)]'>
            <div className='bg-white px-5 pt-6 pb-8 rounded w-[500px]'>
                <p className='text-center text-xl font-semibold text-[#A1045A] mb-4'>SignUp New Account</p>
                {/* <input type="text" className='w-full mb-2.5' placeholder="Full Name" /> */}
                <div className='mb-2.5'>
                    <Input onChange={(e) => setName(e.target.value)} placeholder="Full name" />
                </div>
                <Dropdown setDropdownValues={setDropdownValues} dropdownValues={dropdownValues} options={[{ name: 'Admin', value: 0 }, { name: "Farmer", value: 1 }, { name: "Producer", value: 2 }, { name: "Distributor", value: 3 }, { name: "Retailer", value: 4 }]} searchBy={"name"} fieldName="user_type" placeholder='Select user type' />
                <button className='flex justify-center bg-[#A1045A] py-1 w-full mt-4 text-white rounded'>{signupLoading ? <span className='flex items-center gap-2'> <Spin indicator={<LoadingOutlined spin />} /> Creating Account</span> : <span>Sign Up</span>}</button>

            </div>
        </form>
    )
}

export default SignUp