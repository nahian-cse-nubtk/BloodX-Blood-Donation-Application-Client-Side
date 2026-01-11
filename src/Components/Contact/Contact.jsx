import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Your message has been sent successfully!");
    e.target.reset();
  };

  return (
    <div className="min-h-screen  py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-red-500">
            Contact Us
          </h1>
          <p className="mt-3 text-base-content/70">
            Have questions, feedback, or need help? We’d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-2xl text-red-500 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Our Address</h3>
                <p className="text-base-content/70">
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaPhoneAlt className="text-2xl text-red-500 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Phone</h3>
                <p className="text-base-content/70">
                  +880 1234 567 890
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaEnvelope className="text-2xl text-red-500 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Email</h3>
                <p className="text-base-content/70">
                  support@bloodx.com
                </p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-base-content/70">
                Our support team is available 24/7 to assist donors, volunteers,
                and patients with urgent needs.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col  form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="input w-full input-bordered"
                    required
                  />
                </div>

                <div className="form-control flex flex-col">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="form-control flex flex-col">
                  <label className="label">
                    <span className="label-text">Message</span>
                  </label>
                  <textarea
                    className="w-full textarea textarea-bordered h-32"
                    placeholder="Write your message..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn bg-red-600 w-full text-white"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
