import React, { useState, useMemo } from "react";
import useAxiosInstance from "../../../hooks and contexts/axios/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { LoadingBubbles } from "../../../LoadingAnimations";
import NoData from "../../../components/NoData";
import {
  HiX,
  HiEye,
  HiSortAscending,
  HiFilter,
  HiCheckCircle,
} from "react-icons/hi";
import Swal from "sweetalert2";
import { FaUserCheck } from "react-icons/fa";
import { FiStar } from "react-icons/fi";
import axios from "axios";

const ManageDecorators = () => {
  const axiosInstance = useAxiosInstance();
  const [sortBy, setSortBy] = useState("time");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedDecorator, setSelectedDecorator] = useState(null);

  const {
    data: decorators,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["manage-decorators"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/decorators");
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  // Sorting and filtering
  const sortedAndFilteredDecorators = useMemo(() => {
    if (!decorators) return [];

    let filtered = [...decorators];

    // Apply filter
    if (filterStatus !== "all") {
      filtered = filtered.filter(
        (dec) => dec.applicationStatus === filterStatus
      );
    }

    // Apply sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "time":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case "availability":
          return b.isAvailable - a.isAvailable;
        case "verification":
          return b.isVerified - a.isVerified;
        default:
          return 0;
      }
    });

    return filtered;
  }, [decorators, sortBy, filterStatus]);

  const handleApprove = async (decorator) => {
    const result = await Swal.fire({
      title: "Approve Decorator?",
      text: "This decorator will be approved and can start taking orders",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, approve",
    });

    if (result.isConfirmed) {
      try {
        const decoRes = await axiosInstance.patch(
          `/decorator/${decorator._id}`,
          {
            applicationStatus: "approved",
            userId: decorator.userId,
          }
        );

        console.log(decoRes.data);

        Swal.fire({
          title: "Request accepted",
          text: decoRes.data?.message,
          icon: "success",
        });
        refetch();
      } catch (error) {
        Swal.fire({
          title: "Something went wrong!",
          text: error?.message,
          icon: "warning",
        });
      }
    }
  };

  const handleReject = async (decorator) => {
    const result = await Swal.fire({
      title: "Reject Decorator?",
      text: "This decorator's application will be rejected",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, reject",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosInstance.patch(`/decorator/${decorator._id}`, {
          applicationStatus: "rejected",
        });
        console.log(res.data);

        Swal.fire({
          title: "Rejected!",
          text: "Decorator application rejected.",
          icon: "success",
        });
        refetch();
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to reject decorator.",
          icon: "error",
        });
      }
    }
  };

  // const toggleAvailability = async (decorator) => {
  //   try {
  //     await axiosInstance.patch(`/decorator/${decorator._id}`, {
  //       isAvailable: !decorator.isAvailable,
  //     });
  //     Swal.fire(
  //       "Updated!",
  //       `Decorator is now ${
  //         !decorator.isAvailable ? "available" : "unavailable"
  //       }`,
  //       "success"
  //     );
  //     refetch();
  //   } catch (error) {
  //     Swal.fire("Error!", "Failed to update availability.", "error");
  //   }
  // };

  const getStatusBadge = (status) => {
    const styles = {
      pending: "  text-yellow-700 border-yellow-200",
      approved: "  text-green-700 border-green-200",
      rejected: "  text-red-700 border-red-200",
    };

    return (
      <span
        className={`px-3 py-1 text-xs font-medium rounded-full border ${
          styles[status] || styles.pending
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (isLoading) return <LoadingBubbles />;

  if (isError || decorators?.length === 0) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <NoData />
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50 p-6">
      <div className="max-w-max mx-auto">
        {/* ------------------Header------------------ */}
        <div className="mb-8">
          <h1 className="text-xl md:text-2xl font-semibold md:font-bold  text-slate-900 mb-2">
            Manage Decorators
          </h1>
          <p className="text-slate-600">
            Review and manage decorator applications
          </p>
        </div>
        {/*--------------------------Sort ----------------- */}
        <div className="bg-white rounded-lg border max-w-[95%] border-slate-200 p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <HiSortAscending className="w-5 h-5 text-slate-400" />
              <span className="text-sm text-slate-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-400"
              >
                <option value="time">Recent First</option>
                <option value="availability">Availability</option>
                <option value="verification">Verification Status</option>
              </select>
            </div>

            {/* ----------------------Filter----------------- */}
            <div className="flex items-center gap-2">
              <HiFilter className="w-5 h-5 text-slate-400" />
              <span className="text-sm text-slate-600">Filter:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-400"
              >
                <option value="all">All Applications</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* -------------------------Stats----------------------- */}
            <div className="flex items-center gap-4 text-sm">
              <span className="text-slate-600">
                Total:{" "}
                <span className="font-semibold text-slate-900">
                  {decorators.length}
                </span>
              </span>
              <span className="text-slate-600">
                Showing:{" "}
                <span className="font-semibold text-slate-900">
                  {sortedAndFilteredDecorators.length}
                </span>
              </span>
            </div>
          </div>
        </div>
        {/*----------------------------- Table---------------------- */}
        <div className="bg-white rounded-lg max-w-[95%] border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                    Decorator
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                    Experience
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                    Availability
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {sortedAndFilteredDecorators.map((decorator) => (
                  <tr
                    key={decorator._id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={decorator.photoUrl}
                          alt={decorator.decoratorName}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <div className="font-medium text-slate-900">
                            {decorator.decoratorName}
                          </div>
                          <div className="text-[0.7rem] text-slate-500 line-clamp-1">
                            {decorator.decoratorEmail}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-900">
                        {decorator.contactNumber}
                      </div>
                      <div className="text-xs text-slate-500 line-clamp-1">
                        {decorator.serviceLocation?.city},{" "}
                        {decorator.serviceLocation?.area}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-900">
                        {decorator.experienceYears} years
                      </div>
                      <div className="text-xs text-slate-500">
                        {decorator.specialization?.join(", ")}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex  flex-col gap-2">
                        {getStatusBadge(decorator.applicationStatus)}
                        {decorator.isVerified && (
                          <span className="flex ml-2 items-center gap-1 text-xs text-green-600">
                            <HiCheckCircle className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        // onClick={() => toggleAvailability(decorator)}
                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          decorator.isAvailable
                            ? " text-green-700 "
                            : " text-slate-700 "
                        }`}
                      >
                        {decorator.isAvailable ? "Available" : "Unavailable"}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {decorator.applicationStatus === "approved" || (
                          <button
                            onClick={() => handleApprove(decorator)}
                            className="p-2 text-gray-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Approve"
                          >
                            <FaUserCheck className="w-5 h-5" />
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedDecorator(decorator)}
                          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <HiEye className="w-5 h-5" />
                        </button>
                        {decorator.applicationStatus === "rejected" || (
                          <button
                            onClick={() => handleReject(decorator)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Reject"
                          >
                            <HiX className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* -------------------------Details Modal---------------------------- */}
        {selectedDecorator && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedDecorator(null)}
          >
            <div
              className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-2xl font-light text-slate-900">
                  Decorator Details
                </h2>
                <button
                  onClick={() => setSelectedDecorator(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <HiX className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedDecorator.photoUrl}
                    alt={selectedDecorator.decoratorName}
                    className="w-20 h-20 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h3 className="text-xl font-medium text-slate-900">
                      {selectedDecorator.decoratorName}
                    </h3>
                    <p className="text-slate-600">
                      {selectedDecorator.decoratorEmail}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-slate-600">Contact</span>
                    <p className="font-medium text-slate-900">
                      {selectedDecorator.contactNumber}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-slate-600">Experience</span>
                    <p className="font-medium text-slate-900">
                      {selectedDecorator.experienceYears} years
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-slate-600">Location</span>
                    <p className="font-medium text-slate-900">
                      {selectedDecorator.serviceLocation?.city},{" "}
                      {selectedDecorator.serviceLocation?.area}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-slate-600">Rating</span>
                    <p className="flex items-center gap-2 text-accent">
                      {selectedDecorator.ratingAverage.toFixed(1)}{" "}
                      <FiStar></FiStar>
                    </p>
                    <p className="font-medium text-text-muted">
                      ({selectedDecorator.ratingCount} reviews)
                    </p>
                  </div>
                </div>

                <div>
                  <span className="text-sm text-slate-600">
                    Specializations
                  </span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedDecorator.specialization?.map((spec, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  {selectedDecorator.applicationStatus === "pending" && (
                    <>
                      <button
                        onClick={() => {
                          handleApprove(selectedDecorator);
                          setSelectedDecorator(null);
                        }}
                        className="flex-1 px-4 py-2 bg-primary hover:scale-105 transition-all ease-linear duration-200 text-white rounded-lg "
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => {
                          handleReject(selectedDecorator);
                          setSelectedDecorator(null);
                        }}
                        className="flex-1 px-4 py-2 bg-red-700 hover:scale-105 transition-all ease-linear duration-200 text-white rounded-lg"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageDecorators;
