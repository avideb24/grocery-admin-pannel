import React from 'react';

const TitlePrimary = ({title, icon:Icon}) => {
    return (
        <div>
            <h2 className='text-sm md:text-lg font-bold'>{title}</h2>
        </div>
    );
};

export default TitlePrimary;