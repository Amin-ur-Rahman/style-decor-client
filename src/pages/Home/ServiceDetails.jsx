import { useQuery } from "@tanstack/react-query";
import { HiArrowLeft, HiCalendar, HiX } from "react-icons/hi";
import useAxiosInstance from "../../hooks and contexts/axios/useAxiosInstance";
import { LoadingBubbles } from "../../LoadingAnimations";
import { Link, useNavigate, useParams } from "react-router-dom";
import NoData from "../../components/NoData";
import { useState } from "react";
import BookService from "../service&role/service/BookService";
import useUserInfo from "../../hooks and contexts/role/useUserInfo";
import AvailableDecoratorsModal from "../../components/modals/AvailableDecoratorsModal";

const ServiceDetails = () => {
  const axiosInstance = useAxiosInstance();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userData, infoLoading } = useUserInfo();
  const [isDecoratorsModalOpen, setIsDecoratorsModalOpen] = useState(false);
  const navigate = useNavigate();

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

  if (isLoading || infoLoading) return <LoadingBubbles />;
  if (isError) return <NoData />;

  return !service ? (
    <NoData />
  ) : (
    <div className="min-h-screen bg-bg-main transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-6 group"
        >
          <HiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Image Gallery */}
          <div className="lg:col-span-7">
            <div className="bg-neutral rounded-lg overflow-hidden border border-neutral shadow-sm">
              <img
                src={service.photo}
                alt={service.serviceName}
                className="w-full h-[500px] object-cover"
              />
            </div>
            <button
              onClick={() => setIsDecoratorsModalOpen(true)}
              type="button"
              className="w-full my-5 rounded-lg py-3 bg-accent hover:bg-accent-hover text-white text-sm font-medium tracking-wide transition-all shadow-md active:scale-[0.98]"
            >
              See Available Decorators
            </button>
          </div>

          {/* Right: Product Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-primary-light mb-2">
                {service.category}
              </p>
              <h1 className="text-3xl font-bold text-text-primary mb-3">
                {service.serviceName}
              </h1>
              <p className="text-sm text-text-secondary leading-relaxed">
                {service.shortDescription}
              </p>
            </div>

            {/* Pricing */}
            <div className="border-t border-neutral pt-4">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-bold text-primary">
                  ৳{service.cost}
                </span>
                <span className="text-sm text-text-muted">{service.unit}</span>
              </div>
              <p className="text-xs text-text-muted font-medium">
                {service.rateType === "flat-rate"
                  ? "Flat rate pricing"
                  : "Rate per unit"}
              </p>
            </div>

            {/* Book Button */}
            <button
              type="button"
              onClick={() => {
                if (!userData) return navigate("/login");
                setIsModalOpen(true);
              }}
              className="w-full py-4 rounded-lg bg-primary hover:bg-primary-hover text-white text-base font-semibold tracking-wide transition-all shadow-lg active:scale-[0.98]"
            >
              Book This Service
            </button>

            {/* Description Section */}
            <div className="border-t border-neutral pt-6">
              <div className="flex items-center justify-between text-left py-2">
                <span className="text-xs font-bold uppercase tracking-widest text-text-primary">
                  Description
                </span>
              </div>
              <div className="py-2">
                <p className="text-sm text-text-secondary leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>

            {/* What's Included */}
            <div className="border-t border-neutral pt-3">
              <div className="py-2">
                <span className="text-xs font-bold uppercase tracking-widest text-text-primary">
                  What's included
                </span>
              </div>
              <div className="py-2 space-y-3">
                {[
                  "Professional consultation",
                  "Premium quality materials",
                  "On-site setup",
                  "Post-event cleanup",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 text-sm text-text-secondary"
                  >
                    <span className="text-accent font-bold">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Details Table */}
            <div className="border-t border-neutral pt-3">
              <div className="py-3 space-y-3 text-sm">
                <div className="flex justify-between items-center py-1">
                  <span className="text-text-muted font-medium">Added by</span>
                  <span className="text-text-primary font-semibold">
                    {service.createdByName}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-text-muted font-medium">Created</span>
                  <span className="text-text-primary font-semibold">
                    {new Date(service.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-bg-alt border-l-4 border-accent p-4 text-xs text-text-secondary italic rounded-r-lg">
              Prices may vary for large events. For custom requests, contact the
              service center directly.
            </div>
          </div>
        </div>
      </div>

      {/* Book Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-bg-main w-full sm:max-w-5xl h-[90vh] sm:h-auto sm:max-h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden border border-neutral">
            <div className="flex-1 overflow-y-auto">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-20 p-2 hover:bg-neutral rounded-full transition-colors duration-200 group"
                aria-label="Close modal"
              >
                <HiX className="w-6 h-6 text-text-muted group-hover:text-text-primary transition-colors" />
              </button>
              <BookService serviceId={service._id} />
            </div>
          </div>
        </div>
      )}

      {/* Decorators Modal */}
      {isDecoratorsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsDecoratorsModalOpen(false)}
          />
          <div className="relative bg-bg-main w-full sm:max-w-4xl rounded-xl shadow-2xl overflow-hidden border border-neutral">
            <button
              onClick={() => setIsDecoratorsModalOpen(false)}
              className="absolute top-4 right-4 z-20 p-2 hover:bg-neutral rounded-full transition-colors duration-200 group"
              aria-label="Close modal"
            >
              <HiX className="w-6 h-6 text-text-muted group-hover:text-text-primary transition-colors" />
            </button>
            <AvailableDecoratorsModal service={service} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
