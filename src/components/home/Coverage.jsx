import "leaflet/dist/leaflet.css";
import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "../../hooks and contexts/axios/useAxiosInstance";
import { LoadingBubbles } from "../../LoadingAnimations";
import NoData from "../NoData";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import markerImg from "../../assets/marker.png";
import L from "leaflet";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const Coverage = () => {
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

  if (isLoading) return <LoadingBubbles></LoadingBubbles>;
  return serviceCenters?.length === 0 ? (
    <NoData></NoData>
  ) : (
    <div className="max-w-[90dvw] bg-bg-main mx-auto relative z-0">
      <h1 className="text-3xl text-center font-bold text-text-primary py-5 my-5">
        We Are Available All Over the Country
      </h1>

      {/* -------map container------------- */}

      <div className="min-h-[80dvh] relative z-0">
        <MapContainer
          style={{ height: "80vh", position: "relative", zIndex: 0 }}
          className="
          sm:w-[90%]   
          md:w-[85%]   
          lg:w-[80%]   
          w-[95%]      
      mx-auto 
      rounded-lg
    "
          center={position}
          zoom={8}
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
      <div className="flex items-center gap-3 border-accent/50 border-2 justify-center bg-primary py-4 my-5 w-[30%] mx-auto rounded-lg hover:scale-105 transition-all duration-300 ease-in">
        <FaMagnifyingGlass></FaMagnifyingGlass>
        <NavLink to="/coverage">Find out your Area</NavLink>
      </div>
    </div>
  );
};

export default Coverage;
