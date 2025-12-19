import React, { useState } from "react";
import useAxiosInstance from "../../../hooks and contexts/axios/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import useUserInfo from "../../../hooks and contexts/role/useUserInfo";
import { LoadingBubbles } from "../../../LoadingAnimations";
import NoData from "../../../components/NoData";
import {
  HiClipboardList,
  HiCalendar,
  HiLocationMarker,
  HiUser,
  HiPhone,
  HiClock,
  HiChevronDown,
  HiChevronUp,
} from "react-icons/hi";
import Swal from "sweetalert2";

const AssignedProjects = () => {
  const axiosInstance = useAxiosInstance();
  const { userData, infoLoading } = useUserInfo();
  const [expandedId, setExpandedId] = useState(null);

  const {
    data: assignedProjects,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["assigned_projects"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/assigned-projects/${userData.decoratorId}`
      );
      console.log(res.data);
      return res.data;
    },
    retry: false,
  });

  if (isLoading || infoLoading) return <LoadingBubbles></LoadingBubbles>;

  if (isError && error?.response?.status !== 404) {
    return <NoData />;
  }

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleAssigned = async (bookingId) => {
    try {
      const result = await Swal.fire({
        title: "Accept the project?",
        text: "The project will be added in your assigned list",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#008000",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Accept",
      });
      if (result.isConfirmed) {
        const patchRes = await axiosInstance.patch("/booking/status/flow", {
          nextBookingStatus: "planning",
          updatedAt: new Date(),
          decoratorId: userData.decoratorId,
          bookingId: bookingId,
        });

        await Swal.fire({
          title: "Project Accepted",
          text: "Project accepted successfully",
          icon: "success",
        });
        refetch();
        return patchRes.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeclineProject = async (bookingId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "The project will be removed from your list",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, decline",
      });

      if (!result.isConfirmed) return;

      const res = await axiosInstance.patch(`/booking/reject-by-decorator`, {
        bookingId: bookingId,
        decoratorId: userData?.decoratorId,
      });

      console.log(res.data.message);
      await refetch();

      Swal.fire({
        title: "Project Declined",
        text: res.data?.message || "Project removed successfully",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Something went wrong!",
        text:
          error?.response?.data?.message ||
          error?.message ||
          "Failed to decline project",
        icon: "error",
      });
      console.error(error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      "assigned": "bg-blue-100 text-blue-700",
      "planning": "bg-purple-100 text-purple-700",
      "materials-prepared": "bg-yellow-100 text-yellow-700",
      "on-the-way": "bg-orange-100 text-orange-700",
      "in-progress": "bg-indigo-100 text-indigo-700",
      "completed": "bg-green-100 text-green-700",
    };
    return colors[status] || "bg-neutral text-text-secondary";
  };

  if (!assignedProjects || assignedProjects.length === 0) {
    return <NoData></NoData>;
  }

  return Array.isArray(assignedProjects) && assignedProjects.length > 0 ? (
    <div className="w-full mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Assigned Projects
        </h1>
        <p className="text-text-secondary">
          View all your assigned decoration projects
        </p>
      </div>

      <div className="space-y-3">
        {assignedProjects?.map((project) => {
          const isExpanded = expandedId === project._id;

          return (
            <div
              key={project._id}
              className="bg-bg-main rounded-lg border border-neutral shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Collapsed View */}
              <div className="p-4 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-text-primary truncate">
                      {project.serviceName}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize whitespace-nowrap ${getStatusColor(
                        project.status
                      )}`}
                    >
                      {project.status?.replace("-", " ")}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary">
                    {project.bookedByName} •{" "}
                    {new Date(project.scheduleDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {!isExpanded && project.status === "assigned" && (
                    <button
                      onClick={() => handleAssigned(project._id)}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors text-sm font-semibold whitespace-nowrap"
                    >
                      Accept Booking
                    </button>
                  )}

                  <button
                    onClick={() => toggleExpand(project._id)}
                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
                    aria-label={isExpanded ? "Collapse" : "Expand"}
                  >
                    {isExpanded ? (
                      <HiChevronUp className="w-6 h-6 text-text-secondary" />
                    ) : (
                      <HiChevronDown className="w-6 h-6 text-text-secondary" />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded View */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isExpanded
                    ? "max-h-[1000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-4 pb-4 pt-2 border-t border-neutral">
                  <div className="space-y-4">
                    {/* Client Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <HiUser className="w-5 h-5 text-text-muted mt-0.5 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm text-text-muted">Client</p>
                          <p className="font-semibold text-text-primary">
                            {project.bookedByName}
                          </p>
                          <p className="text-sm text-text-secondary truncate">
                            {project.bookedByEmail}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <HiPhone className="w-5 h-5 text-text-muted mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-text-muted">Contact</p>
                          <p className="font-semibold text-text-primary">
                            {project.contactPhone}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <HiCalendar className="w-5 h-5 text-text-muted mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-text-muted">
                            Scheduled Date
                          </p>
                          <p className="font-semibold text-text-primary">
                            {new Date(project?.scheduleDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </p>
                          <p className="text-sm text-text-secondary flex items-center gap-1">
                            <HiClock className="w-4 h-4" />
                            {project.bookingTime}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <HiLocationMarker className="w-5 h-5 text-text-muted mt-0.5 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm text-text-muted">Address</p>
                          <p className="font-semibold text-text-primary">
                            {project.serviceAddress}
                          </p>
                          <p className="text-sm text-text-secondary">
                            {project.serviceArea}, {project.serviceCity}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Special Instructions */}
                    {project.specialInstructions && (
                      <div className="bg-secondary p-4 rounded-lg">
                        <p className="text-sm text-text-muted mb-1 font-semibold">
                          Special Instructions
                        </p>
                        <p className="text-text-primary text-sm">
                          {project.specialInstructions}
                        </p>
                      </div>
                    )}

                    {/* Project Details */}
                    <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-neutral">
                      <div>
                        <p className="text-sm text-text-muted">
                          service Category
                        </p>
                        <p className="text-sm font-semibold text-text-primary capitalize">
                          {project.serviceCategory}
                        </p>
                      </div>
                      {project.quantity && (
                        <div>
                          <p className="text-sm text-text-muted">Quantity</p>
                          <p className="text-sm font-semibold text-text-primary">
                            {project.quantity}
                          </p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-text-muted">Amount</p>
                        <p className="text-sm font-bold text-accent">
                          BDT &nbsp;{project.payableAmount?.toLocaleString()}
                        </p>
                      </div>
                      <div className="ml-auto">
                        <p className="text-xs text-text-muted mb-1">
                          Booking ID
                        </p>
                        <p className="text-xs font-mono text-text-secondary">
                          {project._id?.slice(-8)}
                        </p>
                      </div>
                    </div>

                    {/* Accept Button in Expanded View */}
                    {project.status === "assigned" && (
                      <div className="pt-2 space-y-3">
                        <button
                          onClick={() => handleAssigned(project._id)}
                          className="w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-semibold"
                        >
                          Accept Booking
                        </button>
                        <button
                          onClick={() => handleDeclineProject(project._id)}
                          className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-800 transition-colors font-semibold"
                        >
                          Decline Booking
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-sm text-text-secondary">
        Showing {assignedProjects.length} project
        {assignedProjects.length !== 1 ? "s" : ""}
      </div>
    </div>
  ) : (
    <div className="bg-bg-main rounded-lg shadow-sm border border-neutral p-12 text-center mb-8">
      <HiClipboardList className="w-16 h-16 text-text-muted mx-auto mb-4" />
      <p className="text-xl font-semibold text-text-primary mb-2">
        No Assigned Project for now
      </p>
      <p className="text-text-secondary">
        You don't have any assigned projects at the moment
      </p>
    </div>
  );
};

export default AssignedProjects;
