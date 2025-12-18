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
    <div className="min-h-screen bg-gray-50">
      <div className="w-[92dvw] mx-auto pt-8 max-w-6xl">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
        >
          <HiArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="rounded-lg overflow-hidden shadow-sm bg-white">
              <img
                src={service.photo}
                alt={service.serviceName}
                className="w-full h-[420px] md:h-[480px] object-cover"
              />
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">
                    {service.category}
                  </span>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-2">
                    {service.serviceName}
                  </h1>
                  <p className="text-gray-600 mt-2">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="hidden sm:flex flex-col items-end text-right">
                  <span className="text-sm text-gray-500">Added by</span>
                  <span className="font-semibold text-gray-900">
                    {service.createdByName}
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    {new Date(service.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <div className="mt-6 border-t pt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  About this service
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What's included
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Professional consultation and planning</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Premium quality materials and decorations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>On-site setup and coordination</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Post-event cleanup and removal</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <aside className="md:col-span-1">
            <div className="sticky top-20 space-y-4">
              <div className="bg-white rounded-lg p-5 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500">Price</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-gray-900">
                        ${service.cost}
                      </span>
                      <span className="text-sm text-gray-500">
                        {service.unit}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-full">
                      {service.category}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    // to={`/book-service/${service._id}`}
                    onClick={() => {
                      setSelectedService(service);
                      setIsModalOpen(true);
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-all"
                  >
                    <HiCalendar className="w-5 h-5" />
                    <span className="font-medium">Book this service</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm text-sm text-gray-700">
                <div className="font-semibold text-gray-900 mb-2">
                  Service details
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-xs text-gray-500">Added by</div>
                  <div className="text-right font-medium">
                    {service.createdByName}
                  </div>

                  <div className="text-xs text-gray-500">Created</div>
                  <div className="text-right font-medium">
                    {new Date(service.createdAt).toLocaleDateString()}
                  </div>

                  <div className="text-xs text-gray-500">Service ID</div>
                  <div className="text-right text-xs text-gray-500 break-all">
                    {service._id}
                  </div>
                </div>
              </div>

              <div className="  p-4  text-sm text-gray-600">
                <div className="font-semibold text-gray-900 mb-2">Notes</div>
                <div className="text-xs">
                  Prices may vary for large events. For custom requests, contact
                  the service center directly.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed  inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal */}
          <div
            className="relative bg-white  sm:max-w-5xl 
                 h-[90vh] sm:h-auto sm:max-h-[90vh]
                 rounded-t-xl sm:rounded-lg 
                 shadow-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between   ">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500  m-5 hover:text-gray-800"
              >
                <HiX></HiX>
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 min-w-[70dvw] overflow-y-auto p-4 sm:p-6">
              <BookService serviceId={service._id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
