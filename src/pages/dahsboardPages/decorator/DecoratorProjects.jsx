import React, { useState } from "react";
import useAxiosInstance from "../../../hooks and contexts/axios/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import useUserInfo from "../../../hooks and contexts/role/useUserInfo";
import { LoadingBubbles } from "../../../LoadingAnimations";
import NoData from "../../../components/NoData";
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

const DecoratorProjects = () => {
  const axiosInstance = useAxiosInstance();
  const { userData, infoLoading } = useUserInfo();
  const [isAvailable, setIsAvailable] = useState(userData?.isAvailable || true);
  const [sortBy, setSortBy] = useState("recent-desc");
  const [sortedProjects, setSortedProjects] = useState([]);

  const {
    data: bookings = [],
    isLoading,
    refetch: refreshBookingData,
    isError,
  } = useQuery({
    queryKey: ["projects", userData?.decoratorId],
    enabled: !!userData,
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/booking/${userData.decoratorId}/decorator`
      );
      if (res.data.length === 0) {
        console.log(res.data.message);
      }
      return res.data;
    },
  });

  const { data: completedProjects, isLoading: comDataLoading } = useQuery({
    queryKey: ["completed-projects"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/booking-data/${userData.decoratorId}/completed`
      );
      return res.data;
    },
  });

  if (isLoading || infoLoading || comDataLoading)
    return <LoadingBubbles></LoadingBubbles>;
  if (!bookings || isError) return <NoData></NoData>;

  console.log(completedProjects);

  // Separate current and completed projects
  const currentProject = bookings.find(
    (b) => b.status !== "completed" && b.status !== "cancelled"
  );
  // const completedProjects = bookings.filter((b) => b.status === "completed");

  // Sort completed projects
  if (completedProjects?.length > 0) {
    const sorted = [...completedProjects].sort((a, b) => {
      if (sortBy === "recent-desc") {
        return new Date(b.bookingDate) - new Date(a.bookingDate);
      } else if (sortBy === "recent-asc") {
        return new Date(a.bookingDate) - new Date(b.bookingDate);
      } else if (sortBy === "city") {
        return a.serviceCity.localeCompare(b.serviceCity);
      }
      return 0;
    });
    setSortedProjects(sorted);
  }

  // Status flow and actions
  const statusFlow = {
    "assigned": {
      next: "planning",
      action: "Accept Project",
      icon: HiCheck,
      color: "green",
    },
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
    "assigned":
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80",
    "planning":
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80",
    "materials-prepared":
      "https://images.unsplash.com/photo-1586864387634-29a4b1c3b094?w=400&q=80",
    "on-the-way":
      "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=400&q=80",
    "in-progress":
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80",
  };

  const handleStatusUpdate = async (booking, nextStatus) => {
    try {
      const result = await Swal.fire({
        title: "Update project status?",
        text: `The project status will be updated to ${nextStatus}`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#10b981",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, approve",
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
      setTimeout(() => {
        Swal.fire({
          title: "Status updated",
          text: res.data?.message,
          icon: "success",
        });
      }, 500);
    } catch (error) {
      Swal.fire({
        title: "Something went wrong!",
        text: error?.message,
        icon: "warning",
      });
      console.log(error);
    }
  };

  const handleDeclineProject = async (bookingId) => {
    try {
      const result = await Swal.fire({
        title: "Are You sure to Decline?",
        text: `The project will be Removed from your list`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#10b981",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, remove",
      });
      if (result.isConfirmed) {
        const res = await axiosInstance.patch(`on-booking-rejected/decorator`, {
          bookingId: bookingId,
          decoratorId: userData.decoratorId,
        });
        console.log(res.data.message);
        await refreshBookingData();
        setTimeout(() => {
          Swal.fire({
            title: "Project Rejected",
            text: res.data?.message,
            icon: "success",
          });
        }, 500);
      }
    } catch (error) {
      Swal.fire({
        title: "Something went wrong!",
        text: error?.message,
        icon: "warning",
      });
      console.log(error);
    }
  };

  const handleToggleAvailability = () => {
    console.log("Toggle availability to:", !isAvailable);
    setIsAvailable(!isAvailable);
    // Handle availability update here
  };

  return (
    <div className="w-[90dvw] mx-auto py-8">
      {/* Header with Availability Toggle */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Projects</h1>
          <p className="text-gray-600">
            Manage your assigned decoration projects
          </p>
        </div>
        <button
          onClick={handleToggleAvailability}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            isAvailable
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {isAvailable ? "Available" : "Unavailable"}
        </button>
      </div>

      {/* Current Project Section */}
      {currentProject ? (
        <div className="bg-white rounded-lg border border-neutral p-6 mb-8">
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
                alt={currentProject.status}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Current Status</p>
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold capitalize inline-block">
                  {currentProject.status.replace("-", " ")}
                </span>
              </div>
            </div>

            {/* Project Details */}
            <div className="lg:col-span-2 space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {currentProject.serviceName}
                </h3>
                <p className="text-sm text-gray-500">
                  ID: {currentProject._id.slice(-8)}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <HiUser className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Booked By</p>
                    <p className="font-semibold text-gray-800">
                      {currentProject.bookedByName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {currentProject.bookedByEmail}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <HiPhone className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="font-semibold text-gray-800">
                      {currentProject.contactPhone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <HiCalendar className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Scheduled Date</p>
                    <p className="font-semibold text-gray-800">
                      {new Date(currentProject.bookingDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </p>
                    <p className="text-sm text-gray-600">
                      {currentProject.bookingTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <HiLocationMarker className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-semibold text-gray-800">
                      {currentProject.serviceAddress}
                    </p>
                    <p className="text-sm text-gray-600">
                      {currentProject.serviceArea}, {currentProject.serviceCity}
                    </p>
                  </div>
                </div>
              </div>

              {currentProject.specialInstructions && (
                <div className="bg-secondary p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">
                    Special Instructions
                  </p>
                  <p className="text-gray-800">
                    {currentProject.specialInstructions}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                {currentProject.status === "assigned" && (
                  <>
                    <button
                      onClick={() =>
                        handleStatusUpdate(
                          currentProject,
                          statusFlow[currentProject.status].next
                        )
                      }
                      className="   px-2 bg-primary hover:bg-green-700 text-white  rounded-lg transition-all"
                    >
                      <small>{statusFlow[currentProject.status].action}</small>
                    </button>
                    <button
                      onClick={() => handleDeclineProject(currentProject._id)}
                      className="   px-2  bg-red-600 hover:bg-red-700 text-white  rounded-lg transition-all"
                    >
                      <small>Decline</small>
                    </button>
                  </>
                )}

                {currentProject.status !== "assigned" &&
                  currentProject.status !== "completed" && (
                    <button
                      onClick={() =>
                        handleStatusUpdate(
                          currentProject,
                          statusFlow[currentProject.status].next
                        )
                      }
                      className={`flex items-center gap-2 px-6 py-3 bg-${
                        statusFlow[currentProject.status].color
                      }-600 hover:bg-${
                        statusFlow[currentProject.status].color
                      }-700 bg-accent font-semibold rounded-lg transition-all`}
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
        <div className="bg-white rounded-lg border border-neutral p-12 text-center mb-8">
          <HiClipboardList className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No active project at the moment</p>
        </div>
      )}

      {/* Completed Projects Section */}
      <div className="bg-white rounded-lg border border-neutral p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Completed Projects
          </h2>
          <div className="flex items-center gap-4">
            <label className="text-sm text-gray-600">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              <option value="recent-desc">Most Recent</option>
              <option value="recent-asc">Oldest First</option>
              <option value="city">City (A-Z)</option>
            </select>
          </div>
        </div>

        {sortedProjects.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No completed projects yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                    Project
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                    Client
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                    Location
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                    Completed At
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral">
                {sortedProjects.map((project) => (
                  <tr
                    key={project._id}
                    className="hover:bg-secondary/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <p className="text-sm font-semibold text-gray-800">
                        {project.serviceName}
                      </p>
                      <p className="text-xs text-gray-500">
                        ID: {project._id?.slice(-8)}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-gray-800">
                        {project.bookedByName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {project.contactPhone}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-gray-700">
                        {project.serviceArea}, {project.serviceCity}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-gray-700">
                        {new Date(project.updatedAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-semibold text-primary">
                        ${project.payableAmount?.toLocaleString() || 0}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DecoratorProjects;
