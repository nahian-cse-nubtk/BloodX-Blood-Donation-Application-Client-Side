import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import slide1 from '/slide1.jpg'
import slide2 from '/slide2.jpg'
import slide3 from '/Slide3.jpg'
const images = [
  slide1,slide2,slide3
];

const textContent = [
  {
    title: "Donate Blood, Save Lives",
    desc: "Your single donation can help accident victims, surgery patients, and those fighting life-threatening diseases. Be the reason someone gets a second chance.",
  },
  {
    title: "Be a Life Saver",
    desc: "Heroes don’t always wear capes — sometimes they roll up their sleeves. Your contribution today can change someone’s tomorrow forever.",
  },
  {
    title: "Blood Volunteer",
    desc: "A few minutes of your time can give someone a lifetime. Become a blood volunteer and make a real difference with a simple, life-saving act.",
  }
];

const HeroBanner = () => {
  const [index, setIndex] = useState(0);

  // Auto slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full overflow-hidden bg-white py-5 px-6 md:px-16 border-3 border-red-400 rounded-2xl my-3 shadow-2xl shadow-red-100">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center relative">

        {/* LEFT TEXT SECTION */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-red-600 uppercase">
                {textContent[index].title}
              </h2>

              <p className="mt-4 text-gray-600 max-w-md">
                {textContent[index].desc}
              </p>

              <button className="mt-8 btn bg-red-600 hover:bg-red-700 border-none text-white px-8">
                Get Started
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="flex justify-center">
          <AnimatePresence mode="wait">
            <motion.img
              key={images[index]}
              src={images[index]}
              alt="blood volunteer"
              className="w-full max-w-md h-[400px]"
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -40 }}
              transition={{ duration: 0.6 }}
            />
          </AnimatePresence>
        </div>

        {/* DOTS INDICATOR */}
        <div className="absolute left-1/2 bottom-4 transform -translate-x-1/2 flex gap-3">
          {images.map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              className={`h-3 w-3 rounded-full cursor-pointer transition-all ${
                index === i ? "bg-red-600 scale-125" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
