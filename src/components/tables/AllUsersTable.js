"use client"
import { TableArrowDown } from '@/assets/icons';
// import { TableArrowDown, ThreeDotsIcon, UncheckIcon } from '@/lib/icons/icons';
import { Dropdown, Menu, Space } from 'antd';
import React, { useState } from 'react';

const AllUsersTable = () => {
    const [modalContent, setModalContent] = useState(null);
    const [open, setOpen] = useState(false);
    // Function to handle dropdown item click


    const tableData = [
        {
            id: 1,
            invoice_id: "UB9708",
            amount: 5000,
            type: "Commission",
            date_created: "12 March, 2024",
            due_date: "12 March, 2024",
            status: "paid"
        },
        {
            id: 1,
            invoice_id: "UB9708",
            amount: 5000,
            type: "Commission",
            date_created: "12 March, 2024",
            due_date: "12 March, 2024",
            status: "unpaid "
        },
        {
            id: 1,
            invoice_id: "UB9708",
            amount: 5000,
            type: "Commission",
            date_created: "12 March, 2024",
            due_date: "12 March, 2024",
            status: "paid"
        },
        {
            id: 1,
            invoice_id: "UB9708",
            amount: 5000,
            type: "Commission",
            date_created: "12 March, 2024",
            due_date: "12 March, 2024",
            status: "paid"
        },
        {
            id: 1,
            invoice_id: "UB9708",
            amount: 5000,
            type: "Commission",
            date_created: "12 March, 2024",
            due_date: "12 March, 2024",
            status: "paid"
        },
        {
            id: 1,
            invoice_id: "UB9708",
            amount: 5000,
            type: "Commission",
            date_created: "12 March, 2024",
            due_date: "12 March, 2024",
            status: "paid"
        },
        {
            id: 1,
            invoice_id: "UB9708",
            amount: 5000,
            type: "Commission",
            date_created: "12 March, 2024",
            due_date: "12 March, 2024",
            status: "paid"
        },
        {
            id: 1,
            invoice_id: "UB9708",
            amount: 5000,
            type: "Commission",
            date_created: "12 March, 2024",
            due_date: "12 March, 2024",
            status: "paid"
        },
        {
            id: 1,
            invoice_id: "UB9708",
            amount: 5000,
            type: "Commission",
            date_created: "12 March, 2024",
            due_date: "12 March, 2024",
            status: "paid"
        },
        {
            id: 1,
            invoice_id: "UB9708",
            amount: 5000,
            type: "Commission",
            date_created: "12 March, 2024",
            due_date: "12 March, 2024",
            status: "paid"
        },
        {
            id: 1,
            invoice_id: "UB9708",
            amount: 5000,
            type: "Commission",
            date_created: "12 March, 2024",
            due_date: "12 March, 2024",
            status: "paid"
        },
        {
            id: 1,
            invoice_id: "UB9708",
            amount: 5000,
            type: "Commission",
            date_created: "12 March, 2024",
            due_date: "12 March, 2024",
            status: "paid"
        },
    ]


    return (
        <div className='bg-white rounded-[6px]'>
            <div className='mt-4  w-full px-3 pt-3 overflow-x-auto max-h-[600px] overflow-y-auto'>
                <table className="min-w-full ">
                    <thead>
                        <tr className='border-b border-[#EDF2F7] '>
                            <th className="th text-left text-sm"><div className='flex items-center !gap-3'><div><p>Invoice ID</p> <TableArrowDown /></div></div></th>
                            <th className=" th text-left text-sm"><div>Type <TableArrowDown /></div></th>
                            <th className=" th text-left text-sm"><div>Date Created <TableArrowDown /></div></th>
                            <th className=" th text-left text-sm"><div>Due Date <TableArrowDown /></div></th>
                            <th className=" th text-left text-sm"><div>Status <TableArrowDown /></div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tableData?.map(table_data => <tr key={table_data?.id} className='border-b border-[#EDF2F7] last:border-none'>
                                <td className="td"><div className='flex items-center gap-2'>#{table_data?.invoice_id}</div></td>
                                <td className="td text-[#131D26] font-semibold">{table_data?.amount}</td>
                                <td className="td  text-[#131D26]">{table_data?.type}</td>
                                <td className="td text-[#131D26]">{table_data?.date_created}</td>
                                <td className="td text-[]">{table_data?.due_date}</td>
                                <td className="td ">{table_data?.status ? <div className={`${table_data?.status === 'paid' ? 'status status-success' : 'status status-progressing'} max-w-[80px]`}><span className='w-2 h-2'></span> {table_data?.status}</div> : ''}</td>
                               
                            </tr>)
                        }
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default AllUsersTable;
