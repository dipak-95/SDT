import { motion } from "framer-motion";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";

export default function CarCanceletion() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className="
        bg-white rounded-2xl shadow-xl
        p-6 md:p-6
        border border-orange-100
        w-100
      "
    >
      {/* Header */}
      <h2 className="text-2xl font-bold text-[#F46B12] mb-4 text-center">
        Cancellation Policy
      </h2>

      {/* Policy Info */}
      <div className="space-y-3">
        {/* 2 Days */}
        <div className="
          flex items-start gap-3
          bg-orange-50 p-4 rounded-xl
          border-l-4 border-[#F46B12]
        ">
          <FiCheckCircle className="text-[#F46B12] text-xl mt-0.5" />
          <p className="text-sm text-gray-700">
            Cancel the Car <b>2 days or more</b> before the departure date
            and get a <b className="text-green-600">100% refund</b>.
          </p>
        </div>

        {/* Less than 2 days */}
        <div className="
          flex items-start gap-3
          bg-red-50 p-4 rounded-xl
          border-l-4 border-red-400
        ">
          <FiAlertCircle className="text-red-500 text-3xl mt-0.5" />
          <p className="text-sm text-gray-700">
            If you cancel the tour <b>2 days or less</b> before departure,
            <b className="text-red-600"> 30% of the tour amount</b> will be
            deducted as cancellation charges.
          </p>
        </div>
      </div>

      {/* Footer Note */}
      <p className="text-xs text-gray-500 mt-5 text-center">
        Refunds will be processed within 7–10 working days to the original
        payment method.
      </p>
    </motion.div>
  );
}
