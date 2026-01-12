import React, { useState } from "react";
import useAxiosInstance from "../../../hooks and contexts/axios/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { LoadingBubbles } from "../../../LoadingAnimations";
import NoData from "../../../components/NoData";
import { HiX, HiUserAdd, HiCalendar, HiClock } from "react-icons/hi";
import Swal from "sweetalert2";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const ManageBookings = () => {
  const axiosInstance = useAxiosInstance();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("recent");
  const [filters, setFilters] = useState({
    bookingType: "",
    paymentStatus: "",
    status: "",
  });

  // Theme Constants (Updated to match your palette)
  const colors = {
    primary:
      getComputedStyle(document.documentElement)
        .getPropertyValue("--color-primary")
        .trim() || "#2f5f5d",
    cancel: "#ef4444",
    neutral:
      getComputedStyle(document.documentElement)
        .getPropertyValue("--color-neutral")
        .trim() || "#e5ddd5",
  };

  const {
    data: bookings = [],
    isLoading: bookingsLoading,
    isError: bookingsError,
    refetch: bookingsRefetch,
  } = useQuery({
    queryKey: ["all-bookings"],
    queryFn: async () => {
      const res = await axiosInstance.get("/bookings/admin");
      return res.data;
    },
  });

  const {
    data: decorators = [],
    isLoading: decoLoading,
    refetch: decoRefetch,
  } = useQuery({
    queryKey: [
      "manage-decorators",
      selectedBooking?._id,
      selectedBooking?.serviceCity,
    ],
    enabled: !!selectedBooking,
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/decorators?serviceCategory=${selectedBooking.serviceCategory}&city=${selectedBooking.serviceCity}`
      );
      return res.data;
    },
  });

  const handleFindDecorators = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleAssignDecorator = async (decorator) => {
    const result = await Swal.fire({
      title: "Assign Decorator?",
      text: `Assign ${decorator.decoratorName} to this booking?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: colors.primary,
      cancelButtonColor: colors.neutral,
      confirmButtonText: "Yes, assign",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosInstance.patch(
          `/decorator/${decorator._id}/assignment`,
          { bookingId: selectedBooking._id }
        );
        Swal.fire({
          title: "Assigned!",
          text: "Decorator has been assigned successfully.",
          icon: "success",
          confirmButtonColor: colors.primary,
        });
        decoRefetch();
        bookingsRefetch();
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    }
  };

  const handleStatusUpdate = async (booking, newStatus, title) => {
    try {
      await axiosInstance.patch(`/consultation/${booking._id}/update`, {
        status: newStatus,
        bookingType: booking.bookingType,
      });
      Swal.fire({
        title: title,
        icon: "success",
        confirmButtonColor: colors.primary,
      });
      bookingsRefetch();
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  // Filter and sort logic
  const filteredBookings = bookings
    .filter((b) => b.status !== "completed")
    .filter((b) => {
      if (filters.bookingType && b.bookingType !== filters.bookingType)
        return false;
      if (filters.paymentStatus && b.paymentStatus !== filters.paymentStatus)
        return false;
      if (filters.status && b.status !== filters.status) return false;
      return true;
    })
    .sort((a, b) => {
      return sortBy === "recent"
        ? new Date(b.scheduleDate) - new Date(a.scheduleDate)
        : new Date(a.scheduleDate) - new Date(b.scheduleDate);
    });

  if (bookingsLoading) return <LoadingBubbles />;
  if (bookingsError || bookings.length === 0) return <NoData />;

  return (
    <div className="w-full overflow-hidden mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Manage Bookings
        </h1>
        <p className="text-text-secondary">
          View and manage all service bookings
        </p>
      </div>

      {/* Filters Section */}
      <div className="bg-bg-main rounded-xl border border-neutral/20 p-5 mb-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {["bookingType", "paymentStatus", "status"].map((filterKey) => (
            <div key={filterKey}>
              <label className="block text-xs font-semibold uppercase text-text-muted mb-2">
                {filterKey.replace(/([A-Z])/g, " $1")}
              </label>
              <select
                value={filters[filterKey]}
                onChange={(e) =>
                  setFilters({ ...filters, [filterKey]: e.target.value })
                }
                className="w-full px-4 py-2 bg-secondary border border-neutral/20 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm text-text-primary"
              >
                <option value="">All</option>
                {filterKey === "status" && (
                  <>
                    <option value="confirmed">Confirmed</option>
                    <option value="assigned">Assigned</option>
                    <option value="pending">Pending</option>
                  </>
                )}
                {/* Add other options as needed */}
              </select>
            </div>
          ))}
          <div>
            <label className="block text-xs font-semibold uppercase text-text-muted mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 bg-secondary border border-neutral/20 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm text-text-primary"
            >
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-bg-main rounded-xl border border-neutral/20 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full bg-bg-alt min-w-[1000px]">
            <thead className="bg-secondary/50 border-b border-neutral/10">
              <tr>
                {[
                  "Booking Info",
                  "Type",
                  "Schedule",
                  "Amount",
                  "Payment",
                  "Status",
                  "Action",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-4 text-left text-xs font-bold text-text-secondary uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral/10">
              {filteredBookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="hover:bg-secondary/20 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-text-primary">
                      {booking.bookedByName}
                    </p>
                    <p className="text-[10px] font-mono text-text-muted">
                      ID: {booking._id.slice(-8)}
                    </p>
                    <p className="text-xs text-primary font-medium">
                      {booking.serviceName}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-[10px] font-bold uppercase">
                      {booking.bookingType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">
                    <div className="flex items-center gap-2">
                      <HiCalendar className="text-primary" />{" "}
                      {new Date(booking.scheduleDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <HiClock className="text-primary" />{" "}
                      {booking.scheduleTime}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-text-primary">
                    ৳{booking.payableAmount?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                        booking.paymentStatus === "paid"
                          ? "bg-primary/10 text-primary"
                          : "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                      }`}
                    >
                      {booking.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                        booking.status === "confirmed"
                          ? "bg-primary/10 text-primary"
                          : booking.status === "assigned"
                          ? "bg-accent/10 text-accent"
                          : "bg-neutral/10 text-text-secondary"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {booking.bookingType === "decoration" && (
                        <button
                          disabled={
                            !["confirmed", "awaiting-reassignment"].includes(
                              booking.status
                            )
                          }
                          onClick={() => handleFindDecorators(booking)}
                          className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-hover disabled:bg-neutral/20 disabled:text-text-muted transition-all shadow-sm shadow-primary/20"
                        >
                          Find Decorators
                        </button>
                      )}

                      {booking.bookingType === "consultation" &&
                        booking.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleStatusUpdate(
                                  booking,
                                  "scheduled",
                                  "Confirmed"
                                )
                              }
                              className="text-xs font-bold text-primary hover:underline"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                handleStatusUpdate(
                                  booking,
                                  "cancelled",
                                  "Cancelled"
                                )
                              }
                              className="text-xs font-bold text-red-500 hover:underline"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      {booking.status === "completed" && (
                        <IoMdCheckmarkCircleOutline
                          size={22}
                          className="text-primary"
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Decorators Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-bg-main rounded-2xl w-full max-w-5xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-neutral/10 flex justify-between items-center bg-secondary/10">
              <div>
                <h3 className="text-xl font-bold text-text-primary">
                  Available Decorators
                </h3>
                <p className="text-sm text-text-secondary">
                  {selectedBooking?.serviceCity} •{" "}
                  {selectedBooking?.serviceName}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-text-muted hover:text-red-500 rounded-full transition-colors"
              >
                <HiX size={20} />
              </button>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {decoLoading ? (
                <LoadingBubbles />
              ) : (
                <table className="w-full text-left">
                  <thead className="text-[10px] uppercase font-bold text-text-muted border-b border-neutral">
                    <tr>
                      <th className="pb-3">Decorator</th>
                      <th className="pb-3">Exp</th>
                      <th className="pb-3">Rating</th>
                      <th className="pb-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral">
                    {decorators.map((deco) => (
                      <tr key={deco._id} className="group">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={deco.photoUrl}
                              className="w-10 h-10 rounded-full border-2 border-primary/20"
                              alt=""
                            />
                            <div>
                              <p className="text-sm font-bold text-text-primary">
                                {deco.decoratorName}
                              </p>
                              <p className="text-xs text-text-secondary">
                                {deco.contactNumber}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-sm text-text-secondary">
                          {deco.experienceYears} Years
                        </td>
                        <td className="py-4 text-sm font-bold text-accent">
                          ★ {deco.ratingAverage || "5.0"}
                        </td>
                        <td className="py-4">
                          <button
                            onClick={() => handleAssignDecorator(deco)}
                            className="flex items-center gap-2 mx-auto px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:scale-105 hover:bg-primary-hover transition-transform"
                          >
                            <HiUserAdd /> Assign
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="p-6 border-t border-neutral bg-secondary flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-lg"
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
