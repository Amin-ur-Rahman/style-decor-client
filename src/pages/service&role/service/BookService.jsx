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
    return <LoadingBubbles />;

  const cities = serviceCenters?.map((center) => center.city);

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
      confirmButtonColor: "#2f5f5d", // Your Primary color
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const insertData = await axiosInstance.post("/booking", bookingInfo);
          if (insertData.data.insertedId) {
            Swal.fire({
              title: "Success!",
              text: "Your booking has been placed",
              icon: "success",
            });
            reset();
            setTimeout(() => navigate("/dashboard"), 2000);
          }
        } catch (error) {
          Swal.fire({
            title: "Request Failed",
            text: error.response?.data?.message || "Something went wrong!",
            icon: "error",
          });
        }
      }
    });
  };

  const handleBookingTypeChange = (type) => setBookingType(type);

  return (
    <div className="md:p-5 bg-bg-main transition-colors duration-300 min-h-screen">
      <div className="p-4 mx-auto max-w-4xl">
        <div className="mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Book Your Service
            </h1>
            <p className="text-lg text-primary font-bold mb-1">
              {service?.serviceName}
            </p>
            <p className="text-text-secondary">
              Choose your booking type and fill in the details
            </p>
          </div>

          {/* Booking Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-bg-alt rounded-xl shadow-md border border-neutral p-6 sm:p-8"
          >
            {/* Booking Type Selection */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-text-secondary mb-3">
                Select Booking Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                {["consultation", "decoration"].map((type) => (
                  <label
                    key={type}
                    className={`flex items-center justify-center gap-2 p-3 text-sm rounded-lg cursor-pointer border-2 transition-all ${
                      bookingType === type
                        ? "border-primary bg-secondary/30"
                        : "border-neutral hover:border-primary/50"
                    }`}
                  >
                    <input
                      type="radio"
                      value={type}
                      {...register("bookingType")}
                      checked={bookingType === type}
                      onChange={() => handleBookingTypeChange(type)}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="font-bold text-text-primary capitalize">
                      {type}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {/* Date & Time Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-text-secondary mb-2">
                    <HiCalendar className="inline w-4 h-4 mr-1 text-primary" />
                    Schedule Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    {...register("scheduleDate", {
                      required: "Date is required",
                    })}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-2.5 bg-bg-main border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-secondary mb-2">
                    <HiClock className="inline w-4 h-4 mr-1 text-primary" />
                    Schedule Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    {...register("scheduleTime", {
                      required: "Time is required",
                    })}
                    className="w-full px-4 py-2.5 bg-bg-main border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text-primary"
                  />
                </div>
              </div>

              {/* Consultation Specific */}
              {bookingType === "consultation" && (
                <div className="animate-fadeIn">
                  <label className="block text-sm font-semibold text-text-secondary mb-2">
                    Consultation Mode <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {["studio", "online"].map((mode) => (
                      <label
                        key={mode}
                        className="flex items-center gap-2 p-3 border border-neutral rounded-lg cursor-pointer hover:bg-secondary/20 transition-colors"
                      >
                        <input
                          type="radio"
                          value={mode}
                          {...register("consultationType")}
                          className="accent-primary"
                        />
                        <span className="text-sm font-medium text-text-primary capitalize">
                          {mode}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Decoration Specific */}
              {bookingType === "decoration" && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="bg-secondary/20 rounded-lg p-5 border border-primary/10">
                    <div className="flex items-center gap-2 mb-3">
                      <HiCash className="w-5 h-5 text-primary" />
                      <h3 className="font-bold text-text-primary">
                        Pricing Details
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-text-muted">Rate</span>
                        <div className="font-bold text-text-primary">
                          BDT {service?.cost}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-text-muted">Unit</span>
                        <div className="font-bold text-text-primary capitalize">
                          {service?.unit}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text-secondary mb-2">
                      Quantity *
                    </label>
                    <input
                      type="number"
                      {...register("quantity", {
                        required: "Required",
                        min: 1,
                      })}
                      className="w-full px-4 py-2.5 bg-bg-main border border-neutral rounded-lg text-text-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text-secondary mb-2">
                      <HiLocationMarker className="inline w-4 h-4 mr-1 text-primary" />
                      Venue Address *
                    </label>
                    <input
                      type="text"
                      {...register("serviceAddress", { required: "Required" })}
                      placeholder="Street address, Venue name"
                      className="w-full px-4 py-2.5 bg-bg-main border border-neutral rounded-lg text-text-primary"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-text-secondary mb-2">
                        City
                      </label>
                      <select
                        {...register("serviceCity")}
                        className="w-full px-4 py-2.5 bg-bg-main border border-neutral rounded-lg text-text-primary"
                      >
                        {cities.map((c, i) => (
                          <option key={i} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-text-secondary mb-2">
                        Area
                      </label>
                      <select
                        {...register("serviceArea")}
                        className="w-full px-4 py-2.5 bg-bg-main border border-neutral rounded-lg text-text-primary"
                      >
                        {findAreaByCity()?.map((a, i) => (
                          <option key={i} value={a}>
                            {a}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Personal Info Section */}
              <div className="pt-4 border-t border-neutral space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-text-secondary mb-2">
                      <MdModeEditOutline className="inline w-4 h-4 mr-1 text-primary" />
                      Full Name
                    </label>
                    <input
                      defaultValue={user?.displayName}
                      {...register("bookedByName")}
                      className="w-full px-4 py-2.5 bg-bg-main border border-neutral rounded-lg text-text-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-secondary mb-2">
                      <HiPhone className="inline w-4 h-4 mr-1 text-primary" />
                      Phone
                    </label>
                    <input
                      type="tel"
                      {...register("contactPhone")}
                      placeholder="01XXXXXXXX"
                      className="w-full px-4 py-2.5 bg-bg-main border border-neutral rounded-lg text-text-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-secondary mb-2">
                    <MdAlternateEmail className="inline w-4 h-4 mr-1 text-primary" />
                    Email
                  </label>
                  <input
                    readOnly
                    defaultValue={user?.email}
                    className="w-full px-4 py-2.5 bg-secondary-dark border border-neutral rounded-lg text-text-muted cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-secondary mb-2">
                    Special Instructions
                  </label>
                  <textarea
                    {...register("specialInstructions")}
                    rows="3"
                    className="w-full px-4 py-3 bg-bg-main border border-neutral rounded-lg text-text-primary resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-primary hover:bg-primary-hover text-white text-lg font-bold rounded-xl transition-all shadow-lg active:scale-[0.98] mt-8"
              >
                <HiCheckCircle className="w-6 h-6" />
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
