"use client"
import UsedCropsTable from '@/components/tables/UsedCropsTable'
import ViewFoodsTable from '@/components/tables/VewFoodsTable'
import ViewDistributionTable from '@/components/tables/ViewDistributionTable'
import ViewRetailInformationTable from '@/components/tables/ViewRetailInformationTable'
import { Web3Context } from '@/context/Web3Context'
import { Skeleton } from 'antd'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

const TraceFood = () => {
    const { getFoodTrace, allUsers, loading, foodTrace } = useContext(Web3Context);
    const [producerDetails, setProducerDetails] = useState({});

    const { id } = useParams();
    // console.log("food trace", producerDetails)

    // if(foodTrace?.length >0){
    //     setProducerDetails(foodTrace[0]);
    // }
    useEffect(() => {
        getFoodTrace(id);
    }, [])

    console.log('tracex', foodTrace)

    return (
        <div className='w-full bg-[#A7A19E0D] min-h-screen'>
            <h1 className='text-center text-[#A1045A] text-2xl font-semibold pt-6'>Welcome to Food Traceability System</h1>
            <p className='text-base text-center text-[#62646c]'>We ensure high security of food safety for you. Thanks for using our system.</p>

            <div>
                {
                    loading ? <div className='container mt-8 mx-auto flex flex-col gap-2 px-5 py-5 '>
                        <Skeleton active />
                        <Skeleton active />
                        <Skeleton active />
                        <Skeleton active />
                        <Skeleton active />
                        <Skeleton active />
                    </div> : foodTrace?.length > 0 ?
                        <div className='container mx-auto mt-8'>
                            <div>
                                <p className='underline text-[#A1045A] text-base font-semibold mb-[-8px]'>Food Producer Information:</p>
                                {
                                    <ViewFoodsTable users={allUsers} foods={foodTrace[0]} result={true} />
                                }
                            </div>

                            <div className='my-8'>
                                <p className='underline text-[#A1045A] text-base font-semibold mb-[-8px]'>Used Crops for the food:</p>
                                {
                                    <UsedCropsTable crops={foodTrace[3]} users={allUsers} />
                                }
                            </div>

                            <div className='my-8'>
                                <p className='underline text-[#A1045A] text-base font-semibold mb-[-8px]'>Food Distribution Information:</p>
                                {
                                    <ViewDistributionTable distributions={foodTrace[1]} result={true} />
                                }
                            </div>

                            <div className='my-8'>
                                <p className='underline text-[#A1045A] text-base font-semibold mb-[-8px]'>Food Retail Information:</p>
                                {
                                    <ViewRetailInformationTable retails={foodTrace[2]} result={true} />
                                }
                            </div>


                        </div> : ''
                }

            </div >
        </div>
    )
}

export default TraceFood