'use client'
import ViewCropsTable from '@/components/tables/ViewCropsTable'
import Breadcrumb from '@/components/utils/Breadcrumb'
import NoDataFound from '@/components/utils/NoDataFound'
import { Web3Context } from '@/context/Web3Context'
import UserLayout from '@/layouts/UserLayout'
import { Skeleton } from 'antd'
import React, { useContext, useEffect, useState } from 'react'

const ViewCrops = () => {
    const { loading, currentAccount, crops, fetchAllCrops } = useContext(Web3Context);
    const [myCrops, setMyCrops] = useState([]);

    useEffect(() => {
        fetchAllCrops();
    }, [])
    useEffect(() => {
        if (crops?.length > 0) {
            const myCrop = crops?.filter(crop => (crop?.farmer).toLowerCase() === currentAccount);
            setMyCrops(myCrop);
        }
    }, [crops, currentAccount])
    console.log(currentAccount)
    return (
        <UserLayout>
            <Breadcrumb title='My Crop List' path='Dashboard / My Crops' />
            {
                loading ? <div className='bg-white px-4 py-4 mt-4'><Skeleton active /> </div> :
                    myCrops?.length > 0 ? <ViewCropsTable crops={myCrops} /> : <NoDataFound />

            }
        </UserLayout>
    )
}

export default ViewCrops