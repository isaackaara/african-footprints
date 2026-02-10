import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiArrowRight, FiSend, FiCheckCircle, FiX, FiDollarSign } from 'react-icons/fi';
import { safaris, safariCategories } from '../data/safaris';
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

const tabs = safariCategories.map((cat) => ({
  id: cat.id,
  label: cat.label,
}));

const safariImages = {
  'on-sandai-horseback': '/images/horseback-safari.png',
  'on-sandai-nature-walks': '/images/aberdare-waterfall.png',
  'on-sandai-farm-activities': '/images/family-horse-riding.png',
  'day-trip-solio': '/images/solio-rhino.png',
  'day-trip-ol-pejeta': '/images/elephant-portrait.png',
  'day-trip-aberdare': '/images/aberdare-waterfall.png',
  'day-trip-mt-kenya': '/images/mt-kenya-sunrise.png',
  'multi-day-samburu': '/images/samburu-landscape.png',
  'multi-day-masai-mara': '/images/giraffes-sunset.png',
  'multi-day-lake-nakuru': '/images/zebra-portrait.png',
  'multi-day-amboseli': '/images/elephant-portrait.png',
  'ten-day-package': '/images/hero-safari.png',
};

const SafariCard = ({ safari, index, isExpanded, onToggle }) => {
  return (
    <motion.div
      variants={cardVariants}
      layout
      className={`bg-white rounded-xl overflow-hidden shadow-sm transition-shadow duration-300 ${
        isExpanded ? 'shadow-lg col-span-1 md:col-span-2 lg:col-span-3' : 'group hover:shadow-lg'
      }`}
    >
      <div className={isExpanded ? 'lg:flex' : ''}>
        {/* Image */}
        <div className={`relative bg-muted overflow-hidden ${
          isExpanded ? 'lg:w-1/2 aspect-[4/3] lg:aspect-auto lg:min-h-[400px]' : 'aspect-[4/3]'
        }`}>
          <img
            src={safariImages[safari.id] || '/images/hero-safari.png'}
            alt={safari.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {!isExpanded && (
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}
          {/* Duration badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-secondary px-3 py-1.5 rounded-full text-xs font-semibold">
            <FiClock className="w-3.5 h-3.5 text-primary" />
            {safari.duration}
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
          <h3 className={`font-heading text-secondary ${
            isExpanded ? 'text-2xl md:text-3xl mb-2' : 'text-xl mb-1 group-hover:text-primary transition-colors duration-300'
          }`}>
            {safari.title}
          </h3>
          <p className={`text-accent italic ${isExpanded ? 'text-base mb-4' : 'text-sm mb-3'}`}>
            {safari.subtitle}
          </p>

          {isExpanded ? (
            <>
              <p className="text-secondary/75 text-sm leading-relaxed mb-6">
                {safari.description}
              </p>

              {/* Highlights */}
              {safari.highlights && (
                <div className="mb-6">
                  <h4 className="font-heading text-lg text-secondary mb-3">Highlights</h4>
                  <ul className="space-y-2">
                    {safari.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-secondary/75">
                        <FiCheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Included */}
              {safari.included && (
                <div className="mb-6">
                  <h4 className="font-heading text-lg text-secondary mb-3">What's Included</h4>
                  <div className="flex flex-wrap gap-2">
                    {safari.included.map((item, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 bg-background-warm text-secondary/80 px-3 py-1.5 rounded-full text-xs font-medium">
                        <FiCheckCircle className="w-3 h-3 text-primary" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Price hint */}
              {safari.priceHint && (
                <div className="flex items-center gap-2 mb-6 text-sm">
                  <FiDollarSign className="w-4 h-4 text-primary" />
                  <span className="text-secondary/80 font-medium">{safari.priceHint}</span>
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
                {safari.description.slice(0, 150)}...
              </p>
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

const TailorMadeSection = () => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="max-w-3xl mx-auto text-center py-16"
    >
      <div className="bg-white rounded-2xl p-10 md:p-16 shadow-sm">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
          className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <FiSend className="w-8 h-8 text-primary" />
        </motion.div>

        <h3 className="font-heading text-3xl md:text-4xl text-secondary mb-4">
          Design Your Perfect Safari
        </h3>

        <div className="mt-4 flex items-center gap-3 justify-center">
          <span className="block h-px w-8 bg-primary" />
          <span className="block h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="block h-px w-8 bg-primary" />
        </div>

        <p className="text-secondary/70 text-lg leading-relaxed mt-6 mb-4 max-w-xl mx-auto">
          Every traveller is unique, and so is every Sandai safari. Whether you
          dream of a romantic Mount Kenya retreat, a multi-generational family
          farm stay with wildlife adventures, or an ambitious Kenya safari
          crossing from the highlands to the coast, our team will craft a
          bespoke itinerary around your passions and pace.
        </p>

        <p className="text-accent italic mb-8">
          Simply tell us what inspires you, and we will design a Kenya safari
          experience that exceeds every expectation.
        </p>

        <Button href="/contact" variant="primary" size="lg">
          Get in Touch
        </Button>
      </div>
    </motion.div>
  );
};

const Safaris = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);

  const validCategories = safariCategories.map((cat) => cat.id);
  const activeTab = category && validCategories.includes(category)
    ? category
    : 'on-sandai';

  const handleTabChange = (tabId) => {
    setExpandedId(null);
    navigate(`/safaris/${tabId}`, { replace: true });
  };

  // Sync if URL changes from outside (e.g. navbar dropdown)
  useEffect(() => {
    setExpandedId(null);
  }, [category]);

  const filteredSafaris = safaris.filter(
    (safari) => safari.category === activeTab
  );

  const activeCategory = safariCategories.find((cat) => cat.id === activeTab);

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[50vh] w-full overflow-hidden">
        <img src="/images/horseback-safari.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
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
            SAFARIS
          </motion.h1>

          <motion.div variants={fadeUp} className="mt-5 flex items-center gap-3">
            <span className="block h-px w-10 bg-primary" />
            <span className="block h-2 w-2 rounded-full bg-primary" />
            <span className="block h-px w-10 bg-primary" />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl font-body text-lg text-white/80 italic"
          >
            Discover Kenya's extraordinary wildlife from Sandai Farm
          </motion.p>
        </motion.div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-0 z-30 bg-cream/95 backdrop-blur-sm border-b border-muted/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto no-scrollbar gap-2 py-4">
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
          {activeTab === 'tailor-made' ? (
            <TailorMadeSection key="tailor-made" />
          ) : (
            <motion.div
              key={activeTab}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredSafaris.map((safari, index) => (
                <SafariCard
                  key={safari.id}
                  safari={safari}
                  index={index}
                  isExpanded={expandedId === safari.id}
                  onToggle={() =>
                    setExpandedId(expandedId === safari.id ? null : safari.id)
                  }
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
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
            Ready to Start Your Adventure?
          </h2>

          <div className="flex items-center gap-3 justify-center mb-6">
            <span className="block h-px w-8 bg-primary" />
            <span className="block h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="block h-px w-8 bg-primary" />
          </div>

          <p className="text-muted-light text-lg leading-relaxed mb-8">
            From horseback riding alongside giraffes on Sandai Farm to
            witnessing the Great Migration in the Masai Mara, your Kenya safari
            journey begins with a single step. Let us help you plan an
            experience you will treasure forever.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" variant="primary" size="lg">
              Make an Enquiry
            </Button>
            <Button href="/rates" variant="outline" size="lg" className="border-cream text-cream hover:bg-cream hover:text-secondary">
              View Rates
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Safaris;
