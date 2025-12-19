import React, { useEffect, useState } from "react";
import useAxiosInstance from "../../../hooks and contexts/axios/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import useUserInfo from "../../../hooks and contexts/role/useUserInfo";
import { LoadingBubbles } from "../../../LoadingAnimations";
import NoData from "../../../components/NoData";
import planningImg from "../../../assets/planning.jpeg";
import assignImg from "../../../assets/assigned.jpeg";
import materials from "../../../assets/materials.jpeg";
import inprogress from "../../../assets/inprogress.jpeg";
import ontheway from "../../../assets/ontheway.jpeg";
import {
  HiCheck,
  HiX,
  HiClipboardList,
  HiShoppingBag,
  HiTruck,
  HiCog,
  HiCheckCircle,
  HiCalendar,
  HiLocationMarker,
  HiUser,
  HiPhone,
} from "react-icons/hi";
import Swal from "sweetalert2";

const DecoratorLandingPage = () => {
  const axiosInstance = useAxiosInstance();
  const { userData, infoLoading } = useUserInfo();

  const [sortBy, setSortBy] = useState("recent-desc");

  const {
    data: currentProject,
    isLoading,
    refetch: refreshBookingData,
    isError,
    error,
  } = useQuery({
    queryKey: ["projects", userData?.decoratorId],
    enabled: !!userData?.decoratorId,
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/booking/${userData.decoratorId}/decorator`
      );

      return res.data?.currentProjectData || null;
    },
    retry: false,
  });

  if (isLoading || infoLoading) {
    return <LoadingBubbles />;
  }

  if (isError && error?.response?.status !== 404) {
    return <NoData />;
  }

  const statusFlow = {
    "planning": {
      next: "materials-prepared",
      action: "Materials Ready",
      icon: HiShoppingBag,
      color: "blue",
    },
    "materials-prepared": {
      next: "on-the-way",
      action: "On The Way",
      icon: HiTruck,
      color: "purple",
    },
    "on-the-way": {
      next: "in-progress",
      action: "Start Setup",
      icon: HiCog,
      color: "orange",
    },
    "in-progress": {
      next: "completed",
      action: "Mark Complete",
      icon: HiCheckCircle,
      color: "green",
    },
  };

  // Status images
  const statusImages = {
    "assigned": assignImg,
    "planning": planningImg,
    "materials-prepared": materials,
    "on-the-way": ontheway,
    "in-progress": inprogress,
  };

  const handleStatusUpdate = async (booking, nextStatus) => {
    try {
      const result = await Swal.fire({
        title: "Update project status?",
        text: `The project status will be updated to ${nextStatus.replace(
          "-",
          " "
        )}`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#10b981",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, update",
      });

      if (!result.isConfirmed) return;

      const res = await axiosInstance.patch(`/booking/status/flow`, {
        nextBookingStatus: nextStatus,
        updatedAt: new Date(),
        decoratorId: booking.assignedDecoratorId,
        bookingId: booking._id,
      });

      console.log(res.data.message);
      await refreshBookingData();

      Swal.fire({
        title: "Status updated",
        text: res.data?.message || "Project status updated successfully",
        icon: "success",
      });
      refreshBookingData();
    } catch (error) {
      Swal.fire({
        title: "Something went wrong!",
        text:
          error?.response?.data?.message ||
          error?.message ||
          "Failed to update status",
        icon: "error",
      });
      console.error(error);
    }
  };

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Projects</h1>
        <p className="text-gray-600">
          Manage your assigned decoration projects
        </p>
      </div>

      {/* Current Project Section */}
      {currentProject ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Current Project
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Status Image */}
            <div className="lg:col-span-1">
              <img
                src={
                  statusImages[currentProject.status] || statusImages.assigned
                }
                alt={currentProject?.status || "project status"}
                className="w-full h-48 object-cover rounded-lg shadow-sm"
              />
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Current Status</p>
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold capitalize inline-block">
                  {currentProject?.status?.replace(/-/g, " ") || "Unknown"}
                </span>
              </div>
            </div>

            {/* Project Details */}
            <div className="lg:col-span-2 space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {currentProject?.serviceName || "Unnamed Service"}
                </h3>
                <p className="text-sm text-gray-500">
                  ID: #{currentProject?._id?.slice(-8) || "N/A"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <HiUser className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm text-gray-500">Booked By</p>
                    <p className="font-semibold text-gray-800 truncate">
                      {currentProject.bookedByName || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {currentProject.bookedByEmail || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <HiPhone className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="font-semibold text-gray-800">
                      {currentProject.contactPhone || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <HiCalendar className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Scheduled Date</p>
                    <p className="font-semibold text-gray-800">
                      {currentProject.scheduleDate
                        ? new Date(
                            currentProject.scheduleDate
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {currentProject.scheduleTime || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <HiLocationMarker className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-semibold text-gray-800 break-words">
                      {currentProject.serviceAddress || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {currentProject.serviceArea && currentProject.serviceCity
                        ? `${currentProject.serviceArea}, ${currentProject.serviceCity}`
                        : currentProject.serviceArea ||
                          currentProject.serviceCity ||
                          "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {currentProject.specialInstructions && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <p className="text-sm text-gray-500 mb-1 font-medium">
                    Special Instructions
                  </p>
                  <p className="text-gray-800">
                    {currentProject.specialInstructions}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4">
                {currentProject.status === "assigned" && (
                  <>
                    <button
                      onClick={() =>
                        handleStatusUpdate(
                          currentProject,
                          statusFlow[currentProject.status].next
                        )
                      }
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                    >
                      <HiCheck className="w-4 h-4" />
                      {statusFlow[currentProject.status].action}
                    </button>
                    <button
                      onClick={() => handleDeclineProject(currentProject)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                    >
                      <HiX className="w-4 h-4" />
                      Decline
                    </button>
                  </>
                )}

                {currentProject.status !== "assigned" &&
                  currentProject.status !== "completed" &&
                  statusFlow[currentProject.status] && (
                    <button
                      onClick={() =>
                        handleStatusUpdate(
                          currentProject,
                          statusFlow[currentProject.status].next
                        )
                      }
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-sm"
                    >
                      {React.createElement(
                        statusFlow[currentProject.status].icon,
                        {
                          className: "w-5 h-5",
                        }
                      )}
                      {statusFlow[currentProject.status].action}
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center mb-8">
          <HiClipboardList className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-700 mb-2">
            No Active Project
          </p>
          <p className="text-gray-500">
            You don't have any assigned projects at the moment
          </p>
        </div>
      )}

      {/* Completed Projects Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Completed Projects
          </h2>
          <div className="flex items-center gap-4">
            <label className="text-sm text-gray-600">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
            >
              <option value="recent-desc">Most Recent</option>
              <option value="recent-asc">Oldest First</option>
              <option value="city">City (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Placeholder for completed projects list */}
        <div className="text-center py-8 text-gray-500">
          <p>No completed projects to display</p>
        </div>
      </div>
    </div>
  );
};

export default DecoratorLandingPage;
