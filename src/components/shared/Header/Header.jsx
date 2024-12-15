import React from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';


const Header = ({ title }) => {
    return (
        <div className='w-full sticky z-20 left-0 top-0 flex justify-between items-center bg-primary-bg dark:bg-secondary-bg px-4 py-3 shadow-md'>
            <h2 className='text-sm md:text-lg font-bold capitalize pl-10 lg:pl-0'>{title}</h2>
            <ThemeToggle />
        </div>
    );
};

export default Header;