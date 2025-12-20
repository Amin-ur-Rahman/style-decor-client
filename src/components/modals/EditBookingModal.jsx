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
  } = useForm({
    defaultValues: {
      scheduleDate: bookingData?.scheduleDate || "",
      scheduleTime: bookingData?.scheduleTime || "",
      consultationType: bookingData?.consultationType || "",
      quantity: bookingData?.quantity || 1,
      serviceAddress: bookingData?.serviceAddress || "",
      serviceCity: bookingData?.serviceCity || "",
      serviceArea: bookingData?.serviceArea || "",
      serviceCategory: bookingData?.serviceCategory || "",
      bookedByName: bookingData?.bookedByName || "",
      contactPhone: bookingData?.contactPhone || "",
      specialInstructions: bookingData?.specialInstructions || "",
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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-bg-main rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-bg-main border-b border-neutral px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
            <div>
              <h2 className="text-2xl font-bold text-text-primary">
                Edit Booking
              </h2>
              <p className="text-sm text-text-secondary mt-1">
                Update your booking details
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <HiX className="w-6 h-6 text-text-secondary" />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <div className="space-y-6">
              {/* Schedule Date */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  <HiCalendar className="inline w-4 h-4 mr-1" />
                  Schedule Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  {...register("scheduleDate", {
                    required: "Schedule date is required",
                  })}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-3 py-2.5 text-sm bg-bg-main border border-neutral rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                />
                {errors.scheduleDate && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.scheduleDate.message}
                  </p>
                )}
              </div>

              {/* Schedule Time */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  <HiClock className="inline w-4 h-4 mr-1" />
                  Schedule Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  {...register("scheduleTime", {
                    required: "Schedule time is required",
                  })}
                  className="w-full px-3 py-2.5 text-sm bg-bg-main border border-neutral rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                />
                {errors.scheduleTime && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.scheduleTime.message}
                  </p>
                )}
              </div>

              {/* Consultation Type - Only show for consultation bookings */}
              {isConsultation && (
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
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
                      <span className="text-sm font-medium text-text-primary">
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
                      <span className="text-sm font-medium text-text-primary">
                        Online
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Decoration Fields - Only show for decoration bookings */}
              {isDecoration && (
                <>
                  {/* Quantity Input */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
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
                      className="w-full px-3 py-2.5 text-sm bg-bg-main border border-neutral rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                    />
                    {errors.quantity && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.quantity.message}
                      </p>
                    )}
                  </div>

                  {/* Service Address */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      <HiLocationMarker className="inline w-4 h-4 mr-1" />
                      Service Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("serviceAddress", {
                        required: "Service address is required",
                      })}
                      placeholder="House/Flat No, Road No"
                      className="w-full px-3 py-2.5 text-sm bg-bg-main border border-neutral rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
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
                      <label className="block text-sm font-semibold text-text-primary mb-2">
                        City <span className="text-red-500">*</span>
                      </label>
                      <select
                        {...register("serviceCity", {
                          required: "Service city is required",
                        })}
                        className="w-full px-3 py-2.5 text-sm bg-bg-main border border-neutral rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                      >
                        <option value="">Select your city</option>
                        {cities &&
                          [...cities]
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
                      <label className="block text-sm font-semibold text-text-primary mb-2">
                        Area <span className="text-red-500">*</span>
                      </label>
                      <select
                        {...register("serviceArea", {
                          required: "Select your area",
                        })}
                        className="w-full px-3 py-2.5 text-sm bg-bg-main border border-neutral rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                      >
                        <option value="">Select your area</option>
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

                  {/* Service Category */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Service Category <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("serviceCategory")}
                      readOnly
                      className="w-full px-3 py-2.5 text-sm bg-secondary border border-neutral rounded-md cursor-not-allowed text-text-secondary"
                    />
                  </div>
                </>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  <MdModeEditOutline className="inline w-4 h-4 mr-1" />
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("bookedByName", {
                    required: "Full name is required",
                  })}
                  placeholder="Input your full name..."
                  className="w-full px-3 py-2.5 text-sm bg-bg-main border border-neutral rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                />
                {errors.bookedByName && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.bookedByName.message}
                  </p>
                )}
              </div>

              {/* Contact Phone */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  <HiPhone className="inline w-4 h-4 mr-1" />
                  Contact Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  {...register("contactPhone", {
                    required: "Contact phone is required",
                  })}
                  placeholder="01XXXXXXXX"
                  className="w-full px-3 py-2.5 text-sm bg-bg-main border border-neutral rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                />
                {errors.contactPhone && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.contactPhone.message}
                  </p>
                )}
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Special Instructions (Optional)
                </label>
                <textarea
                  {...register("specialInstructions")}
                  rows="4"
                  placeholder="Any special requirements or preferences..."
                  className="w-full px-4 py-3 bg-bg-main border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
                ></textarea>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-neutral hover:bg-neutral-dark text-text-primary font-semibold rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit(handleFormSubmit)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-bg-main font-semibold rounded-lg transition-all shadow-sm"
              >
                <HiCheckCircle className="w-5 h-5" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBookingModal;
