'use client';

import React, { useContext } from 'react';
import Logo from '../../assets/user.jpg'; // Adjust path if necessary
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import User from '../../assets/user.svg'

import Link from 'next/link';
import { AllUsersIcon, DashboardIcon, InvoiceIcon, List3Icon, ListIcon, ListViewIcon, PendingUsersIcon, PlusIcon, SmallCloseIcn } from '@/assets/icons';
import { Web3Context } from '@/context/Web3Context';


const Sidebar = ({ setSidebar, sidebar, role }) => {
  const { loading } = useContext(Web3Context);
  const router = useRouter();
  const pathName = usePathname();

  console.log("loading, ", loading)

  // Define different menus for each role
  const menus = {
    Admin: [
      { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
      { label: 'Pending Users', path: '/pending-users', icon: <PendingUsersIcon /> },
      { label: 'All Crops List', path: '/view-crops', icon: <ListIcon /> },
      { label: 'All Foods List', path: '/view-foods', icon: <ListViewIcon /> },
      { label: 'Distributions List', path: '/view-distributions', icon: <ListIcon /> },
      { label: 'All Users', path: '/all-users', icon: <AllUsersIcon /> },
    ],
    Farmer: [
      { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
      { label: 'Add Crops', path: '/add-crops', icon: <PlusIcon /> }, ,
      { label: 'All Crops List', path: '/view-crops', icon: <ListViewIcon /> },
      { label: 'My Crops', path: '/my-crops', icon: <ListViewIcon /> },

    ],
    Producer: [
      { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
      { label: 'Add Foods', path: '/add-foods', icon: <PlusIcon /> },
      { label: 'All Foods List', path: '/view-foods', icon: <ListViewIcon /> },
      { label: 'My Foods List', path: '/my-foods', icon: <ListViewIcon /> },
      { label: 'View All Crops', path: '/view-crops', icon: <ListIcon /> },
      { label: 'All Distributions List', path: '/view-distributions', icon: <List3Icon /> },

    ],
    Distributor: [
      { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
      { label: 'Add Distribution', path: '/add-distribute', icon: <PlusIcon /> },
      { label: 'All Foods List', path: '/view-foods', icon: <List3Icon /> },
      { label: 'Distributions List', path: '/view-distributions', icon: <ListViewIcon /> },
    ],
    Retailer: [
      { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
      { label: 'Distributions List', path: '/view-distributions', icon: <ListViewIcon /> },
      { label: 'Add Retail', path: '/add-retail', icon: <PlusIcon /> },
      { label: 'All Foods List', path: '/view-foods', icon: <List3Icon /> },

    ],
  };

  const menuItems = menus[role] || []; // Fallback to an empty array if role is not found

  return (
    <div className={`fixed max-w-[280px]   left-0  md:block  bg-white pt-[30px]  h-screen border-r border-[#A7A19E33] `}>
      <div className="pl-3 md:pl-[30px] pb-5 md:pb-[24px] bg-white flex items-center justify-between">
        {/* <div className='w-[86px] h-[86px] mx-auto mb-5'>
          <Image className=" min-w-full min-h-full rounded-full ring-2 ring-[#fac929]" src={User} alt="" />
          <span className='text-lg font-medium text-[#A1045A] block text-center mt-0.5'>{role}</span>
        </div> */}
        <p className='text-3xl font-bold gradient-text '>FoodX Tracer</p>
        <span onClick={() => setSidebar(false)} className="md:hidden w-[30px] h-[30px] rounded-full flex items-center justify-center bg-special-bg"><SmallCloseIcn /></span>
      </div>
      <div className='flex flex-col h-[calc(100vh-118px)] justify-between'>
        <div className='flex w-[280px] flex-col gap-2.5 h-full overflow-y-auto px-3 md:px-[30px]'>
          {
            menuItems?.map((item) =>
              <Link href={item?.path} key={item?.route} className={`cursor-pointer flex gap-[18px] items-center  rounded-r-[10px]  ${item?.path === pathName && 'bg-[#FAF2F7]'} `}>
                <div className={`w-[3px] py-[13px] h-[50px] ${item?.path === pathName && ' bg-[#A1045A]  rounded-[10px]'}`}></div>
                <div className={`flex gap-4 items-center ${item?.path === pathName && 'selected-icon'}`}>
                  {item?.icon}
                  <span className={`text-sm md:text-base leading-[19px] font-semibold ${item?.path === pathName ? 'text-[#A1045A]' : 'text-[#000000]'}`}>{item?.label}</span>
                </div>
              </Link>)
          }
        </div>
      </div>

    </div>
  );
};

export default Sidebar;
