import React from "react";
import { FaHeartbeat, FaUser, FaHandsHelping, FaSyringe } from "react-icons/fa";

const Highlights = () => {
  const highlights = [
    {
      id: 1,
      icon: <FaHeartbeat className="text-4xl text-red-500" />,
      number: "12,345",
      label: "Lives Saved",
    },
    {
      id: 2,
      icon: <FaUser className="text-4xl text-red-500" />,
      number: "8,567",
      label: "Active Donors",
    },
    {
      id: 3,
      icon: <FaHandsHelping className="text-4xl text-red-500" />,
      number: "2,432",
      label: "Volunteers",
    },
    {
      id: 4,
      icon: <FaSyringe className="text-4xl text-red-500" />,
      number: "15,890",
      label: "Blood Units Collected",
    },
  ];

  return (
    <section className=" pb-10 pt-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-red-500">
            Highlights
          </h2>
          <p className="mt-4 text-base-content/70 max-w-2xl mx-auto">
            See how BloodX is making a real impact in the community with our
            dedicated donors, volunteers, and life-saving blood donations.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {highlights.map((item) => (
            <div
              key={item.id}
              className="card bg-base-100 dark:bg-gray-700 shadow-md hover:shadow-xl dark:shadow-white transition duration-300 p-6 text-center"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-3xl font-bold text-red-500">{item.number}</h3>
              <p className="text-base-content/70 mt-2">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
