import React, { useState } from "react";
import useAxiosInstance from "../../../hooks and contexts/axios/useAxiosInstance";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useUserInfo from "../../../hooks and contexts/role/useUserInfo";
import { LoadingBubbles } from "../../../LoadingAnimations";
import NoData from "../../../components/NoData";
import planningImg from "../../../assets/planning.jpeg";
import assignImg from "../../../assets/assigned.jpeg";
import materials from "../../../assets/materials.jpeg";
import inprogress from "../../../assets/inprogress.jpeg";
import ontheway from "../../../assets/ontheway.jpeg";
import {
  HiClipboardList,
  HiShoppingBag,
  HiTruck,
  HiCog,
  HiCheckCircle,
  HiCalendar,
  HiLocationMarker,
  HiUser,
  HiPhone,
  HiClock,
} from "react-icons/hi";
import Swal from "sweetalert2";

const CompletedProjectItem = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // funciton for completed projects list rendering----------------
  return (
    <div className="border border-neutral rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-secondary transition-colors text-left"
      >
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{project.serviceName}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {new Date(project.scheduleDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}{" "}
            • {project.serviceArea}, {project.serviceCity}
          </p>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isExpanded && (
        <div className="p-4 pt-0 border-t border-neutral space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Client</p>
              <p className="font-medium text-gray-800">
                {project.bookedByName}
              </p>
              <p className="text-sm text-gray-600">{project.contactPhone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium text-gray-800">
                {project.serviceAddress}
              </p>
              <p className="text-sm text-gray-600">
                {project.serviceArea}, {project.serviceCity}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Amount</p>
              <p className="font-semibold text-primary">
                ৳{project.payableAmount?.toLocaleString() || 0}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Booking ID</p>
              <p className="text-sm font-mono text-gray-700">
                {project._id.slice(-8)}
              </p>
            </div>
          </div>
          {project.specialInstructions && (
            <div className="bg-secondary p-3 rounded">
              <p className="text-sm text-gray-500 mb-1">Special Instructions</p>
              <p className="text-sm text-gray-700">
                {project.specialInstructions}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
// funciton for todays projects list rendering----------------

const TodayScheduleItem = ({ booking }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-accent/30 rounded-lg overflow-hidden bg-accent/5">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-accent/10 transition-colors text-left"
      >
        <div className="flex items-start gap-3 flex-1">
          <div className="p-2 bg-accent/20 rounded-lg shrink-0 mt-0.5">
            <HiClock className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-800">
              {booking.serviceName}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-gray-600">
              <span className="flex items-center gap-1 font-medium text-accent">
                <HiClock className="w-4 h-4" />
                {booking.scheduleTime}
              </span>
              <span className="text-gray-400">•</span>
              <span className="flex items-center gap-1">
                <HiLocationMarker className="w-4 h-4" />
                {booking.serviceArea}, {booking.serviceCity}
              </span>
            </div>
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform  shrink-0 ${
            isExpanded ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isExpanded && (
        <div className="p-4 pt-0 border-t border-accent/20 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <HiUser className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm text-gray-500">Client</p>
                <p className="font-semibold text-gray-800">
                  {booking.bookedByName}
                </p>
                <p className="text-sm text-gray-600">{booking.bookedByEmail}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <HiPhone className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm text-gray-500">Contact</p>
                <p className="font-semibold text-gray-800">
                  {booking.contactPhone}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <HiLocationMarker className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">Full Address</p>
                <p className="font-semibold text-gray-800">
                  {booking.serviceAddress}
                </p>
                <p className="text-sm text-gray-600">
                  {booking.serviceArea}, {booking.serviceCity}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <HiCalendar className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold capitalize">
                  {booking.status?.replace(/-/g, " ")}
                </span>
              </div>
            </div>
          </div>

          {booking.specialInstructions && (
            <div className="bg-accent/10 p-3 rounded border border-accent/20">
              <p className="text-sm text-gray-500 mb-1 font-medium">
                Special Instructions
              </p>
              <p className="text-sm text-gray-700">
                {booking.specialInstructions}
              </p>
            </div>
          )}

          <div className="pt-2">
            <p className="text-xs text-gray-500">
              Booking ID: #{booking._id.slice(-8)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const DecoratorLandingPage = () => {
  const axiosInstance = useAxiosInstance();
  const { userData, infoLoading } = useUserInfo();
  const [sortBy, setSortBy] = useState("recent-desc");
  const queryClient = useQueryClient();

  //current projects---------------
  const {
    data: currentProject,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["current-project", userData?.decoratorId],
    enabled: !!userData?.decoratorId,
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/booking/${userData.decoratorId}/decorator`
      );
      return res.data?.currentProjectData || null;
    },
  });

  // ------finished projects----------------//
  const { data: finishedProjects, isLoading: loadingFinishedProjects } =
    useQuery({
      queryKey: ["finished-projects", userData?.decoratorId],
      enabled: !!userData?.decoratorId,
      queryFn: async () => {
        const res = await axiosInstance.get(
          `/finished-bookings/${userData.decoratorId}/decorator`
        );
        return res.data || [];
      },
    });

  //---------todays projects--------
  const { data: todaysBookings, isLoading: loadingTodaysSchedule } = useQuery({
    queryKey: ["todays-schedule", userData?.decoratorId],
    enabled: !!userData?.decoratorId,
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/decorator/${userData.decoratorId}/today-schedule`
      );
      return res.data || [];
    },
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
    },
    "materials-prepared": {
      next: "on-the-way",
      action: "On The Way",
      icon: HiTruck,
    },
    "on-the-way": {
      next: "in-progress",
      action: "Start Setup",
      icon: HiCog,
    },
    "in-progress": {
      next: "completed",
      action: "Mark Complete",
      icon: HiCheckCircle,
    },
  };

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
        confirmButtonColor: "#2F5F5D",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, update",
      });

      if (!result.isConfirmed) return;

      const res = await axiosInstance.patch(`/booking/status/flow`, {
        nextBookingStatus: nextStatus,
        decoratorId: userData.decoratorId,
        bookingId: booking._id,
      });

      // invalidate and refetch both queries to get fresh data, and
      await queryClient.invalidateQueries([
        "current-project",
        userData?.decoratorId,
      ]);
      await queryClient.invalidateQueries([
        "finished-projects",
        userData?.decoratorId,
      ]);

      Swal.fire({
        title: "Status updated",
        text: res.data?.message || "Project status updated successfully",
        icon: "success",
        confirmButtonColor: "#2F5F5D",
      });
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

  const sortedProjects = finishedProjects
    ? [...finishedProjects].sort((a, b) => {
        const dateA = new Date(a.scheduleDate);
        const dateB = new Date(b.scheduleDate);
        return sortBy === "recent-desc" ? dateB - dateA : dateA - dateB;
      })
    : [];

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Projects</h1>
        <p className="text-gray-600">
          Manage your assigned decoration projects
        </p>
      </div>

      {/* -----------------on going project here--------------- */}
      {currentProject ? (
        <div className="bg-white rounded-lg border border-neutral p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Current Project
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <img
                src={
                  statusImages[currentProject.status] || statusImages.assigned
                }
                alt={currentProject?.status || "project status"}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Current Status</p>
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-semibold capitalize inline-block">
                  {currentProject?.status?.replace(/-/g, " ") || "Unknown"}
                </span>
              </div>
            </div>

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
                  <HiUser className="w-5 h-5 text-primary mt-1  shrink-0" />
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
                  <HiPhone className="w-5 h-5 text-primary mt-1  shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="font-semibold text-gray-800">
                      {currentProject.contactPhone || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <HiCalendar className="w-5 h-5 text-primary mt-1  shrink-0" />
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
                  <HiLocationMarker className="w-5 h-5 text-primary mt-1  shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-semibold text-gray-800 wrap-break-word">
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
                <div className="bg-secondary p-4 rounded-lg border border-neutral">
                  <p className="text-sm text-gray-500 mb-1 font-medium">
                    Special Instructions
                  </p>
                  <p className="text-gray-800">
                    {currentProject.specialInstructions}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-3 pt-4">
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
                      className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all shadow-sm"
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
        <div className="bg-white rounded-lg border border-neutral p-12 text-center mb-8 shadow-sm">
          <HiClipboardList className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-700 mb-2">
            No Active Project
          </p>
          <p className="text-gray-500">
            You don't have any assigned projects at the moment
          </p>
        </div>
      )}

      {/* ----------todays schedule------------------- */}
      <div className="bg-white rounded-lg border border-accent/30 p-6 mb-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-accent/10 rounded-lg">
            <HiCalendar className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Today's Schedule
            </h2>
            <p className="text-sm text-gray-500">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {loadingTodaysSchedule ? (
          <div className="text-center py-8">
            <LoadingBubbles />
          </div>
        ) : !todaysBookings || todaysBookings.length === 0 ? (
          <div className="text-center py-8 px-4 bg-accent/5 rounded-lg">
            <HiClock className="w-12 h-12 text-accent/40 mx-auto mb-3" />
            <p className="text-gray-600 font-medium">
              No bookings scheduled for today
            </p>
            <p className="text-sm text-gray-500 mt-1">Enjoy your free time!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {todaysBookings.map((booking) => (
              <TodayScheduleItem key={booking._id} booking={booking} />
            ))}
          </div>
        )}
      </div>

      {/*----------------- Completed Projects----------------------   */}
      <div className="bg-white rounded-lg border border-neutral p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Completed Projects
          </h2>
          <div className="flex items-center gap-4">
            <label className="text-sm text-gray-600">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm bg-white"
            >
              <option value="recent-desc">Most Recent</option>
              <option value="recent-asc">Oldest First</option>
            </select>
          </div>
        </div>

        {loadingFinishedProjects ? (
          <div className="text-center py-8">
            <LoadingBubbles />
          </div>
        ) : !finishedProjects || finishedProjects.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No completed projects to display</p>
          </div>
        ) : (
          <div className="space-y-2">
            {sortedProjects.map((project) => (
              <CompletedProjectItem key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DecoratorLandingPage;
