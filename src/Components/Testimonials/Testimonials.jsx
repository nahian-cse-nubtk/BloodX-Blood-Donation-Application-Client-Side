import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rahim Ahmed",
      role: "Blood Donor",
      image:
        "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      message:
        "BloodX made blood donation simple and meaningful. I was able to donate blood during an emergency and save a life. The process was smooth and well organized.",
    },
    {
      id: 2,
      name: "Nusrat Jahan",
      role: "Patient Relative",
      image:
        "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      message:
        "During a critical time, BloodX helped us find donors instantly. I’m extremely grateful to the volunteers and donors connected through this platform.",
    },
    {
      id: 3,
      name: "Tanvir Hasan",
      role: "Volunteer",
      image:
        "https://randomuser.me/api/portraits/men/76.jpg",
      rating: 4,
      message:
        "As a volunteer, BloodX allows me to connect donors with patients quickly. It’s a powerful platform that truly makes a difference in people’s lives.",
    },
  ];

  return (
    <section className="bg-base-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-red-500">
            What People Say
          </h2>
          <p className="mt-4 text-base-content/70 max-w-3xl mx-auto">
            Real experiences from donors, volunteers, and patients who have
            been impacted by BloodX.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="card bg-base-200 shadow-md hover:shadow-xl dark:shadow-white transition duration-300"
            >
              <div className="card-body">
                <FaQuoteLeft className="text-3xl text-red-400 mb-4" />

                <p className="text-base-content/80 mb-6">
                  “{item.message}”
                </p>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(item.rating)].map((_, index) => (
                    <FaStar
                      key={index}
                      className="text-yellow-400"
                    />
                  ))}
                </div>

                {/* User Info */}
                <div className="flex items-center gap-4 mt-auto">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full border"
                  />
                  <div>
                    <h4 className="font-semibold">
                      {item.name}
                    </h4>
                    <p className="text-sm text-base-content/60">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default Testimonials;
