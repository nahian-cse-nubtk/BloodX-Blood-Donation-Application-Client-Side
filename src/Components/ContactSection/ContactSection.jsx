import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import contact from '/contact.avif'
const ContactSection = () => {
  return (
    <div className="py-3 bg-white">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-red-600">
          Contact Us
        </h2>
        <p className="text-gray-600 mt-2">
          We are here to help you 24/7. Reach out anytime.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6">

        {/* Contact Form */}
        <div className="bg-white border border-red-200 rounded-xl shadow-lg p-8 shadow-red-100">
          <h3 className="text-2xl font-semibold text-red-600 mb-6">
            Send us a message
          </h3>

          <form className="space-y-5">
            <input
              type="text"
              placeholder="Your Full Name"
              className="input input-bordered w-full border-red-300 focus:border-red-500"
              required
            />

            <input
              type="email"
              placeholder="Your Email Address"
              className="input input-bordered w-full border-red-300 focus:border-red-500"
              required
            />

            <textarea
              placeholder="Write your message..."
              className="textarea textarea-bordered w-full h-32 border-red-300 focus:border-red-500"
              required
            ></textarea>

            <button className="btn bg-red-600 hover:bg-red-700 text-white w-full">
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-red-600 text-xl" />
              <p className="text-gray-700">+880 1234 567 890</p>
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope className="text-red-600 text-xl" />
              <p className="text-gray-700">support@bloodx.com</p>
            </div>

            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-red-600 text-xl" />
              <p className="text-gray-700">Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>

        {/* Contact Image */}
        <div className="flex justify-center items-center">
          <img
            src={contact}
            alt="contact us"
            className="rounded-full shadow-xl w-full h-auto object-cover shadow-red-100"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
