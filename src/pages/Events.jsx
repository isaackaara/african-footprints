import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiClock,
  FiArrowRight,
  FiCheckCircle,
  FiX,
  FiUsers,
  FiSun,
  FiFeather,
  FiCamera,
  FiTarget,
  FiCalendar,
  FiMail,
  FiDollarSign,
} from 'react-icons/fi';
import { retreatTypes, upcomingRetreats, previousRetreats } from '../data/events';
import Button from '../components/ui/Button';

const heroVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const categoryIcons = {
  wellness: FiSun,
  creative: FiFeather,
  archery: FiTarget,
  photography: FiCamera,
};

/* ─── Retreat Type Card ────────────────────────────────────────────────── */

const RetreatTypeCard = ({ retreat, isExpanded, onToggle }) => {
  const IconComponent = categoryIcons[retreat.icon] || FiSun;

  return (
    <motion.div
      variants={cardVariants}
      layout
      className={`bg-white rounded-xl overflow-hidden shadow-sm transition-shadow duration-300 ${
        isExpanded
          ? 'shadow-lg col-span-1 md:col-span-2'
          : 'group hover:shadow-lg'
      }`}
    >
      <div className={isExpanded ? 'lg:flex' : ''}>
        {/* Image */}
        <div
          className={`relative bg-muted overflow-hidden ${
            isExpanded
              ? 'lg:w-1/2 aspect-[4/3] lg:aspect-auto lg:min-h-[450px]'
              : 'aspect-[4/3]'
          }`}
        >
          <img
            src={retreat.image}
            alt={retreat.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {!isExpanded && (
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}

          <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-secondary px-3 py-1.5 rounded-full text-xs font-semibold">
            <IconComponent className="w-3.5 h-3.5 text-primary" />
            {retreat.duration}
          </div>

          {isExpanded && (
            <button
              onClick={onToggle}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-secondary hover:text-primary transition-colors cursor-pointer"
            >
              <FiX className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className={isExpanded ? 'lg:w-1/2 p-8 lg:p-10' : 'p-6'}>
          <h3
            className={`font-heading text-secondary ${
              isExpanded
                ? 'text-2xl md:text-3xl mb-2'
                : 'text-xl mb-1 group-hover:text-primary transition-colors duration-300'
            }`}
          >
            {retreat.title}
          </h3>
          <p
            className={`text-accent italic ${
              isExpanded ? 'text-base mb-4' : 'text-sm mb-3'
            }`}
          >
            {retreat.subtitle}
          </p>

          {isExpanded ? (
            <>
              <p className="text-secondary/75 text-sm leading-relaxed mb-6">
                {retreat.description}
              </p>

              {/* Highlights */}
              {retreat.highlights && (
                <div className="mb-6">
                  <h4 className="font-heading text-lg text-secondary mb-3">
                    What is Included
                  </h4>
                  <ul className="space-y-2">
                    {retreat.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-secondary/75"
                      >
                        <FiCheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Pricing */}
              {retreat.pricing && (
                <div className="mb-6 bg-background-warm rounded-lg px-5 py-4">
                  <h4 className="font-heading text-base text-secondary mb-2 flex items-center gap-2">
                    <FiDollarSign className="w-4 h-4 text-primary" />
                    Pricing
                  </h4>
                  <div className="space-y-1 text-sm text-secondary/80">
                    {retreat.pricing.double && (
                      <p>
                        <span className="font-medium">Double room:</span>{' '}
                        {retreat.pricing.double}
                      </p>
                    )}
                    {retreat.pricing.single && (
                      <p>
                        <span className="font-medium">Single room:</span>{' '}
                        {retreat.pricing.single}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <Button href="/contact" variant="primary" size="md">
                  Make an Enquiry
                </Button>
                <button
                  onClick={onToggle}
                  className="inline-flex items-center justify-center gap-2 rounded border border-muted px-6 py-3 text-sm font-semibold uppercase tracking-widest text-secondary transition-colors duration-300 hover:border-primary hover:text-primary cursor-pointer"
                >
                  Close
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-secondary/70 text-sm leading-relaxed line-clamp-3 mb-4">
                {retreat.description.slice(0, 150)}...
              </p>

              {retreat.pricing && (
                <p className="text-xs text-secondary/60 mb-4">
                  From{' '}
                  <span className="font-semibold text-secondary/80">
                    {retreat.pricing.double || retreat.pricing.single}
                  </span>
                </p>
              )}

              <button
                onClick={onToggle}
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wide hover:gap-3 transition-all duration-300 cursor-pointer"
              >
                Learn More
                <FiArrowRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Upcoming Retreat Card ────────────────────────────────────────────── */

const UpcomingCard = ({ retreat }) => {
  return (
    <motion.div
      variants={cardVariants}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group"
    >
      <div className="relative aspect-[16/10] bg-muted overflow-hidden">
        <img
          src={retreat.image}
          alt={retreat.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent" />

        {/* Date badge */}
        <div className="absolute top-4 left-4 bg-primary text-white px-4 py-2 rounded-lg">
          <p className="text-xs font-semibold uppercase tracking-wide">
            {retreat.dates}
          </p>
        </div>

        {/* Status badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Upcoming
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-heading text-xl text-white mb-1">
            {retreat.title}
          </h3>
          <p className="text-white/80 text-sm italic">
            with {retreat.instructor}
          </p>
        </div>
      </div>

      <div className="p-6">
        <p className="text-secondary/70 text-sm leading-relaxed mb-4">
          {retreat.details}
        </p>

        {retreat.pricing && (
          <div className="flex flex-wrap gap-x-6 gap-y-1 mb-5 text-xs text-secondary/70">
            {retreat.pricing.double && (
              <span>
                <span className="font-semibold text-secondary">Double:</span>{' '}
                {retreat.pricing.double}
              </span>
            )}
            {retreat.pricing.single && (
              <span>
                <span className="font-semibold text-secondary">Single:</span>{' '}
                {retreat.pricing.single}
              </span>
            )}
          </div>
        )}

        <Button href="/contact" variant="primary" size="sm">
          Book This Retreat
        </Button>
      </div>
    </motion.div>
  );
};

/* ─── Main Events Page ─────────────────────────────────────────────────── */

const Events = () => {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[50vh] w-full overflow-hidden">
        <img
          src="/images/bush-dinner-evening.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 to-charcoal/70" />

        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 font-body text-sm uppercase tracking-[0.3em] text-white/60"
          >
            African Footprints
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-heading text-5xl md:text-6xl lg:text-7xl text-white tracking-wide"
          >
            EVENTS & RETREATS
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="mt-5 flex items-center gap-3"
          >
            <span className="block h-px w-10 bg-primary" />
            <span className="block h-2 w-2 rounded-full bg-primary" />
            <span className="block h-px w-10 bg-primary" />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl font-body text-lg text-white/80 italic"
          >
            Immersive experiences that nurture personal growth, creativity, and community
          </motion.p>
        </motion.div>
      </section>

      {/* Introduction */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-secondary/75 text-lg leading-relaxed mb-6">
            Join us at Sandai for immersive experiences that nurture personal
            growth, wellbeing, and community. Discover, relax, and get inspired
            with our variety of events throughout the year, including archery
            weekends, drumming weekends, painting weekends, and yoga retreats.
          </p>
          <p className="text-secondary/75 text-lg leading-relaxed mb-6">
            We can also arrange a retreat or weekend according to your preferred
            dates and the availability of our instructors. Provided there are
            enough participants interested to make this possible, send us an
            email and we will do our best to make it work for you.
          </p>
          <p className="text-accent italic text-lg">
            Keep an eye on our website, social media, and newsletter for
            information about upcoming weekends and events. We look forward to
            hosting you!
          </p>
        </motion.div>
      </section>

      {/* Activity Icons Strip */}
      <section className="bg-secondary py-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center gap-10 md:gap-20">
            {[
              { icon: FiFeather, label: 'Paint' },
              { icon: FiTarget, label: 'Archery' },
              { icon: FiSun, label: 'Yoga' },
              { icon: FiCamera, label: 'Photography' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-primary/40 flex items-center justify-center">
                  <item.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <span className="text-xs uppercase tracking-widest text-white/60 font-semibold">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Retreat Types */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <h2 className="font-heading text-3xl md:text-4xl text-secondary mb-4">
            Our Retreats
          </h2>
          <div className="flex items-center gap-3 justify-center mb-6">
            <span className="block h-px w-8 bg-primary" />
            <span className="block h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="block h-px w-8 bg-primary" />
          </div>
          <p className="text-secondary/70 text-lg max-w-2xl mx-auto italic">
            Weekend experiences designed to inspire, energise, and reconnect you
            with the rhythms of nature
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {retreatTypes.map((retreat) => (
            <RetreatTypeCard
              key={retreat.id}
              retreat={retreat}
              isExpanded={expandedId === retreat.id}
              onToggle={() =>
                setExpandedId(
                  expandedId === retreat.id ? null : retreat.id
                )
              }
            />
          ))}
        </motion.div>
      </section>

      {/* Upcoming Retreats */}
      {upcomingRetreats.length > 0 && (
        <section className="bg-background-warm py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-14"
            >
              <h2 className="font-heading text-3xl md:text-4xl text-secondary mb-4">
                Upcoming Retreats
              </h2>
              <div className="flex items-center gap-3 justify-center mb-6">
                <span className="block h-px w-8 bg-primary" />
                <span className="block h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="block h-px w-8 bg-primary" />
              </div>
              <p className="text-secondary/70 text-lg max-w-2xl mx-auto italic">
                Secure your spot on one of our next scheduled retreats
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {upcomingRetreats.map((retreat) => (
                <UpcomingCard key={retreat.id} retreat={retreat} />
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Instructor CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
        >
          {/* Image */}
          <div className="w-full lg:w-1/2">
            <div className="aspect-[4/3] bg-muted rounded-xl overflow-hidden relative group">
              <img
                src="/images/veranda-sunset.png"
                alt="Sandai Farm retreat space"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/10 transition-all duration-500" />
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2">
            <h2 className="font-heading text-3xl md:text-4xl text-secondary mb-4">
              Are You an Instructor?
            </h2>
            <div className="flex items-center gap-3 mb-6">
              <span className="block h-px w-8 bg-primary" />
              <span className="block h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="block h-px w-8 bg-primary" />
            </div>
            <p className="text-secondary/75 text-lg leading-relaxed mb-4">
              Would you like to organise a retreat on Sandai?
            </p>
            <p className="text-secondary/70 leading-relaxed mb-6">
              Sandai offers a serene and tranquil space to host an assemblage of
              retreats and events. Please reach out to us if you have a specific
              retreat or event in mind that you think could happen in our space
              on Sandai. We welcome yoga instructors, art teachers, wellness
              practitioners, music facilitators, and anyone with a passion for
              sharing their craft in an extraordinary setting.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {[
                'Yoga',
                'Painting',
                'Drumming',
                'Archery',
                'Wellness',
                'Photography',
                'Music',
                'Writing',
              ].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center bg-background-warm text-secondary/80 px-3 py-1.5 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Button href="/contact" variant="primary" size="lg">
              <span className="flex items-center gap-2">
                <FiMail className="w-4 h-4" />
                Make an Enquiry
              </span>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Previous Retreats */}
      {previousRetreats.length > 0 && (
        <section className="bg-background-warm py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-14"
            >
              <h2 className="font-heading text-3xl md:text-4xl text-secondary mb-4">
                Previous Retreats
              </h2>
              <div className="flex items-center gap-3 justify-center mb-6">
                <span className="block h-px w-8 bg-primary" />
                <span className="block h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="block h-px w-8 bg-primary" />
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {previousRetreats.map((retreat, index) => (
                <motion.div
                  key={retreat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  className="relative aspect-[16/10] rounded-xl overflow-hidden group"
                >
                  <img
                    src={retreat.image}
                    alt={retreat.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-secondary/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-heading text-lg text-white mb-1">
                      {retreat.title}
                    </h3>
                    <p className="text-white/70 text-sm flex items-center gap-1.5">
                      <FiCalendar className="w-3.5 h-3.5" />
                      {retreat.dates}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter / Bottom CTA */}
      <section className="bg-secondary py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-3xl mx-auto text-center px-6"
        >
          <h2 className="font-heading text-3xl md:text-4xl text-cream mb-4">
            Stay in the Loop
          </h2>

          <div className="flex items-center gap-3 justify-center mb-6">
            <span className="block h-px w-8 bg-primary" />
            <span className="block h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="block h-px w-8 bg-primary" />
          </div>

          <p className="text-muted-light text-lg leading-relaxed mb-4">
            Sign up for our newsletter to receive the latest news about upcoming
            retreats and events at Sandai Farm. From yoga weekends and drum
            circles to painting workshops under the African sky, you will be the
            first to know when new dates are announced.
          </p>

          <p className="text-muted italic mb-8">
            Follow us on social media for behind-the-scenes glimpses of life on
            the farm and our latest retreat highlights.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" variant="primary" size="lg">
              Get in Touch
            </Button>
            <Button
              href="/rooms"
              variant="outline"
              size="lg"
              className="border-cream text-cream hover:bg-cream hover:text-secondary"
            >
              View Accommodation
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Events;
