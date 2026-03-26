import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaRupeeSign,
  FaUserTie,
  FaHeadset,
  FaBusAlt,
  FaStar
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const reasons = [
  {
    icon: <FaShieldAlt />,
    title: "Trusted Travel Partner",
    desc: "10+ years of experience in organizing Gujarat tours"
  },
  {
    icon: <FaRupeeSign />,
    title: "Best Price Guarantee",
    desc: "No hidden charges, transparent pricing"
  },
  {
    icon: <FaUserTie />,
    title: "Expert Tour Guides",
    desc: "Professional & knowledgeable local guides"
  },
  {
    icon: <FaBusAlt />,
    title: "Comfortable Travel",
    desc: "Well-maintained vehicles & smooth journeys"
  },
  {
    icon: <FaHeadset />,
    title: "24/7 Support",
    desc: "Dedicated support during the entire tour"
  },
  {
    icon: <FaStar />,
    title: "Highly Rated Tours",
    desc: "Loved by thousands of happy travelers"
  }
];

const WhyChooseUs = ({ tourId, type }) => {
  const navigate = useNavigate();

  const handleBook = () => {
    navigate(`/book-tour/${tourId}?type=${type}`);
    
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="
        bg-white
        rounded-2xl
        shadow-lg
        p-6
        h-fit
        self-start
        lg:sticky
        lg:top-24
      "
    >
      <h3 className="text-xl font-bold text-[#F4612B] mb-5 text-center">
        Why Choose Us
      </h3>

      <div className="space-y-4">
        {reasons.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="text-[#F4612B] bg-orange-100 p-3 rounded-full text-lg">
              {item.icon}
            </div>

            <div>
              <p className="font-semibold text-sm text-gray-800">
                {item.title}
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleBook}
        className="
          mt-6
          w-full
          bg-[#F4612B]
          text-white
          py-3
          rounded-full
          font-semibold
          hover:bg-[#e14c1f]
          transition
        "
      >
        Enquiry This Tour
      </button>
    </motion.div>
  );
};

export default WhyChooseUs;

