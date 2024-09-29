
"use client"
import { ArrowDownIcn, BarsIcon, NotificationIcn, SearchIcon } from '@/assets/icons'
import React, { useContext, useEffect, useState } from 'react'
import UserImage from '../../assets/user.svg'
import Image from 'next/image'
import { Dropdown, Menu, Space } from 'antd'
import { Web3Context } from '@/context/Web3Context'
import { useRouter } from 'next/navigation'
// import Search from '@/app/dashboard/components/Search'
// import Notification from '@/app/dashboard/components/Notification'
// import CustomModal from '@/utils/Modal'

const Navbar = ({ setSidebar }) => {
    const { allUsers, currentAccount, userRole } = useContext(Web3Context);
    const router = useRouter();

    const menuItems = [
        {
            label: 'Dashboard',
            key: '1',
        },
        {
            label: "Trace Food",
            key: '2'
        },
        {
            label: "Home",
            key: 3
        }
    ];
    const handleMenuClick = (e) => {
        console.log('Clicked item:', e.key);
        if (e.key === '1') {
            router.push('/dashboard');
        } else if (e.key === '2') {
            router.push('/trace-food/search');
        } else if (e.key === '3') {
            router.push('/');
        }
    };

    const menu = (
        <Menu
            items={menuItems}
            onClick={handleMenuClick} // Handle menu item clicks
        />
    );


    return (
        <div className={`w-full pl-4 md:pl-[30px] py-2.5 md:py-4 pr-4 md:pr-[57px] flex gap-3 justify-between items-center bg-white !sticky !top-0 z-[99] `}>
            <div className='cursor-pointer size-[30px] rounded  flex items-center justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                    <path d="M11.5 18C11.5 18 5.50001 13.5811 5.5 12C5.49999 10.4188 11.5 6 11.5 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M18.5 18C18.5 18 12.5 13.5811 12.5 12C12.5 10.4188 18.5 6 18.5 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
            <span onClick={() => setSidebar(prev => !prev)} className="flex items-center justify-center md:hidden"><BarsIcon /></span>

            <div className='flex items-center gap-4 relative'>
                <div className='flex items-center gap-4 Navbar-icon'>
                    {/* <span onClick={() => { setSearch(true); setModalContent(<Search />) }} className='cursor-pointer'><BigSearchIcon /></span> */}
                    {
                        // notification && <Notification setNotification={setNotification} />
                    }
                </div>
                <Dropdown overlay={menu} trigger={['click']}>
                    <Space>
                        <div className='flex gap-2 items-center cursor-pointer'>
                            <Image className='min-w-[30px] md:min-w-[40px] min-h-[30px] md:min-h-[40px] rounded-full' src={UserImage} alt='user image' />
                            <div className='flex flex-col'>
                                <h3 className='text-sm md:text-base leading-[24px] text-primary font-semibold whitespace-nowrap'>{userRole}</h3>
                                <span className='text-xs text-lightText'>Owner</span>
                            </div>
                            <ArrowDownIcn />
                        </div>
                    </Space>
                </Dropdown>


            </div>
            {/* <CustomModal modalClass={'!max-w-[700px] !w-full'} setOpen={setSearch} open={search} modalContent={modalContent} /> */}
        </div>
    )
}

export default Navbar