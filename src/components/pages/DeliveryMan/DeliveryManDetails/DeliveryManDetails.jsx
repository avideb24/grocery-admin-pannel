import Image from 'next/image';
import React from 'react';

const DeliveryManDetails = ({ deliveryManData }) => {

    console.log(deliveryManData);


    return (
        <dialog id={`my_modal_deliveryManDetail_${deliveryManData?.id}`} className="modal">
            <div className="modal-box bg-primary-bg dark:bg-secondary-bg text-left text-[13px]">

                <form method="dialog">
                    {/* close btn */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>

                <h2 className='text-base font-bold border-b border-b-slate-300 pb-2 mb-3 text-center'>Delivery Man Details</h2>

                <div>

                    {/* ------ 1st row ----- */}

                    <div className='flex justify-center gap-4 font-semibold'>
                        {/* image */}
                        <Image src={deliveryManData?.deliveryManImage} className='w-20 h-20 object-contain' width={200} height={200} alt={deliveryManData?.name} />

                        <div>
                            {/* name */}
                            <h2 className='text-base pt-1'>{deliveryManData?.name}</h2>
                            {/* mobile */}
                            <p>Mobile: {deliveryManData?.mobile}</p>
                            <p>Email: {deliveryManData?.email}</p>
                        </div>
                    </div>

                    {/* login info */}
                    <h2 className='font-bold pt-2 pb-1 text-sm'>Login Informations:</h2>
                    <div className='grid grid-cols-2 gap-3'>
                        {/* mobile */}
                        <div>
                            <p className='font-semibold'>Mobile:</p>
                            <p>{deliveryManData?.mobile}</p>
                        </div>
                        {/* password */}
                        <div>
                            <p className='font-semibold'>Password:</p>
                            <p>{deliveryManData?.password}</p>
                        </div>
                    </div>



                    {/* ------ 2nd row ------ */}
                    <h2 className='font-bold pt-2 pb-2 text-sm'>General Informations:</h2>

                    <div className='grid grid-cols-3 gap-3'>

                        {/* type */}
                        <div>
                            <p className='font-semibold'>Type:</p>
                            <p>{deliveryManData?.type}</p>
                        </div>
                        {/* zone */}
                        <div>
                            <p className='font-semibold'>Zone:</p>
                            <p>{deliveryManData?.zone}</p>
                        </div>
                        {/* vehicle */}
                        <div>
                            <p className='font-semibold'>Vehicle:</p>
                            <p>{deliveryManData?.vehicle}</p>
                        </div>
                        {/* identityType */}
                        <div>
                            <p className='font-semibold'>Identity Type:</p>
                            <p>{deliveryManData?.identityType}</p>
                        </div>
                        {/* identityNumber */}
                        <div>
                            <p className='font-semibold'>Identity Number:</p>
                            <p>{deliveryManData?.identityNumber}</p>
                        </div>

                    </div>

                    {/* identity image */}
                    <div>
                        <p className='font-semibold pt-2'>Identity Image:</p>
                        <Image src={deliveryManData?.identityImage} className='w-full h-32 object-contain' width={200} height={200} alt={deliveryManData?.name} />
                    </div>

                </div>

            </div>
        </dialog>
    );
};

export default DeliveryManDetails;