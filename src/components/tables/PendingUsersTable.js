"use client"
import { TableArrowDown } from '@/assets/icons';
import React, { useState } from 'react';

const PendingUsersTable = ({ users, wallet }) => {

    return (
        <div className='bg-white rounded-[6px]'>
            <div className='mt-4  w-full px-3 pt-3 overflow-x-auto max-h-[600px] overflow-y-auto'>
                <table className="min-w-full ">
                    <thead>
                        <tr className='border-b border-[#EDF2F7] '>
                            <th className="th text-left text-sm w-[600px]"><div><div><p>Wallet</p> <TableArrowDown /></div></div></th>
                            <th className=" th text-left text-sm"><div>Name <TableArrowDown /></div></th>
                            <th className=" th text-left text-sm"><div>Role <TableArrowDown /></div></th>
                            <th className=" th flex justify-center text-sm"><div>Status <TableArrowDown /></div></th>
                            <th className=" th text-center text-sm"><div className='w-[100px] flex justify-center mx-auto text-center'>Action <TableArrowDown /></div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map(table_data => <tr key={table_data?.id} className='border-b border-[#EDF2F7] last:border-none'>
                                <td className="td text-[#131D26] font-semibold w-[600px]">{table_data?.wallet}</td>
                                <td className="td  text-[#131D26]">{table_data?.name}</td>
                                <td className="td text-[#131D26]">{table_data?.role === 0 ? 'System Admin' : table_data?.role === 1 ? 'Farmer' : table_data?.role === 2 ? 'Producer' : table_data?.role === 3 ? 'Distributor' : table_data?.role === 4 ? 'Retailer' : ''}</td>
                                <td className="td ">{<div className={`w-[80px] mx-auto ${table_data?.isActive ? 'status-success' : 'status-danger'}`}>{table_data?.isActive ? 'Active' : 'Inactive'}</div>}</td>
                                <td className="td  text-[#131D26]"><div className='mx-auto px-3 py-0.5 bg-[#235ef4] rounded-[16px] text-white w-[80px] cursor-pointer'>Approve</div></td>

                            </tr>)
                        }
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default PendingUsersTable;
