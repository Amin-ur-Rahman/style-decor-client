import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import useUserInfo from "../../../hooks and contexts/role/useUserInfo";
import { LoadingBubbles } from "../../../LoadingAnimations";
import Forbidden from "../../Forbidden";
import { HiUser, HiMail, HiPhone, HiBriefcase } from "react-icons/hi";
import Logo from "../../../components/Logo";
import { Link } from "react-router-dom";
import useAxiosInstance from "../../../hooks and contexts/axios/useAxiosInstance";
import Swal from "sweetalert2";
import { FiSend } from "react-icons/fi";

const BeADecorator = () => {
  const { userData, infoLoading } = useUserInfo();
  const [serviceCenters, setServiceCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxiosInstance();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  useEffect(() => {
    if (userData) {
      reset({
        decoratorEmail: userData.userEmail || "",
        decoratorName: userData.userName || "",
      });
    }
  }, [userData, reset]);

  useEffect(() => {
    fetch("/citiesAndAreas.json")
      .then((res) => res.json())
      .then((data) => {
        setServiceCenters(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load cities JSON:", err);
        setLoading(false);
      });
  }, []);

  const cities = serviceCenters?.map((center) => center.city);
  const selectedCity = useWatch({ control, name: "serviceCity" });

  const findAreaByCity = () => {
    if (selectedCity) {
      const result = serviceCenters?.find((c) => selectedCity === c.city);
      return result?.covered_area || [];
    }
  };

  const onSubmit = async (data) => {
    const applicationData = {
      userId: userData?._id,
      decoratorEmail: data.decoratorEmail,
      decoratorName: data.decoratorName,
      serviceLocation: {
        city: data.serviceCity,
        area: data.serviceArea,
      },
      contactNumber: data.contactNumber,
      specialization: data.specialization,
      applicationStatus: "pending",
      isVerified: false,
      isAvailable: true,
      photoUrl: userData?.photoUrl,
      ratingCount: 0,
      ratingAverage: 0,
      experienceYears: parseInt(data.experience),
    };

    try {
      const res = await axiosInstance.post("/decorators", applicationData);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Your request has been submitted",
          icon: "success",
          confirmButtonColor: "#2f5f5d", // Primary color
        });
        reset();
      }
    } catch (error) {
      Swal.fire({
        title: "Request Failed",
        text: error.response?.data?.message || "Something went wrong!",
        icon: "error",
      });
    }
  };

  if (infoLoading || loading) return <LoadingBubbles />;

  return userData?.role === "user" ? (
    <div className="min-h-screen bg-bg-main transition-colors duration-300">
      {/* <div className="mx-10 py-5">
        <Link to="/">
          <Logo />
        </Link>
      </div> */}
      <div className="mx-auto px-6 py-12">
        <div className="mb-12 mx-auto w-max text-center">
          <h1 className="text-4xl font-bold text-text-primary mb-3 tracking-tight">
            Become a Decorator
          </h1>
          <p className="text-text-secondary text-lg font-light">
            Join our network of creative professionals
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 max-w-xl bg-bg-alt p-6 md:p-8 lg:p-10 mx-auto rounded-lg border border-neutral shadow-sm"
        >
          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-2.5">
                Full Name
              </label>
              <div className="relative">
                <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="text"
                  {...register("decoratorName", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
                  })}
                  className="w-full pl-12 pr-4 py-3.5 bg-bg-main border border-neutral rounded-lg focus:outline-none focus:border-primary transition-colors text-text-primary placeholder:text-text-muted"
                  placeholder="Enter your full name"
                />
              </div>
              {errors.decoratorName && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.decoratorName.message}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-2.5">
                Email Address
              </label>
              <div className="relative">
                <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="email"
                  {...register("decoratorEmail")}
                  disabled
                  className="w-full pl-12 pr-4 py-3.5 bg-secondary-dark border border-neutral rounded-lg text-text-muted cursor-not-allowed"
                />
              </div>
              <p className="text-xs text-text-muted mt-2">
                Using your registered email
              </p>
            </div>

            {/* City & Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-2.5">
                  City
                </label>
                <select
                  {...register("serviceCity", {
                    required: "Service city is required",
                  })}
                  className="w-full px-4 py-3.5 border border-neutral rounded-lg focus:outline-none focus:border-primary bg-bg-main text-text-primary transition-colors"
                >
                  <option value="">Select your city</option>
                  {[...cities]
                    .sort((a, b) => a.localeCompare(b))
                    .map((c, i) => (
                      <option key={i} value={c}>
                        {c}
                      </option>
                    ))}
                </select>
                {errors.serviceCity && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.serviceCity.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-2.5">
                  Area
                </label>
                <select
                  {...register("serviceArea", { required: "Select your area" })}
                  className="w-full px-4 py-3.5 border border-neutral rounded-lg focus:outline-none focus:border-primary bg-bg-main text-text-primary transition-colors"
                >
                  <option value="">Select your area</option>
                  {findAreaByCity()?.map((a, i) => (
                    <option key={i} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
                {errors.serviceArea && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.serviceArea.message}
                  </p>
                )}
              </div>
            </div>

            {/* Contact & Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-2.5">
                  Contact Number
                </label>
                <div className="relative">
                  <HiPhone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input
                    type="tel"
                    {...register("contactNumber")}
                    className="w-full pl-12 pr-4 py-3.5 bg-bg-main border border-neutral rounded-lg focus:outline-none focus:border-primary transition-colors text-text-primary"
                    placeholder="01XXXXXXXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-2.5">
                  Years of Experience
                </label>
                <div className="relative">
                  <HiBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <select
                    {...register("experience", {
                      required: "Select your experience",
                    })}
                    className="w-full pl-12 pr-4 py-3.5 bg-bg-main border border-neutral rounded-lg focus:outline-none focus:border-primary transition-colors text-text-primary"
                  >
                    <option value="">Select experience</option>
                    <option value={0}>Less than 1 year</option>
                    <option value={2}>1-3 years</option>
                    <option value={4}>3-5 years</option>
                    <option value={6}>5+ years</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Specialization Checkboxes */}
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-3">
                Specialization
              </label>
              <div className="grid grid-cols-1 gap-3">
                {[
                  {
                    id: "event",
                    label: "Event Decorations",
                    sub: "Wedding, Birthday, Corporate",
                  },
                  { id: "wedding", label: "Exclusive Wedding Event", sub: "" },
                  { id: "home", label: "Home Interior", sub: "" },
                  { id: "office", label: "Office Setup", sub: "" },
                  { id: "meeting", label: "Meeting Management", sub: "" },
                ].map((spec) => (
                  <label
                    key={spec.id}
                    className="flex items-center gap-3 p-4 border border-neutral rounded-lg cursor-pointer hover:bg-secondary transition-colors group"
                  >
                    <input
                      type="checkbox"
                      value={spec.id}
                      {...register("specialization", {
                        required: "Select at least one",
                      })}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="text-sm text-text-primary font-medium">
                      {spec.label}{" "}
                      {spec.sub && (
                        <small className="text-text-muted">({spec.sub})</small>
                      )}
                    </span>
                  </label>
                ))}
              </div>
              {errors.specialization && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.specialization.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="pt-6">
              <button
                type="submit"
                className="mx-auto items-center justify-center flex w-max gap-3 px-10 py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg transition-all shadow-lg active:scale-95"
              >
                <FiSend className="text-lg" />
                Submit Application
              </button>
              <p className="text-center text-sm text-text-muted mt-4">
                Your application will be reviewed within 2-3 business days
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Forbidden />
  );
};

export default BeADecorator;
