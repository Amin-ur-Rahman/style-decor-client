import { motion } from "framer-motion";
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setMessage("Thank you for subscribing!");
      setEmail("");
      setIsSubmitting(false);
      setTimeout(() => setMessage(""), 3000);
    }, 1000);
  };

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

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section className="py-16 px-4 bg-bg-alt">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-primary to-primary-light rounded-2xl p-8 md:p-12 shadow-lg relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/10 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            {/* Header */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={headerVariants}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/20 text-accent mb-4">
                <FaPaperPlane className="w-5 h-5" />
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold text-secondary mb-3">
                Stay Updated with Our Newsletter
              </h2>
              <p className="text-sm text-secondary/80 max-w-xl mx-auto">
                Get exclusive decoration tips, early access to new services, and
                special offers delivered straight to your inbox.
              </p>
            </motion.div>

            {/* Form */}
            <motion.form
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={formVariants}
              onSubmit={handleSubmit}
              className="max-w-md mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 rounded-lg bg-secondary/95 text-text-primary placeholder-text-muted border border-neutral/30 focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                />
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-accent hover:bg-accent-hover text-text-primary font-medium rounded-lg transition-colors duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-sm whitespace-nowrap"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </motion.button>
              </div>

              {/* Success Message */}
              {message && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-secondary/90 text-center mt-4"
                >
                  {message}
                </motion.p>
              )}

              {/* Privacy Note */}
              <p className="text-xs text-secondary/70 text-center mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </motion.form>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 pt-8 border-t border-secondary/20"
            >
              <div className="text-center">
                <h4 className="text-sm font-semibold text-secondary mb-1">
                  Weekly Tips
                </h4>
                <p className="text-xs text-secondary/70">
                  Expert decoration advice
                </p>
              </div>
              <div className="text-center">
                <h4 className="text-sm font-semibold text-secondary mb-1">
                  Exclusive Offers
                </h4>
                <p className="text-xs text-secondary/70">
                  Special discounts for subscribers
                </p>
              </div>
              <div className="text-center">
                <h4 className="text-sm font-semibold text-secondary mb-1">
                  New Services
                </h4>
                <p className="text-xs text-secondary/70">
                  Be the first to know
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
