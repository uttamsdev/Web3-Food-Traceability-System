'use client'
import React from 'react'
import { QRCodeCanvas } from 'qrcode.react'; // Correct import


const FoodQrModal = ({ setOpen, generatedQRCode, setIsRetailerAdded }) => {
    return (
        <div>
            <div>
                <div className='mb-3'>
                    <div className='flex items-center gap-3 '>
                        <p className='text-xl font-semibold text-[#A1045A] text-center '>Retailer Information Successfully Added.</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#A1045A" fill="none">
                            <path d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.3151 21.9311 10.6462 21.8 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M8 12.5C8 12.5 9.5 12.5 11.5 16C11.5 16 17.0588 6.83333 22 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <p className='text-sm pr-5 text-justify mb-3'>Scan the QR code or visit the attached link below to see all information about the food including the crops, production, distribution and retail information.</p>
                </div>

            </div>
            <div className="flex">
                <div>
                    <h3>Your QR Code:</h3>
                    <QRCodeCanvas value={generatedQRCode} size={200} /> {/* Updated to QRCodeCanvas */}
                    <p>Scan the QR code or visit: <a className='text-[#A1045A]' href={generatedQRCode} target='_blank'>{generatedQRCode}</a></p>
                </div>
            </div>
            <div className='flex justify-end'>
                <button className='bg-[#A1045A] mt-1 text-white px-4 py-1  font-medium text-center rounded' onClick={() => {
                    setIsRetailerAdded(false)
                    setOpen(false)
                }}>Close</button>
            </div>
        </div>
    )
}

export default FoodQrModal