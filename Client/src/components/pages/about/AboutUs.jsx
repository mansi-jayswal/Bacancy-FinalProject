import React from 'react';
import logo from '../../../assets/logo.png';

function AboutUs() {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center py-8 md:py-16">
            {/* Content */}
            <div className="md:w-1/2 px-8">
                <h2 className="text-4xl md:text-6xl font-bold text-customRed mb-4">
                    Welcome to FlavourRealm
                </h2>
                <p className="text-lg md:text-xl text-yellow-600">
                    FlavourRealm is your ultimate destination for exploring and sharing delicious recipes from around the world. Whether you're a seasoned chef or a kitchen novice, our platform provides a diverse range of recipes to suit every taste and skill level.
                </p>
                <p className="text-lg md:text-xl text-yellow-600 mt-4">
                    Join our community to discover mouth-watering dishes, upload your own creations, interact with fellow food enthusiasts, and much more. Let's embark on a culinary journey together!
                </p>
                {/* Additional Info */}
                <div className="flex items-center mt-8">
                    <div className="bg-customBlue rounded-md p-4 mr-4">
                        <h3 className="text-customRed font-dancing font-semibold text-lg md:text-xl">2000+ Recipes</h3>
                    </div>
                    <div className="bg-customGreen rounded-md p-4">
                        <h3 className="text-customRed font-dancing font-semibold text-lg md:text-xl">10k Users</h3>
                    </div>
                </div>
            </div>
            {/* Logo */}
            <div className="md:w-1/2 px-8">
                <img src={logo} alt="FlavourRealm Logo" />
            </div>
            
        </div>
    );
}

export default AboutUs;
