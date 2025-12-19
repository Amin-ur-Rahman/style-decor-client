import React, { useState } from "react";
import axiosInstance from "../../../hooks and contexts/axios/AxiosInstance";
import useUserInfo from "../../../hooks and contexts/role/useUserInfo";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { LoadingBubbles } from "../../../LoadingAnimations";
import NoData from "../../../components/NoData";
import {
  FaStar,
  FaMapMarkerAlt,
  FaBriefcase,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaAward,
  FaEdit,
} from "react-icons/fa";
import { StatusBadge } from "./StatusBadge";
import Swal from "sweetalert2";
import { TiWarningOutline } from "react-icons/ti";

const DecoratorProfile = () => {
  const { userData } = useUserInfo();
  const queryClient = useQueryClient();
  const [isToggling, setIsToggling] = useState(false);

  const {
    data: decorator,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["decorator", userData?.decoratorId],
    enabled: !!userData?.decoratorId,
    queryFn: async () => {
      const res = await axiosInstance.get(`/decorator/${userData.decoratorId}`);
      console.log(res.data);
      return res.data;
    },
  });

  const toggleAvailabilityMutation = useMutation({
    mutationFn: async (newStatus) => {
      const result = await Swal.fire({
        title: "Toggle availability Status?",
        text: "You will be now available for new projects",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#10b981",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Toggle",
      });
      if (!result.isConfirmed) {
        return;
      }

      const res = await axiosInstance.patch(
        `/decorator/${userData.decoratorId}/availability`,
        {
          isAvailable: newStatus,
        }
      );
      Swal.fire({
        title: "Toggled availability",
        text: "status changed successfuly",
        icon: "success",
      });
      return res.data;
    },
    onMutate: () => {
      setIsToggling(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["decorator", userData?.decoratorId]);
      setIsToggling(false);
    },
    onError: (error) => {
      console.error("Failed to update availability:", error);
      setIsToggling(false);
    },
  });

  const handleEditProfile = () => {
    console.log("Edit profile clicked");
  };

  const handleToggleAvailability = () => {
    if (!isToggling) {
      toggleAvailabilityMutation.mutate(!decorator.isAvailable);
    }
  };

  if (isLoading) return <LoadingBubbles></LoadingBubbles>;
  if (isError || !decorator) return <NoData></NoData>;

  console.log(userData.decoratorId);

  const {
    decoratorName,
    decoratorEmail,
    contactNumber,
    serviceLocation,
    specialization,
    applicationStatus,
    isVerified,
    isAvailable,
    photoUrl,
    ratingAverage,
    ratingCount,
    experienceYears,
    approvedAt,
    accountStatus,
    updatedAt,
  } = decorator;

  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="max-w-4xl mx-auto">
        {/* Edit Profile Button - Fixed Position */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleEditProfile}
            className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-bg-main font-semibold rounded-xl shadow-lg transition-colors duration-200"
          >
            <FaEdit size={18} />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Header Card */}
        <div className="bg-bg-main rounded-2xl shadow-lg overflow-hidden mb-6">
          {/* Cover Banner */}
          <div className="h-32 bg-gradient-to-r from-primary via-primary-light to-accent"></div>

          {/* Profile Section */}
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end -mt-16 gap-6">
              {/* Profile Image */}
              <div className="relative">
                <img
                  src={photoUrl}
                  alt={decoratorName}
                  className="w-32 h-32 rounded-2xl object-cover border-4 border-bg-main shadow-xl"
                />
                {isVerified && (
                  <div className="absolute -bottom-2 -right-2 bg-accent rounded-full p-2 shadow-lg">
                    <FaAward size={20} className="text-bg-main" />
                  </div>
                )}
              </div>

              {/* Name and Contact */}
              <div className="flex-1 md:mb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-text-primary mb-1">
                      {decoratorName}
                    </h1>
                    <div className="flex items-center gap-2 text-text-secondary mb-2">
                      <FaMapMarkerAlt size={16} />
                      <span>
                        {serviceLocation.area}, {serviceLocation.city}
                      </span>
                    </div>
                  </div>

                  {/* Rating Display */}
                  <div className="flex items-center gap-3 bg-secondary rounded-xl px-4 py-3">
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-accent mb-1">
                        <FaStar size={20} />
                        <span className="text-2xl font-bold text-text-primary">
                          {ratingAverage}
                        </span>
                      </div>
                      <p className="text-xs text-text-muted">
                        {ratingCount} reviews
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 text-text-secondary">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                  📧
                </div>
                <span>{decoratorEmail}</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                  📱
                </div>
                <span>{contactNumber}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Availability Status Card - NEW */}
          {decorator.accountStatus !== "disabled" ? (
            <div className="bg-bg-main rounded-2xl shadow-lg p-6 md:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isAvailable ? "bg-primary/10" : "bg-neutral"
                    }`}
                  >
                    {isAvailable ? (
                      <FaCheckCircle size={20} className="text-primary" />
                    ) : (
                      <FaTimesCircle size={20} className="text-text-muted" />
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-text-primary">
                    Availability Status
                  </h2>
                </div>

                {/* Toggle Switch */}
                <button
                  onClick={handleToggleAvailability}
                  disabled={isToggling}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-200 ${
                    isAvailable ? "bg-primary" : "bg-neutral-dark"
                  } ${
                    isToggling
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-bg-main shadow-lg transition-transform duration-200 ${
                      isAvailable ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className={`px-4 py-2 rounded-lg ${
                    isAvailable
                      ? "bg-primary/10 text-primary"
                      : "bg-neutral text-text-muted"
                  }`}
                >
                  <p className="font-medium">
                    {isAvailable
                      ? "✓ You are currently available for bookings"
                      : "✗ You are currently unavailable for bookings"}
                  </p>
                </div>
              </div>
              <p className="text-sm text-text-muted mt-3">
                Toggle your availability status to let clients know if you're
                accepting new bookings.
              </p>
            </div>
          ) : (
            <div className="bg-white flex flex-col items-center justify-center text-amber-500  text-center rounded-2xl py-2 px-3 ">
              <TiWarningOutline size={32}></TiWarningOutline> Your Account Is
              disabled at the moment!
            </div>
          )}

          {/* Specialization Card */}
          <div className="bg-bg-main rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <FaAward size={20} className="text-accent" />
              </div>
              <h2 className="text-xl font-bold text-text-primary">
                Specialization
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {specialization.map((spec) => (
                <span
                  key={spec}
                  className="px-4 py-2 rounded-lg bg-secondary text-text-secondary font-medium text-sm"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Experience Card */}
          <div className="bg-bg-main rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <FaBriefcase size={20} className="text-primary" />
              </div>
              <h2 className="text-xl font-bold text-text-primary">
                Experience
              </h2>
            </div>
            <p className="text-3xl font-bold text-accent">
              {experienceYears} years
            </p>
            <p className="text-text-muted mt-1">in event decoration</p>
          </div>

          {/* Status Card */}
          <div className="bg-bg-main rounded-2xl shadow-lg p-6 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <FaCheckCircle size={20} className="text-accent" />
              </div>
              <h2 className="text-xl font-bold text-text-primary">
                Account Status
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <StatusBadge status={isVerified} label="Verified" />
              <StatusBadge status={isAvailable} label="Available" />
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                  applicationStatus === "approved"
                    ? "bg-primary/10 text-primary"
                    : "bg-neutral text-text-muted"
                }`}
              >
                Application: {applicationStatus}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                  accountStatus === "active"
                    ? "bg-primary/10 text-primary"
                    : "bg-neutral text-text-muted"
                }`}
              >
                Account: {accountStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 bg-bg-main rounded-2xl shadow-lg p-6">
          <div className="flex flex-wrap gap-6 text-sm text-text-muted">
            <div className="flex items-center gap-2">
              <FaClock size={16} />
              <span>
                Approved:{" "}
                {new Date(approvedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock size={16} />
              <span>
                Last Updated:{" "}
                {new Date(updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecoratorProfile;
