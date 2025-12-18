import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  HiArrowLeft,
  HiSparkles,
  HiCalendar,
  HiClock,
  HiPhone,
  HiLocationMarker,
  HiCheckCircle,
  HiCash,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import useAxiosInstance from "../../../hooks and contexts/axios/useAxiosInstance";
import { LoadingBubbles } from "../../../LoadingAnimations";
import Swal from "sweetalert2";
import { useAuth } from "../../../hooks and contexts/auth/useAuth";
import useUserInfo from "../../../hooks and contexts/role/useUserInfo";
import { MdAlternateEmail, MdModeEditOutline } from "react-icons/md";

const BookService = ({ serviceId }) => {
  const [bookingType, setBookingType] = useState("consultation");
  const [serviceCenters, setServiceCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // const { serviceId } = useParams();
  const axiosInstance = useAxiosInstance();
  const { user } = useAuth();
  const { userData, infoLoading } = useUserInfo();

  const { data: service, isLoading } = useQuery({
    queryKey: ["service-details", serviceId],
    enabled: !!serviceId,
    queryFn: async () => {
      const res = await axiosInstance.get(`/service/${serviceId}`);
      return res.data;
    },
  });

  // console.log(service);

  //   react hook form---------------
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      quantity: 1,
    },
  });

  //   for better ux
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

  const selectedCity = useWatch({ control, name: "serviceCity" });

  if (isLoading || loading || infoLoading || !user || !userData)
    return <LoadingBubbles></LoadingBubbles>;

  const cities = serviceCenters?.map((center) => center.city);

  //   console.log(selectedCity, "from useWatch");
  const findAreaByCity = () => {
    if (selectedCity) {
      const result = serviceCenters?.find((c) => selectedCity === c.city);
      return result?.covered_area || [];
    }
  };

  const onSubmit = async (data) => {
    const bookingInfo = {
      ...data,
      serviceId: service._id,
      serviceName: service.serviceName,
      createdAt: new Date(),
      quantity: parseFloat(data.quantity),

      status: "pending",
      paymentStatus: data.bookingType === "decoration" ? "unpaid" : "free",
    };

    Swal.fire({
      title: "Confirm booking?",
      text: "You will be notified after an admin has approved your booking",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const insertData = await axiosInstance.post("/booking", bookingInfo);
          if (!insertData.data.insertedId) {
            Swal.fire({
              title: "Request FAiled",
              text: "Something went wrong!",
              icon: "warning",
            });
            return;
          }
          console.log(insertData.data);
          Swal.fire({
            title: "Success!",
            text: "Your booking has been placed",
            icon: "success",
          });
          reset();
          setTimeout(() => {
            navigate("/dashboard/my-bookings");
          }, 2000);
        } catch (error) {
          Swal.fire({
            title: "Request Failed",
            text: error.response?.data?.message || "Something went wrong!",
            icon: "error",
          });
        }
      }
    });

    console.log(bookingInfo);
  };

  const handleBookingTypeChange = (type) => {
    setBookingType(type);
  };

  return (
    <div className="  bg-secondary">
      {/* Header */}
      {/* <header className="bg-white border-b border-neutral sticky top-0 z-10 shadow-sm">
        <div className="w-[90dvw] mx-auto py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-linear-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-sm">
              <HiSparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-primary">
              StyleDecor
            </span>
          </a>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary hover:bg-secondary rounded-lg transition-all"
          >
            <HiArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back</span>
          </button>
        </div>
      </header> */}

      {/* Main Content */}
      <div className=" p-4 rounded-lg mx-auto py-12">
        <div className="max-w-2xl mx-auto">
          {/* Page Title with Service Name */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Book Your Service
            </h1>
            <p className="text-lg text-primary font-semibold mb-1">
              {service?.serviceName}
            </p>
            <p className="text-gray-600">
              Choose your booking type and fill in the details
            </p>
          </div>

          {/* Booking Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-lg shadow-sm border border-neutral p-6 sm:p-8"
          >
            {/* Booking Type Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Booking Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label
                  className={`flex items-center justify-center gap-2 p-2 text-sm  rounded-lg cursor-pointer transition-all ${
                    bookingType === "consultation"
                      ? "border-primary bg-primary/5"
                      : "border-neutral hover:border-primary/50"
                  }`}
                >
                  <input
                    type="radio"
                    value="consultation"
                    {...register("bookingType")}
                    checked={bookingType === "consultation"}
                    onChange={() => handleBookingTypeChange("consultation")}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="font-medium text-gray-700">
                    Consultation
                  </span>
                </label>

                <label
                  className={`flex items-center justify-center gap-2 p-2 text-sm  rounded-lg cursor-pointer transition-all ${
                    bookingType === "decoration"
                      ? "border-primary bg-primary/5"
                      : "border-neutral hover:border-primary/50"
                  }`}
                >
                  <input
                    type="radio"
                    value="decoration"
                    {...register("bookingType")}
                    checked={bookingType === "decoration"}
                    onChange={() => handleBookingTypeChange("decoration")}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="font-medium text-gray-700">Decoration</span>
                </label>
              </div>
            </div>

            {/* Common Fields */}
            <div className="space-y-6">
              {/* Booking Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <HiCalendar className="inline w-4 h-4 mr-1" />
                  Your schedule Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  {...register("scheduleDate", {
                    required: "Booking date is required",
                  })}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-3 py-2.5 text-sm bg-white border border-neutral 
           rounded-md focus:outline-none focus:ring-2 
           focus:ring-primary focus:border-primary transition"
                />
                {errors.bookingDate && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.bookingDate.message}
                  </p>
                )}
              </div>

              {/* Booking Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <HiClock className="inline w-4 h-4 mr-1" />
                  Your schedule Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  {...register("scheduleTime", {
                    required: "Booking time is required",
                  })}
                  className="w-full px-3 py-2.5 text-sm bg-white border border-neutral 
           rounded-md focus:outline-none focus:ring-2 
           focus:ring-primary focus:border-primary transition"
                />
                {errors.bookingTime && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.bookingTime.message}
                  </p>
                )}
              </div>

              {/* Consultation Fields */}
              {bookingType === "consultation" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Consultation Type <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex items-center justify-center gap-2 p-3 border-2 rounded-lg cursor-pointer transition-all border-neutral hover:border-primary/50">
                        <input
                          type="radio"
                          value="studio"
                          {...register("consultationType")}
                          className="w-4 h-4 text-primary"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          In-Studio
                        </span>
                      </label>

                      <label className="flex items-center justify-center gap-2 p-3 border-2 rounded-lg cursor-pointer transition-all border-neutral hover:border-primary/50">
                        <input
                          type="radio"
                          value="online"
                          {...register("consultationType")}
                          className="w-4 h-4 text-primary"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          Online
                        </span>
                      </label>
                    </div>
                  </div>
                </>
              )}

              {/* Decoration Fields */}
              {bookingType === "decoration" && (
                <>
                  {/* Service Rate & Unit (Read-only) */}
                  <div className="bg-primary/5 rounded-lg p-5 border border-primary/20">
                    <div className="flex items-center gap-2 mb-3">
                      <HiCash className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-gray-800">
                        Pricing Information
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          Rate
                        </label>
                        <input
                          type="text"
                          value={`BDT ${service?.cost || 0}`}
                          disabled
                          className="w-full px-3 py-2 bg-white border border-neutral rounded text-gray-700 font-semibold cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          Unit
                        </label>
                        <input
                          type="text"
                          value={service?.unit || "per event"}
                          disabled
                          className="w-full px-3 py-2 bg-white border border-neutral rounded text-gray-700 font-semibold cursor-not-allowed capitalize"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quantity Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      {...register("quantity", {
                        required: "Quantity is required",
                        min: {
                          value: 1,
                          message: "Quantity must be at least 1",
                        },
                      })}
                      placeholder="Enter quantity"
                      min="1"
                      className="w-full px-3 py-2.5 text-sm bg-white border border-neutral 
           rounded-md focus:outline-none focus:ring-2 
           focus:ring-primary focus:border-primary transition"
                    />
                    {errors.quantity && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.quantity.message}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      e.g., Number of{" "}
                      {service?.unit?.replace("per-", "") || "units"}
                    </p>
                  </div>

                  {/* Service Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <HiLocationMarker className="inline w-4 h-4 mr-1" />
                      Service Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("serviceAddress", {
                        required: "Service address is required",
                      })}
                      placeholder="House/Flat No, Road No"
                      className="w-full px-3 py-2.5 text-sm bg-white border border-neutral 
           rounded-md focus:outline-none focus:ring-2 
           focus:ring-primary focus:border-primary transition"
                    />
                    {errors.serviceAddress && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.serviceAddress.message}
                      </p>
                    )}
                  </div>

                  {/* City and Area */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        City
                      </label>
                      <select
                        {...register("serviceCity", {
                          required: "Service city is required",
                        })}
                        className="w-full px-3 py-2.5 text-sm bg-white border border-neutral 
           rounded-md focus:outline-none focus:ring-2 
           focus:ring-primary focus:border-primary transition"
                      >
                        <option disabled={true}>select your city</option>
                        {[...cities]
                          .sort((a, b) => a.localeCompare(b))
                          .map((c, i) => (
                            <option key={i} value={c}>
                              {c}
                            </option>
                          ))}
                      </select>
                      {errors.serviceCity && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.serviceCity.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Area
                      </label>
                      <select
                        {...register("serviceArea", {
                          required: "Select you area",
                        })}
                        className="w-full px-3 py-2.5 text-sm bg-white border border-neutral 
           rounded-md focus:outline-none focus:ring-2 
           focus:ring-primary focus:border-primary transition"
                      >
                        <option disabled={true}>select your Area</option>
                        {findAreaByCity() &&
                          findAreaByCity().map((a, i) => (
                            <option key={i} value={a}>
                              {a}
                            </option>
                          ))}
                      </select>
                      {errors.serviceArea && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.serviceArea.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Event Venue Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service category <span className="text-red-500">*</span>
                    </label>
                    <input
                      defaultValue={service?.category}
                      placeholder={service?.category}
                      readOnly
                      {...register("serviceCategory")}
                      className="w-full px-3 py-2.5 text-sm bg-white border border-neutral 
           rounded-md focus:outline-none focus:ring-2 
           focus:ring-primary focus:border-primary transition"
                    ></input>
                  </div>
                </>
              )}

              {/* full name */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MdModeEditOutline className="inline w-4 h-4 mr-1" />
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  defaultValue={user?.displayName}
                  {...register("bookedByName")}
                  placeholder="input your full name..."
                  className="w-full px-3 py-2.5 text-sm bg-white border border-neutral 
           rounded-md focus:outline-none focus:ring-2 
           focus:ring-primary focus:border-primary transition"
                />
              </div>

              {/* Contact Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <HiPhone className="inline w-4 h-4 mr-1" />
                  Contact Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  {...register("contactPhone")}
                  placeholder="01XXXXXXXX"
                  className="w-full px-3 py-2.5 text-sm bg-white border border-neutral 
           rounded-md focus:outline-none focus:ring-2 
           focus:ring-primary focus:border-primary transition"
                />
              </div>

              {/* email address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MdAlternateEmail className="inline w-4 h-4 mr-1" />
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  {...register("bookedByEmail")}
                  placeholder="xyz@example.com"
                  className="w-full px-3 py-2.5 text-sm bg-white border border-neutral 
           rounded-md focus:outline-none focus:ring-2 
           focus:ring-primary focus:border-primary transition"
                />
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Instructions (Optional)
                </label>
                <textarea
                  {...register("specialInstructions")}
                  rows="4"
                  placeholder="Any special requirements or preferences..."
                  className="w-full px-4 py-3 bg-white border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-primary hover:bg-primary/90 text-white text-lg font-semibold rounded-lg transition-all shadow-sm hover:shadow-md group mt-8"
              >
                <HiCheckCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookService;
