"use client"
import { TableArrowDown } from '@/assets/icons';
import React, { useState } from 'react';

const UsedCropsTable = ({ crops, users }) => {
    console.log("crops ln", crops)
    return (
        <div className='bg-white rounded-[6px]'>
            <div className='mt-4  w-full px-3 pt-3 overflow-x-auto max-h-[600px] overflow-y-auto'>
                <table className="min-w-full ">
                    <thead>
                        <tr className='border-b border-[#EDF2F7]'>
                            <th className="th text-left text-sm"><div><div><p>Crop ID</p> <TableArrowDown /></div></div></th>
                            <th className="th text-left text-sm"><div><div><p>Crop Name</p> <TableArrowDown /></div></div></th>
                            <th className="th text-left text-sm"><div><div><p>Farmer</p> <TableArrowDown /></div></div></th>
                            <th className=" th text-left text-sm"><div>Farming Star Date <TableArrowDown /></div></th>
                            <th className=" th  text-sm"><div>Farming End Date <TableArrowDown /></div></th>
                            <th className=" th  text-sm"><div>Location <TableArrowDown /></div></th>
                            <th className=" th text-left text-sm"><div>Total Price <TableArrowDown /></div></th>
                            <th className=" th  text-sm"><div>Supply Quantity<TableArrowDown /></div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            crops?.map(table_data => <tr key={table_data?.id} className='border-b border-[#EDF2F7] last:border-none'>
                                <td className="td text-[#131D26] ">{parseInt(table_data?.cropId?._hex, 16)}</td>
                                <td className="td  text-[#131D26]">{table_data?.cropName}</td>
                                <td className="td text-[#131D26]">
                                    {users?.find(user => user?.wallet === table_data?.farmer)?.name || 'Producer not found'}
                                </td>
                                <td className="td  text-[#131D26]">{table_data?.farmingStartDate}</td>
                                <td className="td  text-[#131D26]">{table_data?.farmingEndDate}</td>
                                <td className="td  text-[#131D26]">{table_data?.location}</td>
                                <td className="td  text-[#131D26]">{parseInt(table_data?.price?._hex, 16)}</td>
                                <td className="td  text-[#131D26]">{table_data?.quantity}</td>

                            </tr>)
                        }
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default UsedCropsTable;
