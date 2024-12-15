import PageTitle from '@/components/layout/PageTitle/PageTitle';
import Wrapper from '@/components/layout/Wrapper/Wrapper';
import AddMainCategory from '@/components/pages/Categories/MainCategories/AddMainCategory/AddMainCategory';
import MainCategoryActionBtns from '@/components/pages/Categories/MainCategories/MainCategoryActionBtns/MainCategoryActionBtns';
import Header from '@/components/shared/Header/Header';
import { getMainCategories } from '@/libs/Categories/getMainCategories';
import Image from 'next/image';
import React from 'react';


const MainCategoryPage = async () => {

    const mainCategories = await getMainCategories();

    return (
        <>
            <PageTitle title={'Main Category'} />
            <Header title={'Main Category'} />

            <Wrapper>

                {/* add new */}
                <AddMainCategory />

                <h2 className='text-base md:text-lg font-bold py-4'>Main Category: {mainCategories.data?.length}</h2>

                <div className='overflow-x-auto'>
                    <table className='w-full'>
                        <thead>
                            <tr>
                                <th className=' p-2 border border-slate-300 dark:border-slate-500'>SL</th>
                                <th className=' p-2 border border-slate-300 dark:border-slate-500'>Name</th>
                                <th className=' p-2 border border-slate-300 dark:border-slate-500'>Icon</th>
                                <th className=' p-2 border border-slate-300 dark:border-slate-500'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                mainCategories?.data?.map((category, idx) =>
                                    <tr key={category?.id} className='text-center'>
                                        <td className='p-1 border border-slate-300 dark:border-slate-500'>{idx + 1}</td>
                                        <td className='p-1 border border-slate-300 dark:border-slate-500'>{category?.title}</td>
                                        <td className='p-1 border border-slate-300 dark:border-slate-500'>
                                            <Image src={category?.icon} className='w-8 h-8 object-contain mx-auto' width={50} height={50} alt={category?.title} />
                                        </td>
                                        <td className='p-1 border border-slate-300 dark:border-slate-500'>
                                            <MainCategoryActionBtns category={category} />
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

            </Wrapper>

        </>
    );
};

export default MainCategoryPage;