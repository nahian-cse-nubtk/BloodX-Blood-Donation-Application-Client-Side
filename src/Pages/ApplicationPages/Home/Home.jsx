import React from 'react';
import HeroBanner from '../../../Components/HeroBanner/HeroBanner';
import FeaturedSection from '../../../Components/FeaturedSection/FeaturedSection';
import ContactSection from '../../../Components/ContactSection/ContactSection';
import Services from '../../../Components/Services/Services';
import BlogSection from '../../../Components/BlogSection/BlogSection';
import Testimonials from '../../../Components/Testimonials/Testimonials';
import Newsletter from '../../../Components/Newsletter/Newsletter';
import FAQ from '../../../Components/FAQ/FAQ';
import Highlights from '../../../Components/Highlights/Highlights';
import RecentDonationRequest from '../../../Components/RecentDonationRequest/RecentDonationRequest';

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
            {/* sevices section */}
            <div>
                <Services></Services>
            </div>
            {/* recent donation request */}
            <div>
                <RecentDonationRequest></RecentDonationRequest>
            </div>
            {/* heighlights */}
            <div>
                <Highlights></Highlights>
            </div>
            {/* blog section */}
            <div>
                <BlogSection></BlogSection>
            </div>
            {/* textimonials */}
            <div>
                <Testimonials></Testimonials>
            </div>
            {/* news letter */}
            {/* faq */}
            <div>
                <FAQ></FAQ>
            </div>
            <div>
                <Newsletter></Newsletter>
            </div>
            {/* Contact Section */}
            <div>
                <ContactSection></ContactSection>
            </div>

        </div>
    );
};

export default Home;