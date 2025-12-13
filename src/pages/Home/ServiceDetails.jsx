import { useQuery } from "@tanstack/react-query";
import {
  HiArrowLeft,
  HiCalendar,
  HiCash,
  HiUser,
  HiTag,
  HiClock,
} from "react-icons/hi";
import useAxiosInstance from "../../hooks and contexts/axios/useAxiosInstance";
import { LoadingBubbles } from "../../LoadingAnimations";
import { Link, useParams } from "react-router-dom";
import NoData from "../../components/NoData";
import useUserInfo from "../../hooks and contexts/role/useUserInfo";

const ServiceDetails = () => {
  const axiosInstance = useAxiosInstance();
  const { id } = useParams();
  const { userData, infoLoading } = useUserInfo();

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

  if (isLoading || infoLoading) return <LoadingBubbles></LoadingBubbles>;
  if (isError) {
    console.log("error from query:", error);
    return <NoData></NoData>;
  }

  console.log("user data from db", userData);

  const isAdmin = userData?.role === "admin";

  return !service ? (
    <NoData></NoData>
  ) : (
    <div className="min-h-screen bg-secondary">
      <div className="w-[90dvw] mx-auto pt-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-6"
        >
          <HiArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>
      </div>

      <div className="w-[90dvw] mx-auto pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* -----------left side: image----------- */}
          <div className="relative">
            <div className="sticky top-6">
              <div className="relative rounded-2xl overflow-hidden shadow-lg bg-white">
                <img
                  src={service.photo}
                  alt={service.serviceName}
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />

                <div className="absolute top-4 right-4">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-primary font-semibold rounded-full text-sm shadow-md capitalize">
                    {service.category}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* -------------service text block---------- */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                {service.serviceName}
              </h1>
              <p className="text-lg text-gray-600">
                {service.shortDescription}
              </p>
            </div>

            {/* -------------price card--------- */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Starting from</p>
                  <p className="text-4xl font-bold text-primary">
                    ${service.cost}
                  </p>
                  <p className="text-sm text-gray-600 mt-1 capitalize">
                    {service.unit} • {service?.rateType?.replace("-", " ")}
                  </p>
                </div>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <HiCash className="w-8 h-8 text-primary" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* ------------service creator------------- */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-neutral">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <HiUser className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Added by</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {service.createdByName}
                    </p>
                  </div>
                </div>
              </div>

              {/* -------------date added----------- */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-neutral">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <HiClock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Added on</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {new Date(service.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ------------description-------------- */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <HiTag className="w-5 h-5 text-primary" />
                Service Details
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* ----------------features block-------------- */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                What's Included
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">
                    Professional consultation and planning
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">
                    Premium quality materials and decorations
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">
                    On-site setup and coordination
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">
                    Post-event cleanup and removal
                  </span>
                </li>
              </ul>
            </div>

            {/* book service or consultation */}
            {!isAdmin && (
              <div className="sticky bottom-6 bg-white rounded-xl p-6 shadow-lg border border-neutral">
                <Link
                  to={`/book-service/${service._id}`}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-primary hover:bg-primary/90 text-white text-lg font-semibold rounded-lg transition-all shadow-sm hover:shadow-md group"
                >
                  <HiCalendar className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  Book Service or consultation
                </Link>
                <p className="text-center text-xs text-gray-500 mt-3">
                  100% satisfaction guaranteed • Flexible cancellation policy
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
