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
  Cell,
} from "recharts";
import {
  HiCash,
  HiTrendingUp,
  HiCalendar,
  HiExclamationCircle,
  HiClipboardList,
  HiCheckCircle,
  HiClock,
} from "react-icons/hi";
import CustomTooltip from "./CustomTooltip";
import { CgSandClock } from "react-icons/cg";
import { GoVerified } from "react-icons/go";

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

  //   histogram data for service demand
  const histogramData = useMemo(() => {
    if (!bookingData.length) return [];

    //   bookings per service
    const serviceCount = bookingData.reduce((acc, booking) => {
      const serviceName = booking.serviceName || "Unknown";
      acc[serviceName] = (acc[serviceName] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(serviceCount)
      .map(([name, count]) => ({
        service: name.length > 30 ? name.substring(0, 30) + "..." : name,
        bookings: count,
      }))
      .sort((a, b) => b.bookings - a.bookings);
  }, [bookingData]);

  // Service demand data
  const serviceDemandData = useMemo(() => {
    if (!bookingData.length) return [];

    const serviceCount = bookingData.reduce((acc, booking) => {
      const serviceName = booking.serviceName || "Unknown";
      acc[serviceName] = (acc[serviceName] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(serviceCount)
      .map(([name, count]) => ({
        name: name.length > 20 ? name.substring(0, 20) + "..." : name,
        bookings: count,
      }))
      .sort((a, b) => b.bookings - a.bookings)
      .slice(0, 8);
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
    <div className="min-h-screen bg-secondary">
      <div className="w-full mx-auto py-8 px-4 max-w-7xl">
        {/* ---------------header---------------- */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text-primary mb-2">
            Admin Dashboard
          </h1>
          <p className="text-text-secondary">
            Overview of your business performance and analytics
          </p>
        </div>

        {/* statistic blocks-------------------- */}
        <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-bg-main  rounded-2xl border border-neutral p-6 hover:scale-105 transition-all duration-200 ease-in  hover:shadow-md ">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide">
                Total Revenue
              </h3>
              <div className="w-12 h-12 bg-linear-to-br from-primary to-primary-light rounded-xl flex items-center justify-center hover:scale-105 transition-all duration-200 ease-in ">
                <HiCash className="w-6 h-6 text-bg-main" />
              </div>
            </div>
            <p className="text-3xl font-bold text-text-primary mb-1">
              ${statistics.totalRevenue.toLocaleString()}
            </p>
            <p className="text-xs text-text-muted">All time earnings</p>
          </div>

          {/*-------------monthly revenue--------------- */}
          <div className="bg-bg-main rounded-2xl border border-neutral p-6 hover:scale-105 transition-all duration-200 ease-in  hover:shadow-md ">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide">
                Monthly Revenue
              </h3>
              <div className="w-12 h-12 bg-linear-to-br from-accent to-accent-light rounded-xl flex items-center justify-center hover:scale-105 transition-all duration-200 ease-in ">
                <HiTrendingUp className="w-6 h-6 text-bg-main" />
              </div>
            </div>
            <p className="text-3xl font-bold text-text-primary mb-1">
              ${statistics.monthlyRevenue.toLocaleString()}
            </p>
            <p className="text-xs text-text-muted">
              {new Date().toLocaleString("default", { month: "long" })}{" "}
              {new Date().getFullYear()}
            </p>
          </div>

          {/*----------------daily revenue--------------- */}
          <div className="bg-bg-main rounded-2xl border border-neutral p-6 hover:scale-105 transition-all duration-200 ease-in  hover:shadow-md ">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide">
                Today's Revenue
              </h3>
              <div className="w-12 h-12 bg-linear-to-br from-gray-700 to-green-400 rounded-xl flex items-center justify-center hover:scale-105 transition-all duration-200 ease-in ">
                <HiCalendar className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-text-primary mb-1">
              ${statistics.todayRevenue.toLocaleString()}
            </p>
            <p className="text-xs text-text-muted">
              {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* ----------------pending---------- */}
          <div className="bg-bg-main rounded-2xl border border-neutral p-6 hover:scale-105 transition-all duration-200 ease-in  hover:shadow-md ">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide">
                Pending Payments
              </h3>
              <div className="w-12 h-12 bg-linear-to-br from-amber-500 to-red-400 rounded-xl flex items-center justify-center hover:scale-105 transition-all duration-200 ease-in ">
                <CgSandClock className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-text-primary mb-1">
              ${statistics.pendingPayments.toLocaleString()}
            </p>
            <p className="text-xs text-text-muted">Awaiting payment</p>
          </div>
        </div>

        {/* ------------chart section-------------- */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          <div className="xl:col-span-2 bg-bg-main rounded-2xl border border-neutral p-6 hover:scale-105 transition-all duration-200 ease-in ">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-text-primary mb-2">
                Service Demand Chart
              </h2>
              <p className="text-sm text-text-secondary">
                Number of services booked by users
              </p>
            </div>

            {histogramData.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={histogramData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
                  barCategoryGap="10%"
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E5DDD5"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="service"
                    angle={-55}
                    textAnchor="end"
                    height={120}
                    interval={0}
                    tick={{ fontSize: 11, fill: "#6b6b6b" }}
                    axisLine={{ stroke: "#D4C9BE" }}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#6b6b6b" }}
                    axisLine={{ stroke: "#D4C9BE" }}
                    label={{
                      value: "Number of Bookings",
                      angle: -90,
                      position: "insideLeft",
                      style: { fontSize: 12, fill: "#6b6b6b" },
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ paddingTop: "10px" }}
                    iconType="square"
                  />
                  <Bar
                    dataKey="bookings"
                    fill="#2F5F5D"
                    name="Total Bookings"
                    radius={[8, 8, 0, 0]}
                  >
                    {histogramData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index % 2 === 0 ? "#2F5F5D" : "#3D7370"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[400px] text-text-muted">
                <p>No booking data available</p>
              </div>
            )}
          </div>

          {/* ============service demand summary=============== */}
          <div className="bg-bg-main rounded-2xl border border-neutral p-6 hover:scale-105 transition-all duration-200 ease-in ">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-text-primary mb-2">
                Top Services
              </h2>
              <p className="text-sm text-text-secondary">
                Most booked services
              </p>
            </div>

            {serviceDemandData.length > 0 ? (
              <div className="space-y-4">
                {serviceDemandData.map((service, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary truncate">
                        {service.name}
                      </p>
                      <div className="mt-1 w-full bg-secondary rounded-full h-2">
                        <div
                          className="bg-linear-to-r from-primary to-accent h-2 rounded-full transition-all"
                          style={{
                            width: `${
                              (service.bookings /
                                serviceDemandData[0].bookings) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                    <span className=" shrink-0 text-sm font-bold text-text-primary">
                      {service.bookings}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-text-muted">
                <p>No service data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-bg-main rounded-2xl border border-neutral p-6 hover:scale-105 transition-all duration-200 ease-in  hover:shadow-md ">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <HiClipboardList className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-text-secondary">
                  Total Bookings
                </h3>
                <p className="text-2xl font-bold text-text-primary">
                  {bookingData.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-bg-main rounded-2xl border border-neutral p-6 hover:scale-105 transition-all duration-200 ease-in  hover:shadow-md ">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12   rounded-xl flex items-center justify-center">
                <GoVerified className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-text-secondary">
                  Completed Services
                </h3>
                <p className="text-2xl font-bold text-text-primary">
                  {bookingData.filter((b) => b.status === "completed").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-bg-main rounded-2xl border border-neutral p-6 hover:scale-105 transition-all duration-200 ease-in  hover:shadow-md ">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <HiClock className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-text-secondary">
                  Active Projects
                </h3>
                <p className="text-2xl font-bold text-text-primary">
                  {
                    bookingData.filter(
                      (b) =>
                        b.status !== "completed" && b.status !== "cancelled"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLandingPage;
