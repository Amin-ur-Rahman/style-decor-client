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
    <div className="min-h-screen bg-bg-main transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-hover text-white py-24 shadow-inner">
        <div className="w-[90dvw] max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Making Every Event Memorable
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium">
            We connect people with trusted decorators to transform spaces into
            beautiful experiences. Whether it's a wedding, home renovation, or
            corporate event, we make decoration booking simple and reliable.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="w-[90dvw] max-w-4xl mx-auto py-20">
        <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
          What We Do
        </h2>
        <div className="space-y-6 text-text-secondary text-lg leading-relaxed">
          <p className="bg-bg-alt p-6 rounded-xl border-l-4 border-primary shadow-sm">
            StyleDecor is a platform that makes decoration services accessible
            and trustworthy. We solve the common problem of finding reliable
            decorators and managing bookings without confusion.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="space-y-2">
              <strong className="text-primary block text-xl">For users:</strong>
              <p>
                Browse services, book consultations or full decoration packages,
                make secure payments, and track your project from start to
                finish.
              </p>
            </div>
            <div className="space-y-2">
              <strong className="text-accent block text-xl">
                For decorators:
              </strong>
              <p>
                Get verified projects in your area with confirmed bookings and
                guaranteed payments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-bg-alt py-20 border-y border-neutral">
        <div className="w-[90dvw] max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-text-primary mb-16 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative">
                  <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-6 transition-transform shadow-lg">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 right-1/2 translate-x-10 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center border-4 border-bg-alt text-sm font-bold shadow-md">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="w-[90dvw] max-w-6xl mx-auto py-20">
        <h2 className="text-3xl font-bold text-text-primary mb-16 text-center">
          Why Choose StyleDecor
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseUs.map((item, index) => (
            <div
              key={index}
              className="bg-bg-alt border border-neutral rounded-2xl p-8 hover:border-primary transition-all hover:shadow-xl group"
            >
              <div className="w-14 h-14 bg-secondary/50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <item.icon className="w-7 h-7 text-primary group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">
                {item.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Quality Commitment Table-like Grid */}
      <section className="w-[90dvw] max-w-4xl mx-auto py-20">
        <h2 className="text-3xl font-bold text-text-primary mb-10 text-center">
          Quality & Safety Commitment
        </h2>
        <div className="bg-bg-alt border border-neutral rounded-3xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral">
            <div className="p-8 hover:bg-bg-main transition-colors">
              <h3 className="font-bold text-text-primary mb-3 flex items-center gap-3">
                <HiShieldCheck className="w-6 h-6 text-primary" />
                Decorator Verification
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Every decorator goes through identity verification and skill
                assessment before approval.
              </p>
            </div>
            <div className="p-8 hover:bg-bg-main transition-colors">
              <h3 className="font-bold text-text-primary mb-3 flex items-center gap-3">
                <HiChartBar className="w-6 h-6 text-primary" />
                Status Tracking
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Real-time updates from planning to completion so you're always
                informed.
              </p>
            </div>
            <div className="p-8 hover:bg-bg-main transition-colors">
              <h3 className="font-bold text-text-primary mb-3 flex items-center gap-3">
                <HiCreditCard className="w-6 h-6 text-primary" />
                Payment Protection
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Secure payment processing with clear refund policies for your
                peace of mind.
              </p>
            </div>
            <div className="p-8 hover:bg-bg-main transition-colors">
              <h3 className="font-bold text-text-primary mb-3 flex items-center gap-3">
                <HiClipboardCheck className="w-6 h-6 text-primary" />
                Admin Monitoring
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Our team oversees all bookings to ensure quality standards are
                maintained.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Callout */}
      <section className="bg-primary/5 py-24">
        <div className="w-[90dvw] max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-text-primary mb-8">
            Our Vision
          </h2>
          <p className="text-xl text-text-secondary leading-relaxed italic">
            "Our goal is to simplify event decoration booking while creating
            consistent work opportunities for skilled decorators. We believe
            quality decoration should be accessible, transparent, and
            stress-free for everyone involved."
          </p>
        </div>
      </section>

      {/* Support CTA */}
      <section className="w-[90dvw] max-w-4xl mx-auto py-24 text-center">
        <div className="bg-bg-alt p-12 rounded-[2rem] border-2 border-dashed border-neutral">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Need Help or Have Questions?
          </h2>
          <p className="text-text-secondary mb-10 text-lg">
            Our support team is here to assist you with any inquiries.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="mailto:support@styledecor.com"
              className="px-10 py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-primary/30 inline-flex items-center gap-3 active:scale-95"
            >
              <HiSupport className="w-6 h-6" />
              Contact Support
            </a>
            <a
              href="/contact"
              className="px-10 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold rounded-xl transition-all active:scale-95"
            >
              Send Message
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
