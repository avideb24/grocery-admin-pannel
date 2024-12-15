import Image from 'next/image';
import React from 'react';
import ProductTableActionBtns from '../ProductTableActionBtns/ProductTableActionBtns';

const ProductTable = ({ products }) => {

    return (
        <div className='py-4 overflow-x-auto'>
            {
                products?.length == 0 ?
                    <div className='py-20 font-bold text-center'>No Product Found!</div>
                    :
                    <table className='w-full border-collapse text-center'>
                        <thead>
                            <tr>
                                <th className='p-1 border border-slate-300 dark:border-slate-500'>SL</th>
                                <th className='p-1 border border-slate-300 dark:border-slate-500'>Title</th>
                                <th className='p-1 border border-slate-300 dark:border-slate-500'>Category</th>
                                <th className='p-1 border border-slate-300 dark:border-slate-500'>Price</th>
                                <th className='p-1 border border-slate-300 dark:border-slate-500'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products?.map((product, idx) =>
                                    <tr key={product?.id}>
                                        {/* sl */}
                                        <td className='p-1 border border-slate-300 dark:border-slate-500'>{idx + 1}</td>
                                        {/* thumbnail and title */}
                                        <td className='px-2 py-1 border border-slate-300 dark:border-slate-500 capitalize'>
                                            <div className='flex flex-col md:flex-row justify-start items-center gap-2'>
                                                <Image src={product?.thumbnailImage} className='w-8 h-8 object-contain' width={50} height={50} alt={product?.title} />
                                                <span>{product?.title}</span>
                                            </div>
                                        </td>
                                        {/* categories */}
                                        <td className='p-1 border border-slate-300 dark:border-slate-500'>
                                            <p>MC: {product?.subCategory?.category?.mainCategory?.title}</p>
                                            <p>C: {product?.subCategory?.category?.title}</p>
                                            <p>SC: {product?.subCategory?.title}</p>
                                        </td>
                                        {/* prices */}
                                        <td className='p-1 border border-slate-300 dark:border-slate-500'>
                                            <p>Regular: ৳{product?.regularPrice}</p>
                                            <p>Dsicount: ৳{product?.discountPrice}</p>
                                        </td>
                                        <td className='p-1 border border-slate-300 dark:border-slate-500'>
                                            <ProductTableActionBtns product={product} />
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
            }
        </div>
    );
};

export default ProductTable;