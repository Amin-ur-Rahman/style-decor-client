import { HiMail, HiPhone, HiLocationMarker, HiClock } from "react-icons/hi";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaPinterestP,
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-bold text-white">StyleDecor</h3>
            </div>
            <p className="text-gray-200 text-sm leading-relaxed">
              Transform your spaces with elegant decoration services. From home
              interiors to grand ceremonies, we bring your vision to life.
            </p>
            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-accent rounded-lg flex items-center justify-center transition-all hover:scale-110"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-accent rounded-lg flex items-center justify-center transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-accent rounded-lg flex items-center justify-center transition-all hover:scale-110"
                aria-label="Twitter"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-accent rounded-lg flex items-center justify-center transition-all hover:scale-110"
                aria-label="Pinterest"
              >
                <FaPinterestP className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-accent rounded-lg flex items-center justify-center transition-all hover:scale-110"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-accent">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-200 hover:text-accent transition-colors text-sm"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="text-gray-200 hover:text-accent transition-colors text-sm"
                >
                  Our Services
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-200 hover:text-accent transition-colors text-sm"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-200 hover:text-accent transition-colors text-sm"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/become-decorator"
                  className="text-gray-200 hover:text-accent transition-colors text-sm"
                >
                  Become a Decorator
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-gray-200 hover:text-accent transition-colors text-sm"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-gray-200 hover:text-accent transition-colors text-sm"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-accent">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-200">
                <HiLocationMarker className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span>
                  123 Design Street, Creativity Plaza, New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-200">
                <HiPhone className="w-5 h-5 text-accent flex-shrink-0" />
                <a
                  href="tel:+1234567890"
                  className="hover:text-accent transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-200">
                <HiMail className="w-5 h-5 text-accent flex-shrink-0" />
                <a
                  href="mailto:info@styledecor.com"
                  className="hover:text-accent transition-colors"
                >
                  info@styledecor.com
                </a>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-accent">
              Business Hours
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <HiClock className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-200">
                  <p className="font-medium text-white mb-2">
                    Consultation Hours
                  </p>
                  <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
                  <p>Saturday: 10:00 AM - 5:00 PM</p>
                  <p>Sunday: Closed</p>
                  <p className="mt-3 text-accent font-medium">
                    Emergency bookings available 24/7
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-200">
              © {currentYear} StyleDecor. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a
                href="/privacy"
                className="text-gray-200 hover:text-accent transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-gray-200 hover:text-accent transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="/sitemap"
                className="text-gray-200 hover:text-accent transition-colors"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
