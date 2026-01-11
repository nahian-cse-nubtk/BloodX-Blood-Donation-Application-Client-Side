import React from "react";
import { FaCalendarAlt, FaUser } from "react-icons/fa";

const BlogSection = () => {
  const blogs = [
    {
      id: 1,
      title: "Why Blood Donation Matters More Than Ever",
      excerpt:
        "Blood donation saves millions of lives every year. Learn why regular donation is crucial for emergency care and long-term treatments.",
      author: "BloodX Team",
      date: "Jan 10, 2026",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1HPwBbOKLVFO_atnVv4HDfEgqNMLg2Wb0uw&s",
    },
    {
      id: 2,
      title: "Who Can Donate Blood? Eligibility Explained",
      excerpt:
        "Many people want to donate blood but are unsure about eligibility. This guide clears common myths and requirements.",
      author: "Health Advisor",
      date: "Jan 12, 2026",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIKPY1_LqT3Kyby1wuthd3bd4KYHXDzg8OXg&s",
    },
    {
      id: 3,
      title: "Emergency Blood Requests: How You Can Help",
      excerpt:
        "In emergencies, fast donor response is critical. Discover how BloodX connects donors and patients instantly.",
      author: "Volunteer Team",
      date: "Jan 15, 2026",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDsCriTm93KBYv254z3P555wPC4W9LzSZ3HQ&s",
    },
    {
      id: 4,
      title: "Health Benefits of Donating Blood Regularly",
      excerpt:
        "Blood donation doesn’t just help others—it can improve your own health. Learn about the benefits for donors.",
      author: "Medical Team",
      date: "Jan 18, 2026",
      image:
        "https://img.freepik.com/premium-vector/blood-kawaii-cartoon_125446-708.jpg?w=360",
    },
  ];

  return (
    <section className=" py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-red-500">
            Latest Blogs
          </h2>
          <p className="mt-4 text-base-content/70 max-w-3xl mx-auto">
            Stay informed with articles on blood donation, health awareness,
            and community impact.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="card bg-base-100 dark:bg-gray-700 shadow-md hover:shadow-xl dark:shadow-white transition duration-300"
            >
              <figure>
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-48 w-full object-cover"
                />
              </figure>

              <div className="card-body">
                <h3 className="card-title text-lg">
                  {blog.title}
                </h3>

                <p className="text-base-content/70 text-sm">
                  {blog.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-base-content/60 mt-3">
                  <span className="flex items-center gap-1">
                    <FaUser /> {blog.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt /> {blog.date}
                  </span>
                </div>

                <div className="card-actions justify-end mt-4">

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BlogSection;
