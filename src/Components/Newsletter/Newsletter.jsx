import React, { useState } from "react";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { toast } from "react-toastify";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter a valid email address");
      return;
    }

    // You can connect this with backend later
    toast.success("Thank you for subscribing to our newsletter!");
    setEmail("");
  };

  return (
    <section className="  py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="card  shadow-sm dark:shadow-white">
          <div className="card-body text-center">
            {/* Icon */}
            <div className="flex justify-center">
              <div className=" rounded-full bg-red-100">
                <FaEnvelopeOpenText className="text-4xl text-red-500" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-red-500">
              Subscribe to Our Newsletter
            </h2>

            {/* Description */}
            <p className="mt-3 text-base-content/70 max-w-2xl mx-auto">
              Stay updated with the latest blood donation campaigns, emergency
              alerts, success stories, and health tips. Together, we save lives.
            </p>

            {/* Form */}
            <form
              onSubmit={handleSubscribe}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="input input-bordered w-full sm:w-96"
              />

              <button
                type="submit"
                className="btn bg-red-500 text-white"
              >
                Subscribe
              </button>
            </form>

            {/* Footer text */}
            <p className="text-sm text-base-content/60 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
