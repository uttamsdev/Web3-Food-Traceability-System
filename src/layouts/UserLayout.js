'use client'
import Sidebar from '@/components/sidebar/Sidebar'
import { Web3Context } from '@/context/Web3Context'
import React, { useContext } from 'react'
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Navbar from '@/components/sidebar/Navbar';


const UserLayout = ({ children }) => {
    const { userRole } = useContext(Web3Context);
    console.log('role', userRole)


    return (
        <AntdRegistry>
            <div className={`  min-h-screen flex w-full`}>
                <Sidebar role={userRole} />
                <div style={{background: '#A7A19E0D'}} className="w-full ">
                    <Navbar />
                    <div className='p-6'>
                        {children}
                    </div>
                </div>
            </div>
        </AntdRegistry>


    )
}

export default UserLayout