'use client';

import BtnLoading from '@/components/layout/Loadings/BtnLoading/BtnLoading';
import SectionLoading from '@/components/layout/Loadings/SectionLoading/SectionLoading';
import { showAlertWithTheme } from '@/components/theme/Alert/AlertTheme';
import AxiosPublic from '@/libs/Axios/AxiosPublic';
import { getProductsForAddCampaign } from '@/libs/Campaign/getProductsForAddCampaign';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { FaXmark } from 'react-icons/fa6';


const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
};


const CampaignBtns = ({ campaignData }) => {

    const [btnLoading, setBtnLoading] = useState(false);
    const [bannerImage, setBannerImage] = useState(campaignData?.banner);
    const [searchText, setSearchText] = useState('');
    const [products, setProducts] = useState([]);
    const [showProductsMenu, setShowProductsMenu] = useState(false);
    const [productsLoading, setProductsLoading] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState(campaignData?.offerItems);
    const axiosPublic = AxiosPublic();


    // default times
    const defaultStartTime = formatDateForInput(campaignData?.startTime);
    const defaultEndTime = formatDateForInput(campaignData?.endTime);


    // load products data
    useEffect(() => {

        setShowProductsMenu(true);
        setProductsLoading(true);

        const query = {
            search: searchText,
            limit: 10,
        }

        // api call
        const fetchProducts = async () => {
            const data = await getProductsForAddCampaign(query);
            setProducts(data);
            setProductsLoading(false);
        };
        if (searchText) {
            fetchProducts();
        }
    }, [searchText])


    // change banner image fn
    const handleChangeBannerImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBannerImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setBannerImage(null);
        }
    };

    // handle select products
    const handleSelectProduct = (product) => {

        setSearchText('');
        setShowProductsMenu(false);

        const isAlreadySelected = selectedProducts.some((p) => p.id === product?.id);

        if (!isAlreadySelected) {
            setSelectedProducts((prevSelectedProducts) => [
                ...prevSelectedProducts,
                product
            ]);
        }
    };


    // remove product
    const handleRemoveProduct = (productId) => {
        const updatedProducts = selectedProducts.filter(
            (item) => item.product.id !== productId
        );

        setSelectedProducts(updatedProducts);
    };



    // update campaign
    const handleUpdateCampaign = async (e) => {
        e.preventDefault();
        const isDarkMode = localStorage.getItem('theme') == 'dark';

        if (selectedProducts.length > 0) {

            setBtnLoading(true);

            const title = e.target.title.value;
            const bannerImgFile = e.target.bannerImg.files[0];
            const timeSchedule = {
                from: new Date(e.target.from.value).toISOString(),
                to: new Date(e.target.to.value).toISOString(),
            };

            const productIdsArray = selectedProducts?.map((product) => ({
                productId: product?.id,
            }));

            const formData = new FormData();

            // append values to formData
            formData.append('title', title);
            formData.append('startTime', timeSchedule.from);
            formData.append('endTime', timeSchedule.to);
            formData.append('offerItems', JSON.stringify(productIdsArray));

            // check banner
            if (bannerImgFile) {
                formData.append('bannerImage', bannerImgFile);
            } else {
                formData.append('bannerImage', bannerImage);
            }

            const res = await axiosPublic.patch(`/api/offer/update/${campaignData?.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.data.success) {

                showAlertWithTheme({
                    position: "top-end",
                    icon: "success",
                    title: "Updated!",
                    showConfirmButton: false,
                    timer: 1500
                }, isDarkMode);

                e.target.reset();
                setBannerImage(null);
                // reload page
                setTimeout(() => {
                    window.location.reload();
                }, 1500);

            }
            else {
                // console.error('Error from server:', res.data);

                showAlertWithTheme({
                    position: "top-end",
                    icon: "error",
                    title: "Something Went Wrong!",
                    showConfirmButton: false,
                    timer: 1500
                }, isDarkMode);
            };

            document.getElementById(`my_modal_updateCampaign_${campaignData?.id}`).close()
            setBtnLoading(false);

        }
        else {
            showAlertWithTheme({
                position: "top-end",
                icon: "error",
                title: "Please Select Products",
                showConfirmButton: false,
                timer: 1500
            }, isDarkMode);
        }
    };


    // delete campaign fn
    const handleDeleteCampaign = async (campaignId) => {

        const isDarkMode = localStorage.getItem('theme') == 'dark';

        showAlertWithTheme({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete"
        }, isDarkMode).then(async (result) => {
            if (result.isConfirmed) {

                const res = await axiosPublic.delete(`/api/offer/remove/${campaignId}`)

                if (res.data.success) {
                    showAlertWithTheme({
                        position: "top-end",
                        icon: "success",
                        title: "Deleted!",
                        showConfirmButton: false,
                        timer: 1500
                    }, isDarkMode);
                }
                else {
                    showAlertWithTheme({
                        position: "top-end",
                        icon: "error",
                        title: "Something Went Wrong!",
                        showConfirmButton: false,
                        timer: 1500
                    }, isDarkMode);
                }

                // reload page
                setTimeout(() => {
                    window.location.reload();
                }, 1500);

            }
        }, isDarkMode);

    };


    return (
        <div>

            {/* update btn */}
            <button onClick={() => document.getElementById(`my_modal_updateCampaign_${campaignData?.id}`).showModal()} className='text-lg text-blue-600 mr-3'><FaEdit /></button>

            {/* update modal */}
            <dialog id={`my_modal_updateCampaign_${campaignData?.id}`} className="modal">
                <div className="modal-box bg-primary-bg dark:bg-secondary-bg rounded-none">
                    <form method="dialog">
                        {/* close btn */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    {/* title */}
                    <h2 className='text-base md:text-lg font-bold border-b border-b-slate-300 dark:border-b-slate-500 pb-2 mb-3 text-center'>Update Campaign Details</h2>


                    {/* ------------ campaign update form ------------- */}
                    <form onSubmit={handleUpdateCampaign} className='space-y-6 py-2'>

                        <div className='grid grid-cols-1 gap-3'>
                            <div>
                                {/* title */}
                                <label htmlFor="title" className='font-bold'>Title<span className='text-red-600'>*</span></label>
                                <input type="text" name='title' className='w-full bg-transparent border border-slate-300 dark:border-slate-500 px-3 py-1 rounded-md outline-none mt-2' placeholder='Campaign title...' defaultValue={campaignData?.title} required />
                            </div>
                            <div>
                                {/* time schedule  */}
                                <label htmlFor="timeSchedule" className='font-bold'>Time schedule<span className='text-red-600'>*</span></label>
                                <div className='grid grid-cols-1 gap-5 mt-2'>
                                    {/* from */}
                                    <div className='flex items-center gap-2'>
                                        <label htmlFor="timeSchedule" className='font-semibold'>From:</label>
                                        <input type="datetime-local" name='from' className='w-full bg-transparent border border-slate-300 dark:border-slate-500 px-3 py-1 rounded-md outline-none cursor-pointer' defaultValue={defaultStartTime} required />
                                    </div>
                                    {/* to */}
                                    <div className='flex items-center gap-2'>
                                        <label htmlFor="timeSchedule" className='font-semibold mr-5'>To:</label>
                                        <input type="datetime-local" name='to' className='w-full bg-transparent border border-slate-300 dark:border-slate-500 px-3 py-1 rounded-md outline-none cursor-pointer' defaultValue={defaultEndTime} required />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-8'>
                            <div>
                                {/* banner */}
                                <label htmlFor="bannerImg" className='font-bold'>Banner Image<span className='text-red-600'>*</span></label>
                                <input type="file" name='bannerImg' onChange={(e) => handleChangeBannerImage(e)} className='w-full bg-transparent border border-slate-300 dark:border-slate-500 px-3 py-1 rounded-md outline-none mt-2 cursor-pointer' />
                                {bannerImage && (
                                    <div className='mt-2'>
                                        <Image src={bannerImage} className='w-full max-h-52 object-contain rounded-md' width={100} height={100} alt="Banner Image Preview" />
                                    </div>
                                )}
                            </div>
                            {/* select products */}
                            <div className='relative'>
                                <label htmlFor="products" className='font-bold'>Search & Select Products<span className='text-red-600'>*</span></label>
                                <input type="text" onChange={(e) => setSearchText(e.target.value)} className='w-full bg-transparent border border-slate-300 dark:border-slate-500 px-3 py-1 rounded-md outline-none mt-2' placeholder='Type product name...' />

                                {/* selected products */}
                                {
                                    selectedProducts?.length > 0 &&
                                    <div className='grid grid-cols-1 gap-3 py-3'>
                                        {
                                            selectedProducts?.map(product =>
                                                <div key={product?.id} className='flex gap-2 border border-slate-300 dark:border-slate-500 p-1 rounded-md relative'>
                                                    <Image src={product?.thumbnailImage} className='w-8 h-8 object-cover' width={50} height={50} alt={product?.title} />
                                                    <div>
                                                        <h2 className='font-semibold text-left'>{product?.title}</h2>
                                                        <p className='flex items-center gap-2 text-[10px] md:text-xs'>
                                                            <span>৳{product?.discountPrice}</span>
                                                            <span>-</span>
                                                            <span>{product?.weight}</span>
                                                        </p>
                                                    </div>
                                                    <button onClick={() => handleRemoveProduct(product?.id)} className='absolute top-1 right-1 text-red-600 bg-primary-bg dark:bg-secondary-bg rounded-xl p-[1px]'><FaXmark /></button>
                                                </div>
                                            )
                                        }
                                    </div>
                                }


                                {/* search products */}
                                <div className={`${!searchText && 'hidden'} ${!showProductsMenu && 'hidden'} absolute left-0 top-16 w-full h-max bg-primary-bg dark:bg-secondary-bg p-2 border border-slate-300 dark:border-slate-500 shadow-lg rounded-md`}>

                                    {
                                        productsLoading ?
                                            <SectionLoading />
                                            :
                                            <>
                                                {
                                                    products?.length == 0 ?
                                                        <div className=' text-center font-bold my-10'>No Product Found!</div>
                                                        :
                                                        <div className='grid grid-cols-1 gap-3'>
                                                            {
                                                                products?.map(product =>
                                                                    <div onClick={() => handleSelectProduct(product)} key={product?.id} className='flex gap-2 border border-slate-300 dark:border-slate-500 p-1 rounded-md cursor-pointer'>
                                                                        <Image src={product?.thumbnailImage} className='w-8 h-8 object-cover' width={50} height={50} alt={product?.title} />
                                                                        <div>
                                                                            <h2 className='font-semibold text-left'>{product?.title}</h2>
                                                                            <p className='flex items-center gap-2 text-[10px] md:text-xs'>
                                                                                <span>৳{product?.discountPrice}</span>
                                                                                <span>-</span>
                                                                                <span>{product?.weight}</span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                }
                                            </>
                                    }

                                </div>
                            </div>
                        </div>

                        <button type='submit' className='w-full py-2 bg-primary-color text-secondary-text font-bold rounded-md' disabled={btnLoading} >
                            {btnLoading ? <BtnLoading /> : 'Save'}
                        </button>

                    </form>

                </div>
            </dialog>


            {/* delete */}
            <button onClick={() => handleDeleteCampaign(campaignData?.id)} className='text-base text-red-600'><FaTrashAlt /></button>

        </div>
    );
};

export default CampaignBtns;