'use client';

import PageLoading from '@/components/layout/Loadings/PageLoading/PageLoading';
import NoDataFound from '@/components/layout/NoDataFound/NoDataFound';
import PageTitle from '@/components/layout/PageTitle/PageTitle';
import Wrapper from '@/components/layout/Wrapper/Wrapper';
import AddSubCategory from '@/components/pages/Categories/SubCategory/AddSubCategory/AddSubCategory';
import SubCategoryActionBtns from '@/components/pages/Categories/SubCategory/SubCategoryActionBtns/SubCategoryActionBtns';
import Header from '@/components/shared/Header/Header';
import { showAlertWithTheme } from '@/components/theme/Alert/AlertTheme';
import AxiosPublic from '@/libs/Axios/AxiosPublic';
import { getMainCategories } from '@/libs/Categories/getMainCategories';
import { getSubCategories } from '@/libs/Categories/getSubCategories';
import { getCategories } from '@/libs/Categories/getSubCategory';
import React, { useState, useEffect } from 'react';

const SubCategoryPage = () => {
    const [mainCategories, setMainCategories] = useState([]);
    const [mainCategoryId, setMainCategoryId] = useState(null);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState(null);
    const [subCategories, setSubCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosPublic = AxiosPublic();


    // load main category
    useEffect(() => {

        setLoading(true);

        const fetchMainCategories = async () => {
            const res = await getMainCategories();
            setMainCategories(res.data);
            setLoading(false);
        };

        fetchMainCategories();

    }, []);

    // load categories
    useEffect(() => {

        if (mainCategoryId) {
            setLoading(true);

            const fetchCategories = async () => {
                const res = await getCategories(mainCategoryId);
                setCategories(res.data);
                setLoading(false);
            };

            fetchCategories();
        }

    }, [mainCategoryId])


    // Load sub-categories when mainCategoryId or categoryId changes
    useEffect(() => {

        const isDarkMode = localStorage.getItem('theme') == 'dark';
        setLoading(true);

        // if category changes
        if (categoryId) {

            const query = { categoryId: categoryId };

            const fetchSubCategories = async () => {
                const res = await axiosPublic.get('/api/subCategory/mainAndCategoryId', { params: query });

                if (res.data.success) {
                    setSubCategories(res.data.data);
                }
                else {
                    showAlertWithTheme({
                        icon: "error",
                        title: "Something Went Wrong!",
                    }, isDarkMode);
                }
                setLoading(false);
            }
            fetchSubCategories();
        }

        // if mainCategory changes
        else if (mainCategoryId) {

            setCategoryId(null);

            const query = { mainCategoryId: mainCategoryId };

            const fetchSubCategories = async () => {
                const res = await axiosPublic.get('/api/subCategory/mainAndCategoryId', { params: query });

                if (res.data.success) {
                    setSubCategories(res.data.data);
                }
                else {
                    showAlertWithTheme({
                        icon: "error",
                        title: "Something Went Wrong!",
                    }, isDarkMode);
                }
                setLoading(false);
            }
            fetchSubCategories();
        }

        // all sub-categories
        else {
            const fetchAllSubCategories = async () => {
                const res = await axiosPublic.get('/api/subCategory/mainAndCategoryId');

                if (res.data.success) {
                    setSubCategories(res.data.data);
                }
                else {
                    showAlertWithTheme({
                        icon: "error",
                        title: "Something Went Wrong!",
                    }, isDarkMode);
                }
                setLoading(false);
            }
            fetchAllSubCategories();
        };

    }, [mainCategoryId, categoryId, axiosPublic]);



    return (
        <>
            <PageTitle title={'Sub Category'} />
            <Header title={'Sub-Category'} />

            <Wrapper>

                {/* Add new subcategory */}
                <AddSubCategory />

                {/* Top section */}
                <div className='pt-4 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4'>
                    <h2 className='text-base md:text-lg font-bold'>Sub-Categories: {subCategories?.length}</h2>

                    <div className='flex flex-col sm:flex-row items-center gap-3'>
                        {/* Main category select */}
                        <div className='flex items-center gap-2'>
                            <h3 className='font-semibold'>Main Category:</h3>
                            <select onChange={(e) => { setCategoryId(null), setMainCategoryId(e.target.value) }} className='px-4 py-2 bg-primary-bg dark:bg-secondary-bg outline-none rounded-md border border-slate-300 dark:border-slate-500'>
                                <option value="">All</option>
                                {mainCategories?.map(mainCategory =>
                                    <option key={mainCategory?.id} value={mainCategory?.id}>{mainCategory?.title}</option>
                                )}
                            </select>
                        </div>
                        {/* Category select */}
                        <div className='flex items-center gap-2'>
                            <h3 className='font-semibold'>Category:</h3>
                            <select onChange={(e) => { setMainCategoryId(null), setCategoryId(e.target.value) }} className='px-4 py-2 bg-primary-bg dark:bg-secondary-bg outline-none rounded-md border border-slate-300 dark:border-slate-500'>
                                <option value="">All</option>
                                {categories?.map(category =>
                                    <option key={category?.id} value={category?.id}>{category?.title}</option>
                                )}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Data table or no data message */}
                {
                    loading ?
                        <PageLoading />
                        :
                        <div className='overflow-x-auto py-4'>
                            {
                                loading ? (
                                    <div className='text-center py-20'>
                                        <span className="loading loading-bars loading-lg bg-primary-color"></span>
                                    </div>
                                ) : subCategories?.length > 0 ? (
                                    <table className='w-full text-center'>
                                        <thead>
                                            <tr>
                                                <th className='p-1 border border-slate-300 dark:border-slate-500'>SL</th>
                                                <th className='p-1 border border-slate-300 dark:border-slate-500'>Name</th>
                                                <th className='p-1 border border-slate-300 dark:border-slate-500'>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {subCategories?.map((subCategory, idx) =>
                                                <tr key={subCategory?.id}>
                                                    <td className='p-1 border border-slate-300 dark:border-slate-500'>{idx + 1}</td>
                                                    <td className='p-1 border border-slate-300 dark:border-slate-500'>{subCategory?.title}</td>
                                                    <td className='p-1 border border-slate-300 dark:border-slate-500'>
                                                        <SubCategoryActionBtns subCategory={subCategory} />
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                ) : (
                                    <NoDataFound />
                                )
                            }
                        </div>
                }

            </Wrapper>
        </>
    );
};

export default SubCategoryPage;
