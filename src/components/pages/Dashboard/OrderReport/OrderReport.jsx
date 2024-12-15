'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import allIcon from "@/assets/Dashboard/Orders/allOrder.png";
import pendingIcon from "@/assets/Dashboard/Orders/pending.png";
import acceptedIcon from "@/assets/Dashboard/Orders/accepted.png";
import declinedIcon from "@/assets/Dashboard/Orders/declined.png";
import processingIcon from "@/assets/Dashboard/Orders/processing.png";
import outOfDeliveryIcon from "@/assets/Dashboard/Orders/outOfDelivery.png";
import deliveredIcon from "@/assets/Dashboard/Orders/delivered.png";
import canceledIcon from "@/assets/Dashboard/Orders/canceled.png";
import { getOrderReport } from '@/libs/Dashboard/getOrderReport';
import SectionLoading from '@/components/layout/Loadings/SectionLoading/SectionLoading';
import { showAlertWithTheme } from '@/components/theme/Alert/AlertTheme';


const OrderReport = () => {

    const [orderData, setOrderData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [loading, setLoading] = useState(false);


    // load order data
    useEffect(() => {

        setLoading(true);
        const isDarkMode = localStorage.getItem('theme') == 'dark';

        const fetchData = async () => {
            const data = await getOrderReport();
            if (data) {
                setOrderData(data);
            }
            else {
                showAlertWithTheme({
                    icon: "error",
                    title: "Something Went Wrong!",
                }, isDarkMode)
            }
            setLoading(false);
        };

        fetchData();

    }, []);


    // search by date fn
    const handleSearchOrderData = async (e) => {

        e.preventDefault();
        setLoading(true);
        const isDarkMode = localStorage.getItem('theme') == 'dark';

        const startDateValue = e.target.startDate.value;
        const endDateValue = e.target.endDate.value;

        const startDate = new Date(startDateValue).toISOString();
        const endDate = new Date(endDateValue).toISOString();

        const query = {
            startTime: startDate,
            endTime: endDate
        };

        const data = await getOrderReport(query);

        if (data) {
            setOrderData(data);
        }
        else {
            showAlertWithTheme({
                icon: "error",
                title: "Something Went Wrong!",
            }, isDarkMode)
        }


        setLoading(false);

    };


    return (
        <>
            <div>

                <div className='flex flex-col items-center gap-2 pb-3'>
                    <h2 className='text-lg md:text-xl font-bold pt-2'>Order Report</h2>

                    {/* date time limit form */}
                    <form onSubmit={handleSearchOrderData} className='flex flex-col sm:flex-row items-center gap-2'>
                        <div>
                            <label htmlFor="startDate" className='font-semibold mr-2'>From</label>
                            <input onChange={(e) => setStartDate(e.target.value)} type="datetime-local" name="startDate" className='bg-transparent border border-slate-300 dark:border-slate-500 p-1 rounded-md outline-none' id="startDate" required />
                        </div>
                        <div>
                            <label htmlFor="endDate" className='font-semibold ml-5 mr-2'>To</label>
                            <input type="datetime-local" name="endDate" className='bg-transparent border border-slate-300 dark:border-slate-500 p-1 rounded-md outline-none' id="endDate" min={startDate} disabled={!startDate} required />
                        </div>
                        <input type="submit" value="Search" className='bg-primary-color px-3 py-1 rounded-md text-secondary-text font-semibold cursor-pointer' />
                    </form>
                </div>


                {
                    loading ?
                        <SectionLoading />
                        :
                        <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 py-3'>

                            {/* all */}
                            <div className='flex flex-col items-center capitalize font-bold border border-slate-200 dark:border-slate-600 shadow-md p-3'>
                                <div className='flex items-center gap-2 pb-2'>
                                    <Image src={allIcon} className='w-5 h-5 object-contain' width={30} height={30} alt='pending order' />
                                    <h3>All</h3>
                                </div>
                                <p>Total Orders: {orderData?.all?.numberOfOrder}</p>
                                <p>Total Amount: ৳{orderData?.all?.totalAmount}</p>
                            </div>

                            {/* pending */}
                            <div className='flex flex-col items-center capitalize font-bold border border-slate-200 dark:border-slate-600 shadow-md p-3'>
                                <div className='flex items-center gap-2 pb-2'>
                                    <Image src={pendingIcon} className='w-5 h-5 object-contain' width={30} height={30} alt='pending order' />
                                    <h3>Pending</h3>
                                </div>
                                <p>Orders: {orderData?.pending?.numberOfOrder}</p>
                                <p>Amount: ৳{orderData?.pending?.totalAmount}</p>
                            </div>

                            {/* accepted */}
                            <div className='flex flex-col items-center capitalize font-bold border border-slate-200 dark:border-slate-600 shadow-md p-3'>
                                <div className='flex items-center gap-2 pb-2'>
                                    <Image src={acceptedIcon} className='w-5 h-5 object-contain' width={30} height={30} alt='pending order' />
                                    <h3>Accepted</h3>
                                </div>
                                <p>Orders: {orderData?.accepted?.numberOfOrder}</p>
                                <p>Amount: ৳{orderData?.accepted?.totalAmount}</p>
                            </div>

                            {/* declined */}
                            <div className='flex flex-col items-center capitalize font-bold border border-slate-200 dark:border-slate-600 shadow-md p-3'>
                                <div className='flex items-center gap-2 pb-2'>
                                    <Image src={declinedIcon} className='w-5 h-5 object-contain' width={30} height={30} alt='pending order' />
                                    <h3>Declined</h3>
                                </div>
                                <p>Orders: {orderData?.declined?.numberOfOrder}</p>
                                <p>Amount: ৳{orderData?.declined?.totalAmount}</p>
                            </div>

                            {/* processing */}
                            <div className='flex flex-col items-center capitalize font-bold border border-slate-200 dark:border-slate-600 shadow-md p-3'>
                                <div className='flex items-center gap-2 pb-2'>
                                    <Image src={processingIcon} className='w-5 h-5 object-contain' width={30} height={30} alt='pending order' />
                                    <h3>Proccessing</h3>
                                </div>
                                <p>Orders: {orderData?.processing?.numberOfOrder}</p>
                                <p>Amount: ৳{orderData?.processing?.totalAmount}</p>
                            </div>

                            {/* out of delivery */}
                            <div className='flex flex-col items-center capitalize font-bold border border-slate-200 dark:border-slate-600 shadow-md p-3'>
                                <div className='flex items-center gap-2 pb-2'>
                                    <Image src={outOfDeliveryIcon} className='w-5 h-5 object-contain' width={30} height={30} alt='pending order' />
                                    <h3>Out Of Delivery</h3>
                                </div>
                                <p>Orders: {orderData?.outOfDelivery?.numberOfOrder}</p>
                                <p>Amount: ৳{orderData?.outOfDelivery?.totalAmount}</p>
                            </div>

                            {/* delivered */}
                            <div className='flex flex-col items-center capitalize font-bold border border-slate-200 dark:border-slate-600 shadow-md p-3'>
                                <div className='flex items-center gap-2 pb-2'>
                                    <Image src={deliveredIcon} className='w-5 h-5 object-contain' width={30} height={30} alt='pending order' />
                                    <h3>Delivered</h3>
                                </div>
                                <p>Orders: {orderData?.delivered?.numberOfOrder}</p>
                                <p>Amount: ৳{orderData?.delivered?.totalAmount}</p>
                            </div>

                            {/* canceled */}
                            <div className='flex flex-col items-center capitalize font-bold border border-slate-200 dark:border-slate-600 shadow-md p-3'>
                                <div className='flex items-center gap-2 pb-2'>
                                    <Image src={canceledIcon} className='w-5 h-5 object-contain' width={30} height={30} alt='pending order' />
                                    <h3>Canceled</h3>
                                </div>
                                <p>Orders: {orderData?.canceled?.numberOfOrder}</p>
                                <p>Amount: ৳{orderData?.canceled?.totalAmount}</p>
                            </div>


                        </div>
                }

            </div>
        </>
    );
};

export default OrderReport;