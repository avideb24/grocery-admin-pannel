'use client';

import PageLoading from '@/components/layout/Loadings/PageLoading/PageLoading';
import PageTitle from '@/components/layout/PageTitle/PageTitle';
import Wrapper from '@/components/layout/Wrapper/Wrapper';
import CustomerActionBtn from '@/components/pages/Customers/CustomerActionBtn/CustomerActionBtn';
import Header from '@/components/shared/Header/Header';
import { showAlertWithTheme } from '@/components/theme/Alert/AlertTheme';
import AxiosPublic from '@/libs/Axios/AxiosPublic';
import React, { useEffect, useState } from 'react';
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";


const CustomersPage = () => {

    const [allCustomers, setAllCustomers] = useState([]);
    const [displayCustomers, setDisplayCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const axiosPublic = AxiosPublic();
    const [searchedNumber, setSearchedNumber] = useState('');


    // load customers
    useEffect(() => {

        setLoading(false);
        const isDarkMode = localStorage.getItem('theme') == 'dark';

        const queryData = {
            page: currentPage,
            limit: 10
        }

        const fetchCustomers = async () => {
            const res = await axiosPublic.get('/api/user/table', { params: queryData });
            if (res.data.success) {
                setAllCustomers(res.data);
                setDisplayCustomers(res.data.data);
                setTotalPages(Math.ceil(res.data.totalRows / 10));
            }
            else {
                showAlertWithTheme({
                    position: "top-end",
                    icon: "error",
                    title: "Something Went Wrong!",
                    showConfirmButton: false,
                    timer: 1500
                }, isDarkMode)
            }
            setLoading(false);

        };

        fetchCustomers()
    }, [axiosPublic, currentPage]);


    // search filter by mobile
    useEffect(() => {
        if (searchedNumber.length > 0) {
            const filteredCustomers = allCustomers.data.filter(customer =>
                customer.mobile.includes(searchedNumber)
            );
            setDisplayCustomers(filteredCustomers);
        } else {
            setDisplayCustomers(allCustomers.data);
        }
    }, [searchedNumber, allCustomers.data]);


    // page change fn
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };


    return (
        <>

            <PageTitle title={'Customers'} />
            <Header title={'Customers'} />

            <Wrapper>

                <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-3 pb-4'>
                    <h2 className='text-sm md:text-lg font-bold'>Total Customers: {allCustomers?.totalRows ? allCustomers?.totalRows : '...'}</h2>
                    {/* search input */}
                    <div className='flex items-center gap-1'>
                        <label htmlFor="mobile" className='font-semibold'>Search Customer:</label>
                        <input onChange={(e) => setSearchedNumber(e.target.value)} type="number" name='mobile' className='bg-transparent px-3 py-1 border border-slate-300 dark:border-slate-500 rounded-md outline-none' placeholder='Type Mobile Number...' />
                    </div>
                </div>

                {/* data table */}
                {
                    loading ?
                        <PageLoading />
                        :
                        <div className='overflow-x-auto'>
                            <table className='w-full text-center'>
                                <thead>
                                    <tr>
                                        <th className='px-1 py-2 border border-slate-300 dark:border-slate-500'>SL</th>
                                        <th className='px-1 py-2 border border-slate-300 dark:border-slate-500'>Name</th>
                                        <th className='px-1 py-2 border border-slate-300 dark:border-slate-500'>Mobile</th>
                                        <th className='px-1 py-2 border border-slate-300 dark:border-slate-500'>E-mail</th>
                                        <th className='px-1 py-2 border border-slate-300 dark:border-slate-500'>Address</th>
                                        {/* <th className='px-1 py-2 border border-slate-300 dark:border-slate-500'>Action</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        displayCustomers?.map((customer, idx) =>
                                            <tr key={idx}>
                                                <td className='px-1 py-2 border border-slate-300 dark:border-slate-500'>{idx + 1}</td>
                                                <td className='p-1 border border-slate-300 dark:border-slate-500'>
                                                    {
                                                        customer?.name ? customer?.name : <span className='text-red-600'>Not Set</span>
                                                    }
                                                </td>
                                                <td className='px-1 py-2 border border-slate-300 dark:border-slate-500'>
                                                    {
                                                        customer?.mobile ? customer?.mobile : <span className='text-red-600'>Not Set</span>
                                                    }
                                                </td>
                                                <td className='px-1 py-2 border border-slate-300 dark:border-slate-500'>
                                                    {
                                                        customer?.email ? customer?.email : <span className='text-red-600'>Not Set</span>
                                                    }
                                                </td>
                                                <td className='px-1 py-2 border border-slate-300 dark:border-slate-500'>
                                                    {
                                                        customer?.addressLine && customer?.city ? `${customer?.addressLine}, ${customer?.remarks ? `${customer?.remarks},` : ''} ${customer?.city}`
                                                            : <span className='text-red-600'>Not Set</span>
                                                    }
                                                </td>
                                                {/* <td className='px-1 py-2 border border-slate-300 dark:border-slate-500'>
                                                    <CustomerActionBtn customer={customer} />
                                                </td> */}
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>

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
                        </div>
                }

            </Wrapper>

        </>
    );
};

export default CustomersPage;