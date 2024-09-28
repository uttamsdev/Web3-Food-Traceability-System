'use client'
import AllUsersTable from '@/components/tables/AllUsersTable'
import ViewFoodsTable from '@/components/tables/VewFoodsTable'
import ViewCropsTable from '@/components/tables/ViewCropsTable'
import Breadcrumb from '@/components/utils/Breadcrumb'
import NoDataFound from '@/components/utils/NoDataFound'
import { Web3Context } from '@/context/Web3Context'
import UserLayout from '@/layouts/UserLayout'
import { Skeleton } from 'antd'
import React, { useContext, useEffect, useState } from 'react'

const ViewCrops = () => {
    const { loading, allUsers, foodItems, fetchAllFoodItems } = useContext(Web3Context);
    console.log('all user', allUsers)
    console.log("foods", foodItems);
    const [producer, setPendingUsers] = useState(allUsers?.map(user => user?.wallet === foodItems?.producer));
    console.log("producer", producer);

    useEffect(() => {
        fetchAllFoodItems();
    }, [])
    return (
        <UserLayout>
            <Breadcrumb title='View Crop List' path='Dashboard / View Crops' />
            {
                loading ? <div className='bg-white px-4 py-4 mt-4'><Skeleton active /> </div> :
                foodItems?.length > 0 ? <ViewFoodsTable users={allUsers} foods={foodItems} /> : <NoDataFound />

            }
        </UserLayout>
    )
}

export default ViewCrops