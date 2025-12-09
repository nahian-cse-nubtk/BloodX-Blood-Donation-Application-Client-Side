import React from 'react';
import HeroBanner from '../../../Components/HeroBanner/HeroBanner';
import FeaturedSection from '../../../Components/FeaturedSection/FeaturedSection';
import ContactSection from '../../../Components/ContactSection/ContactSection';

const Home = () => {
    return (
        <div>
            {/* hero Section */}
            <div>
            <HeroBanner></HeroBanner>
            </div>
            {/* featured Section */}
            <div>
                <FeaturedSection></FeaturedSection>
            </div>
            {/* Contact Section */}
            <div>
                <ContactSection></ContactSection>
            </div>

        </div>
    );
};

export default Home;