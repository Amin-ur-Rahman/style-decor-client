import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronLeft, HiChevronRight, HiSparkles } from "react-icons/hi";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
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
  ];

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isPaused, slides.length]);

  const goToPrevious = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToNext = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  return (
    <section className="relative w-full h-[90vh] bg-bg-main overflow-hidden flex items-center">
      {/* Decorative Background Text (Slide Number) */}
      <div className="absolute top-10 left-10 text-[15rem] font-bold text-neutral/30 select-none leading-none z-0">
        0{currentSlide + 1}
      </div>

      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        {/* LEFT SIDE: TEXT CONTENT */}
        <div className="order-2 lg:order-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">
                {slides[currentSlide].subtitle}
              </h2>
              <h1 className="text-4xl md:text-6xl   text-text-primary mb-6 leading-tight">
                {slides[currentSlide].title}
              </h1>
              <p className="text-lg text-text-secondary mb-10 max-w-lg leading-relaxed">
                {slides[currentSlide].description}
              </p>

              <div className="flex items-center gap-6">
                <a
                  href="/services"
                  className="px-8 py-4 bg-primary hover:bg-primary-hover text-white font-medium rounded-sm transition-all duration-300 flex items-center gap-3 shadow-xl"
                >
                  <HiSparkles className="w-5 h-5 text-accent-light" />
                  {slides[currentSlide].cta}
                </a>

                {/* Manual Navigation Inside Content */}
                <div className="hidden md:flex items-center gap-2">
                  <button
                    onClick={goToPrevious}
                    className="p-3 border border-neutral hover:bg-secondary transition-colors"
                  >
                    <HiChevronLeft className="w-5 h-5 text-text-primary" />
                  </button>
                  <button
                    onClick={goToNext}
                    className="p-3 border border-neutral hover:bg-secondary transition-colors"
                  >
                    <HiChevronRight className="w-5 h-5 text-text-primary" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT SIDE: IMAGE WITH MASK/SHAPE */}
        <div className="order-1 lg:order-2 relative h-[400px] md:h-[600px] w-full group">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ clipPath: "inset(0% 100% 0% 0%)", opacity: 0 }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
              exit={{ clipPath: "inset(0% 0% 0% 100%)", opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 overflow-hidden rounded-2xl shadow-2xl"
            >
              <motion.img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover scale-110"
                animate={{ scale: 1 }}
                transition={{ duration: 5 }}
              />
              {/* Overlay Gradient for Image Depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Pause Button Floating near Image */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="absolute -bottom-4 -left-4 bg-bg-main p-3 rounded-full shadow-lg z-20 hover:scale-110 transition-transform border border-neutral"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest px-2 text-text-primary">
              {isPaused ? "Play" : "Pause"}
            </span>
          </button>
        </div>
      </div>

      {/* BOTTOM INDICATORS (Minimalist Line style) */}
      <div className="absolute bottom-10 left-12 flex gap-4 items-center">
        {slides.map((_, index) => (
          <div
            key={index}
            className="h-1 bg-neutral overflow-hidden"
            style={{
              width: index === currentSlide ? "60px" : "30px",
              transition: "all 0.4s",
            }}
          >
            {index === currentSlide && (
              <motion.div
                className="h-full bg-accent"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
