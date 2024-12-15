'use client';

import React from 'react';
import { Helmet } from 'react-helmet';


const PageTitle = ({title}) => {
    return (
        <Helmet>
            <title className='capitalize'>Grocery Admin {title == '' ? '' : '-' } {title}</title>
        </Helmet>
    );
};

export default PageTitle;