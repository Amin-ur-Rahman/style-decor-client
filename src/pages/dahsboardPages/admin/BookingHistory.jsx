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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Booking History
        </h1>
        <p className="text-gray-600">{numberOfData} completed bookings</p>
      </div>

      {/* Bookings List */}
      <div className="space-y-4 mb-8">
        {completedBookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white rounded-lg border border-neutral p-6 hover:shadow-md transition-shadow"
          >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {booking.serviceName}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  ID: {booking._id.slice(-8)}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <HiUser className="w-4 h-4 text-primary" />
                  <span>{booking.bookedByName}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
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
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <HiLocationMarker className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>
                    {booking.serviceArea}, {booking.serviceCity}
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-2">
                  <HiCash className="w-5 h-5 text-primary" />
                  <span className="text-xl font-bold text-primary">
                    ${booking.amountPaid?.toLocaleString() || 0}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    Completed
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
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
        <div className="flex items-center justify-center gap-2">
          {[...Array(totalPage).keys()].map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={`px-4 py-2 rounded-lg border transition-all ${
                page === pageNum
                  ? "bg-primary text-white border-primary"
                  : "border-neutral hover:bg-primary hover:text-white hover:border-primary"
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
