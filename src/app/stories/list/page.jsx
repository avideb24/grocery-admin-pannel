
import NoDataFound from '@/components/layout/NoDataFound/NoDataFound';
import PageTitle from '@/components/layout/PageTitle/PageTitle';
import Wrapper from '@/components/layout/Wrapper/Wrapper';
import StoryListBtns from '@/components/pages/Stories/List/StoryListBtns/StoryListBtns';
import LinkButton from '@/components/shared/Buttons/LinkButton/LinkButton';
import Header from '@/components/shared/Header/Header';
import { getAllStories } from '@/libs/Stories/getAllStories';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaPlus } from "react-icons/fa6";


const StoriesList = async () => {

    const storiesData = await getAllStories();

    return (
        <>
            <PageTitle title={'Stories'} />
            <Header title={'Stories'} />

            <Wrapper>

                <div className='py-5'>
                    <LinkButton btnText={'Add New Story'} linkTo={'/stories/add-new'} icon={FaPlus} />
                </div>

                {
                    storiesData?.length == 0 ?
                        <NoDataFound />
                        :
                        <div className='grid grid-cols-4 gap-7'>
                            {
                                storiesData?.map(story =>
                                    <div key={story?.id} className='p-2 border border-slate-300 dark:border-slate-500 rounded-md shadow-lg flex flex-col justify-between'>
                                        {/* image */}
                                        <Image src={story?.url} className='w-full object-contain rounded-md' width={500} height={200} alt={story?.title} />

                                        <div>
                                            <div className='flex justify-between gap-3 px-3 py-3'>
                                                <h2 className='text-sm sm:text-base font-bold'>{story?.title}</h2>
                                                <StoryListBtns storyData={story} />
                                            </div>
                                            {/* product */}
                                            <div className='flex gap-2 border border-slate-300 dark:border-slate-500 p-1 rounded-md'>
                                                <Image src={story?.product?.thumbnailImage} className='w-8 h-8 object-cover' width={50} height={50} alt={story?.product?.title} />
                                                <div>
                                                    <h2 className='font-semibold text-left'>{story?.product?.title}</h2>
                                                    <p className='flex items-center gap-2 text-[10px] md:text-xs'>
                                                        <span>৳{story?.product?.discountPrice}</span>
                                                        <span>-</span>
                                                        <span>{story?.product?.weight}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                }

            </Wrapper>

        </>
    );
};

export default StoriesList;