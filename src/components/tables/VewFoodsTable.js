"use client"
import { TableArrowDown } from '@/assets/icons';
import React, { useState } from 'react';

const ViewFoodsTable = ({ foods, users, result = false }) => {

    console.log("food from table", foods)
    return (
        <div className='bg-white rounded-[6px]'>
            <div className='mt-4  w-full px-3 pt-3 overflow-x-auto max-h-[600px] overflow-y-auto'>
                <table className="min-w-full ">
                    <thead>
                        <tr className='border-b border-[#EDF2F7]'>
                            <th className="th text-left text-sm"><div><div><p>Food ID</p> <TableArrowDown /></div></div></th>
                            <th className=" th text-left text-sm"><div>Food Name <TableArrowDown /></div></th>
                            <th className=" th text-left text-sm"><div>Start Date <TableArrowDown /></div></th>
                            <th className=" th  text-sm"><div>End Date <TableArrowDown /></div></th>
                            <th className=" th  text-sm"><div>Location <TableArrowDown /></div></th>
                            <th className=" th  text-sm"><div>Producer <TableArrowDown /></div></th>
                            <th className=" th  text-sm"><div>Price <TableArrowDown /></div></th>
                            <th className=" th  text-sm"><div>Quantity <TableArrowDown /></div></th>
                            <th className=" th  text-sm"><div>Expire Date <TableArrowDown /></div></th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            !result ?
                                foods?.map((table_data, index) => <tr key={index} className='border-b border-[#EDF2F7] last:border-none'>
                                    <td className="td text-[#131D26] ">{parseInt(table_data?.foodId?._hex, 16)}</td>
                                    <td className="td  text-[#131D26]">{table_data?.foodName}</td>
                                    <td className="td  text-[#131D26]">{table_data?.startDate}</td>
                                    <td className="td  text-[#131D26]">{table_data?.endDate}</td>
                                    <td className="td  text-[#131D26]">{table_data?.location}</td>
                                    <td className="td text-[#131D26]">
                                        {users?.find(user => user?.wallet === table_data?.producer)?.name || 'Producer not found'}
                                    </td>
                                    <td className="td  text-[#131D26]">{parseInt(table_data?.price?._hex, 16)}</td>
                                    <td className="td  text-[#131D26]">{parseInt(table_data?.quantity?._hex, 16)}</td>
                                    <td className="td  text-[#131D26]">{table_data?.expireDate}</td>

                                </tr>)
                                :
                                <tr className='border-b border-[#EDF2F7] last:border-none'>
                                    <td className="td text-[#131D26] ">{parseInt(foods?.foodId?._hex, 16)}</td>
                                    <td className="td  text-[#131D26]">{foods?.foodName}</td>
                                    <td className="td  text-[#131D26]">{foods?.startDate}</td>
                                    <td className="td  text-[#131D26]">{foods?.endDate}</td>
                                    <td className="td  text-[#131D26]">{foods?.location}</td>
                                    <td className="td text-[#131D26]">
                                        {users?.find(user => user?.wallet === foods?.producer)?.name || 'Producer not found'}
                                    </td>
                                    <td className="td  text-[#131D26]">{parseInt(foods?.price?._hex, 16)}</td>
                                    <td className="td  text-[#131D26]">{parseInt(foods?.quantity?._hex, 16)}</td>
                                    <td className="td  text-[#131D26]">{foods?.expireDate}</td>

                                </tr>
                        }
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default ViewFoodsTable;
