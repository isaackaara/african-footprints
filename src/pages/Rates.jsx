import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { nonResidentRates, residentRates, ratesMeta } from '../data/rates';
import Button from '../components/ui/Button';
import SectionHeading from '../components/ui/SectionHeading';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.2,
    },
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

const includes = {
  fullBoard: [
    'Full breakfast each morning',
    'Three-course lunch',
    'Three-course dinner',
    'Tea, coffee, and refreshments throughout the day',
    'Room accommodation with daily housekeeping',
  ],
  selfCatering: [
    'Room accommodation with daily housekeeping',
    'Fully equipped kitchen access',
    'Fresh towels and linen',
    'Full board upgrade available on request',
  ],
};

const headers = ['Room', 'Single', 'Double', 'Triple', 'Extra Person'];

const formatRate = (value, currency) => {
  if (value === null || value === undefined) return '\u2014';
  return currency === 'USD' ? `$${value}` : `KES ${value.toLocaleString()}`;
};

const Rates = () => {
  const [activeTab, setActiveTab] = useState('nonResident');

  const rates = activeTab === 'nonResident' ? nonResidentRates : residentRates;
  const currency = activeTab === 'nonResident' ? ratesMeta.nonResidentCurrency : ratesMeta.residentCurrency;

  return (
    <>
      {/* Hero Banner */}
      <section className="relative flex h-[50vh] items-center justify-center overflow-hidden">
        <img src="/images/farm-cuisine.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
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
            Sandai Farm &middot; Nyeri, Kenya
          </motion.p>
          <motion.h1
            variants={heroFadeUp}
            className="font-heading text-5xl tracking-wide text-white md:text-6xl lg:text-7xl"
          >
            RATES
          </motion.h1>
          <motion.p
            variants={heroFadeUp}
            className="mx-auto mt-4 max-w-xl font-body text-lg text-white/70"
          >
            Transparent pricing for an unforgettable Kenyan stay
          </motion.p>
        </motion.div>
      </section>

      {/* Tab Toggle + Table Section */}
      <section className="bg-background px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            title="Accommodation Rates"
            subtitle="Per person, per night rates at Sandai Farm"
          />

          {/* Tab Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-10 flex max-w-md overflow-hidden rounded-lg border border-muted"
          >
            <button
              onClick={() => setActiveTab('nonResident')}
              className={`flex-1 cursor-pointer px-6 py-3.5 font-body text-sm font-semibold uppercase tracking-widest transition-colors duration-300 ${
                activeTab === 'nonResident'
                  ? 'bg-primary text-white'
                  : 'bg-cream text-secondary hover:bg-background-warm'
              }`}
            >
              Non-Resident Rates
            </button>
            <button
              onClick={() => setActiveTab('resident')}
              className={`flex-1 cursor-pointer px-6 py-3.5 font-body text-sm font-semibold uppercase tracking-widest transition-colors duration-300 ${
                activeTab === 'resident'
                  ? 'bg-primary text-white'
                  : 'bg-cream text-secondary hover:bg-background-warm'
              }`}
            >
              Resident Rates
            </button>
          </motion.div>

          {/* Valid Until Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 flex justify-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2 font-body text-sm text-primary">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Valid until {ratesMeta.validUntil}
            </span>
          </motion.div>

          {/* Desktop Table */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="hidden overflow-hidden rounded-xl shadow-sm md:block"
          >
            {/* Table Header */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-5 bg-primary px-6 py-4"
            >
              {headers.map((header) => (
                <span
                  key={header}
                  className="font-body text-sm font-semibold uppercase tracking-wider text-white"
                >
                  {header}
                </span>
              ))}
            </motion.div>

            {/* Table Rows */}
            {rates.map((rate, index) => (
              <motion.div
                key={rate.room}
                variants={fadeUp}
                className={`grid grid-cols-5 px-6 py-4 ${
                  index % 2 === 0 ? 'bg-cream' : 'bg-background'
                }`}
              >
                <span className="font-body text-sm font-semibold text-secondary">
                  {rate.room}
                  {rate.board && (
                    <span className="block text-xs font-normal text-accent">{rate.board}</span>
                  )}
                </span>
                <span className="font-body text-sm text-secondary/80">
                  {formatRate(rate.single, currency)}
                </span>
                <span className="font-body text-sm text-secondary/80">
                  {formatRate(rate.double, currency)}
                </span>
                <span className="font-body text-sm text-secondary/80">
                  {formatRate(rate.triple, currency)}
                </span>
                <span className="font-body text-sm text-secondary/80">
                  {formatRate(rate.extra, currency)}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="space-y-4 md:hidden"
          >
            {rates.map((rate) => (
              <motion.div
                key={rate.room}
                variants={fadeUp}
                className="rounded-xl bg-cream p-5 shadow-sm"
              >
                <h3 className="mb-1 font-heading text-lg text-secondary">
                  {rate.room}
                </h3>
                {rate.board && (
                  <p className="mb-3 text-xs text-accent">{rate.board}</p>
                )}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="font-body text-xs uppercase tracking-wider text-accent">
                      Single
                    </span>
                    <p className="font-body text-sm font-semibold text-secondary">
                      {formatRate(rate.single, currency)}
                    </p>
                  </div>
                  <div>
                    <span className="font-body text-xs uppercase tracking-wider text-accent">
                      Double
                    </span>
                    <p className="font-body text-sm font-semibold text-secondary">
                      {formatRate(rate.double, currency)}
                    </p>
                  </div>
                  <div>
                    <span className="font-body text-xs uppercase tracking-wider text-accent">
                      Triple
                    </span>
                    <p className="font-body text-sm font-semibold text-secondary">
                      {formatRate(rate.triple, currency)}
                    </p>
                  </div>
                  <div>
                    <span className="font-body text-xs uppercase tracking-wider text-accent">
                      Extra Person
                    </span>
                    <p className="font-body text-sm font-semibold text-secondary">
                      {formatRate(rate.extra, currency)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 text-center font-body text-sm italic text-accent"
          >
            For USD and tour operator rates, please contact us directly.
          </motion.p>
        </div>
      </section>

      {/* What's Included */}
      <section className="bg-cream px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            title="What's Included"
            subtitle="Everything you need for a comfortable stay at Sandai Farm"
          />

          <div className="mt-4 grid gap-10 md:grid-cols-2">
            {/* Full Board */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-xl bg-white p-8 shadow-sm"
            >
              <h3 className="mb-1 font-heading text-2xl text-secondary">
                Full Board
              </h3>
              <p className="mb-6 font-body text-sm italic text-accent">
                Farmhouse Rooms 1 to 4
              </p>
              <ul className="space-y-3">
                {includes.fullBoard.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <FiCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="font-body text-sm leading-relaxed text-secondary/80">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Self Catering */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="rounded-xl bg-white p-8 shadow-sm"
            >
              <h3 className="mb-1 font-heading text-2xl text-secondary">
                Self Catering
              </h3>
              <p className="mb-6 font-body text-sm italic text-accent">
                Cottages, Rondavels, and Punda Milia House
              </p>
              <ul className="space-y-3">
                {includes.selfCatering.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <FiCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="font-body text-sm leading-relaxed text-secondary/80">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-background px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-heading text-3xl text-secondary md:text-4xl">
            Ready to Book Your Stay?
          </h2>
          <p className="mt-4 font-body text-base leading-relaxed text-secondary/70">
            Whether you are planning a Kenya safari holiday, a Mount Kenya
            retreat, or a peaceful family getaway, we would love to help you
            find the perfect Nyeri accommodation at Sandai Farm.
          </p>
          <div className="mt-8">
            <Button href="/contact" variant="primary" size="lg">
              Make an Enquiry
            </Button>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Rates;
