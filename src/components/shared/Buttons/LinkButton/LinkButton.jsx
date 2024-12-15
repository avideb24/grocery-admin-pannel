import Link from 'next/link';
import React from 'react';

const LinkButton = ({ btnText, linkTo, icon: Icon }) => {
    return (
        <Link href={linkTo} className="inline-block px-3 py-1 rounded-full bg-primary-color text-white text-xs">
            <p className='flex items-center gap-1'>
                <span><Icon /></span>
                <span className='font-semibold'>{btnText}</span>
            </p>
        </Link>
    );
};

export default LinkButton;