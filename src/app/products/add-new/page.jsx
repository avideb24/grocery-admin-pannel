'use client';

import PageTitle from '@/components/layout/PageTitle/PageTitle';
import Wrapper from '@/components/layout/Wrapper/Wrapper';
import Header from '@/components/shared/Header/Header';
import { showAlertWithTheme } from '@/components/theme/Alert/AlertTheme';
import AxiosPublic from '@/libs/Axios/AxiosPublic';
import { getMainCategories } from '@/libs/Categories/getMainCategories';
import { getCategories } from '@/libs/Categories/getSubCategory';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const AddNewProduct = () => {
    const [mainCategories, setMainCategories] = useState([]);
    const [mainCategoryId, setMainCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [subCategories, setSubCategories] = useState([]);
    const [subCategoryId, setSubCategoryId] = useState('');
    const [loading, setLoading] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [productTitle, setProductTitle] = useState('');
    const [titleError, setTitleError] = useState(false);
    const axiosPublic = AxiosPublic();
    const router = useRouter();


    // States to store images
    const [thumbnailImage, setThumbnailImage] = useState(null);
    const [optionalImages, setOptionalImages] = useState([null, null, null]);

    // Load main categories on mount
    useEffect(() => {
        const fetchMainCategories = async () => {
            setLoading(true);
            const res = await getMainCategories();
            if (res.data && res.data.length > 0) {
                setMainCategories(res.data);
            }
            setLoading(false);
        };
        fetchMainCategories();
    }, []);

    // Load categories when mainCategoryId changes
    useEffect(() => {
        if (!mainCategoryId) {
            setCategories([]); // Clear categories if no main category selected
            setCategoryId('');
            setSubCategories([]);
            return;
        }

        const fetchCategories = async () => {
            const res = await getCategories(mainCategoryId);
            if (res.data && res.data.length > 0) {
                setCategories(res.data);
            } else {
                setCategories([]);
                setSubCategories([]);
            }
        };
        fetchCategories();
    }, [mainCategoryId]);

    // Load subcategories when categoryId changes
    useEffect(() => {
        if (!categoryId) {
            setSubCategories([]); // Clear subcategories if no category selected
            return;
        }

        const selectedCategory = categories.find((category) => category.id === categoryId);
        if (selectedCategory && selectedCategory.subCategories) {
            setSubCategories(selectedCategory.subCategories);
        } else {
            setSubCategories([]);
        }
    }, [categoryId, categories]);

    // Handle main category change
    const handleMainCategoryChange = (e) => {
        setMainCategoryId(e.target.value);
        setCategoryId('');
        setSubCategories([]);
    };

    // Handle category change
    const handleCategoryChange = (e) => {
        setCategoryId(e.target.value);
    };

    // Handle thumbnail image change
    const handleThumbnailChange = (e) => {
        setThumbnailImage(e.target.files[0]);
    };

    // Handle optional image changes
    const handleOptionalImageChange = (index, e) => {
        const files = [...optionalImages];
        files[index] = e.target.files[0];
        setOptionalImages(files);
    };

    // check title if any special character contains
    const handleCheckTitle = e => {
        const title = e.target.value;
        const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/g;
        if (specialCharPattern.test(title)) {
            setTitleError(true);
        } else {
            setTitleError(false);
        }
        setProductTitle(title);
    };

    // add new product fn
    const handleAddNewProduct = async (e) => {
        e.preventDefault();
        setBtnLoading(true);

        const isDarkMode = localStorage.getItem('theme') == 'dark';

        const formData = new FormData();

        // Get form values
        const title = e.target.title.value;
        const regularPrice = e.target.regularPrice.value;
        const discountPrice = e.target.discountPrice.value;
        const weight = e.target.weight.value;
        const description = e.target.description.value;

        // Append form values to FormData
        formData.append('title', title);
        formData.append('regularPrice', regularPrice);
        formData.append('discountPrice', parseInt(discountPrice));
        formData.append('weight', weight);
        formData.append('subCategoryId', subCategoryId);
        formData.append('description', description);

        // Append images to FormData
        if (thumbnailImage) {
            formData.append('thumbnailImage', thumbnailImage);
        }
        optionalImages.forEach((image) => {
            if (image) {
                formData.append('images', image);
            }
        });

        try {
            const res = await axiosPublic.post('/api/product/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.data.success) {
                showAlertWithTheme({
                    position: "top-end",
                    icon: "success",
                    title: "Added Successfully!",
                    showConfirmButton: false,
                    timer: 1500
                }, isDarkMode);

                router.push('/products/list');

                // Reset the form and clear images
                e.target.reset();
                setThumbnailImage(null);
                setOptionalImages([null, null, null]);
            }
            else {
                showAlertWithTheme({
                    position: "top-end",
                    icon: "error",
                    title: `${res.data.message}`,
                    showConfirmButton: false,
                    timer: 1500
                }, isDarkMode);
            }
            setBtnLoading(false)
        }
        catch (error) {
            // console.error("An error occurred:", error);
            showAlertWithTheme({
                position: "top-end",
                icon: "error",
                title: "Unexpected Error From Server!",
                showConfirmButton: false,
                timer: 1500
            }, isDarkMode);

            setBtnLoading(false);
        }
    };


    return (
        <>
            <PageTitle title={'Add New'} />
            <Header title={'Add New Product'} />

            <Wrapper>

                {loading ? (
                    <div className='flex justify-center mt-32'>
                        <span className="loading loading-bars loading-lg bg-primary-color"></span>
                    </div>
                ) : (
                    <form onSubmit={handleAddNewProduct} className='space-y-3 pb-8'>
                        {/* ------ 1st col ------ */}
                        <div className='grid grid-cols-5 gap-3'>
                            {/* Title */}
                            <div className='col-span-2'>
                                <label htmlFor="title" className='block font-semibold pb-1'>Title<span className='text-red-600'>*</span>
                                    {
                                        titleError && <span className='font-normal text-[10px] md:text-xs text-red-600 pl-5'>(please remove special characters)</span>
                                    }
                                </label>
                                <input type="text" onChange={(e) => handleCheckTitle(e)} name='title' className='w-full bg-transparent px-2 py-1 rounded-md outline-none border border-slate-300 dark:border-slate-500' placeholder='Product Title...' required />
                            </div>
                            {/* Regular price */}
                            <div>
                                <label htmlFor="regularPrice" className='block font-semibold pb-1'>Regular Price<span className='text-red-600'>*</span></label>
                                <input type="number" name='regularPrice' className='w-full bg-transparent px-2 py-1 rounded-md outline-none border border-slate-300 dark:border-slate-500' placeholder='Regular Price...' required />
                            </div>
                            {/* Discount price */}
                            <div>
                                <label htmlFor="discountPrice" className='block font-semibold pb-1'>Discount Price<span className='text-red-600'>*</span></label>
                                <input type="number" name='discountPrice' className='w-full bg-transparent px-2 py-1 rounded-md outline-none border border-slate-300 dark:border-slate-500' placeholder='Discount Price...' required />
                            </div>
                            {/* weight / unit */}
                            <div>
                                <label htmlFor="weight" className='block font-semibold pb-1'>Weight / Unit<span className='text-red-600'>*</span></label>
                                <input type="text" name='weight' className='w-full bg-transparent px-2 py-1 rounded-md outline-none border border-slate-300 dark:border-slate-500' placeholder='Product Unit...' required />
                            </div>
                        </div>

                        {/* ----- 2nd col ------ */}
                        <div className='grid grid-cols-3 gap-3'>
                            {/* Main categories */}
                            <div>
                                <label htmlFor="mainCategory" className='block font-semibold pb-1'>Main Category<span className='text-red-600'>*</span></label>
                                <select name="mainCategory" className='w-full bg-primary-bg dark:bg-secondary-bg px-2 py-1 rounded-md outline-none border border-slate-300 dark:border-slate-500' id="mainCategory" value={mainCategoryId} onChange={handleMainCategoryChange} required >
                                    <option value="" disabled>Choose One</option>
                                    {mainCategories.map((mainCategory) => (
                                        <option key={mainCategory.id} value={mainCategory.id}>{mainCategory.title}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Categories */}
                            <div>
                                <label htmlFor="category" className='block font-semibold pb-1'>Category<span className='text-red-600'>*</span></label>
                                <select name="category" className='w-full bg-primary-bg dark:bg-secondary-bg px-2 py-1 rounded-md outline-none border border-slate-300 dark:border-slate-500' id="category" value={categoryId} onChange={handleCategoryChange} required disabled={!categories.length} >
                                    <option value="" disabled>Choose One</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>{category.title}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Subcategories */}
                            <div>
                                <label htmlFor="subCategory" className='block font-semibold pb-1'>Sub Category<span className='text-red-600'>*</span></label>
                                <select
                                    name="subCategory"
                                    className='w-full bg-primary-bg dark:bg-secondary-bg px-2 py-1 rounded-md outline-none border border-slate-300 dark:border-slate-500'
                                    id="subCategory"
                                    value={subCategoryId}
                                    onChange={(e) => setSubCategoryId(e.target.value)}
                                    required
                                    disabled={!subCategories.length}
                                >
                                    <option value="" disabled>Choose One</option>
                                    {subCategories?.map((subCategory) => (
                                        <option key={subCategory?.id} value={subCategory?.id}>{subCategory?.title}</option>
                                    ))}
                                </select>
                            </div>

                        </div>

                        {/* 3rd col */}
                        <div>
                            <label htmlFor="description" className='block font-semibold pb-1'>Description<span className='text-red-600'>*</span></label>
                            <textarea name="description" className='w-full h-20 bg-transparent px-2 py-1 rounded-md outline-none border border-slate-300 dark:border-slate-500' id="description" placeholder='Write a description........' required></textarea>
                        </div>

                        {/* ---- 4rd col ----- */}
                        <div className='grid grid-cols-4 gap-3'>
                            {/* Thumbnail */}
                            <div>
                                <label htmlFor="thumbnailImage" className='block font-semibold pb-1'>Thumbnail Image<span className='text-red-600'>*</span></label>
                                <input type="file" name='thumbnailImage' onChange={handleThumbnailChange} className='w-full bg-transparent px-2 py-1 rounded-md outline-none border border-slate-300 dark:border-slate-500 cursor-pointer' required />
                                {thumbnailImage && (
                                    <div className="mt-2">
                                        <Image src={URL.createObjectURL(thumbnailImage)} width={100} height={100} alt="Thumbnail Preview" className="w-24 h-24 object-cover rounded-md" />
                                    </div>
                                )}
                            </div>
                            {/* Optional images */}
                            {optionalImages.map((_, index) => (
                                <div key={index}>
                                    <label htmlFor={`optionalImage${index}`} className='block font-semibold pb-1'>Image {index + 1} (Optional)</label>
                                    <input type="file" name={`optionalImage${index}`} onChange={(e) => handleOptionalImageChange(index, e)} className='w-full bg-transparent px-2 py-1 rounded-md outline-none border border-slate-300 dark:border-slate-500 cursor-pointer' />
                                    {optionalImages[index] && (
                                        <div className="mt-2">
                                            <Image src={URL.createObjectURL(optionalImages[index])} width={100} height={100} alt={`Optional Preview ${index + 1}`} className="w-24 h-24 object-cover rounded-md" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* submit btn */}
                        <button type='submit' className='w-full py-2 bg-primary-color text-secondary-text font-semibold ' disabled={titleError}>
                            {
                                btnLoading ? <span className="loading loading-spinner loading-sm"></span>
                                    :
                                    'Save'
                            }
                        </button>
                    </form>
                )}


            </Wrapper>
        </>
    );
};

export default AddNewProduct;
