import React from "react";
import {
  FaTint,
  FaUsers,
  FaAmbulance,
  FaClipboardCheck,
  FaShieldAlt,
  FaHeartbeat,
} from "react-icons/fa";

const Services = () => {
  const services = [
    {
      icon: <FaTint className="text-4xl text-red-500" />,
      title: "Blood Donation Management",
      desc: "Easily register donors, track donation history, and manage blood availability in a secure and organized system.",
    },
    {
      icon: <FaUsers className="text-4xl text-red-500" />,
      title: "Donor & Volunteer Network",
      desc: "Build a strong network of verified donors and volunteers who are ready to help during emergencies.",
    },
    {
      icon: <FaAmbulance className="text-4xl text-red-500" />,
      title: "Emergency Blood Requests",
      desc: "Quickly find compatible donors and respond instantly to urgent blood requirements.",
    },
    {
      icon: <FaClipboardCheck className="text-4xl text-red-500" />,
      title: "Request Tracking & Approval",
      desc: "Track blood requests in real time with admin and volunteer verification for transparency and reliability.",
    },
    {
      icon: <FaShieldAlt className="text-4xl text-red-500" />,
      title: "Secure & Verified Platform",
      desc: "All users are verified and data is protected to ensure safety, trust, and accountability.",
    },
    {
      icon: <FaHeartbeat className="text-4xl text-red-500" />,
      title: "Health Awareness & Benefits",
      desc: "Encourage healthy donation habits while offering donors regular health insights and reminders.",
    },
  ];

  return (
    <section className=" py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-red-500">
            Our Services
          </h2>
          <p className="mt-4 text-base-content/70 max-w-3xl mx-auto">
            BloodX provides end-to-end blood donation management services to
            ensure timely support, transparency, and lifesaving impact.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="card bg-base-100 dark:bg-gray-700 shadow-md hover:shadow-xl dark:shadow-white transition duration-300"
            >
              <div className="card-body items-center text-center">
                <div className="mb-4 bg-red-50 p-4 rounded-full">
                  {service.icon}
                </div>
                <h3 className="card-title text-xl">
                  {service.title}
                </h3>
                <p className="text-base-content/70">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default Services;
