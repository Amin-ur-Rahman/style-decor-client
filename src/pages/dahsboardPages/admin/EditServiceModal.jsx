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
      confirmButtonColor: "#2f5f5d",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Update",
    });

    if (!result.isConfirmed) return;

    try {
      let imageUrl = service.photo;

      // Only upload if a new file is selected
      if (data.photo && data.photo[0]) {
        const formData = new FormData();
        formData.append("file", data.photo[0]);
        formData.append("upload_preset", preset);

        const uploadData = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        );
        imageUrl = uploadData.data.secure_url;
        console.log(imageUrl);
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

      const res = await axiosInstance.patch(
        `/service/${service._id}`,
        updateData
      );

      console.log(res.data);

      await Swal.fire({
        title: "Updated!",
        text: "Service data updated successfully",
        icon: "success",
      });

      onClose();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to update service.",
        icon: "error",
      });
      console.log(error);
    }
  };

  if (!isOpen || !service) return null;

  return (
    <dialog className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box max-w-3xl bg-white">
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* SECTION 1  */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-4">
              <label
                htmlFor="serviceName"
                className="block text-sm font-semibold mb-2 text-text-secondary"
              >
                Service Name
              </label>
              <div className="relative">
                <HiSparkles className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-accent" />
                <input
                  id="serviceName"
                  type="text"
                  placeholder="e.g., Premium Wedding Stage Decor"
                  {...register("serviceName", { required: true })}
                  className="w-full pl-12 pr-4 py-3.5 bg-bg-main border-2 border-neutral-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-sm hover:border-primary-light"
                />
              </div>
            </div>

            {/*---------------------cost---------------- */}
            <div className="md:col-span-2">
              <label
                htmlFor="cost"
                className="block text-sm font-semibold mb-2 text-text-secondary"
              >
                Cost (BDT)
              </label>
              <div className="relative">
                <HiCurrencyDollar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-accent" />
                <input
                  id="cost"
                  type="number"
                  placeholder="50000"
                  {...register("cost", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  className="w-full pl-12 pr-4 py-3.5 bg-bg-main border-2 border-neutral-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-sm hover:border-primary-light"
                />
              </div>
            </div>

            {/* ----------------------rate type -----------------*/}
            <div className="md:col-span-2">
              <label
                htmlFor="rateType"
                className="block text-sm font-semibold mb-2 text-text-secondary"
              >
                Rate type
              </label>
              <div className="relative">
                <HiCurrencyDollar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary pointer-events-none" />
                <select
                  id="rateType"
                  {...register("rateType", { required: true })}
                  className="w-full pl-12 pr-4 py-3.5 bg-bg-main border-2 border-neutral-dark rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-sm hover:border-primary-light"
                >
                  <option value="" disabled>
                    Select Model
                  </option>
                  <option value="rate-per-unit">Rate Per Unit</option>
                  <option value="flat-rate">Flat Rate</option>
                </select>
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-text-muted">
                  ▼
                </span>
              </div>
            </div>

            {/* --------------------unit-------------------- */}
            <div className="md:col-span-2">
              <label
                htmlFor="unit"
                className="block text-sm font-semibold mb-2 text-text-secondary"
              >
                Unit
              </label>
              <div className="relative">
                <HiScale className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary pointer-events-none" />
                <select
                  id="unit"
                  {...register("unit", { required: true })}
                  className="w-full pl-12 pr-4 py-3.5 bg-bg-main border-2 border-neutral-dark rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-sm hover:border-primary-light"
                >
                  <option value="" disabled>
                    Select Unit
                  </option>
                  {unitOptions.map((option) => (
                    <option
                      key={option}
                      value={option.toLowerCase().replace(/[/\s]/g, "-")}
                    >
                      {option}
                    </option>
                  ))}
                </select>
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-text-muted">
                  ▼
                </span>
              </div>
            </div>

            {/* ---------------------category------------------------- */}
            <div className="md:col-span-4">
              <label
                htmlFor="category"
                className="block text-sm font-semibold mb-2 text-text-secondary"
              >
                Service Category
              </label>
              <div className="relative">
                <HiTag className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-accent pointer-events-none" />
                <select
                  id="category"
                  {...register("category", { required: true })}
                  className="w-full pl-12 pr-4 py-3.5 bg-bg-main border-2 border-neutral-dark rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-sm hover:border-primary-light"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {serviceCategories.map((option) => (
                    <option
                      key={option}
                      value={option.toLowerCase().replace(/ /g, "-")}
                    >
                      {option}
                    </option>
                  ))}
                </select>
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-text-muted">
                  ▼
                </span>
              </div>
            </div>
          </div>

          {/* SECTION 2 */}
          <div className="pt-8 space-y-6 border-t-2 border-neutral">
            {/*------------------short description ---------------------*/}
            <div>
              <label
                htmlFor="shortDescription"
                className="block text-sm font-semibold mb-2 text-text-secondary"
              >
                Short Description (For Service Cards)
              </label>
              <div className="relative">
                <HiPencil className="absolute left-4 top-4 w-5 h-5 text-primary" />
                <textarea
                  id="shortDescription"
                  rows="3"
                  placeholder="A brief, engaging summary (max 250 characters) for the Home/Services page cards."
                  {...register("shortDescription", {
                    required: true,
                    maxLength: 250,
                  })}
                  className="w-full pl-12 pr-4 py-3.5 bg-bg-main border-2 border-neutral-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-sm resize-none hover:border-primary-light"
                />
              </div>
            </div>

            {/* ------------------long description ----------------------*/}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold mb-2 text-text-secondary"
              >
                Detailed Description (For Details Page)
              </label>
              <div className="relative">
                <HiPencil className="absolute left-4 top-4 w-5 h-5 text-primary" />
                <textarea
                  id="description"
                  rows="5"
                  placeholder="Describe the inclusions, materials, and scope of this package..."
                  {...register("description", { required: true })}
                  className="w-full pl-12 pr-4 py-3.5 bg-bg-main border-2 border-neutral-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-sm resize-none hover:border-primary-light"
                />
              </div>
            </div>

            {/* Service Active/Inactive Status */}
            <div className="border-t-2 border-neutral pt-6">
              <label className="block text-sm font-semibold mb-3 text-text-secondary">
                Service Status
              </label>
              <p className="text-sm text-text-muted mb-4">
                Current status:{" "}
                <span
                  className={`font-semibold ${
                    service.isActive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {service.isActive ? "Active" : "Inactive"}
                </span>
              </p>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer p-3 border-2 border-neutral-dark rounded-xl hover:border-primary transition-all">
                  <input
                    type="radio"
                    value="true"
                    {...register("isActive")}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-text-secondary">
                    <span className="font-semibold text-green-600">Active</span>{" "}
                    - Service will be visible to customers
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer p-3 border-2 border-neutral-dark rounded-xl hover:border-primary transition-all">
                  <input
                    type="radio"
                    value="false"
                    {...register("isActive")}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-text-secondary">
                    <span className="font-semibold text-red-600">Inactive</span>{" "}
                    - Service will be hidden from customers
                  </span>
                </label>
              </div>
            </div>

            {/*-----------------------------Image URL -----------------------*/}
            <div className="w-full">
              <label
                htmlFor="photoURL"
                className="block text-sm font-semibold mb-2 text-text-secondary"
              >
                Photo (Optional)
              </label>
              <div className="relative">
                <input
                  id="photoURL"
                  {...register("photo")}
                  type="file"
                  className="block w-full text-sm text-text-secondary file:mr-4 file:py-3 file:px-6
                   file:rounded-xl file:border-2 file:border-neutral file:text-sm file:font-medium
                   file:bg-secondary file:text-primary
                   hover:file:bg-accent hover:file:text-white hover:file:border-accent
                   focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer
                   transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </form>

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
    </dialog>
  );
};
