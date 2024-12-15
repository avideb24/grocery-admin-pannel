'use client';

import PageLoading from '@/components/layout/Loadings/PageLoading/PageLoading';
import PageTitle from '@/components/layout/PageTitle/PageTitle';
import Wrapper from '@/components/layout/Wrapper/Wrapper';
import ProductTable from '@/components/pages/Products/List/ProductTable/ProductTable';
import Header from '@/components/shared/Header/Header';
import AxiosPublic from '@/libs/Axios/AxiosPublic';
import { getMainCategories } from '@/libs/Categories/getMainCategories';
import { getSubCategories } from '@/libs/Categories/getSubCategories';
import { getCategories } from '@/libs/Categories/getSubCategory';
import React, { useEffect, useState } from 'react';
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";


const ProductsList = () => {

    const [mainCategories, setMainCategories] = useState([]);
    const [mainCategoryId, setMainCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [subCategories, setSubCategories] = useState([]);
    const [subCategoryId, setSubCategoryId] = useState('');
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const axiosPublic = AxiosPublic();


    // load main categories
    useEffect(() => {
        setLoading(true);
        const fetchMainCategories = async () => {
            const res = await getMainCategories();
            setMainCategories(res.data);
        }
        fetchMainCategories();
        setLoading(false);
    }, [])

    // load categories by mainCategoryId
    useEffect(() => {
        setLoading(true);
        if (!mainCategoryId) return;
        else {
            const fetchCategories = async () => {
                const res = await getCategories(mainCategoryId);
                setCategories(res.data);
            }
            fetchCategories();
        }
        setLoading(false);
    }, [mainCategoryId])

    // load sub categories by categoryId
    useEffect(() => {
        setLoading(true);
        if (!mainCategoryId || !categoryId) return;
        else {
            const fetchCategories = async () => {
                const res = await getSubCategories(categoryId);
                setSubCategories(res.subCategories);
            }
            fetchCategories();
        }
        setLoading(false);
    }, [mainCategoryId, categoryId]);


    // call api using query to load products
    useEffect(() => {

        setLoading(true);

        const queryData = {
            mainCategoryId: mainCategoryId,
            categoryId: categoryId,
            subCategoryId: subCategoryId,
            page: currentPage,
            limit: 10
        };

        const fetchProducts = async () => {
            const res = await axiosPublic.get(`/api/product/table`, { params: queryData });
            if (res.data.success) {
                setProducts(res.data);
                setTotalPages(Math.ceil(res.data.totalRows / 10));
            }
            setLoading(false);
        };

        fetchProducts();

    }, [mainCategoryId, categoryId, subCategoryId, axiosPublic, currentPage])


    // page change fn
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };


    return (
        <>

            <PageTitle title={'Product List'} />
            <Header title={'Product List'} />

            <Wrapper>

                <h2 className='text-base md:text-lg font-bold pb-3'>Products: {products?.totalRows ? products?.totalRows : '...'}</h2>

                {/* filter */}
                <div className='flex items-center gap-3'>
                    {/* main category */}
                    <div className='flex items-center gap-2'>
                        <h3 className='font-semibold'>Main Category</h3>
                        <select onChange={(e) => setMainCategoryId(e.target.value)} name="mainCategory" className='px-3 py-1 bg-primary-bg dark:bg-secondary-bg border border-slate-300 dark:border-slate-500 rounded-md outline-none' defaultValue={''} required>
                            <option value="">All</option>
                            {
                                mainCategories?.map(mainCategory =>
                                    <option key={mainCategory?.id} value={mainCategory?.id}>{mainCategory?.title}</option>
                                )
                            }
                        </select>
                    </div>
                    {/* category */}
                    <div className='flex items-center gap-2'>
                        <h3 className='font-semibold'>Category:</h3>
                        <select onChange={(e) => setCategoryId(e.target.value)} name="category" className='px-3 py-1 bg-primary-bg dark:bg-secondary-bg border border-slate-300 dark:border-slate-500 rounded-md outline-none' defaultValue={''} required>
                            <option value="">All</option>
                            {
                                categories?.map(category =>
                                    <option key={category?.id} value={category?.id}>{category?.title}</option>
                                )
                            }
                        </select>
                    </div>
                    {/* sub category */}
                    <div className='flex items-center gap-2'>
                        <h3 className='font-semibold'>Sub Category:</h3>
                        <select onChange={(e) => setSubCategoryId(e.target.value)} name="subCategory" className='px-3 py-1 bg-primary-bg dark:bg-secondary-bg border border-slate-300 dark:border-slate-500 rounded-md outline-none' defaultValue={''} required>
                            <option value="">All</option>
                            {
                                subCategories?.map(subCategory =>
                                    <option key={subCategory?.id} value={subCategory?.id}>{subCategory?.title}</option>
                                )
                            }
                        </select>
                    </div>
                </div>


                {
                    loading ?
                        <PageLoading />
                        :
                        <>
                            <ProductTable products={products?.data} />

                            {/* Pagination btns */}
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

                        </>
                }

            </Wrapper>

        </>
    );
};

export default ProductsList;