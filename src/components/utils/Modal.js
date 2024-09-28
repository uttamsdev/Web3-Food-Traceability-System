"use client"
import { Modal } from 'antd'
import { Urbanist } from 'next/font/google';
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge';
const urbanist = Urbanist({ subsets: ["latin"] });

const CustomModal = ({ closable = true, open, setOpen, modalContent, modalTitle, modalClass }) => {

    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <Modal
            title={false}
            footer={false}
            closable={closable}

            open={open}
            // onOk={handleOk}
            // confirmLoading={confirmLoading}
            onCancel={handleCancel}


        >
            <div className={twMerge(`${urbanist.className} md:!max-w-[600px] !w-full max-h-[450px] md:max-h-[500px] overflow-y-auto`, modalClass)}>{modalContent ? modalContent : <p>Please set modal content</p>}</div>
        </Modal>
    )
}

export default CustomModal