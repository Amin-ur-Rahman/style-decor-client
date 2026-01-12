const ContactPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold mb-2 text-text-primary">
        Contact Us
      </h1>
      <p className="text-text-secondary mb-8">
        Have a question or need help with a booking? Send us a message.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-text-primary">
              Full Name
            </label>
            <input
              type="text"
              className="w-full border border-neutral rounded-lg px-3 py-2 bg-bg-main text-text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-text-primary">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-neutral rounded-lg px-3 py-2 bg-bg-main text-text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-text-primary">
              Phone (optional)
            </label>
            <input
              type="tel"
              className="w-full border border-neutral rounded-lg px-3 py-2 bg-bg-main text-text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="01XXXXXXXXX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-text-primary">
              Message
            </label>
            <textarea
              rows="4"
              className="w-full border border-neutral rounded-lg px-3 py-2 bg-bg-main text-text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Tell us how we can help"
            />
          </div>

          <button
            type="submit"
            className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg transition-colors"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="space-y-4 text-sm text-text-primary">
          <div>
            <p className="font-medium text-text-primary">Email</p>
            <p className="text-text-secondary">support@styledecor.com</p>
          </div>

          <div>
            <p className="font-medium text-text-primary">Phone</p>
            <p className="text-text-secondary">+880 1XXXXXXXXX</p>
          </div>

          <div>
            <p className="font-medium text-text-primary">Service Area</p>
            <p className="text-text-secondary">Bangladesh</p>
          </div>

          <div>
            <p className="font-medium text-text-primary">Support Hours</p>
            <p className="text-text-secondary">10:00 AM – 8:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
