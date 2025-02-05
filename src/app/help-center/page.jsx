import Wrapper from '@/components/layout/Wrapper/Wrapper';
import Header from '@/components/shared/Header/Header';
import React from 'react';
import { TfiEmail } from "react-icons/tfi";
import { MdAddIcCall } from "react-icons/md";


const HelpCenterPage = () => {
    return (
        <>
            <Header title={'Help Center'} />

            <Wrapper>

            <div>

            <div className="bg-white m-4 p-5 shadow-sm">

                <div className="text-center space-y-3">
                    <h1 className="text-lg md:text-3xl font-bold text-blue-600">Grocery Mart</h1>
                    <p className="text-sm md:text-base font-bold">Make Your Business More Efficient!</p>
                </div>

                <div className="flex flex-col items-center gap-3 pt-8">
                    <h3 className="font-bold"><span className="text-red-600">Facing issues?</span> Please Contact...</h3>
                    <div className="flex gap-4 py-2">
                        <p className="p-2 shadow-md flex items-end gap-1">
                            <TfiEmail className="text-lg md:text-2xl" />
                            <span className="font-semibold pr-2">E-mail:</span>rakib@vida.com.bd
                        </p>
                        <p className="p-2 shadow-md flex items-end gap-1">
                            <MdAddIcCall className="text-lg md:text-2xl" />
                            <span className="font-semibold pr-2">Mobile:</span><a href="tel:+8801723622125" className="hover:underline">+880164144311</a>
                        </p>
                    </div>
                </div>

            </div>

        </div>

            </Wrapper>

        </>
    );
};

export default HelpCenterPage;