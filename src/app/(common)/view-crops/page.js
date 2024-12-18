'use client'
import ViewCropsTable from '@/components/tables/ViewCropsTable'
import Breadcrumb from '@/components/utils/Breadcrumb'
import NoDataFound from '@/components/utils/NoDataFound'
import { Web3Context } from '@/context/Web3Context'
import UserLayout from '@/layouts/UserLayout'
import { Skeleton } from 'antd'
import React, { useContext, useEffect, useState } from 'react'

const ViewCrops = () => {
    const { loading, crops, fetchAllCrops, currentAccount } = useContext(Web3Context);
    const [myCrops, setMyCrops] = useState([]);
    console.log("crops", crops);

    useEffect(() => {
        fetchAllCrops();
    }, [])

    useEffect(() => {
        if (crops?.length > 0) {
            setMyCrops(crops?.filter(crop => (crop?.producer).toLowerCase() === currentAccount));
        }
    }, [crops, currentAccount])
    return (
        <UserLayout>
            <Breadcrumb title='View Crop List' path='Dashboard / View Crops' />
            {
                loading ? <div className='bg-white px-4 py-4 mt-4'><Skeleton active /> </div> :
                    myCrops?.length > 0 ? <ViewCropsTable crops={myCrops} /> : <NoDataFound />

            }
        </UserLayout>
    )
}

export default ViewCrops