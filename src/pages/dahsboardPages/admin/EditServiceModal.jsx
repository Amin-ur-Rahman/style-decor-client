import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  HiCurrencyDollar,
  HiPencil,
  HiScale,
  HiSparkles,
  HiTag,
  HiX,
} from "react-icons/hi";
import useAxiosInstance from "../../../hooks and contexts/axios/useAxiosInstance";
import Swal from "sweetalert2";
import axios from "axios";

export const EditServiceModal = ({ service, isOpen, onClose }) => {
  const axiosInstance = useAxiosInstance();

  const serviceCategories = ["wedding", "home", "office", "event", "meeting"];
  const unitOptions = [
    "Per Sq-Ft",
    "Per Meter",
    "Per Room",
    "Per Floor",
    "Per Event",
    "Per Package",
    "Per Item",
  ];
  const cloudName = import.meta.env.VITE_cloudinary_cloud;
  const preset = import.meta.env.VITE_preset;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (service && isOpen) {
      reset({
        serviceName: service.serviceName || "",
        cost: service.cost || "",
        unit: service.unit || "",
        category: service.category || "",
        shortDescription: service.shortDescription || "",
        description: service.description || "",
        rateType: service.rateType || "flat-rate",
        isActive: service.isActive ? "true" : "false",
      });
    }
  }, [service, isOpen, reset]);

  const onSubmit = async (data) => {
    const result = await Swal.fire({
      title: "Confirm update?",
      text: "Changes will be saved in the database",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2F5F5D", // primary
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Update",
    });

    if (!result.isConfirmed) return;

    try {
      let imageUrl = service.photo;

      if (data.photo && data.photo[0]) {
        const formData = new FormData();
        formData.append("file", data.photo[0]);
        formData.append("upload_preset", preset);

        const uploadData = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        );
        imageUrl = uploadData.data.secure_url;
      }

      const updateData = {
        serviceName: data.serviceName,
        cost: parseFloat(data.cost),
        unit: data.unit,
        category: data.category,
        shortDescription: data.shortDescription,
        description: data.description,
        rateType: data.rateType,
        isActive: data.isActive === "true",
        photo: imageUrl,
      };

      await axiosInstance.patch(`/service/${service._id}`, updateData);

      await Swal.fire({
        title: "Updated!",
        text: "Service data updated successfully",
        icon: "success",
        confirmButtonColor: "#2F5F5D",
      });

      onClose();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to update service.",
        icon: "error",
      });
    }
  };

  if (!isOpen || !service) return null;

  return (
    <dialog className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box max-w-3xl bg-bg-alt border border-neutral">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-text-primary">
              Edit Service
            </h3>
            <p className="text-sm text-text-muted mt-1">
              Update service details and visibility settings
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-bg-main rounded-lg transition-all"
          >
            <HiX className="w-5 h-5 text-text-muted" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* SECTION 1 - Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-4">
              <label className="block text-sm font-semibold mb-2 text-text-secondary">
                Service Name
              </label>
              <div className="relative">
                <HiSparkles className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-accent" />
                <input
                  type="text"
                  {...register("serviceName", { required: true })}
                  className="w-full pl-12 pr-4 py-3 bg-bg-main border border-neutral rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-primary"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2 text-text-secondary">
                Cost (BDT)
              </label>
              <div className="relative">
                <HiCurrencyDollar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-accent" />
                <input
                  type="number"
                  {...register("cost", { required: true, valueAsNumber: true })}
                  className="w-full pl-12 pr-4 py-3 bg-bg-main border border-neutral rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-primary"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2 text-text-secondary">
                Rate Type
              </label>
              <div className="relative">
                <HiCurrencyDollar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary" />
                <select
                  {...register("rateType", { required: true })}
                  className="w-full pl-12 pr-4 py-3 bg-bg-main border border-neutral rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-primary"
                >
                  <option value="rate-per-unit">Rate Per Unit</option>
                  <option value="flat-rate">Flat Rate</option>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
                  ▼
                </span>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2 text-text-secondary">
                Unit
              </label>
              <div className="relative">
                <HiScale className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary" />
                <select
                  {...register("unit", { required: true })}
                  className="w-full pl-12 pr-4 py-3 bg-bg-main border border-neutral rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-primary"
                >
                  {unitOptions.map((option) => (
                    <option
                      key={option}
                      value={option.toLowerCase().replace(/[/\s]/g, "-")}
                    >
                      {option}
                    </option>
                  ))}
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
                  ▼
                </span>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2 text-text-secondary">
                Category
              </label>
              <div className="relative">
                <HiTag className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-accent" />
                <select
                  {...register("category", { required: true })}
                  className="w-full pl-12 pr-4 py-3 bg-bg-main border border-neutral rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-primary"
                >
                  {serviceCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
                  ▼
                </span>
              </div>
            </div>
          </div>

          {/* SECTION 2 - Descriptions */}
          <div className="pt-8 space-y-6 border-t border-neutral">
            <div>
              <label className="block text-sm font-semibold mb-2 text-text-secondary">
                Short Description
              </label>
              <div className="relative">
                <HiPencil className="absolute left-4 top-4 w-5 h-5 text-primary" />
                <textarea
                  rows="2"
                  {...register("shortDescription", {
                    required: true,
                    maxLength: 250,
                  })}
                  className="w-full pl-12 pr-4 py-3 bg-bg-main border border-neutral rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-primary resize-none"
                />
              </div>
            </div>

            {/* Service Status Radio */}
            <div>
              <label className="block text-sm font-semibold mb-3 text-text-secondary">
                Visibility Status
              </label>
              <div className="flex gap-4">
                <label className="flex-1 flex items-center gap-3 cursor-pointer p-4 border border-neutral rounded-xl hover:border-primary/50 transition-all bg-bg-main">
                  <input
                    type="radio"
                    value="true"
                    {...register("isActive")}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-sm font-medium text-green-600">
                    Active
                  </span>
                </label>
                <label className="flex-1 flex items-center gap-3 cursor-pointer p-4 border border-neutral rounded-xl hover:border-primary/50 transition-all bg-bg-main">
                  <input
                    type="radio"
                    value="false"
                    {...register("isActive")}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-sm font-medium text-red-600">
                    Inactive
                  </span>
                </label>
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-text-secondary">
                Update Service Photo
              </label>
              <input
                type="file"
                {...register("photo")}
                className="block w-full text-sm text-text-muted file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary hover:file:text-white transition-all cursor-pointer"
              />
            </div>
          </div>
        </form>

        <div className="modal-action gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-neutral text-text-secondary font-semibold rounded-xl hover:bg-bg-main transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            className="px-6 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all"
          >
            Save Changes
          </button>
        </div>
      </div>
      <div
        className="modal-backdrop bg-text-primary/40"
        onClick={onClose}
      ></div>
    </dialog>
  );
};
