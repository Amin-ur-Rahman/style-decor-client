import React, { useMemo } from "react";
import useAxiosInstance from "../../../hooks and contexts/axios/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { LoadingBubbles } from "../../../LoadingAnimations";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  HiCash,
  HiTrendingUp,
  HiCalendar,
  HiExclamationCircle,
} from "react-icons/hi";

const AdminLandingPage = () => {
  const axiosInstance = useAxiosInstance();

  const {
    data: bookingData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-booking-data"],
    queryFn: async () => {
      const res = await axiosInstance.get("/bookings/admin");
      return res.data;
    },
  });

  // Calculating statistics
  const statistics = useMemo(() => {
    if (!bookingData.length) {
      return {
        totalRevenue: 0,
        monthlyRevenue: 0,
        todayRevenue: 0,
        pendingPayments: 0,
      };
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const totalRevenue = bookingData
      .filter((b) => b.paymentStatus === "paid")
      .reduce((sum, b) => sum + (b.amountPaid || 0), 0);

    const monthlyRevenue = bookingData
      .filter((b) => {
        if (b.paymentStatus !== "paid") return false;
        const bookingDate = new Date(b.createdAt);
        return (
          bookingDate.getMonth() === currentMonth &&
          bookingDate.getFullYear() === currentYear
        );
      })
      .reduce((sum, b) => sum + (b.amountPaid || 0), 0);

    const todayRevenue = bookingData
      .filter((b) => {
        if (b.paymentStatus !== "paid") return false;
        const bookingDate = new Date(b.createdAt);
        return bookingDate >= today;
      })
      .reduce((sum, b) => sum + (b.amountPaid || 0), 0);

    const pendingPayments = bookingData
      .filter((b) => b.paymentStatus === "unpaid")
      .reduce((sum, b) => sum + (b.payableAmount || 0), 0);

    return {
      totalRevenue,
      monthlyRevenue,
      todayRevenue,
      pendingPayments,
    };
  }, [bookingData]);

  // Service demand data for chart
  const serviceDemandData = useMemo(() => {
    if (!bookingData.length) return [];

    const serviceCount = bookingData.reduce((acc, booking) => {
      const serviceName = booking.serviceName || "Unknown";
      acc[serviceName] = (acc[serviceName] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(serviceCount)
      .map(([name, count]) => ({
        name: name.length > 25 ? name.substring(0, 25) + "..." : name,
        bookings: count,
      }))
      .sort((a, b) => b.bookings - a.bookings)
      .slice(0, 10);
  }, [bookingData]);

  if (isLoading) return <LoadingBubbles />;

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">Failed to load dashboard data</p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Overview of your business performance and analytics
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Revenue */}
        <div className="bg-white rounded-lg border border-neutral p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <HiCash className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800">
            ${statistics.totalRevenue.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-2">All time earnings</p>
        </div>

        {/* Monthly Revenue */}
        <div className="bg-white rounded-lg border border-neutral p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">
              Monthly Revenue
            </h3>
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
              <HiTrendingUp className="w-5 h-5 text-accent" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800">
            ${statistics.monthlyRevenue.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {new Date().toLocaleString("default", { month: "long" })}
          </p>
        </div>

        {/* Today's Revenue */}
        <div className="bg-white rounded-lg border border-neutral p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">
              Today's Revenue
            </h3>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <HiCalendar className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800">
            ${statistics.todayRevenue.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Pending Payments */}
        <div className="bg-white rounded-lg border border-neutral p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">
              Pending Payments
            </h3>
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <HiExclamationCircle className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800">
            ${statistics.pendingPayments.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-2">Awaiting payment</p>
        </div>
      </div>

      {/* Service Demand Chart */}
      <div className="bg-white rounded-lg border border-neutral p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Service Demand Analysis
          </h2>
          <p className="text-sm text-gray-600">
            Number of bookings per service (Top 10)
          </p>
        </div>

        {serviceDemandData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={serviceDemandData}
              margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5DDD5" />
              <XAxis
                dataKey="name"
                // angle={-25}
                textAnchor="end"
                height={120}
                tick={{ fontSize: 12, fill: "#6b7280" }}
              />
              <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #E5DDD5",
                  borderRadius: "8px",
                }}
                cursor={{ fill: "#F8F5F0" }}
              />
              <Legend wrapperStyle={{ paddingTop: "20px" }} />
              <Bar
                dataKey="bookings"
                fill="#2F5F5D"
                radius={[8, 8, 0, 0]}
                name="Total Bookings"
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-500">
            <p>No booking data available</p>
          </div>
        )}
      </div>

      {/* Quick Stats Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-neutral p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Total Bookings
          </h3>
          <p className="text-2xl font-bold text-gray-800">
            {bookingData.length}
          </p>
        </div>

        <div className="bg-white rounded-lg border border-neutral p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Completed Services
          </h3>
          <p className="text-2xl font-bold text-gray-800">
            {bookingData.filter((b) => b.status === "completed").length}
          </p>
        </div>

        <div className="bg-white rounded-lg border border-neutral p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Active Projects
          </h3>
          <p className="text-2xl font-bold text-gray-800">
            {
              bookingData.filter(
                (b) => b.status !== "completed" && b.status !== "cancelled"
              ).length
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLandingPage;
