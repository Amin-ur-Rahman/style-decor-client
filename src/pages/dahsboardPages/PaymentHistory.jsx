import React from "react";
import useAxiosInstance from "../../hooks and contexts/axios/useAxiosInstance";
import useUserInfo from "../../hooks and contexts/role/useUserInfo";
import { useQuery } from "@tanstack/react-query";
import { LoadingBubbles } from "../../LoadingAnimations";
import NoData from "../../components/NoData";
import { HiEye, HiCash, HiCalendar, HiCheckCircle } from "react-icons/hi";

const PaymentHistory = () => {
  const axiosInstance = useAxiosInstance();
  const { userData, infoLoading } = useUserInfo();

  const { data: payments, isLoading } = useQuery({
    queryKey: ["payment-history"],
    enabled: !!userData && !infoLoading,
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/payments?userEmail=${userData.userEmail}`
      );
      return res.data;
    },
  });

  const handleViewDetails = (bookingId) => {
    console.log("View payment details for booking:", bookingId);
    // Navigate to booking details or open modal
  };

  const getPaymentStatusBadge = (status) => {
    const styles = {
      paid: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      failed: "bg-red-100 text-red-700",
      refunded: "bg-blue-100 text-blue-700",
    };
    return styles[status] || styles.pending;
  };

  if (infoLoading || isLoading) return <LoadingBubbles></LoadingBubbles>;

  return payments && payments.length > 0 ? (
    <div className="w-[90dvw] mx-auto py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment History
        </h1>
        <p className="text-gray-600">View all your payment transactions</p>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg border border-neutral shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-secondary">
              <tr>
                <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  #
                </th>
                <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Amount Paid
                </th>
                <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Currency
                </th>
                <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Payment Date
                </th>
                <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 md:px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral">
              {payments.map((payment, index) => (
                <tr
                  key={payment._id}
                  className="hover:bg-secondary/50 transition-colors"
                >
                  {/* Index */}
                  <td className="px-4 md:px-6 py-4 text-sm font-medium text-gray-700">
                    {index + 1}
                  </td>

                  {/* Transaction ID */}
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center gap-2">
                      <HiCheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span
                        className="text-sm font-mono text-gray-700 truncate max-w-[200px]"
                        title={payment.transactionId}
                      >
                        {payment.transactionId}
                      </span>
                    </div>
                  </td>

                  {/* Amount Paid */}
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center gap-1">
                      <HiCash className="w-4 h-4 text-primary" />
                      <span className="text-sm font-bold text-primary">
                        {payment.amountPaid.toLocaleString()}
                      </span>
                    </div>
                  </td>

                  {/* Currency */}
                  <td className="px-4 md:px-6 py-4">
                    <span className="text-sm text-gray-700 uppercase font-semibold">
                      {payment.currency}
                    </span>
                  </td>

                  {/* Payment Date */}
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-700">
                      <HiCalendar className="w-4 h-4 text-gray-400" />
                      {new Date(payment.paid_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(payment.paid_at).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </td>

                  {/* Payment Status */}
                  <td className="px-4 md:px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getPaymentStatusBadge(
                        payment.paymentStatus
                      )}`}
                    >
                      {payment.paymentStatus}
                    </span>
                  </td>

                  {/* Action Button */}
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleViewDetails(payment.bookingId)}
                        className="group relative p-2 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                        title="View Details"
                      >
                        <HiEye className="w-5 h-5" />
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                          View Details
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm text-gray-600">
        <p>
          Showing {payments.length} payment{payments.length !== 1 ? "s" : ""}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <p>
            Total Paid:{" "}
            <span className="font-bold text-green-600">
              {payments[0]?.currency.toUpperCase()}{" "}
              {payments
                .reduce((sum, p) => sum + p.amountPaid, 0)
                .toLocaleString()}
            </span>
          </p>
        </div>
      </div>
    </div>
  ) : (
    <NoData message="No payment history found" />
  );
};

export default PaymentHistory;
