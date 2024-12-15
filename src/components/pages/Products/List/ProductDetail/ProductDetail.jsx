import Image from 'next/image';
import React from 'react';
import { FaListAlt } from "react-icons/fa";


const ProductDetail = ({ product }) => {
    return (
        <dialog id={`my_modal_showDetail_${product?.id}`} className="modal">
            <div className="modal-box bg-primary-bg dark:bg-secondary-bg text-left">
                <form method="dialog">
                    {/* close btn */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>

                {/* modal title */}
                <h1 className='text-base md:text-xl font-bold border-b border-b-slate-300 dark:border-b-slate-500 pb-2 mb-3 flex justify-center items-center gap-1'><FaListAlt />Product Detail</h1>

                {/* product data */}
                <div>
                    <h2 className='text-sm md:text-base font-bold py-2 capitalize pb-3'>Title: {product?.title}</h2>
                    <table className='w-full'>
                        <thead>
                            <tr>
                                <th className='p-1 text-center border border-slate-300'>Weight</th>
                                <th className='p-1 text-center border border-slate-300'>Prices</th>
                                <th className='p-1 text-center border border-slate-300'>Categories</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='p-1 text-center border border-slate-300'>{product?.weight}</td>
                                <td className='p-1 text-center border border-slate-300'>
                                    <p>Regular: ৳{product?.regularPrice}</p>
                                    <p>Discount: ৳{product?.discountPrice}</p>
                                </td>
                                <td className='p-1 text-center border border-slate-300'>
                                    <p>MC: {product?.subCategory?.category?.mainCategory?.title}</p>
                                    <p>C: {product?.subCategory?.category?.title}</p>
                                    <p>SC: {product?.subCategory?.title}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className='grid grid-cols-5 gap-2 py-2'>
                        <div className=''>
                            <h3 className='font-bold'>Thumbnail</h3>
                            {/* thumbnail */}
                            <Image src={product?.thumbnailImage} className='w-14 h-14 object-contain' width={100} height={100} alt={product?.title} />
                        </div>
                        {/* images */}
                        <div className='col-span-4 font-bold text-left'>
                            <h2>OptionalImages</h2>
                            {
                                product?.images?.length == 0 ?
                                    <p className='text-red-600'>No Images Added!</p>
                                    :
                                    <div className='grid grid-cols-3 gap-2'>
                                        {
                                            product?.images?.map((image, idx) =>
                                                <Image key={idx} src={image?.url} className='w-14 h-14 object-contain' width={50} height={50} alt='Product optional Image' />
                                            )
                                        }
                                    </div>
                            }
                        </div>
                    </div>

                    {/* description */}
                    <div>
                        <h3 className='font-bold pt-2'>Description</h3>
                        <p>{product?.description}</p>
                    </div>
                </div>

            </div>
        </dialog>

    );
};

export default ProductDetail;