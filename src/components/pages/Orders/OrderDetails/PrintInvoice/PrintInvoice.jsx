'use client';

import Button from '@/components/shared/Buttons/Button/Button';
import React, { useRef } from 'react';
import { MdLocalPrintshop } from "react-icons/md";
import { useReactToPrint } from 'react-to-print';


const PrintInvoice = ({ orderDetails }) => {

    const printedContentRef = useRef();


    // formate date and time
    const getLocalDateTime = isoDate => {

        const date = new Date(isoDate);

        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };

        const formattedDateTime = date.toLocaleString('en-GB', options);

        return formattedDateTime;

    };

    // print invoice fn
    const handlePrintInvoice = useReactToPrint({
        content: () => printedContentRef.current
    });

    return (
        <div>
            <Button handleClick={handlePrintInvoice} btnText={'Print Invoice'} icon={MdLocalPrintshop} />

            {/* printed content */}
            <div ref={printedContentRef} className='hidden print:block'>
                <div className='text-center p-5'>

                    {/* company details */}
                    <div>
                        <h1 className='text-lg font-bold'>Grocery Mart</h1>
                        <p className='flex justify-center gap-5'>
                            <span>E-mail: grocerymart@gmail.com</span>
                            <span>Mobile: +880172365247</span>
                        </p>
                        <p>House No.1, Mazar Road, Mirpur-1, Dhaka</p>
                        <p className='w-1/2 mx-auto h-[1px] bg-slate-500 mt-2 mb-5'></p>
                    </div>

                    {/* user info */}
                    <h2 className='font-bold'>Customer Information:</h2>
                    <div className='flex justify-center items-center gap-3 pb-3'>
                        <p>Name: {orderDetails?.user?.name}</p>
                        <p>Mobile: {orderDetails?.user?.mobile}</p>
                    </div>

                    {/* order details */}
                    <div>

                        <h2 className='text-base font-bold'>Order ID: {orderDetails?.id}</h2>
                        <p><span className='font-semibold'>Address:</span> {orderDetails?.deliveryAddress}</p>

                        <div className='max-w-96 mx-auto py-3'>
                        <h2 className='font-bold pb-2'>Summary:</h2>
                            {/* placed date */}
                            <div className='flex justify-between items-center gap-3'>
                                <p>Placed Date</p>
                                <p>{getLocalDateTime(orderDetails?.createdAt)}</p>
                            </div>
                            {/* delivery date */}
                            <div className='flex justify-between items-center gap-3'>
                                <p>Delivery Date</p>
                                <p>{getLocalDateTime(orderDetails?.deliveryDate)}</p>
                            </div>
                            {/* payment method */}
                            <div className='flex justify-between items-center gap-3'>
                                <p>Payment Method</p>
                                <p className='uppercase'>{orderDetails?.paymentMethod}</p>
                            </div>
                            {/* payment status */}
                            <div className='flex justify-between items-center gap-3'>
                                <p>Payment Status</p>
                                <p>{orderDetails?.paymentStatus}</p>
                            </div>
                            {/* total quantity */}
                            <div className='flex justify-between items-center gap-3'>
                                <p>Total Quantity</p>
                                <p>{orderDetails?.orderItems?.length}</p>
                            </div>
                            {/* total amount */}
                            <div className='flex justify-between items-center gap-3 text-base font-bold'>
                                <p>Total</p>
                                <p>৳{orderDetails?.totalAmount}</p>
                            </div>
                        </div>

                        <div>
                            <p>**************************</p>
                            <p>Thank You!</p>
                            <p>**************************</p>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default PrintInvoice;
