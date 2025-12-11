import {
  FaHandHoldingHeart,
  FaTint,
  FaUsers,
  FaAmbulance,
  FaShieldAlt,
  FaHeartbeat,
} from "react-icons/fa";

const FeaturedSection = () => {
  const features = [
    {
      icon: <FaHandHoldingHeart className="text-4xl text-red-600" />,
      title: "Save Lives Every Day",
      desc: "One donation can save up to three lives. Your blood can be the turning point in someone’s critical moment.",
    },
    {
      icon: <FaTint className="text-4xl text-red-600" />,
      title: "100% Safe Donation",
      desc: "Our platform follows medical-grade safety standards to ensure every donation is hygienic and risk-free.",
    },
    {
      icon: <FaUsers className="text-4xl text-red-600" />,
      title: "Strong Donor Community",
      desc: "Join thousands of compassionate donors who step up for society when it matters the most.",
    },
    {
      icon: <FaAmbulance className="text-4xl text-red-600" />,
      title: "Emergency Support",
      desc: "Instant donor-matching helps patients receive blood quickly during accidents or urgent medical needs.",
    },
    {
      icon: <FaShieldAlt className="text-4xl text-red-600" />,
      title: "Secure & Verified System",
      desc: "We verify donor profiles to keep the donation process reliable, transparent, and trustworthy.",
    },
    {
      icon: <FaHeartbeat className="text-4xl text-red-600" />,
      title: "Health Benefits",
      desc: "Blood donation improves heart health, stimulates blood cell production, and offers wellness checks.",
    },
  ];

  return (
    <div className="py-16 bg-white">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-red-600">
          Why Our Platform Best ?
        </h2>
        <p className="text-gray-600 mt-2">
          Designed to connect donors and patients with trust, safety, and care.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-red-200 rounded-xl shadow-md hover:shadow-xl hover:border-red-400 transition duration-300 p-6 text-center group"
          >
            <div className="flex justify-center mb-4">
              <div className="bg-red-50 p-4 rounded-full group-hover:bg-red-100 transition">
                {item.icon}
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {item.title}
            </h3>

            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedSection;
