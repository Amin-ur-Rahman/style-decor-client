const ContactPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold mb-2">Contact Us</h1>
      <p className="text-gray-600 mb-8">
        Have a question or need help with a booking? Send us a message.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg px-3 py-2"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Phone (optional)
            </label>
            <input
              type="tel"
              className="w-full border rounded-lg px-3 py-2"
              placeholder="01XXXXXXXXX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              rows="4"
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Tell us how we can help"
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-lg"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="space-y-4 text-sm text-gray-700">
          <div>
            <p className="font-medium">Email</p>
            <p>support@styledecor.com</p>
          </div>

          <div>
            <p className="font-medium">Phone</p>
            <p>+880 1XXXXXXXXX</p>
          </div>

          <div>
            <p className="font-medium">Service Area</p>
            <p>Bangladesh</p>
          </div>

          <div>
            <p className="font-medium">Support Hours</p>
            <p>10:00 AM – 8:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
