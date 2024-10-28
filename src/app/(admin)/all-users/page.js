'use client'
import AllUsersTable from '@/components/tables/AllUsersTable'
import Breadcrumb from '@/components/utils/Breadcrumb'
import NoDataFound from '@/components/utils/NoDataFound'
import { Web3Context } from '@/context/Web3Context'
import UserLayout from '@/layouts/UserLayout'
import { Skeleton } from 'antd'
import React, { useContext, useEffect } from 'react'

const Users = () => {
    const { loading, allUsers, getAllUsers } = useContext(Web3Context);
    console.log("users", allUsers);

    useEffect(() => {
        getAllUsers();
    }, [])
    return (
        <UserLayout>
            <Breadcrumb title='All Users' path='Dashboard / All Users' />
            {
                loading ? <div className='bg-white px-4 py-4 mt-4'><Skeleton active /> </div> :
                    allUsers?.length > 0 ? <AllUsersTable users={allUsers} /> : <NoDataFound />
                    
            }
        </UserLayout>
    )
}

export default Users