import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I book a decoration service?",
      answer:
        "Browse our services page, select your preferred decoration package, and click 'Book Now'. You'll be guided through a simple booking process where you can choose your date, provide event details, and make a payment.",
    },
    {
      question: "Can I request a consultation before booking?",
      answer:
        "Yes! We offer free on-site consultations. Simply select the 'Request Consultation' option on any service page, and our decorators will visit your venue to discuss your vision and provide personalized recommendations.",
    },
    {
      question: "How do I become a decorator on the platform?",
      answer:
        "Click on 'Become a Decorator' in the navigation menu, fill out the application form with your portfolio and experience details. Our team will review your application within 2-3 business days and contact you with next steps.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, debit cards, and digital payment methods. Payment is processed securely through our platform, and you'll receive a confirmation email once your booking is complete.",
    },
    {
      question: "Can I cancel or reschedule my booking?",
      answer:
        "Yes, you can cancel or reschedule up to 48 hours before your event date for a full refund. Cancellations made within 48 hours are subject to a cancellation fee. You can manage your bookings from your dashboard.",
    },
    {
      question: "How are decorators rated and reviewed?",
      answer:
        "After your event, you'll receive an email invitation to rate your decorator. Reviews are based on quality, professionalism, and overall satisfaction. All reviews are verified and visible on decorator profiles.",
    },
    {
      question: "What areas do you service?",
      answer:
        "We currently service major cities and surrounding areas. Check our coverage page to see if we're available in your location. We're constantly expanding to new areas based on demand.",
    },
    {
      question: "What if I'm not satisfied with the decoration?",
      answer:
        "Your satisfaction is our priority. If you're not happy with the service, contact our support team within 24 hours of your event. We'll work with you and the decorator to resolve any issues promptly.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  return (
    <section className="py-16 px-4 bg-bg-alt">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent mb-4">
            <FaQuestionCircle className="w-6 h-6" />
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-text-primary mb-3">
            Frequently Asked <span className="text-accent">Questions</span>
          </h2>
          <p className="text-sm text-text-secondary max-w-2xl mx-auto">
            Find answers to common questions about our event decoration services
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={itemVariants}
            >
              <div
                className={`bg-bg-main rounded-lg border transition-all duration-300 ${
                  openIndex === index
                    ? "border-accent shadow-md"
                    : "border-neutral/50 hover:border-neutral shadow-sm"
                }`}
              >
                {/* Question */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left group"
                >
                  <span className="text-base font-semibold text-text-primary group-hover:text-accent transition-colors duration-200">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 ml-4"
                  >
                    <FaChevronDown
                      className={`w-4 h-4 transition-colors duration-200 ${
                        openIndex === index ? "text-accent" : "text-text-muted"
                      }`}
                    />
                  </motion.div>
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4">
                        <p className="text-sm text-text-secondary leading-relaxed border-t border-neutral/30 pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Support */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10 p-6 bg-bg-main rounded-lg border border-neutral/50"
        >
          <p className="text-sm text-text-secondary mb-3">
            Still have questions?
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-secondary text-sm font-medium rounded-lg transition-colors duration-300 shadow-sm"
          >
            Contact Support
          </motion.button>
        </motion.div> */}
      </div>
    </section>
  );
};

export default FAQSection;
