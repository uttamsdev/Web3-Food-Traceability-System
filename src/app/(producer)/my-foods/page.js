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

const ViewMyFoods = () => {
    const { loading, allUsers, foodItems, fetchAllFoodItems, currentAccount } = useContext(Web3Context);
    const [myFoods, setMyFoods] = useState([]);

    useEffect(() => {
        fetchAllFoodItems();
    }, [])

    useState(() => {
        if (foodItems?.length > 0) {
            setMyFoods(foodItems?.filter(item => item?.producer?.toLowerCase() === currentAccount))
        }
    }, [foodItems, currentAccount])
    return (
        <UserLayout>
            <Breadcrumb title='My Food List' path='Dashboard / My Foods' />
            {
                loading ? <div className='bg-white px-4 py-4 mt-4'><Skeleton active /> </div> :
                    foodItems?.length > 0 ? <ViewFoodsTable users={allUsers} foods={myFoods} /> : <NoDataFound />

            }
        </UserLayout>
    )
}

export default ViewMyFoods