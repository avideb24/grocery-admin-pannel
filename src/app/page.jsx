import Wrapper from '@/components/layout/Wrapper/Wrapper';
import Header from '@/components/shared/Header/Header';
import React from 'react';
import productsIcon from '@/assets/Dashboard/products.png';
import ordersIcon from '@/assets/Dashboard/orders.png';
import customersIcon from '@/assets/Dashboard/customers.png';
import Image from 'next/image';
import Link from 'next/link';
import { getCounts } from '@/libs/Dashboard/getCounts';
import OrderReport from '@/components/pages/Dashboard/OrderReport/OrderReport';


const Dashboard = async() => {

    const counts = await getCounts();
    

    return (
        <>

            <Header title={'Dashboard'} />

            <Wrapper>

                {/* --------- counts -------- */}
                <div className='grid grid-cols-3 gap-2 md:gap-10 pt-3 pb-8'>

                    {/* products */}
                    <Link href={'/products/list'} className='flex flex-col items-center gap-1 border border-slate-200 dark:border-slate-600 shadow-lg hover:shadow-xl p-3 font-bold rounded-md'>
                        <Image src={productsIcon} className='w-10 h-10 object-contain' width={40} height={40} alt='Products Icon' />
                        <h3>Products</h3>
                        <h2 className='text-xl md:text-3xl'>{counts?.product}</h2>
                    </Link>

                    {/* orders */}
                    <Link href={'/orders'} className='flex flex-col items-center gap-1 border border-slate-200 dark:border-slate-600 shadow-lg hover:shadow-xl p-3 font-bold rounded-md'>
                        <Image src={ordersIcon} className='w-10 h-10 object-contain' width={40} height={40} alt='Products Icon' />
                        <h3>Orders</h3>
                        <h2 className='text-xl md:text-3xl'>{counts?.order}</h2>
                    </Link>

                    {/* customers */}
                    <Link href={'/customers'} className='flex flex-col items-center gap-1 border border-slate-200 dark:border-slate-600 shadow-lg hover:shadow-xl p-3 font-bold rounded-md'>
                        <Image src={customersIcon} className='w-10 h-10 object-contain' width={40} height={40} alt='Products Icon' />
                        <h3>Customers</h3>
                        <h2 className='text-xl md:text-3xl'>{counts?.user}</h2>
                    </Link>
                    
                </div>


                {/* -------- order reports ------ */}
                <OrderReport />

            </Wrapper>


        </>
    );
};

export default Dashboard;