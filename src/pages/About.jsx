import React from "react";
import {
  HiSearch,
  HiCalendar,
  HiUserAdd,
  HiCheckCircle,
  HiShieldCheck,
  HiCreditCard,
  HiChartBar,
  HiLocationMarker,
  HiCash,
  HiClipboardCheck,
  HiSupport,
} from "react-icons/hi";

const About = () => {
  const howItWorks = [
    {
      icon: HiSearch,
      title: "Choose Your Service",
      description:
        "Browse our decoration services and select the perfect package for your event",
    },
    {
      icon: HiCalendar,
      title: "Submit Booking Details",
      description:
        "Pick your date, location, and share your decoration preferences",
    },
    {
      icon: HiUserAdd,
      title: "Get Matched with a Decorator",
      description:
        "We assign a verified decorator based on your location and requirements",
    },
    {
      icon: HiCheckCircle,
      title: "Service Delivered",
      description:
        "Track your project status and enjoy professionally executed decoration",
    },
  ];

  const whyChooseUs = [
    {
      icon: HiShieldCheck,
      title: "Verified Decorators",
      description: "All decorators are screened and approved by our team",
    },
    {
      icon: HiCreditCard,
      title: "Secure Payments",
      description: "Payments processed through trusted payment gateways",
    },
    {
      icon: HiChartBar,
      title: "Real-time Tracking",
      description: "Monitor your booking status from planning to completion",
    },
    {
      icon: HiLocationMarker,
      title: "Local Coverage",
      description: "Connect with decorators in your area for prompt service",
    },
  ];

  const decoratorBenefits = [
    {
      icon: HiClipboardCheck,
      title: "Verified Bookings",
      description: "Receive confirmed projects with clear requirements",
    },
    {
      icon: HiCash,
      title: "Fair Distribution",
      description: "Projects assigned based on location and availability",
    },
    {
      icon: HiCreditCard,
      title: "Secure Payments",
      description: "Get paid on time after project completion",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
        <div className="w-[90dvw] max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Making Every Event Memorable
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed">
            We connect people with trusted decorators to transform spaces into
            beautiful experiences. Whether it's a wedding, home renovation, or
            corporate event, we make decoration booking simple and reliable.
          </p>
        </div>
      </section>

      <section className="w-[90dvw] max-w-4xl mx-auto py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          What We Do
        </h2>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            StyleDecor is a platform that makes decoration services accessible
            and trustworthy. We solve the common problem of finding reliable
            decorators and managing bookings without confusion.
          </p>
          <p>
            <strong>For users:</strong> Browse services, book consultations or
            full decoration packages, make secure payments, and track your
            project from start to finish.
          </p>
          <p>
            <strong>For decorators:</strong> Get verified projects in your area
            with confirmed bookings and guaranteed payments.
          </p>
          <p>
            <strong>Our role:</strong> We verify decorators, ensure quality
            standards, facilitate secure payments, and provide support
            throughout the process.
          </p>
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="w-[90dvw] max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-[90dvw] max-w-6xl mx-auto py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          Why Choose StyleDecor
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUs.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-neutral rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-accent/5 py-16">
        <div className="w-[90dvw] max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            For Decorators
          </h2>
          <p className="text-gray-700 text-center mb-12">
            Join our network of professional decorators and grow your business
            with verified projects.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {decoratorBenefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 text-center border border-neutral"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-[90dvw] max-w-4xl mx-auto py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Quality & Safety Commitment
        </h2>
        <div className="bg-white border border-neutral rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <HiShieldCheck className="w-5 h-5 text-primary" />
                Decorator Verification
              </h3>
              <p className="text-sm text-gray-600">
                Every decorator goes through identity verification and skill
                assessment before approval.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <HiChartBar className="w-5 h-5 text-primary" />
                Status Tracking
              </h3>
              <p className="text-sm text-gray-600">
                Real-time updates from planning to completion so you're always
                informed.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <HiCreditCard className="w-5 h-5 text-primary" />
                Payment Protection
              </h3>
              <p className="text-sm text-gray-600">
                Secure payment processing with clear refund policies for your
                peace of mind.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <HiClipboardCheck className="w-5 h-5 text-primary" />
                Admin Monitoring
              </h3>
              <p className="text-sm text-gray-600">
                Our team oversees all bookings to ensure quality standards are
                maintained.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary/5 py-16">
        <div className="w-[90dvw] max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Vision</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our goal is to simplify event decoration booking while creating
            consistent work opportunities for skilled decorators. We believe
            quality decoration should be accessible, transparent, and
            stress-free for everyone involved.
          </p>
        </div>
      </section>

      <section className="w-[90dvw] max-w-4xl mx-auto py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Need Help or Have Questions?
        </h2>
        <p className="text-gray-600 mb-8">
          Our support team is here to assist you with any inquiries.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:support@styledecor.com"
            className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all inline-flex items-center gap-2"
          >
            <HiSupport className="w-5 h-5" />
            Contact Support
          </a>
          <a
            href="/contact"
            className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-lg transition-all"
          >
            Send Message
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
