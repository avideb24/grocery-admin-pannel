'use client';

import PageLoading from '@/components/layout/Loadings/PageLoading/PageLoading';
import PageTitle from '@/components/layout/PageTitle/PageTitle';
import Wrapper from '@/components/layout/Wrapper/Wrapper';
import AddCategory from '@/components/pages/Categories/Category/AddCategory/AddCategory';
import CategoryActionBtns from '@/components/pages/Categories/Category/CategoryActionBtns/CategoryActionBtns';
import Header from '@/components/shared/Header/Header';
import { showAlertWithTheme } from '@/components/theme/Alert/AlertTheme';
import AxiosPublic from '@/libs/Axios/AxiosPublic';
import { getMainCategories } from '@/libs/Categories/getMainCategories';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';


const CategoryPage = () => {

    const [mainCategories, setMainCategories] = useState([]);
    const [mainCategoryId, setMainCategoryId] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosPublic = AxiosPublic();


    // load main category
    useEffect(() => {
        setLoading(true);
        const fetchMainCategories = async () => {
            const res = await getMainCategories();
            setMainCategories(res.data);
            setLoading(false);
        }
        fetchMainCategories();
    }, []);


    // load categories
    useEffect(() => {

        const isDarkMode = localStorage.getItem('theme') == 'dark';

        setLoading(true);

        if (mainCategoryId) {

            const query = { mainCategoryId: mainCategoryId }

            const fetchCategories = async () => {
                const res = await axiosPublic.get('/api/category/mainCategoryId', { params: query });

                if (res.data.success) {
                    setCategories(res.data.data);
                }
                else {
                    showAlertWithTheme({
                        icon: "error",
                        title: "Something Went Wrong!",
                    }, isDarkMode);
                }

                setLoading(false);
            }
            fetchCategories();
        }
        else {
            const fetchCategories = async () => {
                const res = await axiosPublic.get('/api/category/mainCategoryId');
                if (res.data.success) {
                    setCategories(res.data.data);
                }
                else {
                    showAlertWithTheme({
                        icon: "error",
                        title: "Something Went Wrong!",
                    }, isDarkMode);
                }
            }
            fetchCategories();
        }
        setLoading(false);

    }, [mainCategoryId, axiosPublic]);



    return (
        <>
            <PageTitle title={'Category'} />
            <Header title={'Category'} />

            <Wrapper>

                {/* add new */}
                <AddCategory />

                {/* main category select bar */}
                <div className='pt-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4'>
                    <h2 className='text-base md:text-lg font-bold'>Categories: {categories.length}</h2>
                    <div className='flex items-center gap-2'>
                        <h3 className='font-semibold'>Main Category:</h3>
                        <select onChange={(e) => setMainCategoryId(e.target.value)} className='px-4 py-2 bg-primary-bg dark:bg-secondary-bg outline-none rounded-md border border-slate-300 dark:border-slate-500' defaultValue={''} >
                            <option value="">All</option>
                            {
                                mainCategories?.map(mainCategory =>
                                    <option key={mainCategory?.id} value={mainCategory?.id}>{mainCategory?.title}</option>
                                )
                            }
                        </select>
                    </div>
                </div>

                {/* data table or no data message */}
                {
                    loading ?
                        <PageLoading />
                        :
                        <div className='overflow-x-auto py-4'>
                            {loading ? (
                                <div className='text-center py-20'>
                                    <span className="loading loading-bars loading-lg bg-primary-color"></span>
                                </div>
                            ) : categories?.length > 0 ? (
                                <table className='w-full text-center'>
                                    <thead>
                                        <tr>
                                            <th className='p-1 border border-slate-300 dark:border-slate-500'>SL</th>
                                            <th className='p-1 border border-slate-300 dark:border-slate-500'>Name</th>
                                            <th className='p-1 border border-slate-300 dark:border-slate-500'>Icon</th>
                                            <th className='p-1 border border-slate-300 dark:border-slate-500'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            categories?.map((category, idx) =>
                                                <tr key={category?.id}>
                                                    <td className='p-1 border border-slate-300 dark:border-slate-500'>{idx + 1}</td>
                                                    <td className='p-1 border border-slate-300 dark:border-slate-500'>{category?.title}</td>
                                                    <td className='p-1 border border-slate-300 dark:border-slate-500'>
                                                        <Image src={category?.icon} className='w-8 h-8 object-contain mx-auto' width={50} height={50} alt={category?.title} />
                                                    </td>
                                                    <td className='p-1 border border-slate-300 dark:border-slate-500'>
                                                        <CategoryActionBtns category={category} mainCategoryId={mainCategoryId} />
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            ) : (
                                <div className='text-center py-4'>No data found</div>
                            )}
                        </div>
                }

            </Wrapper>
        </>
    );
};

export default CategoryPage;
