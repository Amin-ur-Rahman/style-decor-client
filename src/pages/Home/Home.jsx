import React from "react";
import DynamicServices from "../../components/home/DynamicServices";
import HeroSection from "../../components/home/HeroSection";
import Coverage from "../../components/home/Coverage";
import TopDecorators from "../../components/home/TopDecorators";

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <DynamicServices></DynamicServices>
      <TopDecorators></TopDecorators>
      <Coverage></Coverage>
    </div>
  );
};

export default Home;
