import "leaflet/dist/leaflet.css";
import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { FiSearch } from "react-icons/fi";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import markerImg from "../assets/marker.png";
import L from "leaflet";
import useAxiosInstance from "../hooks and contexts/axios/useAxiosInstance";
import { LoadingBubbles } from "../LoadingAnimations";
import NoData from "../components/NoData";

const CoveragePage = () => {
  const axiosInstance = useAxiosInstance();
  const mapRef = useRef(null);
  const position = [23.685, 90.3563];
  const customIcon = L.icon({
    iconUrl: markerImg,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const { data: serviceCenters, isLoading } = useQuery({
    queryKey: ["service-centers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/service-centers");
      return res.data;
    },
  });
  //   console.log(serviceCenters);

  const handleSearch = async (e) => {
    e.preventDefault();
    const inputValue = e.target.location.value;
    if (!inputValue) return;

    const location = await serviceCenters.find((center) =>
      center.district.toLowerCase().includes(inputValue)
    );
    if (location) {
      const query = [location.lat, location.lon];
      console.log(query);
      mapRef.current.flyTo(query, 12);
    }
    // console.log(inputValue);
  };

  if (isLoading) return <LoadingBubbles></LoadingBubbles>;
  return serviceCenters?.length === 0 ? (
    <NoData></NoData>
  ) : (
    <div className="max-w-[90dvw] mx-auto my-10">
      <h1 className="text-3xl text-center font-bold secondary-text">
        Our Service Centers
      </h1>
      <form
        onSubmit={handleSearch}
        className="flex my-10 items-center md:w-3/4 w-max  relative gap-4  rounded-lg  shadow-sm max-w-4xl mx-auto border border-accent"
      >
        <FiSearch className="text-2xl ml-2 text-primary shrink-0" />

        <input
          name="location"
          type="text"
          placeholder="Search here"
          className="lg:flex-1 lg:w-3/4 w-max bg-transparent outline-none px-6 py-4 text-gray-700 placeholder-gray-400 text-base "
        />

        <button
          type="submit"
          className="border-l-2 bg-neutral border-accent absolute right-0 text-gray-800  px-5 lg:px-10 h-full rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 shrink-0"
        >
          Search
        </button>
      </form>

      {/* -------map container------------- */}

      <div className="min-h-[80dvh] z-0">
        <MapContainer
          style={{ height: "80vh", zIndex: 0 }} // ensures Leaflet works
          className="
          sm:w-[90%]   
          md:w-[85%]   
          lg:w-[80%]   
          w-[95%]      
      mx-auto 
      rounded-lg 
    "
          center={position}
          zoom={7}
          scrollWheelZoom={false}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors © Stadia Maps"
          />

          {serviceCenters?.map((center, index) => (
            <Marker
              icon={customIcon}
              key={index}
              position={[center.lat, center.lon]}
            >
              <Popup>
                <h3>
                  {" "}
                  <strong>
                    {center.region}, {center.district}
                  </strong>
                </h3>
                <p>{center.serviceAreas.join(",")}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default CoveragePage;
