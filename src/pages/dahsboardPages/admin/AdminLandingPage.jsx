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
  HiClipboardList,
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

    return { totalRevenue, monthlyRevenue, todayRevenue, pendingPayments };
  }, [bookingData]);

  const histogramData = useMemo(() => {
    if (!bookingData.length) return [];
    const serviceCount = bookingData.reduce((acc, booking) => {
      const serviceName = booking.serviceName || "Unknown";
      acc[serviceName] = (acc[serviceName] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(serviceCount)
      .map(([name, count]) => ({
        service: name.length > 25 ? name.substring(0, 25) + "..." : name,
        bookings: count,
      }))
      .sort((a, b) => b.bookings - a.bookings);
  }, [bookingData]);

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
      <div className="flex items-center justify-center min-h-screen bg-bg-main">
        <p className="text-red-500 font-medium">
          Failed to load dashboard data
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-main">
      <div className="w-full mx-auto py-8 px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-text-primary mb-2 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-text-secondary">
            Real-time insights and business performance metrics
          </p>
        </div>

        {/* Statistic Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Card Component logic used here */}
          {[
            {
              label: "Total Revenue",
              value: statistics.totalRevenue,
              sub: "All time earnings",
              icon: HiCash,
              color: "from-primary to-primary-light",
            },
            {
              label: "Monthly Revenue",
              value: statistics.monthlyRevenue,
              sub: `${new Date().toLocaleString("default", {
                month: "long",
              })} ${new Date().getFullYear()}`,
              icon: HiTrendingUp,
              color: "from-accent to-accent-light",
            },
            {
              label: "Today's Revenue",
              value: statistics.todayRevenue,
              sub: new Date().toLocaleDateString(),
              icon: HiCalendar,
              color: "from-text-secondary to-text-muted",
            },
            {
              label: "Pending Payments",
              value: statistics.pendingPayments,
              sub: "Awaiting settlement",
              icon: CgSandClock,
              color: "from-amber-500 to-orange-400",
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-bg-alt rounded-2xl border border-neutral p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest">
                  {stat.label}
                </h3>
                <div
                  className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center shadow-inner`}
                >
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <p className="text-3xl font-bold text-text-primary mb-1">
                ${stat.value.toLocaleString()}
              </p>
              <p className="text-xs text-text-muted font-medium">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Chart & Top Services */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10">
          <div className="xl:col-span-2 bg-bg-alt rounded-2xl border border-neutral p-6 shadow-sm">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-text-primary">
                Service Demand
              </h2>
              <p className="text-sm text-text-muted">
                Volume of bookings per category
              </p>
            </div>

            <div className="h-[500px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={histogramData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 60 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#f1f1f1"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="service"
                    angle={-45}
                    textAnchor="end"
                    interval={0}
                    tick={{ fontSize: 11, fill: "#6b6b6b" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#6b6b6b" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "#f8f9fa" }}
                  />
                  <Bar dataKey="bookings" radius={[6, 6, 0, 0]} barSize={40}>
                    {histogramData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index % 2 === 0 ? "#2F5F5D" : "#E2B182"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-bg-alt rounded-2xl border border-neutral p-6 shadow-sm">
            <h2 className="text-xl font-bold text-text-primary mb-1">
              Top Performers
            </h2>
            <p className="text-sm text-text-muted mb-8">
              Highest demand services
            </p>

            <div className="space-y-6">
              {serviceDemandData.map((service, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-text-primary truncate max-w-[180px]">
                      {service.name}
                    </span>
                    <span className="text-sm font-bold text-primary">
                      {service.bookings}
                    </span>
                  </div>
                  <div className="w-full bg-bg-main rounded-full h-1.5">
                    <div
                      className="bg-primary h-1.5 rounded-full transition-all duration-1000"
                      style={{
                        width: `${
                          (service.bookings / serviceDemandData[0].bookings) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Summary Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              label: "Total Bookings",
              value: bookingData.length,
              icon: HiClipboardList,
              color: "text-primary",
            },
            {
              label: "Completed Services",
              value: bookingData.filter((b) => b.status === "completed").length,
              icon: GoVerified,
              color: "text-green-600",
            },
            {
              label: "Active Projects",
              value: bookingData.filter(
                (b) => !["completed", "cancelled"].includes(b.status)
              ).length,
              icon: HiClock,
              color: "text-accent",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-bg-alt rounded-xl border border-neutral p-5 flex items-center gap-4"
            >
              <div className={`p-3 rounded-lg bg-bg-main shadow-sm`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <div>
                <p className="text-xs font-bold text-text-muted uppercase">
                  {item.label}
                </p>
                <p className="text-xl font-extrabold text-text-primary">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminLandingPage;
