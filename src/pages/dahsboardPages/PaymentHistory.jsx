import React, { useState } from "react";
import useAxiosInstance from "../../hooks and contexts/axios/useAxiosInstance";
import useUserInfo from "../../hooks and contexts/role/useUserInfo";
import { useQuery } from "@tanstack/react-query";
import { LoadingBubbles } from "../../LoadingAnimations";
import NoData from "../../components/NoData";
import { HiEye, HiCash, HiCalendar, HiCheckCircle, HiX } from "react-icons/hi";

const PaymentHistory = () => {
  const axiosInstance = useAxiosInstance();
  const { userData, infoLoading } = useUserInfo();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  const getPaymentStatusBadge = (status) => {
    // Keeping semantic colors for status, but adjusting for dark mode via standard tailwind or palette if preferred
    const styles = {
      paid: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      pending:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      failed: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
      refunded:
        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    };
    return styles[status] || styles.pending;
  };

  if (infoLoading || isLoading) return <LoadingBubbles></LoadingBubbles>;

  return payments && payments.length > 0 ? (
    <div className="mx-auto py-8 transition-colors duration-300">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Payment History
        </h1>
        <p className="text-text-secondary">
          View all your payment transactions
        </p>
      </div>

      <div className="bg-bg-alt rounded-lg border border-neutral shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full overflow-x-auto">
            <thead className="bg-secondary-dark">
              <tr>
                <th className="px-4 md:px-6 py-4 text-left text-xs font-bold text-text-primary uppercase tracking-wider">
                  #
                </th>
                <th className="px-4 md:px-6 py-4 text-left text-xs font-bold text-text-primary uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-4 md:px-6 py-4 text-left text-xs font-bold text-text-primary uppercase tracking-wider">
                  Amount Paid
                </th>
                <th className="px-4 md:px-6 py-4 text-left text-xs font-bold text-text-primary uppercase tracking-wider">
                  Currency
                </th>
                <th className="px-4 md:px-6 py-4 text-left text-xs font-bold text-text-primary uppercase tracking-wider">
                  Payment Date
                </th>
                <th className="px-4 md:px-6 py-4 text-left text-xs font-bold text-text-primary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 md:px-6 py-4 text-center text-xs font-bold text-text-primary uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral">
              {payments.map((payment, index) => (
                <tr
                  key={payment._id}
                  className="hover:bg-secondary transition-colors"
                >
                  <td className="px-4 md:px-6 py-4 text-sm font-medium text-text-secondary">
                    {index + 1}
                  </td>

                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center gap-2">
                      <HiCheckCircle className="w-4 h-4 text-accent shrink-0" />
                      <span
                        className="text-sm font-mono text-text-secondary truncate max-w-[200px]"
                        title={payment.transactionId}
                      >
                        {payment.transactionId}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center gap-1">
                      <HiCash className="w-4 h-4 text-primary" />
                      <span className="text-sm font-bold text-primary">
                        {(payment.amountPaid / 100).toLocaleString()}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 md:px-6 py-4">
                    <span className="text-sm text-text-secondary uppercase font-semibold">
                      {payment.currency}
                    </span>
                  </td>

                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-text-secondary">
                      <HiCalendar className="w-4 h-4 text-text-muted" />
                      {new Date(payment.paid_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <span className="text-xs text-text-muted">
                      {new Date(payment.paid_at).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </td>

                  <td className="px-4 md:px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getPaymentStatusBadge(
                        payment.paymentStatus
                      )}`}
                    >
                      {payment.paymentStatus}
                    </span>
                  </td>

                  <td className="px-4 md:px-6 py-4">
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleViewDetails(payment)}
                        className="group relative p-2 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                        title="View Details"
                      >
                        <HiEye className="w-5 h-5" />
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-neutral-dark text-text-primary text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-neutral">
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

      <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm text-text-muted">
        <p>
          Showing {payments.length} payment{payments.length !== 1 ? "s" : ""}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <p>
            Total Paid:{" "}
            <span className="font-bold text-primary">
              {payments[0]?.currency.toUpperCase()}{" "}
              {payments
                .reduce((sum, p) => sum + p.amountPaid, 0)
                .toLocaleString()}
            </span>
          </p>
        </div>
      </div>

      {/* --------------modal------------------ */}

      {selectedPayment && isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-hidden={!isModalOpen}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-details-title"
            className="relative z-10 w-full max-w-2xl mx-4 bg-bg-main rounded-xl shadow-2xl border border-neutral overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 md:p-8 max-h-[85vh] overflow-y-auto">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h3
                    id="payment-details-title"
                    className="text-2xl font-bold text-text-primary"
                  >
                    Payment Details
                  </h3>
                  <p className="text-sm text-text-muted mt-1">
                    Transaction information
                  </p>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close payment details"
                  className="ml-2 p-2 rounded-md text-text-secondary hover:bg-neutral transition"
                >
                  <HiX className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-5">
                <div className="pb-4 border-b border-neutral">
                  <p className="text-sm text-text-muted mb-1">Service</p>
                  <p className="text-lg font-semibold text-text-primary">
                    {selectedPayment?.serviceName}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-text-muted mb-1">Amount Paid</p>
                    <p className="text-2xl font-bold text-primary">
                      {(selectedPayment?.amountPaid / 100).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-text-muted mb-1">Currency</p>
                    <p className="text-lg font-semibold text-text-secondary uppercase">
                      {selectedPayment?.currency}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-text-muted mb-1">Transaction ID</p>
                  <pre className="text-sm font-mono bg-bg-alt p-3 rounded border border-neutral text-text-secondary break-all">
                    {selectedPayment?.transactionId}
                  </pre>
                </div>

                <div>
                  <p className="text-sm text-text-muted mb-2">Payment Status</p>
                  <div className="flex items-center gap-2">
                    <HiCheckCircle className="w-5 h-5 text-accent" />
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${getPaymentStatusBadge(
                        selectedPayment?.paymentStatus
                      )}`}
                    >
                      {selectedPayment?.paymentStatus}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-text-muted mb-1">Payment Date</p>
                  <p className="text-text-primary font-medium">
                    {new Date(selectedPayment?.paid_at).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                  <p className="text-sm text-text-muted mt-1">
                    {new Date(selectedPayment?.paid_at).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      }
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-text-muted mb-1">Client Email</p>
                  <p className="text-text-secondary">
                    {selectedPayment?.clientEmail}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-8 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-all font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <NoData message="No payment history found" />
  );
};

export default PaymentHistory;
