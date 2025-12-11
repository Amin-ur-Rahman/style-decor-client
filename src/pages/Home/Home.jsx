import React from "react";
import DynamicServices from "../../components/home/DynamicServices";
import HeroSection from "../../components/home/HeroSection";
import Coverage from "../../components/home/Coverage";

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <DynamicServices></DynamicServices>
      <Coverage></Coverage>
    </div>
  );
};

export default Home;
