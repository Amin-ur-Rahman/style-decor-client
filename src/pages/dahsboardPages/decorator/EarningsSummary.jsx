import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  HiCash,
  HiTrendingUp,
  HiCalendar,
  HiDocumentText,
  HiFilter,
} from "react-icons/hi";
import useAxiosInstance from "../../../hooks and contexts/axios/useAxiosInstance";
import useUserInfo from "../../../hooks and contexts/role/useUserInfo";
import NoData from "../../../components/NoData";

const EarningsSummary = () => {
  const axiosInstance = useAxiosInstance();
  const { userData, infoLoading } = useUserInfo();
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  const {
    data: earnings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["earnings", userData?.decoratorId, filterStatus],
    enabled: !!userData?.decoratorId,
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/decorator-earnings/${userData.decoratorId}`
      );
      console.log(res.data);

      return res.data;
    },
  });

  const { data: decorator } = useQuery({
    queryKey: ["decorator", userData?.decoratorId],
    enabled: !!userData?.decoratorId,
    queryFn: async () => {
      const res = await axiosInstance.get(`/decorator/${userData.decoratorId}`);
      console.log(res.data);
      return res.data;
    },
  });

  if (isLoading || infoLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (isError || !decorator || !earnings) {
    return <NoData></NoData>;
  }

  const totalEarnings = earnings.reduce((sum, e) => sum + e.amountEarned, 0);
  const completedProjects = decorator.finishedProjectIDs?.length || 0;
  const avgEarningPerProject =
    completedProjects > 0 ? totalEarnings / completedProjects : 0;

  let filteredEarnings = earnings;
  if (filterStatus !== "all") {
    filteredEarnings = earnings.filter((e) => e.paymentStatus === filterStatus);
  }

  filteredEarnings = [...filteredEarnings].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sortBy === "amount-high") {
      return b.amountEarned - a.amountEarned;
    } else if (sortBy === "amount-low") {
      return a.amountEarned - b.amountEarned;
    }
    return 0;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-bg-alt py-8 px-4 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Earnings Summary
        </h1>
        <p className="text-text-secondary">
          Track your earnings and payment history
        </p>
      </div>

      {/* ---------------summary card---------------- */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
              <HiCash className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="text-text-muted text-sm mb-1">Total Earnings</p>
              <p className="text-3xl font-bold text-text-primary">
                BDT: {totalEarnings}
              </p>
              <p className="text-sm text-text-muted mt-1">
                From {completedProjects} completed projects
              </p>
            </div>
          </div>

          {/* Average Earning */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-accent/10 rounded-lg flex-shrink-0">
              <HiTrendingUp className="w-8 h-8 text-accent" />
            </div>
            <div>
              <p className="text-text-muted text-sm mb-1">
                Average per Project
              </p>
              <p className="text-3xl font-bold text-text-primary">
                {Math.round(avgEarningPerProject)}
              </p>
              <p className="text-sm text-text-muted mt-1">
                {(earnings[0]?.commissionRate * 100 || 25).toFixed(0)}%
                commission rate
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Earnings History */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral p-6">
        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-semibold text-text-primary">
            Payment History
          </h2>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <HiFilter className="w-5 h-5 text-text-muted" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-white"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-white"
            >
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest First</option>
              <option value="amount-high">Highest Amount</option>
              <option value="amount-low">Lowest Amount</option>
            </select>
          </div>
        </div>

        {/* Earnings List */}
        {filteredEarnings.length > 0 ? (
          <div className="space-y-4">
            {filteredEarnings.map((earning) => (
              <div
                key={earning._id}
                className="border border-neutral rounded-lg p-4 hover:bg-secondary transition-colors"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  {/* Left Section */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 bg-secondary rounded-lg flex-shrink-0">
                      <HiDocumentText className="w-6 h-6 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-text-primary mb-1">
                        {earning.serviceName || "Decoration Service"}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-text-muted">
                        <span className="flex items-center gap-1">
                          <HiCalendar className="w-4 h-4" />
                          {formatDate(earning.createdAt)}
                        </span>
                        <span>ID: #{earning.bookingId.slice(-8)}</span>
                        <span>Service: {earning.servicePrice}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-lg font-bold text-text-primary">
                        {earning.amountEarned}
                      </p>
                      <p className="text-xs text-text-muted">
                        {(earning.commissionRate * 100).toFixed(0)}% commission
                      </p>
                    </div>
                    {/* <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        earning.paymentStatus === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-accent/10 text-accent"
                      }`}
                    >
                      {earning.paymentStatus === "paid" ? "Paid" : "Pending"}
                    </span> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <HiDocumentText className="w-16 h-16 text-neutral mx-auto mb-4" />
            <p className="text-text-secondary">
              No earnings found for the selected filter
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EarningsSummary;
