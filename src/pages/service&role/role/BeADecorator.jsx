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

  // console.log(userData);

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
    console.log("Application Data:", applicationData);
    try {
      const res = await axiosInstance.post("/decorators", applicationData);
      console.log(res.data);
      if (!res.data.insertedId) {
        Swal.fire({
          title: "Request Failed",
          text: res.data.message || "Something went wrong!",
          icon: "error",
        });
      }
      if (res.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Your request has been submitted",
          icon: "success",
        });
        reset();
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Request Failed",
        text: error.response?.data?.message || "Something went wrong!",
        icon: "error",
      });
    }
  };

  if (infoLoading || loading) return <LoadingBubbles></LoadingBubbles>;

  return userData?.role === "user" ? (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="mx-10 my-5">
        <Link to="/">
          <Logo></Logo>
        </Link>
      </div>
      <div className=" mx-auto px-6 py-12">
        <div className="mb-12 mx-auto w-max">
          <h1 className="text-4xl font-light text-slate-900 mb-3 tracking-tight">
            Become a Decorator
          </h1>
          <p className="text-slate-600 text-lg font-light">
            Join our network of creative professionals
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 max-w-xl bg-neutral p-6 md:p-8 lg:p-10 mx-auto rounded-lg"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2.5">
                Full Name
              </label>
              <div className="relative">
                <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  {...register("decoratorName", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
                  })}
                  className=" w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 transition-colors text-slate-900"
                  placeholder="Enter your full name"
                />
              </div>
              {errors.decoratorName && (
                <p className="text-red-600 text-sm mt-2">
                  {errors.decoratorName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2.5">
                Email Address
              </label>
              <div className="relative">
                <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  {...register("decoratorEmail")}
                  disabled
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed"
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Using your registered email
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2.5">
                  City
                </label>
                <select
                  {...register("serviceCity", {
                    required: "Service city is required",
                  })}
                  className="w-full px-4 py-3.5 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 bg-white text-slate-900 transition-colors"
                >
                  <option disabled>Select your city</option>
                  {[...cities]
                    .sort((a, b) => a.localeCompare(b))
                    .map((c, i) => (
                      <option key={i} value={c}>
                        {c}
                      </option>
                    ))}
                </select>
                {errors.serviceCity && (
                  <p className="text-red-600 text-sm mt-2">
                    {errors.serviceCity.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2.5">
                  Area
                </label>
                <select
                  {...register("serviceArea", {
                    required: "Select your area",
                  })}
                  className="w-full px-4 py-3.5 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 bg-white text-slate-900 transition-colors"
                >
                  <option disabled>Select your area</option>
                  {findAreaByCity() &&
                    findAreaByCity().map((a, i) => (
                      <option key={i} value={a}>
                        {a}
                      </option>
                    ))}
                </select>
                {errors.serviceArea && (
                  <p className="text-red-600 text-sm mt-2">
                    {errors.serviceArea.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2.5">
                Contact Number
              </label>
              <div className="relative">
                <HiPhone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="tel"
                  {...register("contactNumber")}
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 transition-colors text-slate-900"
                  placeholder="01XXXXXXXX"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2.5">
                Years of Experience
              </label>
              <div className="relative">
                <HiBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select
                  {...register("experience", {
                    required: "Please select your experience level",
                  })}
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 transition-colors text-slate-900 appearance-none"
                >
                  <option value="" disabled>
                    Select experience
                  </option>
                  <option value={0}>Less than 1 year</option>
                  <option value={2}>1-3 years</option>
                  <option value={4}>3-5 years</option>
                  <option value={6}>5+ years</option>
                </select>
              </div>
              {errors.experience && (
                <p className="text-red-600 text-sm mt-2">
                  {errors.experience.message}
                </p>
              )}
            </div>

            {/* specialities.-------------------------- */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Specialization
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 md:gap-3 ">
                <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="checkbox"
                    value="wedding"
                    {...register("specialization", {
                      required: "Please select at least one specialization",
                    })}
                    className="md:w-4 md:h-4 w-2 h-2  text-slate-900 border-slate-300 rounded focus:ring-2 focus:ring-slate-300"
                  />
                  <span className="text-sm text-slate-700 font-medium">
                    Wedding Dec oration
                  </span>
                </label>
                <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="checkbox"
                    value="home"
                    {...register("specialization")}
                    className="md:w-4 md:h-4 w-2 h-2  text-slate-900 border-slate-300 rounded focus:ring-2 focus:ring-slate-300"
                  />
                  <span className="text-sm text-slate-700 font-medium">
                    Home Interior
                  </span>
                </label>
                <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="checkbox"
                    value="office"
                    {...register("specialization")}
                    className="md:w-4 md:h-4 w-2 h-2  text-slate-900 border-slate-300 rounded focus:ring-2 focus:ring-slate-300"
                  />
                  <span className="text-sm text-slate-700 font-medium">
                    Office Setup
                  </span>
                </label>
                <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="checkbox"
                    value="event"
                    {...register("specialization")}
                    className="md:w-4 md:h-4 w-2 h-2  text-slate-900 border-slate-300 rounded focus:ring-2 focus:ring-slate-300"
                  />
                  <span className="text-sm text-slate-700 font-medium">
                    Event Decoration
                  </span>
                </label>
              </div>
              {errors.specialization && (
                <p className="text-red-600 text-sm mt-2">
                  {errors.specialization.message}
                </p>
              )}
            </div>
            <div className="pt-6">
              <button
                type="submit"
                className="mx-auto items-center justify-center flex w-max gap-3  px-8 py-4 bg-primary hover:bg-accent text-white  rounded-lg transition-colors"
              >
                <FiSend></FiSend>
                Submit Application
              </button>
              <p className="text-center text-sm text-slate-500 mt-4">
                Your application will be reviewed within 2-3 business days
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Forbidden></Forbidden>
  );
};

export default BeADecorator;
