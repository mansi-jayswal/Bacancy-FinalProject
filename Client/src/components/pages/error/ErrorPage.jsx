import React from 'react';
import Button from '../../common/Button';
import { useNavigate } from 'react-router-dom';
import errorBanner from '../../../assets/errorPageBanner.png';

function ErrorPage() {
    const navigate = useNavigate();
    const goToHomePage = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="max-w-lg text-center m-2 lg:mx-auto lg:w-2/3 xl:w-1/2">
                <div className='mt-5'>
                    <img src={errorBanner} className='w-full h-auto' alt="Error Banner"></img>
                </div>
                <h1 className="text-4xl font-bold mt-5 mb-6">Page not Found!</h1>
                <h4 className="text-lg mb-4">Sorry, the page you tried does not exist.</h4>
                <h4 className="text-lg mb-4">If you clicked on a link to get here — please send us an email at <span className="text-customRed underline">support@flavourRealm.com</span> so we can correct the broken link.</h4>
                <h4 className="text-lg mb-4">If you typed the URL — please double check the address to make sure it was entered exactly as intended.</h4>
                <h4 className="text-lg mb-8">If all else fails — head back to the home page.</h4>
                <div className="mt-8 mb-2">
                    <Button children="Go to Homepage" handleClick={goToHomePage} />
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;
