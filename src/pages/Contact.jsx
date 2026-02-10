import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
} from 'react-icons/fi';
import { FaWhatsapp, FaInstagram, FaFacebookF } from 'react-icons/fa';
import SectionHeading from '../components/ui/SectionHeading';

const heroVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const heroFadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const roomOptions = [
  'Room 1 (Full Board)',
  'Room 2 (Full Board)',
  'Room 3 (Full Board)',
  'Room 4 (Full Board)',
  'Chui Cottage (Self Catering)',
  'Makena Cottage (Self Catering)',
  'Tembo Rondavel (Self Catering)',
  'Twiga Rondavel (Self Catering)',
  'Punda Milia House (Self Catering)',
  'Not sure yet',
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dates: '',
    room: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Decorative form, no real submission
  };

  const inputClasses =
    'w-full rounded-lg border border-muted bg-white px-4 py-3 font-body text-sm text-secondary placeholder:text-muted transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20';

  return (
    <>
      {/* Hero Banner */}
      <section className="relative flex h-[50vh] items-center justify-center overflow-hidden">
        <img src="/images/giraffes-sunset.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/80 via-charcoal/60 to-secondary/70" />

        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 px-6 text-center"
        >
          <motion.p
            variants={heroFadeUp}
            className="mb-4 font-body text-sm uppercase tracking-[0.3em] text-white/60"
          >
            African Footprints &middot; Sandai Farm
          </motion.p>
          <motion.h1
            variants={heroFadeUp}
            className="font-heading text-5xl tracking-wide text-white md:text-6xl lg:text-7xl"
          >
            GET IN TOUCH
          </motion.h1>
          <motion.p
            variants={heroFadeUp}
            className="mx-auto mt-4 max-w-xl font-body text-lg text-white/70"
          >
            We would love to hear from you
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Form + Info Section */}
      <section className="bg-background px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Left: Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.1 },
                },
              }}
            >
              <motion.h2
                variants={fadeUp}
                className="mb-2 font-heading text-3xl text-secondary"
              >
                Send Us an Enquiry
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="mb-8 font-body text-sm text-accent"
              >
                Fill in the form below and we will get back to you within 24
                hours.
              </motion.p>

              <motion.form
                variants={fadeUp}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block font-body text-xs font-semibold uppercase tracking-wider text-secondary"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={inputClasses}
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block font-body text-xs font-semibold uppercase tracking-wider text-secondary"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block font-body text-xs font-semibold uppercase tracking-wider text-secondary"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+254 700 000 000"
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="dates"
                      className="mb-1.5 block font-body text-xs font-semibold uppercase tracking-wider text-secondary"
                    >
                      Preferred Dates
                    </label>
                    <input
                      type="text"
                      id="dates"
                      name="dates"
                      value={formData.dates}
                      onChange={handleChange}
                      placeholder="e.g. 15 Jan to 20 Jan 2026"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="room"
                      className="mb-1.5 block font-body text-xs font-semibold uppercase tracking-wider text-secondary"
                    >
                      Room Preference
                    </label>
                    <select
                      id="room"
                      name="room"
                      value={formData.room}
                      onChange={handleChange}
                      className={inputClasses}
                    >
                      <option value="">Select a room</option>
                      {roomOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block font-body text-xs font-semibold uppercase tracking-wider text-secondary"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your trip plans, group size, or any special requirements..."
                    rows={5}
                    className={inputClasses}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex cursor-pointer items-center gap-2 rounded bg-primary px-9 py-4 font-body text-sm font-semibold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-primary-dark"
                >
                  <FiSend className="h-4 w-4" />
                  Send Enquiry
                </motion.button>
              </motion.form>
            </motion.div>

            {/* Right: Contact Information */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.12, delayChildren: 0.2 },
                },
              }}
            >
              <motion.h2
                variants={fadeUp}
                className="mb-8 font-heading text-3xl text-secondary"
              >
                How to Contact Us
              </motion.h2>

              {/* Petra */}
              <motion.div
                variants={fadeUp}
                className="mb-6 rounded-xl bg-cream p-6"
              >
                <h3 className="mb-3 font-heading text-xl text-secondary">
                  Petra Allmendinger
                </h3>
                <div className="space-y-2">
                  <a
                    href="mailto:petra@africanfootprints.de"
                    className="flex items-center gap-3 font-body text-sm text-secondary/80 transition-colors duration-300 hover:text-primary"
                  >
                    <FiMail className="h-4 w-4 text-primary" />
                    petra@africanfootprints.de
                  </a>
                  <a
                    href="tel:+254721656699"
                    className="flex items-center gap-3 font-body text-sm text-secondary/80 transition-colors duration-300 hover:text-primary"
                  >
                    <FiPhone className="h-4 w-4 text-primary" />
                    +254 (0) 721 656 699
                  </a>
                </div>
              </motion.div>

              {/* Tessa */}
              <motion.div
                variants={fadeUp}
                className="mb-6 rounded-xl bg-cream p-6"
              >
                <h3 className="mb-3 font-heading text-xl text-secondary">
                  Tessa Allmendinger
                </h3>
                <div className="space-y-2">
                  <a
                    href="mailto:tessa@africanfootprints.de"
                    className="flex items-center gap-3 font-body text-sm text-secondary/80 transition-colors duration-300 hover:text-primary"
                  >
                    <FiMail className="h-4 w-4 text-primary" />
                    tessa@africanfootprints.de
                  </a>
                  <a
                    href="tel:+254792717846"
                    className="flex items-center gap-3 font-body text-sm text-secondary/80 transition-colors duration-300 hover:text-primary"
                  >
                    <FiPhone className="h-4 w-4 text-primary" />
                    +254 (0) 792 717 846
                  </a>
                </div>
              </motion.div>

              {/* Address */}
              <motion.div
                variants={fadeUp}
                className="mb-6 rounded-xl bg-cream p-6"
              >
                <div className="flex items-start gap-3">
                  <FiMapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-body text-sm leading-relaxed text-secondary/80">
                      Sandai Farm, Mweiga, Kenya
                    </p>
                    <p className="font-body text-sm text-secondary/80">
                      PO Box 1518, Nyeri 10100
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div variants={fadeUp} className="flex items-center gap-3">
                <a
                  href="https://wa.me/254721656699"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-muted text-accent transition-all duration-300 hover:border-primary hover:bg-primary/10 hover:text-primary"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-muted text-accent transition-all duration-300 hover:border-primary hover:bg-primary/10 hover:text-primary"
                  aria-label="Instagram"
                >
                  <FaInstagram className="h-5 w-5" />
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-muted text-accent transition-all duration-300 hover:border-primary hover:bg-primary/10 hover:text-primary"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="h-5 w-5" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Follow Our Journey */}
      <section className="bg-cream px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            title="Follow Our Journey"
            subtitle="Snapshots from life at Sandai Farm"
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6"
          >
            {[
              '/images/horseback-safari.png',
              '/images/giraffes-sunset.png',
              '/images/farm-cuisine.png',
              '/images/rondavel-exterior.png',
              '/images/solio-rhino.png',
              '/images/mt-kenya-sunrise.png',
            ].map((src, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-lg bg-muted/50">
                <img src={src} alt="Life at Sandai Farm" className="h-full w-full object-cover" />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="bg-background px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            title="Find Us"
            subtitle="Sandai Farm, nestled in the Kenyan highlands near Nyeri"
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-4 aspect-video overflow-hidden rounded-xl"
          >
            <iframe
              title="Sandai Farm Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.6!2d36.9!3d-0.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSandai+Farm!5e0!3m2!1sen!2ske!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Contact;
