import { CheckCircle, AlertCircle } from "lucide-react";

export default function HotelCancel() {
  return (
    <div className="mt-8 bg-white rounded-xl shadow p-6 border">
      <h3 className="text-xl font-bold text-center text-[#F4612B] mb-6">
        Cancellation Policy
      </h3>

      {/* 100% Refund */}
      <div className="flex gap-3 p-4 rounded-lg bg-orange-50 border-l-4 border-[#F4612B] mb-4">
        <CheckCircle className="text-[#F4612B] mt-1" size={20} />
        <p className="text-sm text-gray-700">
          Cancel the hotel <b>7 days or more</b> before the departure date and
          get a <span className="text-green-600 font-semibold">100% refund</span>.
        </p>
      </div>

      {/* Partial Refund */}
      <div className="flex gap-3 p-4 rounded-lg bg-red-50 border-l-4 border-red-400 mb-4">
        <AlertCircle className="text-red-400 mt-1" size={20} />
        <p className="text-sm text-gray-700">
          If you cancel the hotel <b>7 days or less</b> before departure,
          <span className="font-semibold text-red-600">
            {" "}
            30% of the total amount
          </span>{" "}
          will be deducted as cancellation charges.
        </p>
      </div>

      <p className="text-xs text-center text-gray-500">
        Refunds will be processed within <b>7–10 working days</b> to the original
        payment method.
      </p>
    </div>
  );
}
