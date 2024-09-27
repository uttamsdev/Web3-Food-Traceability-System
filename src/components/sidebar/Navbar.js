
"use client"
import { ArrowDownIcn, BarsIcon, NotificationIcn, SearchIcon } from '@/assets/icons'
import React, { useState } from 'react'
import User from '../../assets/user.svg'
import Image from 'next/image'
import { Dropdown, Menu, Space } from 'antd'
// import Search from '@/app/dashboard/components/Search'
// import Notification from '@/app/dashboard/components/Notification'
// import CustomModal from '@/utils/Modal'

const Navbar = ({ setSidebar }) => {
    const [notification, setNotification] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [search, setSearch] = useState(false);
    const menuItems = [
        {
            label: 'Account',
            key: '0',
        },
        {
            label: "Settings",
            key: '1'
        },
        {
            label: "Logout",
            key: 3
        }
    ];
    const handleMenuClick = (e) => {
        console.log('Clicked item:', e.key);
        if (e.key === '1') {


        }
    };

    const menu = (
        <Menu
            items={menuItems}
            onClick={handleMenuClick} // Handle menu item clicks
        />
    );
    return (
        <div className={`w-full pl-4 md:pl-[30px] py-2.5 md:py-4 pr-4 md:pr-[57px] flex gap-3 justify-end bg-white !sticky !top-0 z-[99] `}>
            <span onClick={() => setSidebar(prev => !prev)} className="flex items-center justify-center md:hidden"><BarsIcon/></span>

            <div className='flex items-center gap-4 relative'>
                <div className='flex items-center gap-4 Navbar-icon'>
                    {/* <span onClick={() => { setSearch(true); setModalContent(<Search />) }} className='cursor-pointer'><BigSearchIcon /></span> */}
                    <span onClick={() => setNotification((prev) => !prev)} className='cursor-pointer'><NotificationIcn /></span>
                    {
                        // notification && <Notification setNotification={setNotification} />
                    }
                </div>
                <Dropdown overlay={menu} trigger={['click']}>
                    <Space>
                        <div className='flex gap-2 items-center cursor-pointer'>
                            <Image className='min-w-[30px] md:min-w-[40px] min-h-[30px] md:min-h-[40px] rounded-full' src={User} alt='user image' />
                            <div className='flex flex-col'>
                                <h3 className='text-sm md:text-base leading-[24px] text-primary font-semibold whitespace-nowrap'>Roney Khan</h3>
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