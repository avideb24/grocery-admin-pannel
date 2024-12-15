'use client';

import { showAlertWithTheme } from '@/components/theme/Alert/AlertTheme';
import AxiosPublic from '@/libs/Axios/AxiosPublic';
import { getMainCategories } from '@/libs/Categories/getMainCategories';
import { getCategories } from '@/libs/Categories/getSubCategory';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';


const ProductUpdate = ({ product }) => {

    const [mainCategories, setMainCategories] = useState([]);
    const [mainCategoryId, setMainCategoryId] = useState(product?.subCategory?.category?.mainCategory?.id ? product?.subCategory?.category?.mainCategory?.id : '');
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState(product?.subCategory?.category?.id ? product?.subCategory?.category?.id : '');
    const [subCategories, setSubCategories] = useState([]);
    const [subCategoryId, setSubCategoryId] = useState(product?.subCategory?.id ? product?.subCategory?.id : '');
    const [loading, setLoading] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const axiosPublic = AxiosPublic();


    // States to store images
    const [thumbnailImage, setThumbnailImage] = useState(product?.thumbnailImage ? product?.thumbnailImage : null);
    const [optionalImages, setOptionalImages] = useState(product?.images ? product?.images : []);

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


    // product update fn
    const handleUpdateProduct = async (e) => {
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

        // Check if a new thumbnail image is selected
        if (thumbnailImage && typeof thumbnailImage !== 'string') {
            formData.append('thumbnailImage', thumbnailImage);
        } else {
            formData.append('thumbnailImage', product?.thumbnailImage);
        }

        // Append optional images
        optionalImages.forEach((image, index) => {
            if (image && image instanceof File) {
                formData.append('images', image);
            } else if (image && typeof image.url === 'string') {
                // Append existing image URL as a string
                formData.append('images', image.url);
            }
        });

        try {
            const res = await axiosPublic.patch(`/api/product/update/${product?.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });


            if (res.data.success) {
                showAlertWithTheme({
                    position: "top-end",
                    icon: "success",
                    title: "Product Updated Successfully!",
                    showConfirmButton: false,
                    timer: 1500
                }, isDarkMode);

                // Reset the form and clear images
                e.target.reset();
                setThumbnailImage(null);
                setOptionalImages([null, null, null]);
            } else {
                showAlertWithTheme({
                    position: "top-end",
                    icon: "error",
                    title: "Something went wrong!",
                    showConfirmButton: false,
                    timer: 1500
                }, isDarkMode);
            }

            // reload window
            setTimeout(() => {
                window.location.reload();
            }, 1500);
            document.getElementById(`my_modal_updateProduct_${product?.id}`).close()
            setBtnLoading(false);

        } catch (error) {
            // console.log(error);

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
        <dialog id={`my_modal_updateProduct_${product?.id}`} className="modal">
            <div className="modal-box bg-primary-bg dark:bg-secondary-bg text-left">
                <form method="dialog">
                    {/* close btn */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>

                <form onSubmit={handleUpdateProduct} className='space-y-3'>

                    {/* ------ 1st col ------ */}
                    <div className='grid grid-cols-2 gap-3'>
                        {/* Title */}
                        <div>
                            <label htmlFor="title" className='block font-semibold pb-1'>Title</label>
                            <input type="text" name='title' defaultValue={product?.title} className='w-full bg-transparent px-2 py-1 rounded-md outline-none border border-slate-300 dark:border-slate-500' placeholder='Product Title...' required />
                        </div>
                        {/* weight / unit */}
                        <div>
                            <label htmlFor="weight" className='block font-semibold pb-1'>Weight / Unit</label>
                            <input type="text" name='weight' defaultValue={product?.weight} className='w-full bg-transparent px-2 py-1 rounded-md outline-none border border-slate-300 dark:border-slate-500' placeholder='Product Unit...' required />
                        </div>
                    </div>

                    <div className='grid grid-cols-2 gap-3'>
                        {/* Regular price */}
                        <div>
                            <label htmlFor="regularPrice" className='block font-semibold pb-1'>Regular Price</label>
                            <input type="number" name='regularPrice' defaultValue={product?.regularPrice} className='w-full bg-transparent px-2 py-1 rounded-md outline-none border border-slate-300 dark:border-slate-500' placeholder='Regular Price...' required />
                        </div>
                        {/* Discount price */}
                        <div>
                            <label htmlFor="discountPrice" className='block font-semibold pb-1'>Discount Price</label>
                            <input type="number" name='discountPrice' defaultValue={product?.discountPrice} className='w-full bg-transparent px-2 py-1 rounded-md outline-none border border-slate-300 dark:border-slate-500' placeholder='Discount Price...' required />
                        </div>
                    </div>

                    {/* ----- 2nd col ------ */}
                    <div className='grid grid-cols-3 gap-3'>
                        {/* Main categories */}
                        <div>
                            <label htmlFor="mainCategory" className='block font-semibold pb-1'>Main Category</label>
                            <select name="mainCategory" className='w-full bg-primary-bg dark:bg-secondary-bg px-2 py-1 rounded-md outline-none border border-slate-300 dark:border-slate-500' id="mainCategory" value={mainCategoryId} onChange={handleMainCategoryChange} required >
                                <option value="" disabled>Choose One</option>
                                {mainCategories.map((mainCategory) => (
                                    <option key={mainCategory.id} value={mainCategory.id}>{mainCategory.title}</option>
                                ))}
                            </select>
                        </div>
                        {/* Categories */}
                        <div>
                            <label htmlFor="category" className='block font-semibold pb-1'>Category</label>
                            <select name="category" className='w-full bg-primary-bg dark:bg-secondary-bg px-2 py-1 rounded-md outline-none border border-slate-300 dark:border-slate-500' id="category" value={categoryId} onChange={handleCategoryChange} required disabled={!categories?.length} >
                                <option value="" disabled>Choose One</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.title}</option>
                                ))}
                            </select>
                        </div>
                        {/* Subcategories */}
                        <div>
                            <label htmlFor="subCategory" className='block font-semibold pb-1'>Sub Category</label>
                            <select name="subCategory" className='w-full bg-primary-bg dark:bg-secondary-bg px-2 py-1 rounded-md outline-none border border-slate-300 dark:border-slate-500' id="subCategory" value={subCategoryId} onChange={(e) => setSubCategoryId(e.target.value)} required disabled={!subCategories?.length}>
                                <option value="" disabled>Choose One</option>
                                {subCategories?.map((subCategory) => (
                                    <option key={subCategory?.id} value={subCategory?.id}>{subCategory?.title}</option>
                                ))}
                            </select>
                        </div>

                    </div>

                    {/* 3rd col */}
                    <div>
                        <label htmlFor="description" className='block font-semibold pb-1'>Description</label>
                        <textarea name="description" defaultValue={product?.description} className='w-full h-20 bg-transparent px-2 py-1 rounded-md outline-none border border-slate-300 dark:border-slate-500' id="description" placeholder='Description........' required></textarea>
                    </div>

                    {/* ---- 4rd col ----- */}
                    <div className='grid grid-cols-4 gap-3'>
                        {/* Thumbnail */}
                        <div>
                            <label htmlFor="thumbnailImage" className='block font-semibold pb-1'>Thumbnail Image</label>
                            <input type="file" name='thumbnailImage' onChange={handleThumbnailChange} className='w-full bg-transparent px-2 py-1 rounded-md outline-none border border-slate-300 dark:border-slate-500 cursor-pointer' />
                            {thumbnailImage && (
                                <div className="mt-2">
                                    <Image
                                        src={typeof thumbnailImage === 'string' ? thumbnailImage : URL.createObjectURL(thumbnailImage)}
                                        width={100}
                                        height={100}
                                        alt="Thumbnail Preview"
                                        className="w-24 h-24 object-contain rounded-md"
                                    />
                                </div>
                            )}
                        </div>
                        {/* Optional images */}
                        {Array.from({ length: 3 }, (_, index) => (
                            <div key={index}>
                                <label htmlFor={`optionalImage${index + 1}`} className='block font-semibold pb-1'>
                                    Optional Image {index + 1}
                                </label>
                                <input
                                    type="file"
                                    name={`optionalImage${index}`}
                                    onChange={(e) => handleOptionalImageChange(index, e)} // Handle file change with index
                                    className='w-full bg-transparent px-2 py-1 rounded-md outline-none border border-slate-300 dark:border-slate-500 cursor-pointer'
                                />
                                {optionalImages[index] && (
                                    <div className="mt-2">
                                        <Image
                                            src={typeof optionalImages[index]?.url === 'string' ? optionalImages[index]?.url : URL.createObjectURL(optionalImages[index])}
                                            width={100}
                                            height={100}
                                            alt={`Optional Preview ${index + 1}`}
                                            className="w-24 h-24 object-cover rounded-md"
                                        />
                                    </div>
                                )}
                            </div>
                        ))}


                    </div>

                    {/* submit btn */}
                    <button type='submit' className='w-full py-2 bg-primary-color text-secondary-text font-semibold '>
                        {
                            btnLoading ? <span className="loading loading-spinner loading-sm"></span>
                                :
                                'Save'
                        }
                    </button>
                </form>

            </div>
        </dialog>
    );
};

export default ProductUpdate;