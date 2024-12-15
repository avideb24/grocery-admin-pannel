'use client';

import BtnLoading from '@/components/layout/Loadings/BtnLoading/BtnLoading';
import SectionLoading from '@/components/layout/Loadings/SectionLoading/SectionLoading';
import PageTitle from '@/components/layout/PageTitle/PageTitle';
import Wrapper from '@/components/layout/Wrapper/Wrapper';
import Header from '@/components/shared/Header/Header';
import { showAlertWithTheme } from '@/components/theme/Alert/AlertTheme';
import AxiosPublic from '@/libs/Axios/AxiosPublic';
import { getProductsForAddCampaign } from '@/libs/Campaign/getProductsForAddCampaign';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaXmark } from 'react-icons/fa6';


const AddNewStory = () => {

    const [btnLoading, setBtnLoading] = useState(false);
    const [storyImage, setStoryImage] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [products, setProducts] = useState([]);
    const [showProductsMenu, setShowProductsMenu] = useState(false);
    const [productsLoading, setProductsLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const axiosPublic = AxiosPublic();
    const router = useRouter();


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
    }, [searchText]);


    // change banner image fn
    const handleChangeStoryImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setStoryImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setStoryImage(null);
        }
    };


    // add new story fn
    const handleAddNewStory = async (e) => {

        e.preventDefault();
        const isDarkMode = localStorage.getItem('theme') == 'dark';

        if (selectedProduct) {

            setBtnLoading(true);

            const title = e.target.title.value;
            const storyImg = e.target.storyImg.files[0];

            const formData = new FormData();

            // append values to formData
            formData.append('title', title);
            formData.append('productId', selectedProduct.id);
            formData.append('storyImage', storyImg);

            const res = await axiosPublic.post('/api/story/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.data.success) {

                showAlertWithTheme({
                    position: "top-end",
                    icon: "success",
                    title: "Story Added!",
                    showConfirmButton: false,
                    timer: 1500
                }, isDarkMode);

                e.target.reset();
                setStoryImage(null);
                router.push('/stories/list')

            }
            else {
                // console.error('Error from server:', res.data);

                showAlertWithTheme({
                    position: "top-end",
                    icon: "error",
                    title: `${res.data.message}`,
                    showConfirmButton: false,
                    timer: 1500
                }, isDarkMode);
            };

            setBtnLoading(false);
        }
        else {
            showAlertWithTheme({
                position: "top-end",
                icon: "error",
                title: "Please Select Product",
                showConfirmButton: false,
                timer: 1500
            }, isDarkMode);
            setBtnLoading(false);
        }
        setBtnLoading(false);
    };


    return (
        <>
            <PageTitle title={'Add New Story'} />
            <Header title={'Add New Story'} />

            <Wrapper>

                {/* add story form */}
                <form onSubmit={handleAddNewStory}>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

                        <div>
                            {/* title */}
                            <div>
                                <label htmlFor="title" className='font-bold'>Title<span className='text-red-600'>*</span></label>
                                <input type="text" name='title' className='w-full bg-transparent border border-slate-300 dark:border-slate-500 px-3 py-1 rounded-md outline-none mt-2 mb-4' placeholder='Story title...' required />
                            </div>

                            {/* select products */}
                            <div className='relative'>
                                <label htmlFor="products" className='font-bold'>Search & Select Reference Product<span className='text-red-600'>*</span></label>
                                <input type="text" onChange={(e) => setSearchText(e.target.value)} className='w-full bg-transparent border border-slate-300 dark:border-slate-500 px-3 py-1 rounded-md outline-none mt-2' placeholder='Type product name...' />

                                {/* selected products */}
                                {
                                    selectedProduct &&
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3 py-3'>
                                        <div key={selectedProduct?.id} className='flex gap-2 border border-slate-300 dark:border-slate-500 p-1 rounded-md relative'>
                                            <Image src={selectedProduct?.thumbnailImage} className='w-8 h-8 object-cover' width={50} height={50} alt={selectedProduct?.title} />
                                            <div>
                                                <h2 className='font-semibold text-left'>{selectedProduct?.title}</h2>
                                                <p className='flex items-center gap-2 text-[10px] md:text-xs'>
                                                    <span>৳{selectedProduct?.discountPrice}</span>
                                                    <span>-</span>
                                                    <span>{selectedProduct?.weight}</span>
                                                </p>
                                            </div>
                                            <button onClick={() => setSelectedProduct(null)} className='absolute top-1 right-1 text-red-600 bg-primary-bg dark:bg-secondary-bg rounded-xl p-[1px]'><FaXmark /></button>
                                        </div>
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
                                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                                                            {
                                                                products?.map(product =>
                                                                    <div onClick={() => { setSelectedProduct(product), setShowProductsMenu(false) }} key={product?.id} className='flex gap-2 border border-slate-300 dark:border-slate-500 p-1 rounded-md cursor-pointer'>
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


                        {/* banner */}
                        <div>
                            <label htmlFor="storyImg" className='font-bold'>Story Image<span className='text-red-600'>*</span></label>
                            <input type="file" name='storyImg' onChange={(e) => { handleChangeStoryImage(e), setShowProductsMenu(false) }} className='w-full bg-transparent border border-slate-300 dark:border-slate-500 px-3 py-1 rounded-md outline-none mt-2 cursor-pointer' required />
                            {
                                storyImage && (
                                    <div className='mt-2'>
                                        <Image src={storyImage} className='w-full max-h-52 object-contain rounded-md' width={100} height={100} alt="Story Image Preview" />
                                    </div>
                                )
                            }
                        </div>

                    </div>

                    <button type='submit' className='w-full py-2 bg-primary-color text-secondary-text font-bold rounded-md mt-5' disabled={btnLoading} >
                        {btnLoading ? <BtnLoading /> : 'Save'}
                    </button>

                </form>

            </Wrapper>

        </>
    );
};

export default AddNewStory;