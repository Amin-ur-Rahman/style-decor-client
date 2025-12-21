import { useSearchParams, useNavigate } from "react-router-dom";
import useAxiosInstance from "../hooks and contexts/axios/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { LoadingBubbles } from "../LoadingAnimations";
import {
  HiSearch,
  HiLocationMarker,
  HiStar,
  HiCash,
  HiUser,
  HiBriefcase,
  HiCheckCircle,
} from "react-icons/hi";

const SearchResultPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const axiosInstance = useAxiosInstance();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["search", query],
    enabled: !!query,
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/search?q=${encodeURIComponent(query)}`
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingBubbles />;

  if (isError) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg font-semibold">
            Something went wrong
          </p>
          <p className="text-text-muted mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  const services = data?.services || [];
  const decorators = data?.decorators || [];
  const totalResults = services.length + decorators.length;

  return (
    <div className="min-h-screen bg-secondary">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <HiSearch className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">
                Search Results
              </h1>
              <p className="text-text-secondary text-sm">
                Found {totalResults} result{totalResults !== 1 ? "s" : ""} for "
                {query}"
              </p>
            </div>
          </div>
        </div>

        {/* Services Section */}
        {services.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <HiBriefcase className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-text-primary">Services</h2>
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                {services.length}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service._id}
                  onClick={() => navigate(`/service/${service._id}`)}
                  className="bg-bg-main rounded-2xl border border-neutral p-6 hover:shadow-lg transition-all cursor-pointer group"
                >
                  {/* Service Image Placeholder */}
                  <div className="w-full h-48 bg-secondary rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                    {service.photo ? (
                      <img
                        src={service.photo}
                        alt={service.serviceName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <HiBriefcase className="w-16 h-16 text-neutral-dark" />
                    )}
                  </div>

                  {/* Service Info */}
                  <div>
                    <h3 className="font-bold text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {service.serviceName}
                    </h3>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full capitalize">
                        {service.category}
                      </span>
                    </div>

                    {service.shortDescription && (
                      <p className="text-sm text-text-muted mb-4 line-clamp-2">
                        {service.shortDescription}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-neutral">
                      <div className="flex items-center gap-2">
                        <HiCash className="w-5 h-5 text-primary" />
                        <span className="text-lg font-bold text-primary">
                          ৳{service.cost?.toLocaleString()}
                        </span>
                      </div>
                      {service.unit && (
                        <span className="text-xs text-text-muted capitalize">
                          {service.unit.replace("-", " ")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Decorators Section */}
        {decorators.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <HiUser className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold text-text-primary">
                Decorators
              </h2>
              <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">
                {decorators.length}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {decorators.map((decorator) => (
                <div
                  key={decorator._id}
                  onClick={() => navigate(`/decorator/${decorator._id}`)}
                  className="bg-bg-main rounded-2xl border border-neutral p-6 hover:shadow-lg transition-all cursor-pointer group text-center"
                >
                  {/* Decorator Photo */}
                  <div className="relative inline-block mb-4">
                    <img
                      src={decorator.photoUrl || "/default-avatar.png"}
                      alt={decorator.decoratorName}
                      className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-secondary group-hover:border-primary transition-colors"
                    />
                    {decorator.isVerified && (
                      <div className="absolute bottom-0 right-0 w-7 h-7 bg-primary rounded-full flex items-center justify-center border-2 border-bg-main">
                        <HiCheckCircle className="w-5 h-5 text-bg-main" />
                      </div>
                    )}
                  </div>

                  {/* Decorator Info */}
                  <h3 className="font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
                    {decorator.decoratorName}
                  </h3>

                  {/* Location */}
                  {decorator.serviceLocation && (
                    <div className="flex items-center justify-center gap-1 text-text-secondary text-sm mb-3">
                      <HiLocationMarker className="w-4 h-4" />
                      <span>
                        {decorator.serviceLocation.area},{" "}
                        {decorator.serviceLocation.city}
                      </span>
                    </div>
                  )}

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 text-sm">
                    <HiStar className="w-4 h-4 text-accent fill-current" />
                    <span className="font-semibold text-text-primary">
                      {decorator.ratingAverage || "0.0"}
                    </span>
                    <span className="text-text-muted">
                      ({decorator.ratingCount || 0})
                    </span>
                  </div>

                  {/* Specializations */}
                  {decorator.specialization &&
                    decorator.specialization.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2 justify-center">
                        {decorator.specialization
                          .slice(0, 2)
                          .map((spec, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-secondary text-text-secondary text-xs rounded-full capitalize"
                            >
                              {spec}
                            </span>
                          ))}
                        {decorator.specialization.length > 2 && (
                          <span className="px-2 py-1 bg-secondary text-text-secondary text-xs rounded-full">
                            +{decorator.specialization.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -----------no result----------- */}
        {services.length === 0 && decorators.length === 0 && (
          <div className="bg-bg-main rounded-2xl border border-neutral p-12 text-center">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <HiSearch className="w-10 h-10 text-neutral-dark" />
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2">
              No results found
            </h3>
            <p className="text-text-secondary mb-6">
              We couldn't find any services or decorators matching "{query}"
            </p>
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-primary hover:bg-primary-hover text-bg-main font-semibold rounded-lg transition-colors"
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultPage;
