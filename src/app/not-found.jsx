import img from '@/assets/404-img.png';
import LinkButton from '@/components/shared/Buttons/LinkButton/LinkButton';
import Image from "next/image";
import { IoMdHome } from "react-icons/io";


const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <div>
                <Image src={img} className="mx-auto" alt="404 Image" />
                <h1 className="text-sm md:text-2xl font-bold mt-2 mb-6">Your requested page was not found!</h1>
                <div className='text-center'>
                    <LinkButton btnText={'Go Home'} linkTo={'/'} icon={IoMdHome} />
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;