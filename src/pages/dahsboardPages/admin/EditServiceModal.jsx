import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiX } from "react-icons/hi";

// Add this modal component at the bottom of your file, before export

export const EditServiceModal = ({ service, isOpen, onClose, onUpdate }) => {
  const serviceCategories = ["wedding", "home", "office", "event", "meeting"];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      serviceName: service?.serviceName || "",
      cost: service?.cost || "",
      unit: service?.unit || "",
      category: service?.category || "",
      shortDescription: service?.shortDescription || "",
      description: service?.description || "",
      rateType: service?.rateType || "flat-rate",
    },
  });

  const onSubmit = (data) => {
    console.log("Updated service data:", data);
    onUpdate(service._id, data);
    // Handle update logic here
  };

  if (!isOpen || !service) return null;

  return (
    isOpen && (
      <div>
        <div className="modal-box max-w-3xl">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Edit Service</h3>
              <p className="text-sm text-gray-500 mt-1">
                Update service information
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all"
            >
              <HiX className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Service Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("serviceName", {
                  required: "Service name is required",
                })}
                className="w-full px-4 py-3 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
              {errors.serviceName && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.serviceName.message}
                </p>
              )}
            </div>

            {/* Cost and Unit */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cost (৳) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  {...register("cost", {
                    required: "Cost is required",
                    min: { value: 0, message: "Cost must be positive" },
                  })}
                  className="w-full px-4 py-3 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
                {errors.cost && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.cost.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("unit", { required: "Unit is required" })}
                  placeholder="e.g., per-event, per-room"
                  className="w-full px-4 py-3 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
                {errors.unit && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.unit.message}
                  </p>
                )}
              </div>
            </div>

            {/* Category and Rate Type */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className="w-full px-4 py-3 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                >
                  <option value="">Select category</option>
                  {serviceCategories.map((option) => (
                    <option
                      key={option}
                      value={option.toLowerCase().replace(/ /g, "-")}
                    >
                      {option}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rate Type <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("rateType", {
                    required: "Rate type is required",
                  })}
                  className="w-full px-4 py-3 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                >
                  <option value="flat-rate">Flat Rate</option>
                  <option value="per-unit">Per Unit</option>
                </select>
                {errors.rateType && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.rateType.message}
                  </p>
                )}
              </div>
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Description <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("shortDescription", {
                  required: "Short description is required",
                  maxLength: {
                    value: 200,
                    message: "Maximum 200 characters",
                  },
                })}
                rows="2"
                maxLength="200"
                className="w-full px-4 py-3 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
              />
              {errors.shortDescription && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.shortDescription.message}
                </p>
              )}
            </div>

            {/* Full Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Description <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                rows="4"
                className="w-full px-4 py-3 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
              />
              {errors.description && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          <div className="modal-action mt-6">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit(onSubmit)}
              className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>
        <div className="modal-backdrop" onClick={onClose}></div>
      </div>
    )
  );
};
