import React, { useState } from "react";
import useAxiosInstance from "../../../hooks and contexts/axios/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { LoadingBubbles } from "../../../LoadingAnimations";
import NoData from "../../../components/NoData";
import {
  HiX,
  HiUserAdd,
  HiCalendar,
  HiClock,
  HiCheck,
  HiBan,
} from "react-icons/hi";
import Swal from "sweetalert2";

const ManageBookings = () => {
  const axiosInstance = useAxiosInstance();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    bookingType: "",
    paymentStatus: "",
    status: "",
  });

  const {
    data: bookings = [],
    isLoading: bookingsLoading,
    isError: bookingsError,
    refetch: bookingsRefetch,
  } = useQuery({
    queryKey: ["all-bookings"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/bookings/admin");
        return res.data;
      } catch (error) {
        console.log(error.message || error);
      }
    },
  });

  const {
    data: decorators = [],
    isLoading: decoLoading,
    refetch: decoRefetch,
  } = useQuery({
    queryKey: [
      "manage-decorators",
      selectedBooking,
      selectedBooking?.serviceCity,
    ],
    enabled: !!selectedBooking || !!selectedBooking?.serviceCity,
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(
          `/decorators?applicationStatus=approved&isAvailable=true&city=${selectedBooking.serviceCity}`
        );
        console.log(selectedBooking);

        console.log(res.data);

        return res.data;
      } catch (error) {
        console.log(error.message || error);
      }
    },
  });
  console.log(decorators);

  const handleFindDecorators = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleAssignDecorator = async (decorator) => {
    const result = await Swal.fire({
      title: "Assign Decorator?",
      text: "This decorator will be assigned to this booking",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, approve",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosInstance.patch(
          `/decorator/${decorator._id}/assignment`,
          { bookingId: selectedBooking._id }
        );

        console.log(res.data);

        Swal.fire({
          title: "Decorator assigned",
          text: res.data?.decoratorUpdate,
          icon: "success",
        });
        decoRefetch();
        bookingsRefetch();
      } catch (error) {
        Swal.fire({
          title: "Something went wrong!",
          text: error?.message,
          icon: "warning",
        });
      }
    }
  };

  const handleConfirm = (bookingId) => {
    console.log("Confirm booking:", bookingId);
    // Handle confirm logic
  };

  const handleComplete = (bookingId) => {
    console.log("Complete booking:", bookingId);
    // Handle complete logic
  };

  const handleCancel = (bookingId) => {
    console.log("Cancel booking:", bookingId);
    // Handle cancel logic
  };

  // Filter bookings
  const filteredBookings = bookings.filter((booking) => {
    if (filters.bookingType && booking.bookingType !== filters.bookingType)
      return false;
    if (
      filters.paymentStatus &&
      booking.paymentStatus !== filters.paymentStatus
    )
      return false;
    if (filters.status && booking.status !== filters.status) return false;
    return true;
  });

  if (bookingsLoading) return <LoadingBubbles></LoadingBubbles>;
  if (bookings.length === 0 || bookingsError) return <NoData></NoData>;

  return (
    <div className="w-[90dvw] mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Manage Bookings
        </h1>
        <p className="text-gray-600">View and manage all service bookings</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-neutral p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Booking Type
            </label>
            <select
              value={filters.bookingType}
              onChange={(e) =>
                setFilters({ ...filters, bookingType: e.target.value })
              }
              className="w-full px-4 py-2 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Types</option>
              <option value="decoration">Decoration</option>
              <option value="consultation">Consultation</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Status
            </label>
            <select
              value={filters.paymentStatus}
              onChange={(e) =>
                setFilters({ ...filters, paymentStatus: e.target.value })
              }
              className="w-full px-4 py-2 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Payments</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
              className="w-full px-4 py-2 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="assigned">Assigned</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg border border-neutral shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-secondary">
              <tr>
                <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Booking Info
                </th>
                <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Scheduled Date
                </th>
                <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Payment
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
              {filteredBookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="hover:bg-secondary/50 transition-colors"
                >
                  {/* Booking Info */}
                  <td className="px-4 md:px-6 py-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {booking.bookedByName}
                      </p>
                      <p className="text-xs text-gray-500 font-mono mt-1">
                        ID: {booking._id.slice(-8)}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {booking.serviceName}
                      </p>
                    </div>
                  </td>

                  {/* Type */}
                  <td className="px-4 md:px-6 py-4">
                    <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium capitalize">
                      {booking.bookingType}
                    </span>
                  </td>

                  {/* Scheduled Date */}
                  <td className="px-4 md:px-6 py-4">
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

                  {/* Amount */}
                  <td className="px-4 md:px-6 py-4">
                    <p className="text-sm font-bold text-primary">
                      ${booking.payableAmount?.toLocaleString() || 0}
                    </p>
                  </td>

                  {/* Payment Status */}
                  <td className="px-4 md:px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        booking.paymentStatus === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {booking.paymentStatus}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 md:px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        booking.status === "confirmed"
                          ? "bg-blue-100 text-blue-700"
                          : booking.status === "assigned"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex justify-center gap-2">
                      {booking.bookingType === "decoration" ? (
                        <button
                          disabled={booking.status !== "confirmed"}
                          onClick={() => handleFindDecorators(booking)}
                          className={`px-4 py-2 ${
                            booking.status === "confirmed" &&
                            "bg-primary/90 hover:cursor-pointer hover:bg-primary/80 text-neutral"
                          }   text-xs font-semibold rounded-lg transition-all
                         `}
                        >
                          {booking.status === "confirmed" &&
                          booking.paymentStatus === "paid"
                            ? "Find Decorator"
                            : booking.status}
                        </button>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleConfirm(booking._id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all"
                            title="Confirm"
                          >
                            <HiCheck className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleCancel(booking._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Cancel"
                          >
                            <HiBan className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Showing {filteredBookings.length} of {bookings.length} bookings
      </div>

      {/* Decorators Modal */}
      {selectedBooking && isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-xl">
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-neutral">
              <div>
                <h3 className="text-2xl font-light text-text-primary">
                  Available Decorators
                </h3>
                <p className="text-sm text-text-muted mt-1">
                  City: {selectedBooking.serviceCity} • Service:{" "}
                  {selectedBooking.serviceName}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <HiX className="w-5 h-5 text-text-muted" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              {decoLoading ? (
                <div className="flex justify-center py-12">
                  <LoadingBubbles />
                </div>
              ) : decorators.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-text-muted">
                    No decorators available in this city
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto -mx-6 px-6">
                  <table className="w-full min-w-[800px]">
                    <thead className="bg-secondary border-b border-neutral">
                      <tr>
                        <th className="px-3 py-3 text-left text-[11px] font-semibold text-text-secondary uppercase tracking-wide min-w-[180px]">
                          Decorator
                        </th>
                        <th className="px-3 py-3 text-left text-[11px] font-semibold text-text-secondary uppercase tracking-wide min-w-[120px]">
                          Location
                        </th>
                        <th className="px-3 py-3 text-left text-[11px] font-semibold text-text-secondary uppercase tracking-wide min-w-[140px]">
                          Specialization
                        </th>
                        <th className="px-3 py-3 text-left text-[11px] font-semibold text-text-secondary uppercase tracking-wide min-w-[90px]">
                          Experience
                        </th>
                        <th className="px-3 py-3 text-left text-[11px] font-semibold text-text-secondary uppercase tracking-wide min-w-[80px]">
                          Rating
                        </th>
                        <th className="px-3 py-3 text-center text-[11px] font-semibold text-text-secondary uppercase tracking-wide min-w-[100px]">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral bg-white">
                      {decorators.map((decorator) => (
                        <tr
                          key={decorator._id}
                          className="hover:bg-secondary/50 transition-colors"
                        >
                          <td className="px-3 py-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={decorator.photoUrl}
                                alt={decorator.decoratorName}
                                className="w-10 h-10 rounded-full object-cover border border-neutral"
                              />
                              <div>
                                <p className="text-xs font-medium text-text-primary">
                                  {decorator.decoratorName}
                                </p>
                                <p className="text-[11px] text-text-muted">
                                  {decorator.contactNumber}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-3 py-3">
                            <p className="text-xs text-text-secondary">
                              {decorator.serviceLocation.area}
                            </p>
                            <p className="text-[11px] text-text-muted">
                              {decorator.serviceLocation.city}
                            </p>
                          </td>

                          <td className="px-3 py-3">
                            <div className="flex flex-wrap gap-1">
                              {decorator.specialization
                                .slice(0, 2)
                                .map((spec, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] rounded-full capitalize font-medium"
                                  >
                                    {spec}
                                  </span>
                                ))}
                              {decorator.specialization.length > 2 && (
                                <span className="px-2 py-0.5 bg-neutral text-text-muted text-[10px] rounded-full font-medium">
                                  +{decorator.specialization.length - 2}
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="px-3 py-3">
                            <p className="text-xs text-text-secondary">
                              {decorator.experienceYears} years
                            </p>
                          </td>

                          <td className="px-3 py-3">
                            <div className="text-xs text-text-secondary">
                              <span className="font-semibold">
                                {decorator.ratingAverage?.toFixed(1) || "0.0"}
                              </span>
                              <span className="text-text-muted">
                                {" "}
                                ({decorator.ratingCount || 0})
                              </span>
                            </div>
                          </td>

                          <td className="px-3 py-3">
                            <div className="flex justify-center">
                              <button
                                onClick={() => handleAssignDecorator(decorator)}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary hover:bg-primary-hover text-white text-xs font-medium rounded-lg transition-colors"
                              >
                                <HiUserAdd className="w-3.5 h-3.5" />
                                Assign
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end p-6 border-t border-neutral">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 bg-text-primary hover:bg-text-secondary text-white text-sm font-medium rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBookings;
