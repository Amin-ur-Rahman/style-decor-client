import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import {
  HiCollection,
  HiSave,
  HiCurrencyDollar,
  HiTag,
  HiScale,
  HiPencil,
  HiSparkles,
} from "react-icons/hi";
import useAxiosInstance from "../../../hooks and contexts/axios/useAxiosInstance";
import { useAuth } from "../../../hooks and contexts/auth/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { BiLeftArrowCircle } from "react-icons/bi";

export default function AddNewService() {
  const { user } = useAuth();
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

  const axiosInstance = useAxiosInstance();

  const { register, handleSubmit, reset } = useForm();
  const cloudName = import.meta.env.VITE_cloudinary_cloud;
  const preset = import.meta.env.VITE_preset;

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.photo[0]);
    formData.append("upload_preset", preset);

    try {
      const uploadData = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );

      const url = uploadData.data.secure_url;

      console.log(url);

      const serviceData = {
        ...data,
        createdByEmail: user?.email,
        createdByName: user?.displayName,
        createdAt: new Date(),
        cost: parseFloat(data.cost),
        photo: url,
      };

      const insertResult = await axiosInstance.post("/services", serviceData);
      console.log(insertResult.data);
      reset();

      await Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Service added to database",
        showConfirmButton: false,
        timer: 1500,
      });

      console.log("Final Service Data:", serviceData);
    } catch (error) {
      console.log("submission failed", error);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 w-full bg-secondary">
      {/* gradient multiple bg-------------- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-neutral rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* ---------------logo  ------------------- */}
        <div className="mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold tracking-tight text-primary">
              style<span className="text-accent">Decor</span>
            </h1>
          </Link>
        </div>

        {/* ---------------heading-------------- */}
        <header className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center gap-3 mb-3 p-4 rounded-2xl bg-primary shadow-lg">
            <HiCollection className="w-10 h-10 text-accent" />
          </div>
          <h2 className="text-4xl font-bold mb-3 text-text-primary">
            Create New Service Package
          </h2>
          <p className="text-lg text-text-muted">
            Enter the details required to offer a new decoration service to your
            clients.
          </p>
        </header>

        {/* ---------main container------------------- */}
        <div className="max-w-4xl mx-auto bg-bg-main p-8 rounded-2xl shadow-2xl border border-neutral">
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
                    <option value="" selected disabled>
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
                    <option value="" selected disabled>
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
                    <option value="" selected disabled>
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

            <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t-2 border-neutral">
              {/* ----------------submit--------------- */}
              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 text-base font-semibold rounded-xl shadow-lg text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-4 focus:ring-accent-light transition-all duration-300 transform hover:scale-105"
              >
                <HiSave className="w-6 h-6" />
                Save New Service
              </button>
            </div>

            <div className="pt-4">
              <Link
                className="flex items-center justify-start gap-2 px-3 text-text-muted hover:text-accent font-medium transition-colors duration-200"
                to="/dashboard"
              >
                <BiLeftArrowCircle size={24}></BiLeftArrowCircle> Back to
                dashboard
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
