'use client'
import AllUsersTable from '@/components/tables/AllUsersTable'
import PendingUsersTable from '@/components/tables/PendingUsersTable'
import Breadcrumb from '@/components/utils/Breadcrumb'
import NoDataFound from '@/components/utils/NoDataFound'
import { Web3Context } from '@/context/Web3Context'
import UserLayout from '@/layouts/UserLayout'
import { Skeleton } from 'antd'
import React, { useContext, useEffect } from 'react'

const PendingUsers = () => {
    const { loading, approveLoading, approveUser, allUsers, getAllUsers} = useContext(Web3Context);
    console.log("pending x", allUsers);
    const pendingUsers = allUsers?.filter(user => user?.isActive===false);
    console.log('p', pendingUsers)

    useEffect(() => {
        getAllUsers()
    }, [pendingUsers?.length])
    return (
        <UserLayout>
            <Breadcrumb title='Pending Users' path='Dashboard / Pending Users' />
            {
                loading ? <div className='bg-white px-4 py-4 mt-4'><Skeleton active /> </div> :
                    pendingUsers?.length > 0 ? <PendingUsersTable users={pendingUsers} approveLoading={approveLoading} approveUser={approveUser}/> : <NoDataFound />

            }
        </UserLayout>
    )
}

export default PendingUsers