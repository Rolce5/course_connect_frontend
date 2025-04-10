import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { processPayment } from "../../services/paymentService";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMobileAlt,
  FaLock,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";

const PaymentPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentLink, setPaymentLink] = useState("");

  const handlePayment = async (method) => {
    try {
      setSelectedMethod(method);
      setProcessing(true);

      await processPayment(courseId, method);

      setSuccess(true);
      setTimeout(() => {
        navigate(`/courses/${courseId}?payment=success`);
      }, 1500);
    } catch (error) {
      console.error("Payment failed:", error);
      setProcessing(false);
      setSelectedMethod(null);
    }
  };

  const handleFapshiPayment = async (courseId) => {
    try {
      console.log("starting");
      const response = await processPayment(courseId);
      setPaymentLink(response.link);
      console.log("Response:", response);

      // Redirect the user to the payment provider
      window.location.href = response.link;
    } catch (error) {
      console.error("Error initiating payment", error);
    }
  };

  const paymentMethods = [
    {
      id: "card",
      name: "Credit Card",
      icons: [<FaMobileAlt key="mobile" className="text-green-500 text-2xl" />],
      color: "from-purple-600 to-blue-500",
      processor: <FaMobileAlt className="text-purple-500 text-3xl" />,
    },
    {
      id: "paypal",
      name: "PayPal",
      icons: [<FaMobileAlt key="paypal" className="text-blue-500 text-3xl" />],
      color: "from-blue-500 to-blue-400",
      processor: <FaMobileAlt className="text-blue-500 text-3xl" />,
    },
    {
      id: "mobile",
      name: "Mobile Money",
      icons: [<FaMobileAlt key="mobile" className="text-green-500 text-2xl" />],
      color: "from-green-500 to-emerald-400",
      processor: (
        <div className="text-sm font-medium text-green-600">
          Mobile Payments
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <AnimatePresence>
        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
          >
            <div className="flex justify-center mb-6">
              <FaCheckCircle className="text-green-500 text-6xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Payment Successful!
            </h2>
            <p className="text-gray-600 mb-6">
              You now have full access to the course
            </p>
            <button
              onClick={() => navigate(`/courses/${courseId}`)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-all"
            >
              Go to Course
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-md w-full"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-blue-100 hover:text-white mb-4"
              >
                <FiArrowLeft className="mr-2" />
                Back
              </button>
              <h2 className="text-2xl font-bold">Complete Payment</h2>
              <p className="text-blue-100">
                Choose your preferred payment method
              </p>
            </div>

            <div className="p-6">
              <div className="space-y-4 mb-6">
                {paymentMethods.map((method) => (
                  <motion.div
                    key={method.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`border-2 rounded-xl overflow-hidden cursor-pointer transition-all ${
                      selectedMethod === method.id
                        ? "border-blue-500 ring-2 ring-blue-200"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => !processing && setSelectedMethod(method.id)}
                  >
                    <div
                      className={`bg-gradient-to-r ${method.color} p-4 flex justify-between items-center`}
                    >
                      <div className="flex items-center space-x-3">
                        {method.icons.map((icon, i) => (
                          <div key={i}>{icon}</div>
                        ))}
                        <span className="text-white font-medium">
                          {method.name}
                        </span>
                      </div>
                      {method.processor}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6 flex items-start">
                <FaLock className="text-green-500 mt-1 mr-3" />
                <div>
                  <p className="text-sm text-gray-700">
                    Your payment is secured with 256-bit encryption. We don't
                    store your payment details.
                  </p>
                </div>
              </div>

              <button
                onClick={() => selectedMethod && handlePayment(selectedMethod)}
                disabled={!selectedMethod || processing}
                className={`w-full py-4 px-6 rounded-xl text-white font-medium transition-all ${
                  processing
                    ? "bg-gray-400"
                    : selectedMethod
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                {processing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing Payment...
                  </div>
                ) : (
                  `Pay Now`
                )}
              </button>
            </div>

            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-center">
              <FaShieldAlt className="text-blue-500 mr-2" />
              <span className="text-sm text-gray-600">
                Secure SSL Encryption
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => handleFapshiPayment(courseId)}
        className={`w-full py-4 px-6 rounded-xl text-white font-medium transition-all bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
        }`}
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentPage;
