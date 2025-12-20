import { useQuery } from "@tanstack/react-query";
import { HiArrowLeft, HiCalendar, HiX } from "react-icons/hi";
import useAxiosInstance from "../../hooks and contexts/axios/useAxiosInstance";
import { LoadingBubbles } from "../../LoadingAnimations";
import { Link, useParams } from "react-router-dom";
import NoData from "../../components/NoData";
import { useState } from "react";
import BookService from "../service&role/service/BookService";

const ServiceDetails = () => {
  const axiosInstance = useAxiosInstance();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState({});
  const { id } = useParams();

  const {
    data: service,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["service-details", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/service/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingBubbles />;
  if (isError) {
    console.log("error from query:", error);
    return <NoData />;
  }

  return !service ? (
    <NoData />
  ) : (
    <div className="min-h-screen bg-bg-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-6"
        >
          <HiArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Image Gallery */}
          <div className="lg:col-span-7">
            <div className="bg-neutral rounded-sm overflow-hidden">
              <img
                src={service.photo}
                alt={service.serviceName}
                className="w-full h-[500px] object-cover"
              />
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Category & Title */}
            <div>
              <p className="text-xs uppercase tracking-wide text-text-muted mb-2">
                {service.category}
              </p>
              <h1 className="text-3xl font-normal text-text-primary mb-3">
                {service.serviceName}
              </h1>
              <p className="text-sm text-text-secondary leading-relaxed">
                {service.shortDescription}
              </p>
            </div>

            {/* Pricing */}
            <div className="border-t border-neutral pt-4">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-light text-text-primary">
                  ৳{service.cost}
                </span>
                <span className="text-sm text-text-muted">{service.unit}</span>
              </div>
              <p className="text-xs text-text-muted">
                {service.rateType === "flat-rate"
                  ? "Flat rate pricing"
                  : "Rate per unit"}
              </p>
            </div>

            {/* Book Button */}
            <button
              type="button"
              onClick={() => {
                setSelectedService(service);
                setIsModalOpen(true);
              }}
              className="w-full py-3 bg-primary hover:bg-primary-hover text-white text-sm tracking-wide transition-colors"
            >
              Book this service
            </button>

            {/* Description Section */}
            <div className="border-t border-neutral pt-6">
              <button className="w-full flex items-center justify-between text-left py-3 border-b border-neutral">
                <span className="text-sm uppercase tracking-wide text-text-primary">
                  Description
                </span>
                <span className="text-text-muted">+</span>
              </button>
              <div className="py-4">
                <p className="text-sm text-text-secondary leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>

            {/* What's Included */}
            <div className="border-t border-neutral pt-3">
              <button className="w-full flex items-center justify-between text-left py-3 border-b border-neutral">
                <span className="text-sm uppercase tracking-wide text-text-primary">
                  What's included
                </span>
                <span className="text-text-muted">+</span>
              </button>
              <div className="py-4 space-y-2">
                <div className="flex items-start gap-2 text-sm text-text-secondary">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Professional consultation and planning</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-text-secondary">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Premium quality materials and decorations</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-text-secondary">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>On-site setup and coordination</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-text-secondary">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Post-event cleanup and removal</span>
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="border-t border-neutral pt-3">
              <button className="w-full flex items-center justify-between text-left py-3 border-b border-neutral">
                <span className="text-sm uppercase tracking-wide text-text-primary">
                  Service details
                </span>
                <span className="text-text-muted">+</span>
              </button>
              <div className="py-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-muted">Added by</span>
                  <span className="text-text-secondary">
                    {service.createdByName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Created</span>
                  <span className="text-text-secondary">
                    {new Date(service.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Category</span>
                  <span className="text-text-secondary capitalize">
                    {service.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-secondary p-4 text-xs text-text-muted leading-relaxed">
              Prices may vary for large events. For custom requests, contact the
              service center directly.
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal */}
          <div
            className="relative bg-white sm:max-w-5xl 
                 h-[90vh] sm:h-auto sm:max-h-[90vh]
                 rounded-t-xl sm:rounded-lg 
                 shadow-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {/* <div className="flex items-center bg-secondary justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-text-muted m-5 hover:text-text-primary"
              >
                <HiX />
              </button>
            </div> */}

            {/* Scrollable content */}
            <div className="flex-1 rounded-lg min-w-[80dvw] lg:min-w-[60dvw] max-w-[90dvw]  lg:max-w-[80dvw] overflow-y-auto ">
              <BookService serviceId={service._id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
