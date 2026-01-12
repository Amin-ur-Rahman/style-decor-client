import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  HiX,
  HiCalendar,
  HiClock,
  HiPhone,
  HiLocationMarker,
  HiCheckCircle,
} from "react-icons/hi";
import { MdModeEditOutline } from "react-icons/md";

const EditBookingModal = ({ isOpen, onClose, bookingData, onSubmit }) => {
  const [serviceCenters, setServiceCenters] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

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

  useEffect(() => {
    if (bookingData) {
      reset({
        scheduleDate: bookingData.scheduleDate || "",
        scheduleTime: bookingData.scheduleTime || "",
        consultationType: bookingData.consultationType || "",
        quantity: bookingData.quantity || 1,
        serviceAddress: bookingData.serviceAddress || "",
        serviceCity: bookingData.serviceCity || "",
        serviceArea: bookingData.serviceArea || "",
        serviceCategory: bookingData.serviceCategory || "",
        bookedByName: bookingData.bookedByName || "",
        contactPhone: bookingData.contactPhone || "",
        specialInstructions: bookingData.specialInstructions || "",
      });
    }
  }, [bookingData, reset]);

  const selectedCity = useWatch({ control, name: "serviceCity" });

  if (!isOpen) return null;

  const cities = serviceCenters?.map((center) => center.city);

  const findAreaByCity = () => {
    if (selectedCity) {
      const result = serviceCenters?.find((c) => selectedCity === c.city);
      return result?.covered_area || [];
    }
    return [];
  };

  const handleFormSubmit = (data) => {
    onSubmit(data);
    onClose();
  };

  const isConsultation = bookingData?.bookingType === "consultation";
  const isDecoration = bookingData?.bookingType === "decoration";

  // Common input style class to avoid repetition
  const inputClasses =
    "w-full px-3 py-2.5 text-sm bg-bg-main text-text-primary border border-neutral rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all";

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-bg-main border border-neutral rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-bg-main border-b border-neutral px-6 py-4 flex items-center justify-between rounded-t-2xl z-20">
            <div>
              <h2 className="text-2xl font-bold text-text-primary">
                Edit Booking
              </h2>
              <p className="text-sm text-text-secondary mt-1">
                Refine your event requirements
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral rounded-lg transition-colors group"
            >
              <HiX className="w-6 h-6 text-text-muted group-hover:text-primary" />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <div className="space-y-5">
              {/* Row: Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">
                    <HiCalendar className="inline w-4 h-4 mr-1 text-primary" />
                    Schedule Date
                  </label>
                  <input
                    type="date"
                    {...register("scheduleDate", {
                      required: "Date is required",
                    })}
                    min={new Date().toISOString().split("T")[0]}
                    className={inputClasses}
                  />
                  {errors.scheduleDate && (
                    <p className="text-accent text-xs mt-1 font-medium">
                      {errors.scheduleDate.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">
                    <HiClock className="inline w-4 h-4 mr-1 text-primary" />
                    Schedule Time
                  </label>
                  <input
                    type="time"
                    {...register("scheduleTime", {
                      required: "Time is required",
                    })}
                    className={inputClasses}
                  />
                  {errors.scheduleTime && (
                    <p className="text-accent text-xs mt-1 font-medium">
                      {errors.scheduleTime.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Consultation Type - Toggle Logic */}
              {isConsultation && (
                <div className="bg-bg-alt p-4 rounded-xl border border-neutral">
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-primary mb-3 text-center">
                    Consultation Method
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {["studio", "online"].map((type) => (
                      <label
                        key={type}
                        className="flex items-center justify-center gap-2 p-3 border border-neutral rounded-lg cursor-pointer transition-all hover:bg-bg-main has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                      >
                        <input
                          type="radio"
                          value={type}
                          {...register("consultationType")}
                          className="w-4 h-4 text-primary accent-primary"
                        />
                        <span className="text-sm font-semibold text-text-primary capitalize">
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Decoration Specific Fields */}
              {isDecoration && (
                <div className="space-y-5 border-y border-neutral py-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      {...register("quantity", {
                        required: "Quantity required",
                        min: 1,
                      })}
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">
                      <HiLocationMarker className="inline w-4 h-4 mr-1 text-accent" />
                      Street Address
                    </label>
                    <input
                      type="text"
                      {...register("serviceAddress", {
                        required: "Address required",
                      })}
                      placeholder="Street, Building, Apartment"
                      className={inputClasses}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">
                        City
                      </label>
                      <select
                        {...register("serviceCity", {
                          required: "City required",
                        })}
                        className={inputClasses}
                      >
                        <option value="">Select City</option>
                        {cities?.sort().map((c, i) => (
                          <option key={i} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">
                        Area
                      </label>
                      <select
                        {...register("serviceArea", {
                          required: "Area required",
                        })}
                        className={inputClasses}
                      >
                        <option value="">Select Area</option>
                        {findAreaByCity().map((a, i) => (
                          <option key={i} value={a}>
                            {a}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* User Identity Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">
                    <MdModeEditOutline className="inline w-4 h-4 mr-1 text-primary" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    {...register("bookedByName", { required: "Name required" })}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">
                    <HiPhone className="inline w-4 h-4 mr-1 text-primary" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    {...register("contactPhone", {
                      required: "Phone required",
                    })}
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">
                  Special Instructions
                </label>
                <textarea
                  {...register("specialInstructions")}
                  rows="3"
                  className={`${inputClasses} resize-none`}
                  placeholder="Tell us about specific themes or requests..."
                ></textarea>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-neutral hover:bg-neutral-dark text-text-primary font-bold rounded-xl transition-all order-2 sm:order-1"
              >
                Discard
              </button>
              <button
                type="button"
                onClick={handleSubmit(handleFormSubmit)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/20 order-1 sm:order-2"
              >
                <HiCheckCircle className="w-5 h-5" />
                Update Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBookingModal;
