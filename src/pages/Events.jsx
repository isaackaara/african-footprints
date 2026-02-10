import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiClock,
  FiArrowRight,
  FiCheckCircle,
  FiX,
  FiUsers,
  FiHeart,
  FiSun,
  FiFeather,
  FiBriefcase,
  FiStar,
  FiCamera,
  FiGlobe,
} from 'react-icons/fi';
import { events, eventCategories } from '../data/events';
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
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.96,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const tabs = eventCategories.map((cat) => ({
  id: cat.id,
  label: cat.label,
}));

const categoryIcons = {
  wellness: FiSun,
  creative: FiFeather,
  corporate: FiBriefcase,
  wedding: FiHeart,
  celebration: FiStar,
  festive: FiStar,
  photography: FiCamera,
  conservation: FiGlobe,
};

const EventCard = ({ event, isExpanded, onToggle }) => {
  const IconComponent = categoryIcons[event.icon] || FiStar;

  return (
    <motion.div
      variants={cardVariants}
      layout
      className={`bg-white rounded-xl overflow-hidden shadow-sm transition-shadow duration-300 ${
        isExpanded
          ? 'shadow-lg col-span-1 md:col-span-2 lg:col-span-3'
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
            src={event.image}
            alt={event.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {!isExpanded && (
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}

          {/* Category icon badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-secondary px-3 py-1.5 rounded-full text-xs font-semibold">
            <IconComponent className="w-3.5 h-3.5 text-primary" />
            {event.duration}
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
            {event.title}
          </h3>
          <p
            className={`text-accent italic ${
              isExpanded ? 'text-base mb-4' : 'text-sm mb-3'
            }`}
          >
            {event.subtitle}
          </p>

          {isExpanded ? (
            <>
              <p className="text-secondary/75 text-sm leading-relaxed mb-6">
                {event.description}
              </p>

              {/* Meta info */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-secondary/80">
                  <FiClock className="w-4 h-4 text-primary" />
                  <span className="font-medium">{event.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-secondary/80">
                  <FiUsers className="w-4 h-4 text-primary" />
                  <span className="font-medium">{event.capacity}</span>
                </div>
              </div>

              {/* Highlights */}
              {event.highlights && (
                <div className="mb-6">
                  <h4 className="font-heading text-lg text-secondary mb-3">
                    Highlights
                  </h4>
                  <ul className="space-y-2">
                    {event.highlights.map((highlight, i) => (
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

              {/* Ideal for */}
              {event.ideal && (
                <div className="mb-6 bg-background-warm rounded-lg px-5 py-4">
                  <p className="text-sm text-secondary/80">
                    <span className="font-semibold text-secondary">
                      Ideal for:{' '}
                    </span>
                    {event.ideal}
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <Button href="/contact" variant="primary" size="md">
                  Enquire About This Event
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
                {event.description.slice(0, 150)}...
              </p>

              {/* Quick meta */}
              <div className="flex items-center gap-4 mb-4 text-xs text-secondary/60">
                <span className="flex items-center gap-1">
                  <FiUsers className="w-3.5 h-3.5 text-primary" />
                  {event.capacity}
                </span>
              </div>

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

const Events = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);

  const validCategories = eventCategories.map((cat) => cat.id);
  const activeTab =
    category && validCategories.includes(category) ? category : 'retreats';

  const handleTabChange = (tabId) => {
    setExpandedId(null);
    navigate(`/events/${tabId}`, { replace: true });
  };

  useEffect(() => {
    setExpandedId(null);
  }, [category]);

  const filteredEvents = events.filter(
    (event) => event.category === activeTab
  );

  const activeCategory = eventCategories.find((cat) => cat.id === activeTab);

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
            Gather, celebrate, and reconnect in the heart of Kenya's highlands
          </motion.p>
        </motion.div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-0 z-30 bg-cream/95 backdrop-blur-sm border-b border-muted/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto no-scrollbar gap-2 py-4 justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-transparent border border-muted text-secondary/70 hover:border-primary hover:text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Category Description */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-center text-secondary/70 text-lg leading-relaxed max-w-3xl mx-auto italic"
          >
            {activeCategory?.description}
          </motion.p>
        </AnimatePresence>
      </section>

      {/* Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isExpanded={expandedId === event.id}
                onToggle={() =>
                  setExpandedId(
                    expandedId === event.id ? null : event.id
                  )
                }
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Why Sandai Section */}
      <section className="bg-background-warm py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center mb-14"
          >
            <h2 className="font-heading text-3xl md:text-4xl text-secondary mb-4">
              Why Host Your Event at Sandai?
            </h2>
            <div className="flex items-center gap-3 justify-center mb-6">
              <span className="block h-px w-8 bg-primary" />
              <span className="block h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="block h-px w-8 bg-primary" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FiGlobe,
                title: 'Unmatched Setting',
                description:
                  'A private 5,000-acre farm between Mount Kenya and the Aberdare Range, with wildlife roaming freely across the grounds.',
              },
              {
                icon: FiUsers,
                title: 'Intimate Scale',
                description:
                  'Our venue naturally limits group sizes, ensuring every event feels personal, exclusive, and genuinely memorable.',
              },
              {
                icon: FiStar,
                title: 'Full-Service Planning',
                description:
                  'From catering and accommodation to activities and transport, our team handles every detail so you can enjoy the moment.',
              },
              {
                icon: FiHeart,
                title: 'Authentic Experience',
                description:
                  'This is not a hotel function room. This is wild Africa: giraffes at breakfast, horseback rides before meetings, and stars that go on forever.',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading text-xl text-secondary mb-3">
                  {feature.title}
                </h3>
                <p className="text-secondary/70 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-secondary py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-3xl mx-auto text-center px-6"
        >
          <h2 className="font-heading text-3xl md:text-4xl text-cream mb-4">
            Let Us Bring Your Vision to Life
          </h2>

          <div className="flex items-center gap-3 justify-center mb-6">
            <span className="block h-px w-8 bg-primary" />
            <span className="block h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="block h-px w-8 bg-primary" />
          </div>

          <p className="text-muted-light text-lg leading-relaxed mb-4">
            Whether you are planning a wellness retreat for twelve, a bush
            wedding for sixty, or a team-building weekend for your company,
            every event at Sandai Farm is crafted around your vision and
            delivered with the warmth of true Kenyan hospitality.
          </p>

          <p className="text-muted italic mb-8">
            Tell us about your event, and we will show you what is possible in
            the heart of Kenya's highlands.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" variant="primary" size="lg">
              Start Planning
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
