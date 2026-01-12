import React from "react";
import DynamicServices from "../../components/home/DynamicServices";
import HeroSection from "../../components/home/HeroSection";
import Coverage from "../../components/home/Coverage";
import TopDecorators from "../../components/home/TopDecorators";
import FeaturesSection from "../../components/home/FeaturesSection";
import CategoriesSection from "../../components/home/CategoriesSection";
import FAQSection from "../../components/home/FAQSection";
import HighlightsSection from "../../components/home/HighlightsSection";
import NewsletterSection from "../../components/NewsletterSection";

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <DynamicServices></DynamicServices>
      <TopDecorators></TopDecorators>
      <Coverage></Coverage>
      <FeaturesSection></FeaturesSection>
      <CategoriesSection></CategoriesSection>
      <HighlightsSection></HighlightsSection>
      <FAQSection></FAQSection>
      <NewsletterSection></NewsletterSection>
    </div>
  );
};

export default Home;
