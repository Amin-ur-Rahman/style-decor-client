import React, { useState, useMemo } from "react";
import useAxiosInstance from "../../hooks and contexts/axios/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import useUserInfo from "../../hooks and contexts/role/useUserInfo";
import { LoadingBubbles } from "../../LoadingAnimations";
import NoData from "../../components/NoData";
import { HiCalendar, HiClock, HiCash, HiLocationMarker } from "react-icons/hi";
import { MdEdit } from "react-icons/md";
import Swal from "sweetalert2";
import EditBookingModal from "../../components/modals/EditBookingModal";

const MyBookings = () => {
  const axiosInstance = useAxiosInstance();
  const { userData, infoLoading } = useUserInfo();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [sortBy, setSortBy] = useState("recent");

  const {
    data: bookings,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-bookings", userData?.userEmail],
    enabled: !!userData && !infoLoading,
    queryFn: async () => {
      const res = await axiosInstance.get(`/bookings/${userData.userEmail}`);
      return res.data;
    },
    throwOnError: (error) => {
      console.log(error.message);
    },
  });

  // Sort bookings based on selected option
  const sortedBookings = useMemo(() => {
    if (!bookings) return [];

    let sorted = [...bookings];

    switch (sortBy) {
      case "recent":
        sorted.sort(
          (a, b) => new Date(b.scheduleDate) - new Date(a.scheduleDate)
        );
        break;
      case "oldest":
        sorted.sort(
          (a, b) => new Date(a.scheduleDate) - new Date(b.scheduleDate)
        );
        break;
      case "paid":
        sorted = sorted.filter((b) => b.paymentStatus === "paid");
        break;
      case "unpaid":
        sorted = sorted.filter((b) => b.paymentStatus === "unpaid");
        break;
      default:
        break;
    }

    return sorted;
  }, [bookings, sortBy]);

  const handleEditBooking = (booking) => {
    setSelectedBooking(booking);
    setIsEditModalOpen(true);
  };

  const handleSaveBooking = async (updatedData) => {
    try {
      const res = await axiosInstance.patch(
        `/bookings/${selectedBooking._id}`,
        updatedData
      );

      Swal.fire({
        title: "Success!",
        text: "Booking updated successfully",
        icon: "success",
        confirmButtonColor: "#2F5F5D",
      });
      console.log(res);

      refetch();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to update booking",
        icon: "error",
      });
    }
  };

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

  const handleCancelBooking = async (booking) => {
    try {
      const result = await Swal.fire({
        title: "Cancel this booking?",
        text: "This action cannot be reversed",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#008000",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Cancel booking",
      });
      if (result.isConfirmed) {
        const res = await axiosInstance.delete(`/bookings/${booking._id}`);
        console.log(res.data.message);
        Swal.fire({
          title: "Deleted!",
          text: `${res.data.message}`,
          icon: "success",
        });
        refetch();
        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
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
    <>
      <div className="w-full mx-auto py-8">
        {/* ------------heading with sort------------ */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              My Bookings
            </h1>
            <p className="text-gray-600">
              View and manage all your service bookings
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">
              Sort by:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-neutral rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            >
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest First</option>
              <option value="paid">Paid Only</option>
              <option value="unpaid">Unpaid Only</option>
            </select>
          </div>
        </div>

        {/* ---------the table------------ */}
        <div className="bg-white rounded-lg border border-neutral shadow-sm">
          <div className="overflow-x-auto">
            <table className="overflow-x-auto text-nowrap w-full">
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
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral">
                {sortedBookings.length > 0 ? (
                  sortedBookings.map((booking, index) => (
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
                            <small>
                              {" "}
                              {new Date(
                                booking.scheduleDate
                              ).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </small>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <HiClock className="w-4 h-4 text-gray-400" />
                            <small>{booking.scheduleTime}</small>
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

                      {/* -------------actions-------------- */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-2">
                          {/* Edit Button - Show only for pending bookings */}
                          {booking.status === "pending" && (
                            <button
                              onClick={() => handleEditBooking(booking)}
                              className="flex items-center justify-center gap-1 px-3 py-1.5 bg-accent/10 hover:bg-accent/20 text-accent text-xs font-medium rounded-lg transition-all"
                            >
                              <MdEdit className="w-3.5 h-3.5" />
                              Edit
                            </button>
                          )}

                          {/* Payment Button */}
                          {booking.paymentStatus === "unpaid" && (
                            <>
                              <button
                                onClick={() => handlePayment(booking)}
                                className="px-4 py-1.5 border-[0.5px] border-primary/10 bg-primary/10 hover:bg-primary/90 hover:text-white text-xs rounded-lg transition-all"
                              >
                                Pay Now
                              </button>
                              <button
                                onClick={() => {
                                  handleCancelBooking(booking);
                                }}
                                className="text-red-400 hover:border bg-red-200 hover:border-red-200 hover:bg-red-400 hover:text-white p-1 rounded-md"
                              >
                                <small>Cancel</small>
                              </button>
                            </>
                          )}

                          {/* Payment Status Badge */}
                          {booking.paymentStatus !== "unpaid" && (
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getPaymentBadge(
                                booking.paymentStatus
                              )}`}
                            >
                              {booking.paymentStatus}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center">
                      <p className="text-gray-500">
                        No bookings found for this filter
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ----------------little summary----------- */}
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm text-gray-600">
          <p>
            Showing {sortedBookings.length} of {bookings.length} booking
            {bookings.length !== 1 ? "s" : ""}
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

      {/* ------------------edit modal----------------- */}
      <EditBookingModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        bookingData={selectedBooking}
        onSubmit={handleSaveBooking}
      />
    </>
  ) : (
    <NoData message="No bookings found" />
  );
};

export default MyBookings;
