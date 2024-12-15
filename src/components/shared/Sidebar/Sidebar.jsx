'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiFillHome } from "react-icons/ai";
import logoImg from '@/assets/dummy-logo.png';
import { IoIosArrowDown, IoIosCart } from 'react-icons/io';
import { GoDotFill } from "react-icons/go";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaSquareXmark, FaUsers, FaUserNurse } from "react-icons/fa6";
import { RiCustomerService2Fill, RiShapesFill, RiLogoutCircleFill, RiGalleryFill } from "react-icons/ri";
import { useUser } from '@/provider/UserProvider';
import { useRouter } from 'next/navigation';
import { showAlertWithTheme } from '@/components/theme/Alert/AlertTheme';


const Sidebar = ({ setShowSidebar }) => {

    const { setUserId } = useUser();
    const router = useRouter();

    const [expandMenus, setExpandMenus] = useState({
        orders: false,
        stories: false,
        categories: false,
        products: false,
        campaigns: false,
        deliveryman: false,
    });

    const toggleMenu = (menu) => {
        setExpandMenus((prev) => ({
            orders: false,
            stories: false,
            categories: false,
            products: false,
            deliveryman: false,
            campaigns: false,
            [menu]: !prev[menu],
        }));
    };

    // common sidebar link comp
    const SidebarLink = ({ btnText, linkTo, icon: Icon }) => (
        <Link href={linkTo} onClick={() => setShowSidebar(false)} className={`flex items-center gap-1 font-semibold px-3 py-2 capitalize`}>
            <Icon />
            <span>{btnText}</span>
        </Link>
    );

    // common btn comp
    const ButtonLink = ({ btnText, icon: Icon, handleClick }) => (
        <button className={`w-full flex justify-between items-center gap-2 px-3 py-2`} onClick={handleClick}>
            <span className="flex items-center gap-1 font-semibold capitalize">
                <Icon />
                {btnText}
            </span>
            <IoIosArrowDown className={`transition-transform duration-300 ${expandMenus[btnText] ? 'rotate-180' : ''}`} />
        </button>
    );



    // logout fn
    const handleLogout = () => {

        const isDarkMode = localStorage.getItem('theme') == 'dark';

        router.push('/login');
        localStorage.setItem('userId', null);

        showAlertWithTheme({
            position: "top-end",
            icon: "success",
            title: "Logout SuccessFully!",
            showConfirmButton: false,
            timer: 1500
        }, isDarkMode);

        setUserId(null);
    };


    return (
        <div className='w-full relative'>

            {/* ----------- sidebar hide btn ----------- */}
            <button onClick={() => setShowSidebar(false)} className='absolute top-3 right-3 text-2xl text-red-600 lg:hidden'>
                <FaSquareXmark />
            </button>

            {/* ------------------ logo -------------- */}
            <Link href={'/'} onClick={() => setShowSidebar(false)} className='block py-3 bg-primary-bg dark:bg-secondary-bg border-r border-r-slate-200 dark:border-r-slate-500'>
                <Image src={logoImg} className='w-24 mx-auto object-contain' width={100} height={100} alt='logo' />
            </Link>

            {/* -------------- sidebar links ------------- */}
            <div>
                {/* dashboard */}
                <SidebarLink btnText={'dashboard'} linkTo={'/'} icon={AiFillHome} />

                {/* orders */}
                <SidebarLink btnText={'orders'} linkTo='/orders' icon={IoIosCart} />

                {/* stories */}
                <ButtonLink btnText={'stories'} icon={RiGalleryFill} handleClick={() => toggleMenu('stories')} />
                <div className={`overflow-hidden transition-all duration-500 ${expandMenus.stories ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="flex flex-col ml-4">
                        <SidebarLink btnText={'add new'} linkTo='/stories/add-new' icon={GoDotFill} />
                        <SidebarLink btnText={'list'} linkTo='/stories/list' icon={GoDotFill} />
                    </div>
                </div>

                {/* campaigns */}
                <ButtonLink btnText={'campaigns'} icon={RiShapesFill} handleClick={() => toggleMenu('campaigns')} />
                <div className={`overflow-hidden transition-all duration-500 ${expandMenus.campaigns ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="flex flex-col ml-4">
                        <SidebarLink btnText={'add new'} linkTo='/campaigns/add-new' icon={GoDotFill} />
                        <SidebarLink btnText={'list'} linkTo='/campaigns/list' icon={GoDotFill} />
                    </div>
                </div>

                {/* categories */}
                <ButtonLink btnText={'categories'} icon={BiSolidCategoryAlt} handleClick={() => toggleMenu('categories')} />
                <div className={`overflow-hidden transition-all duration-500 ${expandMenus.categories ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="flex flex-col ml-4">
                        <SidebarLink btnText={'main category'} linkTo='/categories/main-category' icon={GoDotFill} />
                        <SidebarLink btnText={'category'} linkTo='/categories/category' icon={GoDotFill} />
                        <SidebarLink btnText={'sub category'} linkTo='/categories/sub-category' icon={GoDotFill} />
                    </div>
                </div>

                {/* products */}
                <ButtonLink btnText={'products'} icon={RiShapesFill} handleClick={() => toggleMenu('products')} />
                <div className={`overflow-hidden transition-all duration-500 ${expandMenus.products ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="flex flex-col ml-4">
                        <SidebarLink btnText={'add new'} linkTo='/products/add-new' icon={GoDotFill} />
                        <SidebarLink btnText={'list'} linkTo='/products/list' icon={GoDotFill} />
                    </div>
                </div>

                {/* customers */}
                <SidebarLink btnText={'customers'} linkTo={'/customers'} icon={FaUsers} />

                {/* delivery man */}
                <ButtonLink btnText={'delivery man'} icon={FaUserNurse} handleClick={() => toggleMenu('deliveryman')} />
                <div className={`overflow-hidden transition-all duration-500 ${expandMenus.deliveryman ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="flex flex-col ml-4">
                        <SidebarLink btnText={'add new'} linkTo='/delivery-man/add-new' icon={GoDotFill} />
                        <SidebarLink btnText={'list'} linkTo='/delivery-man/list' icon={GoDotFill} />
                    </div>
                </div>

                <div className='w-full h-[1px] bg-slate-200 dark:bg-slate-500 my-1'></div>

                {/* help center */}
                <SidebarLink btnText={'help center'} linkTo={'/help-center'} icon={RiCustomerService2Fill} />


                {/* logout */}
                <button onClick={handleLogout} className='flex items-center gap-1 font-semibold px-3 py-2'>
                    <RiLogoutCircleFill />
                    <span>Logout</span>
                </button>

            </div>

        </div>
    );
};

export default Sidebar;
