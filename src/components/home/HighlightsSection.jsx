import { motion } from "framer-motion";
import { FaCheckCircle, FaUserTie, FaHeadset, FaStar } from "react-icons/fa";

const HighlightsSection = () => {
  const highlights = [
    {
      icon: <FaCheckCircle className="w-6 h-6" />,
      value: "500+",
      label: "Successful Events",
      description: "Decorated with excellence",
    },
    {
      icon: <FaUserTie className="w-6 h-6" />,
      value: "150+",
      label: "Professional Decorators",
      description: "Verified and experienced",
    },
    {
      icon: <FaHeadset className="w-6 h-6" />,
      value: "24/7",
      label: "Customer Support",
      description: "Always here to help",
    },
    {
      icon: <FaStar className="w-6 h-6" />,
      value: "100%",
      label: "Satisfaction Guarantee",
      description: "Quality you can trust",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section className="py-16 px-4 bg-bg-main relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Highlights Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.2 },
              }}
              className="text-center group"
            >
              <div className="bg-bg-alt rounded-xl p-6 shadow border border-neutral/50 hover:border-accent/50 transition-all duration-300">
                {/* Icon */}
                <div className="mb-4 inline-flex items-center justify-center text-accent">
                  {highlight.icon}
                </div>

                {/* Value */}
                <div className="mb-2">
                  <motion.h3
                    initial={{ scale: 1 }}
                    whileInView={{ scale: [1, 1.1, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-3xl md:text-4xl font-bold text-accent"
                  >
                    {highlight.value}
                  </motion.h3>
                </div>

                {/* Label */}
                <h4 className="text-base font-semibold text-text-primary mb-1">
                  {highlight.label}
                </h4>

                {/* Description */}
                <p className="text-xs text-text-muted">
                  {highlight.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-text-secondary max-w-2xl mx-auto">
            Join thousands of happy clients who trust us to bring their event
            visions to life. Our commitment to quality and excellence sets us
            apart.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HighlightsSection;
