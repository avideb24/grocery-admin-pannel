'use client';

import PageLoading from '@/components/layout/Loadings/PageLoading/PageLoading';
import NoDataFound from '@/components/layout/NoDataFound/NoDataFound';
import PageTitle from '@/components/layout/PageTitle/PageTitle';
import Wrapper from '@/components/layout/Wrapper/Wrapper';
import DeliveryManTableActionBtns from '@/components/pages/DeliveryMan/DeliveryManTableActionBtns/DeliveryManTableActionBtns';
import Header from '@/components/shared/Header/Header';
import { getAllDeliveryMan } from '@/libs/DeliveryMan/getAllDeliveryMan';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from 'react-icons/bs';

const DeliveryManList = () => {

    const [deliveryManData, setDeliveryManData] = useState([]);
    const [displayDeliveryMan, setDisplayDeliveryMan] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchedName, setSearchedName] = useState('');
    const [loading, setLoading] = useState(false);

    // load deliveryman data
    useEffect(() => {

        setLoading(true);

        const query = {
            page: currentPage,
            limit: 10
        };

        const fetchDeliveryMan = async () => {
            const res = await getAllDeliveryMan(query);
            setDisplayDeliveryMan(res?.data);
            setDeliveryManData(res);
            setTotalPages(Math.ceil(res.totalRows / 10));
            setLoading(false);
        };

        fetchDeliveryMan();
    }, [currentPage]);


    // search by name
    useEffect(() => {
        if (searchedName) {
            const searchedData = deliveryManData?.data?.filter(item =>
                item?.name?.toLowerCase().includes(searchedName.toLowerCase())
            );
            setDisplayDeliveryMan(searchedData);
        }
        else {
            setDisplayDeliveryMan(deliveryManData?.data || []);
        }
    }, [searchedName, deliveryManData]);


    // page change fn
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };


    return (
        <>
            <PageTitle title={'Delivery Man List'} />
            <Header title={'Delivery Man List'} />

            {
                loading ?
                    <PageLoading />
                    :
                    <Wrapper>

                        <div className='flex justify-between items-center gap-3 pt-2'>
                            <h2 className='text-sm md:text-base font-bold'>Total: {deliveryManData?.totalRows}</h2>
                            {/* search */}
                            <div>
                                <label htmlFor="search" className='font-semibold mr-2'>Search By Name:</label>
                                <input type="text" onChange={(e) => setSearchedName(e.target.value)} className='bg-transparent border border-slate-300 dark:border-slate-500 px-3 py-1 rounded-md outline-none' id='search' placeholder='Type Name...' />
                            </div>
                        </div>

                        {/* data table */}
                        {
                            displayDeliveryMan?.length == 0 ?
                                <NoDataFound />
                                :
                                <div className='overflow-x-auto py-4'>
                                    <table className='w-full text-center'>
                                        <thead>
                                            <tr>
                                                <th className='p-2 border border-slate-300 dark:border-slate-500'>SL</th>
                                                <th className='p-2 border border-slate-300 dark:border-slate-500'>Image</th>
                                                <th className='p-2 border border-slate-300 dark:border-slate-500'>Name</th>
                                                <th className='p-2 border border-slate-300 dark:border-slate-500'>Contact</th>
                                                <th className='p-2 border border-slate-300 dark:border-slate-500'>Zone</th>
                                                <th className='p-2 border border-slate-300 dark:border-slate-500'>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                displayDeliveryMan?.map((deliveryMan, idx) =>
                                                    <tr key={idx}>
                                                        <td className='p-2 border border-slate-300 dark:border-slate-500'>
                                                            {idx + 1}
                                                        </td>
                                                        <td className='p-2 border border-slate-300 dark:border-slate-500'>
                                                            <Image src={deliveryMan?.deliveryManImage} className='w-16 h-16 object-contain mx-auto' width={100} height={100} alt={deliveryMan?.name} />
                                                        </td>
                                                        <td className='p-2 border border-slate-300 dark:border-slate-500'>
                                                            {deliveryMan?.name}
                                                        </td>
                                                        <td className='p-2 border border-slate-300 dark:border-slate-500'>
                                                            <p>{deliveryMan?.mobile}</p>
                                                            <p>{deliveryMan?.email}</p>
                                                        </td>
                                                        <td className='p-2 border border-slate-300 dark:border-slate-500'>
                                                            {deliveryMan?.zone}
                                                        </td>
                                                        <td className='p-2 border border-slate-300 dark:border-slate-500'>
                                                            <DeliveryManTableActionBtns deliveryManData={deliveryMan} />
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                        }

                        {/* pagination btns */}
                        {
                            totalPages > 1 &&
                            <div className="flex justify-end items-center gap-2 pt-4 pb-10">
                                <button onClick={() => handlePageChange(currentPage - 1)} className="text-blue-500 text-lg md:text-2xl" disabled={currentPage == 1} >
                                    <BsArrowLeftSquareFill />
                                </button>
                                {[...Array(totalPages)].map((_, index) => (
                                    <button key={index} onClick={() => handlePageChange(index + 1)} className={`px-3 py-1 mx-1 border rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : ''}`} >
                                        {index + 1}
                                    </button>
                                ))}
                                <button onClick={() => handlePageChange(currentPage + 1)} className="text-blue-500 text-lg md:text-2xl" disabled={currentPage === totalPages} >
                                    <BsArrowRightSquareFill />
                                </button>
                            </div>
                        }

                    </Wrapper>
            }

        </>
    );
};

export default DeliveryManList;