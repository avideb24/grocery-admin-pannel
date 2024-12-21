import PageTitle from '@/components/layout/PageTitle/PageTitle';
import Wrapper from '@/components/layout/Wrapper/Wrapper';
import CampaignBtns from '@/components/pages/Campaigns/List/CampaignBtns/CampaignBtns';
import Header from '@/components/shared/Header/Header';
import { getAllCampaigns } from '@/libs/Campaign/getAllCampaigns';
import Image from 'next/image';
import React from 'react';

const CampaignList = async () => {

    const campaignData = await getAllCampaigns();


    const getLocalDateTime = (isoDate) => {
        return new Date(isoDate).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        });
    };


    return (
        <>
            <PageTitle title={'Campaigns List'} />
            <Header title={'Campaigns List'} />

            <Wrapper>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

                    {
                        campaignData?.map(campaign =>
                            <div key={campaign?.id}>
                                <div className='p-2 border border-slate-200 dark:border-slate-600 shadow-lg rounded-md space-y-3'>
                                    {/* banner */}
                                    <Image src={campaign?.banner} className='w-full object-contain rounded-md' width={500} height={200} alt={campaign?.title} />

                                    <div className='flex justify-between gap-3 px-3'>
                                        <div>
                                            <h2 className='text-sm sm:text-base font-bold pb-1'>{campaign?.title}</h2>
                                            <p className='text-[11px] md:text-xs'>
                                                <span className='font-semibold mr-2'>From:</span>
                                                <span>{getLocalDateTime(campaign?.startTime)}</span>
                                            </p>
                                            <p className='text-[11px] md:text-xs'>
                                                <span className='font-semibold mr-6'>To:</span>
                                                <span>{getLocalDateTime(campaign?.endTime)}</span>
                                            </p>
                                        </div>
                                        <CampaignBtns campaignData={campaign} />
                                    </div>

                                    {/* products */}
                                    <div className='px-2 grid grid-cols-2 gap-3'>

                                        {
                                            campaign?.offerItems?.map(product =>
                                                <div key={product?.id} className='flex gap-2 border border-slate-300 dark:border-slate-500 p-1 rounded-md'>
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

                                </div>

                            </div>
                        )
                    }

                </div>

            </Wrapper>

        </>
    );
};

export default CampaignList;