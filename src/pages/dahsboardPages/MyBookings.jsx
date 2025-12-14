import React from "react";
import useAxiosInstance from "../../hooks and contexts/axios/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import useUserInfo from "../../hooks and contexts/role/useUserInfo";
import { LoadingBubbles } from "../../LoadingAnimations";
import NoData from "../../components/NoData";
import { HiCalendar, HiClock, HiCash, HiLocationMarker } from "react-icons/hi";
import Swal from "sweetalert2";

const MyBookings = () => {
  const axiosInstance = useAxiosInstance();
  const { userData, infoLoading } = useUserInfo();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["my-bookings", userData?.userEmail],
    enabled: !!userData && !infoLoading,
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/bookings?email=${userData.userEmail}`
      );
      return res.data;
    },
    throwOnError: (error) => {
      console.log(error.message);
    },
  });

  const handlePayment = async (booking) => {
    Swal.fire({
      title: "Continue with payment?",
      text: `you will be charged ${booking.payableAmount} BDT`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Proceed",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosInstance.post(
          "/create-checkout-session",
          booking
        );
        console.log(res.data);

        window.location.assign(res.data.url);
        return res.data;
      }
    });
  };

  // Status badge styles
  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-700",
      confirmed: "bg-blue-100 text-blue-700",
      completed: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700",
    };
    return styles[status] || styles.pending;
  };

  const getPaymentBadge = (paymentStatus) => {
    const styles = {
      unpaid: "bg-red-100 text-red-700",
      paid: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
    };
    return styles[paymentStatus] || styles.unpaid;
  };

  if (isLoading || infoLoading) return <LoadingBubbles></LoadingBubbles>;

  return bookings && bookings.length > 0 ? (
    <div className="w-[90dvw] mx-auto py-8">
      {/* ------------heading------------ */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Bookings</h1>
        <p className="text-gray-600">
          View and manage all your service bookings
        </p>
      </div>

      {/* ---------the table------------ */}
      <div className="bg-white rounded-lg border border-neutral shadow-sm overflow-hidden">
        <div className="overflow-x-auto max-w-full">
          <table className="w-full min-w-max">
            <thead className="bg-secondary">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Service Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Payment
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral">
              {bookings.map((booking, index) => (
                <tr
                  key={booking._id}
                  className="hover:bg-secondary/50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    {index + 1}
                  </td>

                  {/* ---------------service name----------------- */}
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {booking.serviceName}
                      </p>
                      {booking.quantity > 0 && (
                        <p className="text-xs text-gray-500 mt-1">
                          Qty: {booking.quantity} × BDT: {booking.unitPrice}
                        </p>
                      )}
                    </div>
                  </td>

                  {/* -------------booking type---------------- */}
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium capitalize">
                      {booking.bookingType}
                    </span>
                  </td>

                  {/* --------------date and time-------------- */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 text-sm text-gray-700">
                        <HiCalendar className="w-4 h-4 text-gray-400" />
                        {new Date(booking.bookingDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <HiClock className="w-4 h-4 text-gray-400" />
                        {booking.bookingTime}
                      </div>
                    </div>
                  </td>

                  {/* ------------location------------ */}
                  <td className="px-6 py-4">
                    {booking.bookingType === "decoration" ? (
                      <div className="flex items-start gap-1 text-sm text-gray-600">
                        <HiLocationMarker className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs">
                            {booking.serviceArea}, {booking.serviceCity}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-600 capitalize">
                        {booking.consultationType}
                      </span>
                    )}
                  </td>

                  {/* ------------amount------------- */}
                  <td className="px-6 py-4">
                    {booking.payableAmount > 0 ? (
                      <div className="flex items-center gap-1">
                        <HiCash className="w-4 h-4 text-primary" />
                        <span className="text-sm font-bold text-primary">
                          ৳{booking.payableAmount.toLocaleString()}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Free</span>
                    )}
                  </td>

                  {/* ---------------booking status--------------- */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </td>

                  {/* -------------payment status-------------- */}
                  <td className="px-6 py-4">
                    {booking.paymentStatus === "unpaid" ? (
                      <button
                        onClick={() => handlePayment(booking)}
                        className="px-4 py-2 bg-primary hover:bg-primary/90 text-white text-xs font-semibold rounded-lg transition-all"
                      >
                        Pay Now
                      </button>
                    ) : (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getPaymentBadge(
                          booking.paymentStatus
                        )}`}
                      >
                        {booking.paymentStatus}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ----------------little summary----------- */}
      <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
        <p>
          Showing {bookings.length} booking{bookings.length !== 1 ? "s" : ""}
        </p>
        <p>
          Total Unpaid:{" "}
          <span className="font-bold text-red-600">
            ৳
            {bookings
              .filter((b) => b.paymentStatus === "unpaid")
              .reduce((sum, b) => sum + b.payableAmount, 0)
              .toLocaleString()}
          </span>
        </p>
      </div>
    </div>
  ) : (
    <NoData message="No bookings found" />
  );
};

export default MyBookings;
