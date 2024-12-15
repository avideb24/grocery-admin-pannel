import PageTitle from '@/components/layout/PageTitle/PageTitle';
import Wrapper from '@/components/layout/Wrapper/Wrapper';
import DeliveryMan from '@/components/pages/Orders/OrderDetails/DeliveryMan/DeliveryMan';
import PrintInvoice from '@/components/pages/Orders/OrderDetails/PrintInvoice/PrintInvoice';
import Header from '@/components/shared/Header/Header';
import { getSingleOrder } from '@/libs/Orders/getSingleOrder';
import Image from 'next/image';
import React from 'react';
import { FaUserAlt, FaThList } from "react-icons/fa";


const OrderDetailsPage = async ({ params }) => {

    const { orderId } = params;

    const orderDetails = await getSingleOrder(orderId);

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


    return (
        <>
            <PageTitle title={'Order Details'} />
            <Header title={'Order Details'} />

            <Wrapper>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>

                    {/* left section */}
                    <div className='lg:col-span-2'>

                        {/* order details */}
                        <div className='border border-slate-200 dark:border-slate-600 shadow-lg rounded-md flex flex-col items-center gap-2 p-3'>

                            {/* order id */}
                            <h2 className='text-base md:text-xl font-bold'>Order ID: #{orderDetails?.id}</h2>

                            {/* ------- invoice print ------- */}
                            <PrintInvoice orderDetails={orderDetails} />


                            {/* details */}
                            <div className='flex gap-2'>

                                <div className='text-right space-y-1'>
                                    <p><span className='font-semibold'>Placed:</span> {getLocalDateTime(orderDetails?.createdAt)}</p>
                                    <p><span className='font-semibold'>Delivery:</span> {getLocalDateTime(orderDetails?.deliveryDate)}</p>
                                    <p><span className='font-semibold'>Order Status: </span>
                                        <span className='border rounded-md px-1 border-primary-text dark:text-secondary-text'>{orderDetails?.orderStatus}</span></p>

                                </div>
                                <p className='w-[2px] h-20 bg-slate-500 mx-3'></p>
                                <div className='space-y-1'>
                                    <p><span className='font-semibold'>Payment Method:</span> <span className='uppercase'>{orderDetails?.paymentMethod}</span></p>
                                    <p><span className='font-semibold'>Payment Status:</span> {orderDetails?.paymentStatus}</p>
                                    <p><span className='font-semibold'>Transaction ID:</span> {orderDetails?.transactionId ? orderDetails?.transactionId : 'Not Paid'}</p>
                                </div>

                            </div>

                            {/* total amount */}
                            <div className='text-base font-bold'>Total: ৳{orderDetails?.totalAmount}</div>


                        </div>

                        {/* order items */}
                        <div className='p-3 border border-slate-200 dark:border-slate-600 shadow-lg rounded-md mt-5'>
                            <h2 className='text-sm md:text-base font-bold flex items-center gap-1 pb-2'>
                                <FaThList /> Order Items - {orderDetails?.orderItems?.length}
                            </h2>
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                                {
                                    orderDetails?.orderItems?.map(item =>
                                        <div key={item?.id} className='p-2 border border-slate-200 dark:border-slate-600 shadow-md rounded-md flex gap-3'>
                                            <Image src={item?.product?.thumbnailImage} className='w-10 h-10 object-cover rounded-md' width={50} height={50} alt={item?.product?.title} />
                                            <div className='flex-1 flex justify-between gap-2'>
                                                <div>
                                                    <h3 className='font-semibold'>{item?.product?.title}</h3>
                                                    <p className='text-xs'>
                                                        <span>৳{item?.product?.discountPrice}</span>
                                                        <span className='px-2'>-</span>
                                                        <span>Qty:{item?.quantity}</span>
                                                    </p>
                                                </div>
                                                <p className='text-xs'>
                                                    <span>Sub-Total:</span>
                                                    ৳{item?.price}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                    </div>


                    {/* right section */}
                    <div>

                        {/* customer info */}
                        <div className='p-3 border border-slate-200 dark:border-slate-600 shadow-lg rounded-md'>
                            <h2 className='text-sm md:text-base font-bold pb-2 flex items-center gap-1'>
                                <FaUserAlt /> Customer Info
                            </h2>
                            <p><span className='font-semibold'>Name:</span> {orderDetails?.user?.name}</p>
                            <p><span className='font-semibold'>Mobile:</span> {orderDetails?.user?.mobile}</p>
                            <p><span className='font-semibold'>Address:</span> {orderDetails.deliveryAddress}</p>
                        </div>

                        {/* delivery man */}
                        <DeliveryMan orderDetails={orderDetails} />

                    </div>

                </div>

            </Wrapper>

        </>
    );
};

export default OrderDetailsPage;