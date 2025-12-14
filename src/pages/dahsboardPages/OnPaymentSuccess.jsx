import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useAxiosInstance from "../../hooks and contexts/axios/useAxiosInstance";
import { LoadingBubbles } from "../../LoadingAnimations";
import { FiCheckCircle } from "react-icons/fi";

const OnPaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosInstance = useAxiosInstance();
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateBookingInfo = async () => {
      if (!sessionId) return;
      try {
        const res = await axiosInstance.patch(
          `/on-payment-success?session_id=${sessionId}`
        );
        setPaymentData(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    updateBookingInfo();
  }, [axiosInstance, sessionId]);

  if (loading) return <LoadingBubbles></LoadingBubbles>;

  return (
    <div className="min-h-screen mx-auto flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 text-center max-w-md w-full">
        <FiCheckCircle size={60} className="text-green-500 mx-auto mb 4" />

        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Payment Successful
        </h1>

        <p className="text-gray-600 mb-6">
          Your payment has been processed successfully. Thank you for using our
          service.
        </p>

        <div className="my-5">
          <p className="font-semibold">
            Your transaction ID:
            <small> {paymentData?.transactionId}</small>
          </p>
        </div>

        <Link
          to="/dashboard"
          className="inline-block bg-primary text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default OnPaymentSuccess;
