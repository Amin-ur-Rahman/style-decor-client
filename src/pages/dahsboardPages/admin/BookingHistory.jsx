import React, { useState } from "react";
import useAxiosInstance from "../../../hooks and contexts/axios/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { LoadingBubbles } from "../../../LoadingAnimations";
import NoData from "../../../components/NoData";
import { HiCalendar, HiLocationMarker, HiUser, HiCash } from "react-icons/hi";

const BookingHistory = () => {
  const axiosInstance = useAxiosInstance();
  const [page, setPage] = useState(0);
  const limit = 6;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["booking-history", page],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/booking-history/admin?limit=${limit}&page=${page}`
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingBubbles />;
  if (isError || !data) return <NoData />;

  const { completedBookings, numberOfData } = data;
  const totalPage = Math.ceil(numberOfData / limit);

  if (!completedBookings || completedBookings.length === 0) {
    return <NoData message="No completed bookings found" />;
  }

  return (
    <div className="w-full mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Booking History
        </h1>
        <p className="text-text-secondary">{numberOfData} completed bookings</p>
      </div>

      {/* Bookings List */}
      <div className="space-y-4 mb-8">
        {completedBookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-bg-alt rounded-xl border border-neutral p-6 hover:shadow-md transition-all duration-200"
          >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-2">
                <h3 className="text-lg font-bold text-text-primary mb-1">
                  {booking.serviceName}
                </h3>
                <p className="text-xs font-mono text-text-muted mb-4 uppercase tracking-wider">
                  Ref: {booking._id.slice(-8)}
                </p>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <div className="p-1.5 bg-bg-main rounded-md">
                    <HiUser className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium">{booking.bookedByName}</span>
                </div>
              </div>

              <div className="flex flex-col justify-center space-y-3">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <HiCalendar className="w-4 h-4 text-primary" />
                  <span>
                    {new Date(booking.scheduleDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </span>
                </div>
                <div className="flex items-start gap-2 text-sm text-text-secondary">
                  <HiLocationMarker className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="line-clamp-1">
                    {booking.serviceArea}, {booking.serviceCity}
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-between items-start lg:items-end">
                <div className="flex items-center gap-2 mb-3">
                  <HiCash className="w-5 h-5 text-accent" />
                  <span className="text-2xl font-bold text-text-primary">
                    ${booking.amountPaid?.toLocaleString() || 0}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-bold">
                    Completed
                  </span>
                  <span className="px-3 py-1 bg-primary/5 text-primary border border-primary/20 rounded-full text-xs font-bold">
                    Paid
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      {totalPage > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          {[...Array(totalPage).keys()].map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={`min-w-[40px] h-[40px] rounded-lg border font-medium transition-all ${
                page === pageNum
                  ? "bg-primary text-white border-primary shadow-sm shadow-primary/30"
                  : "bg-bg-alt border-neutral text-text-secondary hover:border-primary hover:text-primary"
              }`}
            >
              {pageNum + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
