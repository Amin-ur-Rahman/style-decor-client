import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronLeft, HiChevronRight, HiSparkles } from "react-icons/hi";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&q=80",
      title: "Transform Your Wedding Dreams",
      subtitle: "Into Magical Reality",
      description:
        "Create unforgettable moments with our exquisite wedding decoration services",
      cta: "Book Wedding Decoration",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=80",
      title: "Elevate Your Living Space",
      subtitle: "With Premium Interior Design",
      description:
        "Transform your house into a stunning home with our expert interior decorators",
      cta: "Book Home Decoration",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&q=80",
      title: "Professional Event Spaces",
      subtitle: "That Inspire Success",
      description:
        "Make your corporate events memorable with our sophisticated decoration solutions",
      cta: "Book Event Decoration",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1920&q=80",
      title: "Celebrate Every Moment",
      subtitle: "With Vibrant Party Decor",
      description:
        "From birthdays to anniversaries, we bring joy to your special celebrations",
      cta: "Book Party Decoration",
    },
  ];

  useEffect(() => {
    if (!isPaused && !isHovered) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [isPaused, isHovered, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative w-full h-[85vh] md:h-[90vh] bg-gray-700 overflow-hidden">
      <AnimatePresence mode="wait">
        {slides.map(
          (slide, index) =>
            index === currentSlide && (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* -------------------Background Imge------------- */}
                <motion.img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  animate={{ scale: isHovered ? 1.05 : 1 }}
                  transition={{ duration: 0.6 }}
                />

                {/* -------------- Overlay------------- */}
                <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent"></div>

                {/* ---------------- Container------------- */}
                <div className="absolute inset-0 flex items-center">
                  <div className="w-[90dvw] mx-auto">
                    <div className="max-w-2xl">
                      {/* ------------Title------------ */}
                      <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                      >
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                          {slide.title}
                        </h1>
                        <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-accent mb-6">
                          {slide.subtitle}
                        </h2>
                      </motion.div>

                      {/* Description Animation */}
                      <motion.p
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl"
                      >
                        {slide.description}
                      </motion.p>

                      {/*--------------- CTA Button---------------- */}
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{
                          y: isHovered ? 0 : 20,
                          opacity: isHovered ? 1 : 0,
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        <a
                          href="/services"
                          className="inline-flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primary/90 text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all group"
                        >
                          <HiSparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                          {slide.cta}
                        </a>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* -------------------navigation arrows------------ */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all z-10"
        aria-label="Previous slide"
      >
        <HiChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all z-10"
        aria-label="Next slide"
      >
        <HiChevronRight className="w-6 h-6" />
      </button>

      {/* -----------slide indicators------------ */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all ${
              index === currentSlide
                ? "w-12 h-3 bg-accent"
                : "w-3 h-3 bg-white/50 hover:bg-white/70"
            } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Pause/Play Toggle */}
      <button
        onClick={() => setIsPaused(!isPaused)}
        className="absolute top-4 right-4 md:top-8 md:right-8 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm font-medium rounded-lg transition-all z-10"
      >
        {isPaused ? "Play" : "Pause"}
      </button>
    </section>
  );
};

export default HeroSection;
