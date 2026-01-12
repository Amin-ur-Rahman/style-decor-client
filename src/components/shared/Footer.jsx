import {
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiClock,
  HiArrowRight,
} from "react-icons/hi";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Logo from "../Logo";
import { FaGithub } from "react-icons/fa6";

// Mock components for demonstration
const Link = ({ to, children, className, ...props }) => (
  <a href={to} className={className} {...props}>
    {children}
  </a>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <FaFacebookF />,
      href: "https://www.facebook.com/aminur.rahman.333043",
      label: "Facebook",
    },
    {
      icon: <FaGithub></FaGithub>,
      href: "https://github.com/Amin-ur-Rahman",
      label: "GitHub",
    },
    {
      icon: <FaLinkedinIn />,
      href: "https://www.linkedin.com/in/aminur-rahman679/",
      label: "LinkedIn",
    },
  ];

  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About Us", path: "/about" },
    { name: "Portfolio", path: "https://amin-arrahman-0.netlify.app" },
    { name: "Contact", path: "/contact" },
  ];

  const servicesLinks = [
    { name: "Wedding Decoration", path: "/services/wedding" },
    { name: "Home Decoration", path: "/services/home" },
    { name: "Event Planning", path: "/services/events" },
    { name: "Interior Design", path: "/services/interior" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <footer className="bg-bg-alt border-t border-neutral/50">
      {/* Newsletter Section */}

      {/* Main Footer Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand Section */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-4 space-y-6"
          >
            <Logo></Logo>
            <p className="text-text-secondary text-sm leading-relaxed">
              Transforming ordinary spaces into extraordinary experiences
              through curated design, professional artistry, and unwavering
              dedication to excellence.
            </p>

            {/* Social Media Links */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">
                Follow Us
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social, idx) => (
                  <a
                    target="_blank"
                    key={idx}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary border border-neutral/50 text-text-muted hover:bg-primary hover:text-white hover:border-primary transition-all hover:scale-110"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-[0.15em] text-text-primary mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-accent"></span>
            </h4>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-text-secondary hover:text-primary transition-colors text-sm font-medium flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-4 h-px bg-accent transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-[0.15em] text-text-primary mb-6 relative inline-block">
              Our Services
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-accent"></span>
            </h4>
            <ul className="space-y-3">
              {servicesLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-text-secondary hover:text-primary transition-colors text-sm font-medium flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-4 h-px bg-accent transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-[0.15em] text-text-primary mb-6 relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-accent"></span>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-secondary border border-neutral/50 text-accent shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                  <HiLocationMarker className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-text-muted mb-1">
                    Address
                  </p>
                  <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                    123 Design Street, Style Plaza,
                    <br />
                    New Dhaka, ND 10001
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-secondary border border-neutral/50 text-accent shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                  <HiPhone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-text-muted mb-1">
                    Phone
                  </p>
                  <a
                    href="tel:+880123456789"
                    className="text-sm text-text-secondary group-hover:text-primary transition-colors"
                  >
                    +880 234 567-890
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-secondary border border-neutral/50 text-accent shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                  <HiMail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-text-muted mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:info@styledecor.com"
                    className="text-sm text-text-secondary group-hover:text-primary transition-colors"
                  >
                    info@styledecor.com
                  </a>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Business Hours Card */}
        <motion.div
          variants={itemVariants}
          className="mt-12 bg-gradient-to-br from-primary/5 to-accent/5 p-8 rounded-2xl border border-neutral/30"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                <HiClock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-[0.15em] text-text-primary mb-3">
                  Business Hours
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-text-primary">Sat - Wed</p>
                    <p className="text-text-secondary">09:00 AM - 07:00 PM</p>
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">Thursday</p>
                    <p className="text-text-secondary">10:00 AM - 05:00 PM</p>
                  </div>
                  <div>
                    <p className="font-semibold text-accent">Friday</p>
                    <p className="text-text-secondary">Closed</p>
                  </div>
                </div>
              </div>
            </div>
            <Link
              to="/contact"
              className="px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all flex items-center gap-2 group whitespace-nowrap"
            >
              Book Consultation
              <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral/50 bg-bg-main">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-text-muted text-center md:text-left">
              © {currentYear}{" "}
              <span className="font-semibold text-primary">StyleDecor</span>.
              All rights reserved. Designed with passion.
            </p>
            <div className="flex items-center gap-6 text-xs">
              <Link
                to="/privacy"
                className="text-text-muted hover:text-accent transition-colors font-medium"
              >
                Privacy Policy
              </Link>
              <span className="text-neutral">•</span>
              <Link
                to="/terms"
                className="text-text-muted hover:text-accent transition-colors font-medium"
              >
                Terms of Service
              </Link>
              <span className="text-neutral">•</span>
              <Link
                to="/sitemap"
                className="text-text-muted hover:text-accent transition-colors font-medium"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
