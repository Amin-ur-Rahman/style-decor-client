import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const CategoriesSection = () => {
  const categories = [
    {
      name: "Wedding",
      slug: "wedding",
      description: "Elegant wedding decorations for your special day",
      image:
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
    },
    {
      name: "Home",
      slug: "home",
      description: "Transform your home with beautiful decor",
      image:
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
    },
    {
      name: "Office",
      slug: "office",
      description: "Professional office decoration services",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    },
    {
      name: "Event",
      slug: "event",
      description: "Make your events memorable and stylish",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
    },
    {
      name: "Meeting",
      slug: "meeting",
      description: "Elevate your meetings with perfect ambiance",
      image:
        "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&q=80",
    },
  ];

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section className="py-16 px-4 bg-bg-main overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-text-primary mb-3">
            Browse by <span className="text-accent">Category</span>
          </h2>
          <p className="text-sm text-text-secondary max-w-2xl mx-auto">
            Discover decoration services tailored to your specific needs
          </p>
        </motion.div>

        {/* Categories Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={800}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="categories-swiper"
          >
            {categories.map((category, index) => (
              <SwiperSlide key={index}>
                <Link to={`/services?category=${category.slug}`}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-72">
                      {/* Category Image */}
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h3 className="text-xl font-semibold text-white mb-1">
                          {category.name}
                        </h3>
                        <p className="text-xs text-gray-200 leading-relaxed">
                          {category.description}
                        </p>
                      </div>

                      {/* Hover Effect Border */}
                      <div className="absolute inset-0 border-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
                    </div>
                  </motion.div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-8"
        >
          <Link to="/services">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-sm font-medium text-accent hover:text-accent-hover underline underline-offset-4"
            >
              View All Services →
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx>{`
        .categories-swiper {
          padding-bottom: 50px;
        }

        .categories-swiper :global(.swiper-pagination-bullet) {
          background: var(--color-accent);
          opacity: 0.3;
          width: 8px;
          height: 8px;
        }

        .categories-swiper :global(.swiper-pagination-bullet-active) {
          opacity: 1;
          width: 24px;
          border-radius: 4px;
        }

        .categories-swiper :global(.swiper-button-prev),
        .categories-swiper :global(.swiper-button-next) {
          color: var(--color-accent);
          width: 36px;
          height: 36px;
          background: var(--color-bg-main);
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .categories-swiper :global(.swiper-button-prev:after),
        .categories-swiper :global(.swiper-button-next:after) {
          font-size: 16px;
          font-weight: bold;
        }

        .categories-swiper :global(.swiper-button-prev):hover,
        .categories-swiper :global(.swiper-button-next):hover {
          background: var(--color-accent);
          color: var(--color-text-primary);
        }
      `}</style>
    </section>
  );
};

export default CategoriesSection;
