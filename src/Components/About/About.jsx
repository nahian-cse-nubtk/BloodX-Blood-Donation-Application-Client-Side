import React from "react";
import {
  FaHandHoldingHeart,
  FaUsers,
  FaHeartbeat,
  FaShieldAlt,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen  py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-red-500">
            About BloodX
          </h1>
          <p className="mt-4 text-base-content/70 max-w-3xl mx-auto">
            BloodX is a community-driven blood donation platform built to
            connect donors, volunteers, and patients through trust, technology,
            and compassion.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <div className="card  shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-2xl text-red-500">
                Our Mission
              </h2>
              <p className="text-base-content/80">
                Our mission is to ensure that no life is lost due to the lack of
                blood. We aim to make blood donation faster, safer, and more
                accessible by building a reliable digital platform that
                empowers communities to help each other in critical moments.
              </p>
            </div>
          </div>

          <div className="card  shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-2xl text-red-500">
                Our Vision
              </h2>
              <p className="text-base-content/80">
                We envision a future where voluntary blood donation becomes a
                habit, emergency blood requests are fulfilled instantly, and
                technology bridges the gap between donors and patients across
                the nation.
              </p>
            </div>
          </div>
        </div>

        {/* Why BloodX */}
        <div className="">
          <h2 className="text-3xl font-bold text-center text-red-500 mb-10">
            Why Choose BloodX?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card  shadow-md text-center">
              <div className="card-body items-center">
                <FaHandHoldingHeart className="text-4xl text-red-500 mb-3" />
                <h3 className="font-semibold text-lg">
                  Save Lives
                </h3>
                <p className="text-base-content/70 text-sm">
                  A single blood donation can save up to three lives and bring
                  hope to families in need.
                </p>
              </div>
            </div>

            <div className="card  shadow-md text-center">
              <div className="card-body items-center">
                <FaUsers className="text-4xl text-red-500 mb-3" />
                <h3 className="font-semibold text-lg">
                  Strong Community
                </h3>
                <p className="text-base-content/70 text-sm">
                  We connect donors, volunteers, and organizations to respond
                  quickly during emergencies.
                </p>
              </div>
            </div>

            <div className="card  shadow-md text-center">
              <div className="card-body items-center">
                <FaHeartbeat className="text-4xl text-red-500 mb-3" />
                <h3 className="font-semibold text-lg">
                  Health Awareness
                </h3>
                <p className="text-base-content/70 text-sm">
                  Donating blood helps monitor your health and encourages a
                  healthier lifestyle.
                </p>
              </div>
            </div>

            <div className="card  shadow-md text-center">
              <div className="card-body items-center">
                <FaShieldAlt className="text-4xl text-red-500 mb-3" />
                <h3 className="font-semibold text-lg">
                  Safe & Secure
                </h3>
                <p className="text-base-content/70 text-sm">
                  Verified donors, secure data handling, and transparent
                  processes ensure trust and safety.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}

      </div>
    </div>
  );
};

export default About;
