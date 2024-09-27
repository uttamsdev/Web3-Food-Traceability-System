'use client';

import React from 'react';
import Logo from '../../assets/logo.png'; // Adjust path if necessary
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { DashboardIcon, SmallCloseIcn } from '@/assets/icons';

const Sidebar = ({ setSidebar, sidebar, role }) => {
  const router = useRouter();
  const pathName = usePathname();

  // Define different menus for each role
  const menus = {
    Admin: [
      { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
      { label: 'Pending Users', path: '/pending-users', icon: <DashboardIcon /> },
      { label: 'Crops List', path: '/dashboard', icon: <DashboardIcon /> },
      { label: 'Foods List', path: '/dashboard', icon: <DashboardIcon /> },
      { label: 'Distributions List', path: '/dashboard', icon: <DashboardIcon /> },
      { label: 'All Users', path: '/all-users', icon: <DashboardIcon /> },
    ],
    Farmer: [
      { label: 'Add Crops', path: '/add-crops', icon: <DashboardIcon /> }, ,
      { label: 'View Crops', path: '/view-crops', icon: <DashboardIcon /> }, ,
    ],
    Producer: [
      { label: 'Create Food Item', path: '/producer/create-food' },
      { label: 'Manage Food Items', path: '/producer/manage-food' },
    ],
    Distributor: [
      { label: 'Distribute Food', path: '/distributor/distribute-food' },
      { label: 'View Distributions', path: '/distributor/view-distributions' },
    ],
    Retailer: [
      { label: 'View Products', path: '/retailer/view-products' },
      { label: 'Manage Sales', path: '/retailer/manage-sales' },
    ],
  };

  const menuItems = menus[role] || []; // Fallback to an empty array if role is not found

  return (
    <div className={`max-w-[280px]   left-0  md:block  bg-white pt-[30px]  h-screen border-r border-[#A7A19E33] `}>
      <div className="pl-3 md:pl-[30px] pb-5 md:pb-[28px] bg-white flex items-center justify-between">
        <Image className="w-[200px] h-[50px]" src={Logo} alt="" />
        <span onClick={() => setSidebar(false)} className="md:hidden w-[30px] h-[30px] rounded-full flex items-center justify-center bg-special-bg"><SmallCloseIcn /></span>
      </div>
      <div className='flex flex-col h-[calc(100vh-118px)] justify-between'>
        <div className='flex w-[280px] flex-col gap-2.5 h-full overflow-y-auto px-3 md:px-[30px]'>
          {
            menuItems?.map((item) =>
              <Link href={item?.path} key={item?.route} className={`cursor-pointer flex gap-[18px] items-center  rounded-r-[10px]  ${item?.path === pathName && 'bg-get-start'} `}>
                <div className={`w-[3px] py-[13px] h-[50px] ${item?.path === pathName && ' bg-special  rounded-[10px]'}`}></div>
                <div className={`flex gap-4 items-center ${item?.path === pathName && 'selected-icon'}`}>
                  {item?.icon}
                  <span className={`text-sm md:text-base leading-[19px] font-semibold ${item?.route === pathName ? 'text-special' : 'text-primary'}`}>{item?.label}</span>
                </div>
              </Link>)
          }
        </div>
      </div>

    </div>
  );
};

export default Sidebar;
