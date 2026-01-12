import { motion } from "framer-motion";
import {
  FaCalendarCheck,
  FaPalette,
  FaUsers,
  FaMapMarkerAlt,
  FaStar,
  FaChartLine,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaCalendarCheck className="w-5 h-5" />,
      title: "Easy Booking System",
      description:
        "Schedule consultations and on-site decoration services with just a few clicks. Our intuitive booking system makes planning your event effortless.",
      role: "For Users",
    },
    {
      icon: <FaPalette className="w-5 h-5" />,
      title: "Curated Decoration Services",
      description:
        "Browse through a diverse collection of professional decoration themes and styles. From elegant weddings to corporate events, find the perfect aesthetic.",
      role: "For Users",
    },
    {
      icon: <FaUsers className="w-5 h-5" />,
      title: "Connect with Clients",
      description:
        "Showcase your portfolio and connect directly with clients looking for your expertise. Build your reputation and grow your decoration business.",
      role: "For Decorators",
    },
    {
      icon: <FaMapMarkerAlt className="w-5 h-5" />,
      title: "On-Site Consultations",
      description:
        "Offer personalized on-location consultations to understand client needs. Bring your creative vision to life at the actual event venue.",
      role: "For Decorators",
    },
    {
      icon: <FaStar className="w-5 h-5" />,
      title: "Reviews & Ratings",
      description:
        "Build trust through authentic client reviews and ratings. Quality service leads to better visibility and more bookings.",
      role: "For Everyone",
    },
    {
      icon: <FaChartLine className="w-5 h-5" />,
      title: "Analytics Dashboard",
      description:
        "Monitor platform performance, track bookings, and manage users with comprehensive analytics tools. Keep everything running smoothly.",
      role: "For Admins",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section className="py-16 px-4 bg-bg-alt">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-text-primary mb-3">
            Everything You Need to Create
            <span className="text-accent"> Memorable Events</span>
          </h2>
          <p className="text-sm text-text-secondary max-w-2xl mx-auto">
            Whether you're planning an event, offering decoration services, or
            managing the platform, we've designed features that work seamlessly
            for everyone.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-bg-main rounded-lg p-6 shadow border border-neutral/50 hover:border-accent/50 transition-all duration-300"
            >
              {/* Icon */}
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                  {feature.icon}
                </div>
              </div>

              {/* Role Badge */}
              <div className="mb-2">
                <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-accent/10 text-accent">
                  {feature.role}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mt-12"
        >
          <p className="text-sm text-text-secondary mb-4">
            Ready to transform your event experience?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/services">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-secondary text-sm font-medium rounded-lg transition-colors duration-300 shadow-sm"
              >
                Browse Services
              </motion.button>
            </Link>
            <Link to="/become-decorator">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2.5 bg-accent hover:bg-accent-hover text-text-primary text-sm font-medium rounded-lg transition-colors duration-300 shadow-sm"
              >
                Become a Decorator
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
