import React from 'react';

const Button = ({btnText, icon:Icon, handleClick}) => {
    return (
        <button onClick={handleClick} className='bg-primary-color text-secondary-text px-3 py-1 flex items-center gap-1 rounded-full font-semibold'>
            <Icon />
            <span>{btnText}</span>
        </button>
    );
};

export default Button;