import React from "react";

const FAQ = () => {
  const faqs = [
    {
      id: 1,
      question: "Who can donate blood?",
      answer:
        "Any healthy person aged between 18 and 60 years, weighing at least 50kg, and free from major illnesses can donate blood. Our platform follows standard medical guidelines.",
    },
    {
      id: 2,
      question: "How often can I donate blood?",
      answer:
        "You can donate whole blood every 3 months. This allows your body enough time to replenish the donated blood safely.",
    },
    {
      id: 3,
      question: "Is blood donation safe?",
      answer:
        "Yes, blood donation is completely safe. We ensure sterile equipment, trained medical staff, and a hygienic environment for every donor.",
    },
    {
      id: 4,
      question: "How does BloodX help during emergencies?",
      answer:
        "BloodX connects patients with nearby verified donors instantly, enabling faster response during accidents, surgeries, or critical medical situations.",
    },
    {
      id: 5,
      question: "Do donors get any health benefits?",
      answer:
        "Yes. Blood donation improves heart health, stimulates blood cell production, and includes basic health checks like blood pressure and hemoglobin level.",
    },
    {
      id: 6,
      question: "How can I register as a donor?",
      answer:
        "Simply create an account, complete your profile with blood group and location, and you’ll be available for donation requests when needed.",
    },
  ];

  return (
    <section className=" py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-red-500">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base-content/70">
            Find answers to common questions about blood donation and our
            platform.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((item) => (
            <div
              key={item.id}
              className="collapse collapse-arrow bg-base-200"
            >
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-lg font-medium">
                {item.question}
              </div>
              <div className="collapse-content">
                <p className="text-base-content/80">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Help CTA */}
        
      </div>
    </section>
  );
};

export default FAQ;
